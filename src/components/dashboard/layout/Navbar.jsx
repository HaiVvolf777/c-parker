import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../../context/WalletContext.jsx';
import { usePreview } from '../../../context/PreviewContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    account,
    isConnecting,
    hasProvider,
    connectWallet,
    disconnectWallet,
    error,
  } = useWallet();
  
  const { previewUserId, isPreviewMode, setPreviewUser, clearPreview } = usePreview();
  const [previewInput, setPreviewInput] = useState('');

  const handleLogoClick = async () => {
    await disconnectWallet();
    navigate('/', { replace: true });
  };

  const displayAddress = useMemo(() => {
    if (!account) return null;
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  }, [account]);

  const walletLabel = (() => {
    if (!hasProvider) return 'Connect Wallet';
    if (isConnecting) return 'Connecting...';
    return displayAddress ?? 'Connect Wallet';
  })();

  const handleWalletClick = () => {
    if (!isConnecting) {
      connectWallet();
    }
  };

  const handlePreviewSubmit = () => {
    if (previewInput && previewInput.trim()) {
      setPreviewUser(previewInput);
      navigate('/dashboard');
    }
  };

  const handlePreviewInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePreviewSubmit();
    }
  };

  return (
    <>
      <div className="w-full p-5 h-[83px] bg-white dark:bg-[#00000E] border-b border-gray-200 dark:border-[#141429]">
        <div className="flex items-center justify-end lg:justify-between ">
          <div className='cursor-pointer max-xl:hidden' onClick={handleLogoClick}>
            <img src="/images/logo-light.png" alt="C-Parker" className="h-8 md:h-10 w-auto block dark:hidden" />
            <img src="/images/logo.png" alt="C-Parker" className="h-8 md:h-10 w-auto hidden dark:block" />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-[10px] ">
              <span className="text-gray-800 dark:text-white text-[20px] font-semibold ">
                Preview ID
              </span>
              <input
                type="text"
                placeholder={isPreviewMode ? `Viewing ID: ${previewUserId}` : "Enter ID"}
                value={previewInput}
                onChange={(e) => setPreviewInput(e.target.value)}
                onKeyPress={handlePreviewInputKeyPress}
                className="bg-gray-100 dark:bg-[#FFFFFF1A] px-[18px] py-3 rounded-[10px] text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-[#D9D9D94D] border border-gray-200 dark:border-[#141429]"
              />
              <button 
                onClick={handlePreviewSubmit}
                className="bg-[#150F3E] hover:bg-[#221A65] text-white keep-white text-[20px] font-bold rounded-[12px] px-5 py-2 transition-colors"
              >
                Go
              </button>
            </div>
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleWalletClick}
                className="bg-[#150F3E] hover:bg-[#221A65] text-white keep-white text-[16px] font-semibold rounded-[12px] px-4 py-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isConnecting}
              >
                {walletLabel}
              </button>
              {!hasProvider && (
                <span className="text-xs text-[#F04438]">
                  Wallet connection unavailable.
                </span>
              )}
              {error && hasProvider && (
                <span className="text-xs text-[#F04438] max-w-[220px] text-right">
                  {error.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
