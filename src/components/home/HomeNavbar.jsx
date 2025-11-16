import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../context/WalletContext.jsx";
import { getUserByWallet, ApiError } from "../../services/apiClient.js";
import JoinNowModal from "./JoinNowModal";

const HomeNavbar = () => {
  const navigate = useNavigate();
  const {
    account,
    isConnecting,
    hasProvider,
    connectWallet,
    disconnectWallet,
    error,
  } = useWallet();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);

  const displayAddress = useMemo(() => {
    if (!account) return null;
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  }, [account]);

  const walletLabel = (() => {
    if (!hasProvider) return "Connect Wallet";
    if (isConnecting || isCheckingUser) return "Connecting...";
    return displayAddress ?? "Connect Wallet";
  })();

  // Check user after wallet connection (only on home page)
  useEffect(() => {
    const checkUser = async () => {
      if (!account) return;
      // Only check if we're on the home page (not already on dashboard)
      if (window.location.pathname !== '/' && window.location.pathname !== '/home') {
        return;
      }

      try {
        setIsCheckingUser(true);
        await getUserByWallet(account);
        // User exists, redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          // User doesn't exist, show join modal
          setShowJoinModal(true);
        } else {
          console.error('Error checking user:', err);
        }
      } finally {
        setIsCheckingUser(false);
      }
    };

    checkUser();
  }, [account, navigate]);

  const handleWalletClick = async () => {
    if (!isConnecting) {
      await connectWallet();
    }
  };

  const handleLogoClick = async () => {
    await disconnectWallet();
    navigate('/', { replace: true });
  };

  return (
    <div className="container mx-auto bg-transparent min-h-[70px] p-3 flex flex-col gap-3 md:flex-row md:justify-between md:items-center border-2 border-[#21213C] rounded-xl backdrop-blur-[60px] mt-[20px] md:mt-[37px] relative z-[10]">
      <div className="flex items-center justify-between cursor-pointer" onClick={handleLogoClick}>
        <img src="images/logo-light.png" alt="C-Parker" className="h-8 md:h-10 w-auto block dark:hidden" />
        <img src="images/logo.png" alt="C-Parker" className="h-8 md:h-10 w-auto hidden dark:block" />
      </div>
      <div className="w-full md:w-[496px] rounded-[10px] p-3 bg-white dark:bg-[#00000666]">
        <div className="flex items-center gap-[10px] overflow-hidden">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.7205 19.3706L15.3032 13.9533C16.5221 12.4321 17.1849 10.5402 17.1818 8.59089C17.1818 3.84633 13.3357 0 8.59089 0C3.84633 0 0 3.84633 0 8.59089C0 13.3355 3.84633 17.1818 8.59089 17.1818C10.6193 17.1818 12.4835 16.4788 13.9533 15.303L19.3706 20.7203C19.4591 20.8091 19.5643 20.8795 19.6801 20.9275C19.7959 20.9755 19.9201 21.0001 20.0454 21C20.2342 21 20.4187 20.944 20.5757 20.8391C20.7327 20.7343 20.855 20.5852 20.9273 20.4108C20.9996 20.2364 21.0185 20.0445 20.9817 19.8593C20.9449 19.6742 20.854 19.5041 20.7205 19.3706ZM8.59089 15.2727C4.90063 15.2727 1.90909 12.2812 1.90909 8.59089C1.90909 4.90063 4.90063 1.90909 8.59089 1.90909C12.2814 1.90909 15.2727 4.90063 15.2727 8.59089C15.2727 12.2812 12.2814 15.2727 8.59089 15.2727Z" fill="#747474"/>
          </svg>
          <input type="text" placeholder="Enter ID to check status" className="placeholder-gray-400 dark:placeholder-white text-gray-800 dark:text-[#D9D9D94D] bg-transparent outline-none w-full min-w-0" />
        </div>
      </div>
      <div className="flex flex-col items-end justify-end gap-1">
        <button
          className="relative rounded-xl p-[1px] w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleWalletClick}
          disabled={isConnecting}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
          <div className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-6 md:px-10 py-2 text-[16px] md:text-[20px] text-white keep-white font-bold text-center">
            {walletLabel}
          </div>
        </button>
        {!hasProvider && (
          <span className="text-xs text-[#F04438]">
            Wallet connection unavailable.
          </span>
        )}
        {error && hasProvider && (
          <span className="text-xs text-[#F04438] text-right max-w-[220px]">
            {error.message}
          </span>
        )}
      </div>
      <JoinNowModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />
    </div>
  );
};

export default HomeNavbar;


