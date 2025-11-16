import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

const WalletContext = createContext({
  account: null,
  chainId: null,
  hasProvider: false,
  isConnecting: false,
  error: null,
  provider: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

const formatError = (err) => {
  if (!err) return null;
  if (err instanceof Error) return err;
  if (typeof err === 'string') return new Error(err);
  if (typeof err?.message === 'string') return new Error(err.message);
  return new Error('Unexpected wallet error');
};

// localStorage keys
const STORAGE_KEY = 'c-parker-wallet-session';
const STORAGE_ACCOUNT_KEY = 'c-parker-wallet-account';
const STORAGE_PROVIDER_TYPE_KEY = 'c-parker-wallet-provider-type';

// Helper functions for localStorage
const saveWalletSession = (account, providerType) => {
  try {
    if (account && providerType) {
      localStorage.setItem(STORAGE_ACCOUNT_KEY, account);
      localStorage.setItem(STORAGE_PROVIDER_TYPE_KEY, providerType);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  } catch (err) {
    console.warn('Failed to save wallet session:', err);
  }
};

const getWalletSession = () => {
  try {
    const account = localStorage.getItem(STORAGE_ACCOUNT_KEY);
    const providerType = localStorage.getItem(STORAGE_PROVIDER_TYPE_KEY);
    if (account && providerType) {
      return { account, providerType };
    }
  } catch (err) {
    console.warn('Failed to get wallet session:', err);
  }
  return null;
};

export const clearWalletSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_ACCOUNT_KEY);
    localStorage.removeItem(STORAGE_PROVIDER_TYPE_KEY);
  } catch (err) {
    console.warn('Failed to clear wallet session:', err);
  }
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [hasProvider, setHasProvider] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const providerRef = useRef(null);
  const providerTypeRef = useRef(null);

  const handleAccountsChanged = useCallback((accounts) => {
    const nextAccount = Array.isArray(accounts) && accounts.length > 0 ? accounts[0] : null;
    setAccount(nextAccount);
    // Save to localStorage when account changes
    if (nextAccount && providerTypeRef.current) {
      saveWalletSession(nextAccount, providerTypeRef.current);
    } else if (!nextAccount) {
      clearWalletSession();
    }
  }, []);

  const handleChainChanged = useCallback((nextChainId) => {
    const chainIdNum = typeof nextChainId === 'string' ? parseInt(nextChainId, 16) : nextChainId;
    setChainId(chainIdNum?.toString() ?? nextChainId?.toString() ?? null);
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeProvider = async () => {
      try {
        // Try to restore wallet session from localStorage
        const savedSession = getWalletSession();
        
        if (window.ethereum && window.ethereum.isMetaMask) {
          providerRef.current = window.ethereum;
          providerTypeRef.current = 'metamask';
          setHasProvider(true);

          try {
            const currentChain = await window.ethereum.request({ method: 'eth_chainId' });
            if (currentChain) {
              handleChainChanged(currentChain);
            }
          } catch (err) {
            console.warn('Error checking chain:', err);
          }

          // Restore account from localStorage if session exists
          if (savedSession && savedSession.providerType === 'metamask') {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_accounts' });
              if (accounts && accounts.length > 0 && accounts[0].toLowerCase() === savedSession.account.toLowerCase()) {
                handleAccountsChanged(accounts);
              } else {
                // Account mismatch, clear session
                clearWalletSession();
              }
            } catch (err) {
              console.warn('Error restoring wallet session:', err);
              clearWalletSession();
            }
          }

          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);

          if (!mounted) return;
          return; 
        }

        const projectId = import.meta.env?.VITE_WALLETCONNECT_PROJECT_ID;
        
        if (!projectId || projectId === 'YOUR_PROJECT_ID' || projectId.trim() === '') {
          console.warn('⚠️ WalletConnect Project ID not configured. MetaMask not detected either.');
          setHasProvider(false);
          return;
        }

        const provider = await EthereumProvider.init({
          projectId: projectId,
          chains: [80002], 
          optionalChains: [80002], 
          showQrModal: true,
          metadata: {
            name: 'C-Parker',
            description: 'C-Parker Orbit Matrix Platform',
            url: window.location.origin,
            icons: [`${window.location.origin}/images/logo.png`],
          },
        });

        if (!mounted) return;

        if (provider) {
          providerRef.current = provider;
          providerTypeRef.current = 'walletconnect';
          setHasProvider(true);

          if (provider.session && provider.accounts && provider.accounts.length > 0) {
            handleAccountsChanged(provider.accounts);
            const currentChain = await provider.request({ method: 'eth_chainId' });
            handleChainChanged(currentChain);
          } else if (savedSession && savedSession.providerType === 'walletconnect') {
            // Try to restore WalletConnect session
            try {
              if (provider.session && provider.accounts && provider.accounts.length > 0) {
                const account = provider.accounts[0];
                if (account.toLowerCase() === savedSession.account.toLowerCase()) {
                  handleAccountsChanged(provider.accounts);
                  const currentChain = await provider.request({ method: 'eth_chainId' });
                  handleChainChanged(currentChain);
                } else {
                  clearWalletSession();
                }
              } else {
                clearWalletSession();
              }
            } catch (err) {
              console.warn('Error restoring WalletConnect session:', err);
              clearWalletSession();
            }
          }

          provider.on('accountsChanged', handleAccountsChanged);
          provider.on('chainChanged', handleChainChanged);
          provider.on('disconnect', () => {
            setAccount(null);
            setChainId(null);
            clearWalletSession();
          });
        } else {
          setHasProvider(false);
        }
      } catch (err) {
        if (!mounted) return;
        setError(formatError(err));
        setHasProvider(false);
      }
    };

    initializeProvider();

    return () => {
      mounted = false;

      if (providerRef.current) {
        if (providerTypeRef.current === 'metamask') {
          if (window.ethereum?.removeListener) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
          }
        } else if (providerTypeRef.current === 'walletconnect') {
          providerRef.current.removeListener('accountsChanged', handleAccountsChanged);
          providerRef.current.removeListener('chainChanged', handleChainChanged);
          providerRef.current.removeListener('disconnect', () => {});
        }
      }
    };
  }, [handleAccountsChanged, handleChainChanged]);

  const connectWallet = useCallback(async () => {
    setError(null);

    if (!providerRef.current) {
      setHasProvider(false);
      setError(new Error('Wallet provider not initialized'));
      return;
    }

    try {
      setIsConnecting(true);

      if (providerTypeRef.current === 'metamask') {
        const accounts = await providerRef.current.request({
          method: 'eth_requestAccounts',
        });
        handleAccountsChanged(accounts);
        const currentChain = await providerRef.current.request({ method: 'eth_chainId' });
        handleChainChanged(currentChain);
        // Session is saved in handleAccountsChanged
      } else {
        const accounts = await providerRef.current.enable();
        handleAccountsChanged(accounts);
        const currentChain = await providerRef.current.request({ method: 'eth_chainId' });
        handleChainChanged(currentChain);
        // Session is saved in handleAccountsChanged
      }
    } catch (err) {
      setError(formatError(err));
    } finally {
      setIsConnecting(false);
    }
  }, [handleAccountsChanged, handleChainChanged]);

  const disconnectWallet = useCallback(async () => {
    try {
      if (providerTypeRef.current === 'walletconnect' && providerRef.current?.session) {
        await providerRef.current.disconnect();
      }
    } catch (err) {
      console.warn('Error disconnecting:', err);
    } finally {
      setAccount(null);
      setChainId(null);
      setError(null);
      clearWalletSession();
    }
  }, []);

  const value = useMemo(() => ({
    account,
    chainId,
    hasProvider,
    isConnecting,
    error,
    provider: providerRef.current,
    connectWallet,
    disconnectWallet,
  }), [
    account,
    chainId,
    connectWallet,
    disconnectWallet,
    error,
    hasProvider,
    isConnecting,
  ]);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);


