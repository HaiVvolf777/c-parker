import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useWallet } from './WalletContext.jsx';
import { getUserByWallet, getUserStats, ApiError } from '../services/apiClient.js';
import { registerUserWithMetaMask } from '../services/registrationService.js';

const UserDataContext = createContext({
  user: null,
  userStats: null,
  isLoading: false,
  isRegistering: false,
  error: null,
  registrationMessage: null,
  refresh: async () => {},
  acknowledgeRegistration: () => {},
});

const INITIAL_STATE = {
  user: null,
  userStats: null,
  error: null,
};

export const UserDataProvider = ({ children }) => {
  const { account } = useWallet();
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [registrationMessage, setRegistrationMessage] = useState(null);
  const activeRequest = useRef(null);
  const autoRegisterAttempted = useRef(false);

  const resetState = useCallback(() => {
    setUser(INITIAL_STATE.user);
    setUserStats(INITIAL_STATE.userStats);
    setError(INITIAL_STATE.error);
    setIsRegistering(false);
    setRegistrationMessage(null);
    autoRegisterAttempted.current = false;
    activeRequest.current?.abort?.();
    activeRequest.current = null;
  }, []);

  const fetchUserData = useCallback(async (allowAutoRegister = true) => {
    if (!account) {
      resetState();
      return;
    }

    const normalizedAccount = account.toLowerCase();
    const controller = new AbortController();
    activeRequest.current?.abort?.();
    activeRequest.current = controller;
    setIsLoading(true);
    setError(null);

    try {
      const userResponse = await getUserByWallet(normalizedAccount, {
        signal: controller.signal,
      });

      setUser(userResponse);
      setRegistrationMessage(null);

      if (userResponse?.userId) {
        try {
          const statsResponse = await getUserStats(userResponse.userId, {
            signal: controller.signal,
          });
          setUserStats(statsResponse);
        } catch (statsError) {
          if (statsError instanceof ApiError && statsError.status === 404) {
            setUserStats(null);
          } else if (!(controller.signal.aborted)) {
            setError(statsError instanceof Error ? statsError : new Error('Failed to fetch user stats'));
            setUserStats(null);
          }
        }
      } else {
        setUserStats(null);
      }
    } catch (err) {
      if (controller.signal.aborted) {
        return;
      }

      if (err instanceof ApiError && err.status === 404) {
        setUser(null);
        setUserStats(null);

        if (allowAutoRegister && !autoRegisterAttempted.current) {
          autoRegisterAttempted.current = true;
          setIsRegistering(true);
          setError(null);
          setRegistrationMessage(null);

          try {
            const result = await registerUserWithMetaMask(1);
            setRegistrationMessage(result?.message ?? 'Registration submitted successfully');
            await fetchUserData(false);
          } catch (registrationErr) {
            autoRegisterAttempted.current = false;
            const message =
              registrationErr instanceof Error
                ? registrationErr.message
                : 'Failed to register wallet on-chain';
            setError(new Error(message));
          } finally {
            setIsRegistering(false);
          }
        } else {
          setError(new Error('Wallet not registered on C-Parker yet.'));
        }

        return;
      }

      setError(err instanceof Error ? err : new Error('Failed to fetch user data'));
      setUser(null);
      setUserStats(null);
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
      if (activeRequest.current === controller) {
        activeRequest.current = null;
      }
    }
  }, [account, resetState]);

  const acknowledgeRegistration = useCallback(() => {
    setRegistrationMessage(null);
    setIsRegistering(false);
    setError((prev) => {
      if (!prev) return prev;
      const lower = typeof prev.message === 'string' ? prev.message.toLowerCase() : '';
      if (lower.includes('register')) {
        return null;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    fetchUserData();

    return () => {
      activeRequest.current?.abort?.();
      activeRequest.current = null;
    };
  }, [fetchUserData]);

  const value = useMemo(() => ({
    user,
    userStats,
    isLoading,
    isRegistering,
    error,
    registrationMessage,
    refresh: fetchUserData,
    acknowledgeRegistration,
  }), [
    user,
    userStats,
    isLoading,
    isRegistering,
    error,
    registrationMessage,
    fetchUserData,
    acknowledgeRegistration,
  ]);

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);


