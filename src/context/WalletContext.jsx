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
  isCorrectNetwork: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchToAmoyNetwork: async () => {},
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

// Clear all user-related data from storage (wallet + progress)
export const clearAllUserData = () => {
  try {
    // Clear wallet session
    clearWalletSession();
    
    // Clear progress data (user-specific)
    localStorage.removeItem('cparker_progress_v1');
    
    // Note: We keep announcements and admin auth as they're not user-specific
    console.log('All user data cleared from storage');
  } catch (err) {
    console.warn('Failed to clear user data:', err);
  }
};

// Expected network chain ID from environment variable
const EXPECTED_CHAIN_ID = import.meta.env?.VITE_CHAIN_ID ?? '80002';

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
    const chainIdStr = chainIdNum?.toString() ?? nextChainId?.toString() ?? null;
    setChainId(chainIdStr);
    // Note: Users can switch networks, but NetworkWarning will prompt them to switch back
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

        const chainIdNum = parseInt(EXPECTED_CHAIN_ID, 10);
        const provider = await EthereumProvider.init({
          projectId: projectId,
          chains: [chainIdNum], 
          optionalChains: [chainIdNum], 
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

  const switchToAmoyNetwork = useCallback(async () => {
    if (!providerRef.current) {
      setError(new Error('Wallet provider not initialized'));
      return;
    }

    const chainIdHex = `0x${parseInt(EXPECTED_CHAIN_ID, 10).toString(16)}`;
    const chainName = import.meta.env?.VITE_CHAIN_NAME ?? 'Polygon Amoy Testnet';
    const rpcUrl = import.meta.env?.VITE_CHAIN_RPC_URL ?? 'https://rpc-amoy.polygon.technology';
    const blockExplorerUrl = import.meta.env?.VITE_CHAIN_BLOCK_EXPLORER_URL ?? 'https://amoy.polygonscan.com';
    const nativeCurrencyName = import.meta.env?.VITE_CHAIN_NATIVE_CURRENCY_NAME ?? 'MATIC';
    const nativeCurrencySymbol = import.meta.env?.VITE_CHAIN_NATIVE_CURRENCY_SYMBOL ?? 'MATIC';
    const nativeCurrencyDecimals = parseInt(import.meta.env?.VITE_CHAIN_NATIVE_CURRENCY_DECIMALS ?? '18', 10);

    try {
      // For MetaMask and other EIP-1193 providers
      if (providerTypeRef.current === 'metamask') {
        await providerRef.current.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        });
      } else {
        // For WalletConnect, try to switch chain
        try {
          await providerRef.current.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdHex }],
          });
        } catch (switchError) {
          // If chain doesn't exist, try to add it
          if (switchError.code === 4902) {
            await providerRef.current.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: chainIdHex,
                  chainName: chainName,
                  nativeCurrency: {
                    name: nativeCurrencyName,
                    symbol: nativeCurrencySymbol,
                    decimals: nativeCurrencyDecimals,
                  },
                  rpcUrls: [rpcUrl],
                  blockExplorerUrls: [blockExplorerUrl],
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
      }
    } catch (err) {
      setError(formatError(err));
      throw err;
    }
  }, []);

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
        
        // Check current chain and switch if needed
        const currentChain = await providerRef.current.request({ method: 'eth_chainId' });
        const currentChainId = typeof currentChain === 'string' ? parseInt(currentChain, 16).toString() : currentChain?.toString();
        
        if (currentChainId !== EXPECTED_CHAIN_ID) {
          // Automatically switch to the correct network
          try {
            await switchToAmoyNetwork();
            // Get the chain ID again after switching
            const newChain = await providerRef.current.request({ method: 'eth_chainId' });
            handleChainChanged(newChain);
          } catch (switchErr) {
            // If switch fails, still set the current chain so NetworkWarning can show
            handleChainChanged(currentChain);
            console.warn('Failed to automatically switch network:', switchErr);
          }
        } else {
          handleChainChanged(currentChain);
        }
        // Session is saved in handleAccountsChanged
      } else {
        const accounts = await providerRef.current.enable();
        handleAccountsChanged(accounts);
        
        // Check current chain and switch if needed
        const currentChain = await providerRef.current.request({ method: 'eth_chainId' });
        const currentChainId = typeof currentChain === 'string' ? parseInt(currentChain, 16).toString() : currentChain?.toString();
        
        if (currentChainId !== EXPECTED_CHAIN_ID) {
          // Automatically switch to the correct network
          try {
            await switchToAmoyNetwork();
            // Get the chain ID again after switching
            const newChain = await providerRef.current.request({ method: 'eth_chainId' });
            handleChainChanged(newChain);
          } catch (switchErr) {
            // If switch fails, still set the current chain so NetworkWarning can show
            handleChainChanged(currentChain);
            console.warn('Failed to automatically switch network:', switchErr);
          }
        } else {
          handleChainChanged(currentChain);
        }
        // Session is saved in handleAccountsChanged
      }
    } catch (err) {
      setError(formatError(err));
    } finally {
      setIsConnecting(false);
    }
  }, [handleAccountsChanged, handleChainChanged, switchToAmoyNetwork]);

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
      setIsConnecting(false);
      clearAllUserData();
      
      // Dispatch custom event so other contexts can reset
      window.dispatchEvent(new CustomEvent('wallet-disconnected'));
    }
  }, []);

  // Check if user is on the correct network
  const isCorrectNetwork = useMemo(() => {
    if (!chainId) return false;
    return chainId === EXPECTED_CHAIN_ID;
  }, [chainId]);

  const value = useMemo(() => ({
    account,
    chainId,
    hasProvider,
    isConnecting,
    error,
    provider: providerRef.current,
    isCorrectNetwork,
    connectWallet,
    disconnectWallet,
    switchToAmoyNetwork,
  }), [
    account,
    chainId,
    connectWallet,
    disconnectWallet,
    error,
    hasProvider,
    isConnecting,
    isCorrectNetwork,
    switchToAmoyNetwork,
  ]);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);


