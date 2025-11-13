import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

const WalletContext = createContext({
  account: null,
  chainId: null,
  hasProvider: false,
  isConnecting: false,
  error: null,
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

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [hasProvider, setHasProvider] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const providerRef = useRef(null);

  const handleAccountsChanged = useCallback((accounts) => {
    const nextAccount = Array.isArray(accounts) && accounts.length > 0 ? accounts[0] : null;
    setAccount(nextAccount);
  }, []);

  const handleChainChanged = useCallback((nextChainId) => {
    setChainId(nextChainId ?? null);
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeProvider = async () => {
      try {
        const provider = await detectEthereumProvider({ mustBeMetaMask: true });

        if (!mounted) return;

        if (provider) {
          providerRef.current = provider;
          setHasProvider(true);

          const [accounts, currentChain] = await Promise.allSettled([
            provider.request({ method: 'eth_accounts' }),
            provider.request({ method: 'eth_chainId' }),
          ]);

          if (accounts.status === 'fulfilled') {
            handleAccountsChanged(accounts.value);
          }

          if (currentChain.status === 'fulfilled') {
            handleChainChanged(currentChain.value);
          }

          provider.on?.('accountsChanged', handleAccountsChanged);
          provider.on?.('chainChanged', handleChainChanged);
        } else {
          setHasProvider(false);
        }
      } catch (err) {
        if (!mounted) return;
        setError(formatError(err));
      }
    };

    initializeProvider();

    return () => {
      mounted = false;

      if (providerRef.current?.removeListener) {
        providerRef.current.removeListener('accountsChanged', handleAccountsChanged);
        providerRef.current.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanged, handleChainChanged]);

  const connectWallet = useCallback(async () => {
    setError(null);

    if (!providerRef.current) {
      setHasProvider(false);
      setError(new Error('MetaMask provider not detected'));
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await providerRef.current.request({
        method: 'eth_requestAccounts',
      });
      handleAccountsChanged(accounts);
    } catch (err) {
      setError(formatError(err));
    } finally {
      setIsConnecting(false);
    }
  }, [handleAccountsChanged]);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setError(null);
  }, []);

  const value = useMemo(() => ({
    account,
    chainId,
    hasProvider,
    isConnecting,
    error,
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


