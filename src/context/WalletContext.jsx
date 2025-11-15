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
  }, []);

  const handleChainChanged = useCallback((nextChainId) => {
    const chainIdNum = typeof nextChainId === 'string' ? parseInt(nextChainId, 16) : nextChainId;
    setChainId(chainIdNum?.toString() ?? nextChainId?.toString() ?? null);
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeProvider = async () => {
      try {
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
          }

          provider.on('accountsChanged', handleAccountsChanged);
          provider.on('chainChanged', handleChainChanged);
          provider.on('disconnect', () => {
            setAccount(null);
            setChainId(null);
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
      } else {
        const accounts = await providerRef.current.enable();
        handleAccountsChanged(accounts);
        const currentChain = await providerRef.current.request({ method: 'eth_chainId' });
        handleChainChanged(currentChain);
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


