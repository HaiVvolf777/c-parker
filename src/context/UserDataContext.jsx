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
import { usePreview } from './PreviewContext.jsx';
import { getUserByWallet, getUserById, getUserStats, ApiError } from '../services/apiClient.js';
import { registerUserWithWallet } from '../services/registrationService.js';

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
  const { account, provider, disconnectWallet } = useWallet();
  const { previewUserId, isPreviewMode } = usePreview();
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
    // In preview mode, we need the preview ID
    // In normal mode, we need the account
    if (!isPreviewMode && !account) {
      resetState();
      return;
    }

    if (isPreviewMode && !previewUserId) {
      resetState();
      return;
    }

    const controller = new AbortController();
    activeRequest.current?.abort?.();
    activeRequest.current = controller;
    setIsLoading(true);
    setError(null);

    try {
      let userResponse;
      
      // If in preview mode, fetch user by ID
      if (isPreviewMode) {
        userResponse = await getUserById(previewUserId, {
          signal: controller.signal,
        });
      } else {
        // Normal mode: fetch by wallet
        const normalizedAccount = account.toLowerCase();
        userResponse = await getUserByWallet(normalizedAccount, {
          signal: controller.signal,
        });
      }

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

        // Only auto-register in normal mode, not in preview mode
        if (!isPreviewMode && allowAutoRegister && !autoRegisterAttempted.current) {
          autoRegisterAttempted.current = true;
          setIsRegistering(true);
          setError(null);
          setRegistrationMessage(null);

          try {
            if (!provider) {
              throw new Error('Wallet provider not available. Please connect your wallet first.');
            }
            const result = await registerUserWithWallet(provider, 1);
            setRegistrationMessage(result?.message ?? 'Registration submitted successfully');
            await fetchUserData(false);
          } catch (registrationErr) {
            autoRegisterAttempted.current = false;
            
            // Check if user rejected/cancelled the transaction
            const errorMessage = registrationErr instanceof Error ? registrationErr.message : String(registrationErr);
            const errorCode = registrationErr?.code || registrationErr?.error?.code;
            const isRejected = 
              errorCode === 4001 || // User rejected request
              errorCode === 'ACTION_REJECTED' ||
              errorMessage.toLowerCase().includes('rejected') ||
              errorMessage.toLowerCase().includes('denied') ||
              errorMessage.toLowerCase().includes('user denied') ||
              errorMessage.toLowerCase().includes('user rejected');
            
            if (isRejected) {
              // User cancelled/rejected - redirect to home page
              console.log('Transaction rejected by user, redirecting to home page...');
              disconnectWallet();
              // Use window.location since we're outside Router context
              window.location.href = '/';
              return;
            }
            
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
  }, [account, provider, resetState, disconnectWallet, isPreviewMode, previewUserId]);

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
    // Fetch user data if:
    // 1. In preview mode with a preview user ID, OR
    // 2. Account is connected (user clicked "Connect Wallet")
    if (isPreviewMode && previewUserId) {
      fetchUserData(false); // No auto-registration in preview mode
    } else if (account) {
      fetchUserData(true); // Allow auto-registration since user explicitly connected
    } else {
      // Reset state when account is disconnected and not in preview
      resetState();
    }

    return () => {
      activeRequest.current?.abort?.();
      activeRequest.current = null;
    };
  }, [account, fetchUserData, resetState, isPreviewMode, previewUserId]);

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


