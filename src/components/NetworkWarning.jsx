import { useWallet } from '../context/WalletContext';

const EXPECTED_CHAIN_ID = import.meta.env?.VITE_CHAIN_ID ?? '80002';
const CHAIN_NAME = import.meta.env?.VITE_CHAIN_NAME ?? 'Polygon Amoy Testnet';

const NetworkWarning = () => {
  const { account, isCorrectNetwork, switchToAmoyNetwork, chainId } = useWallet();

  // Don't show if not connected or on correct network
  if (!account || isCorrectNetwork) {
    return null;
  }

  const handleSwitchNetwork = async () => {
    await switchToAmoyNetwork();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white px-4 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <svg 
            className="w-6 h-6 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          <div>
            <p className="font-semibold">Wrong Network Detected</p>
            <p className="text-sm">
              You're connected to chain ID: {chainId}. Please switch to {CHAIN_NAME} (Chain ID: {EXPECTED_CHAIN_ID})
            </p>
          </div>
        </div>
        <button
          onClick={handleSwitchNetwork}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-semibold hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Switch Network
        </button>
      </div>
    </div>
  );
};

export default NetworkWarning;
