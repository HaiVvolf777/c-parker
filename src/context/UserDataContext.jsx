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

const UserDataContext = createContext({
  user: null,
  userStats: null,
  isLoading: false,
  error: null,
  refresh: async () => {},
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
  const [error, setError] = useState(null);
  const activeRequest = useRef(null);

  const resetState = useCallback(() => {
    setUser(INITIAL_STATE.user);
    setUserStats(INITIAL_STATE.userStats);
    setError(INITIAL_STATE.error);
    activeRequest.current?.abort?.();
    activeRequest.current = null;
  }, []);

  const fetchUserData = useCallback(async () => {
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
        setError(new Error('Wallet not registered on C-Parker yet.'));
        setUser(null);
        setUserStats(null);
        return;
      }

      setError(err instanceof Error ? err : new Error('Failed to fetch user data'));
      setUser(null);
      setUserStats(null);
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [account, resetState]);

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
    error,
    refresh: fetchUserData,
  }), [user, userStats, isLoading, error, fetchUserData]);

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);


