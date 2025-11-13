import React, { useMemo, useState } from 'react';
import { useWallet } from '../../../context/WalletContext.jsx';
import { useUserData } from '../../../context/UserDataContext.jsx';
import { registerUserWithMetaMask } from '../../../services/registrationService.js';

const ProfileCard = () => {
  const { account } = useWallet();
  const { user, userStats, isLoading, error, refresh } = useUserData();
  const [copied, setCopied] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationMessage, setRegistrationMessage] = useState(null);

  const shortenedWallet = useMemo(() => {
    if (!account) return null;
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  }, [account]);

  const referLink = useMemo(() => {
    if (!user) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return origin ? `${origin}/register?ref=${user.userId}` : `ref:${user.userId}`;
  }, [user]);

  const registeredDate = useMemo(() => {
    if (!user?.registeredAt) return null;
    const date = new Date(user.registeredAt);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, [user]);

  const showRegistrationPrompt = useMemo(() => {
    if (user) return false;
    if (!error?.message) return false;
    return error.message.toLowerCase().includes('wallet not registered');
  }, [user, error]);

  const handleRegistration = async () => {
    setRegistrationError(null);
    setRegistrationMessage(null);
    setIsRegistering(true);
    try {
      const result = await registerUserWithMetaMask(1);
      setRegistrationMessage(result.message);
      await refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setRegistrationError(message);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCopy = async () => {
    if (!referLink) return;

    try {
      await navigator.clipboard.writeText(referLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = referLink;
      try {
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
      } catch (err) {
        console.error('Failed to copy referral link', err);
      } finally {
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }
    }
  };

  const renderStatus = () => {
    if (isLoading) {
      return (
        <p className="text-gray-600 dark:text-[#747474] text-center md:text-start">
          Syncing wallet data from C-Parker...
        </p>
      );
    }

    if (showRegistrationPrompt) {
      return (
        <div className="flex flex-col items-center md:items-start gap-3">
          <p className="text-gray-600 dark:text-[#747474] text-center md:text-start">
            Wallet detected but not registered yet. Complete the on-chain registration to unlock your dashboard.
          </p>
          <button
            type="button"
            onClick={handleRegistration}
            disabled={isRegistering}
            className="inline-flex items-center justify-center rounded-[10px] bg-[#6F23D5] px-5 py-2 text-white font-semibold transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
          >
            {isRegistering ? 'Registering...' : 'Register Now'}
          </button>
          {registrationError && (
            <span className="text-sm text-red-500 text-center md:text-start">
              {registrationError}
            </span>
          )}
          {registrationMessage && (
            <span className="text-sm text-emerald-500 text-center md:text-start">
              {registrationMessage}
            </span>
          )}
        </div>
      );
    }

    if (error) {
      return (
        <p className="text-red-500 text-center md:text-start">
          {error.message}
        </p>
      );
    }

    if (!user) {
      return (
        <p className="text-gray-600 dark:text-[#747474] text-center md:text-start">
          Connect your wallet to load your C-Parker profile.
        </p>
      );
    }

    return (
      <p className="text-gray-600 dark:text-[#747474] text-center md:text-start">
        Joined {registeredDate || '—'} • Referrer ID{' '}
        <span className="text-[#EE9C04] font-bold">
          {user.referrerId ?? 'N/A'}
        </span>
      </p>
    );
  };

  return (
  <>
    <div className="bg-white dark:bg-[#0B0B1A4D] w-full p-4 md:p-[30px] border-2 border-gray-200 dark:border-[#141429] rounded-[10px]">
      <div className="grid grid-col-1 lg:grid-cols-2 gap-5">
        {/* profile  */}
        <div className="flex flex-col md:flex-row gap-[28px] items-center">
          <div className="relative h-[150px] w-[150px] border-4 border-[#6F23D5] bg-gray-100 dark:bg-white rounded-full">
            <img src="images/profile.png" alt="" className="w-full h-full rounded-full object-cover" />
            <div className="rounded-full absolute bottom-0 right-2">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="33.9997" height="34" rx="16.9998" fill="#6F23D5" />
                <path
                  d="M21.1333 25H11.5333C10.1333 25 9 23.8666 9 22.4666V12.8666C9 11.4666 10.1333 10.3333 11.5333 10.3333H16.3333C16.7333 10.3333 17 10.6 17 11C17 11.4 16.7333 11.6666 16.3333 11.6666H11.5333C10.8667 11.6666 10.3333 12.2 10.3333 12.8666V22.4C10.3333 23.0666 10.8667 23.6 11.5333 23.6H21.0667C21.7333 23.6 22.2667 23.0666 22.2667 22.4V17.6666C22.2667 17.2666 22.5333 17 22.9333 17C23.3333 17 23.6 17.2666 23.6 17.6666V22.4666C23.6667 23.8666 22.5333 25 21.1333 25Z"
                  fill="white"
                />
                <path
                  d="M13 21.6667C12.8 21.6667 12.6667 21.6 12.5334 21.4667C12.4 21.3333 12.3334 21.0667 12.3334 20.8667L13 17.5333C13 17.4 13.0667 17.2667 13.2 17.2L21.2 9.2C21.4667 8.93333 21.8667 8.93333 22.1334 9.2L24.8 11.8667C25.0667 12.1333 25.0667 12.5333 24.8 12.8L16.8 20.8C16.7334 20.8667 16.6 20.9333 16.4667 21L13.1334 21.6667H13ZM14.2667 18L13.8667 20.1333L16 19.7333L23.4 12.3333L21.6667 10.6L14.2667 18Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-gray-800 dark:text-white text-[36px] text-center md:text-start font-extrabold mb-[10px]">
              {user ? `ID ${user.userId}` : 'No ID yet'}
            </h2>
            <div className="flex gap-[10px] items-center justify-center md:justify-start mb-[10px]">
              <span className="text-lg text-[#6F23D5] font-semibold">
                {shortenedWallet ?? 'No wallet connected'}
              </span>
            </div>

            {renderStatus()}

            {registrationMessage && user && (
              <p className="mt-2 text-sm text-emerald-500 text-center md:text-start">
                {registrationMessage}
              </p>
            )}
          </div>
        </div>

        <div className="w-full bg-gradient-to-r from-[#6F23D5] to-[#F3F4F6] dark:to-[#00000E] backdrop-blur-[30px] px-5 py-[18px] rounded-[10px]">
          <div className="w-full flex flex-col gap-[40px]">
            <div className="flex gap-[6px]">
              <span className="text-gray-800 dark:text-white text-[20px] font-semibold">
                Refer Link
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.4 9H6.6V5.4H5.4V9ZM6 0C2.685 0 0 2.685 0 6C0 9.315 2.685 12 6 12C9.315 12 12 9.315 12 6C12 2.685 9.315 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM5.4 4.2H6.6V3H5.4V4.2Z"
                  fill="#6F23D5"
                />
              </svg>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-[10px] w-full">
              <input
                type="text"
                value={referLink || 'Connect wallet to generate your invite link'}
                disabled
                className="bg-white dark:bg-[#00000066] text-[#0a0a0a] dark:text-[#4DD9E8] md:text-[20px] font-bold px-[18px] py-3 rounded-[10px] w-full overflow-x-scroll cursor-pointer border border-gray-200 dark:border-transparent shadow-sm disabled:cursor-not-allowed"
                onClick={referLink ? handleCopy : undefined}
                title={referLink ? 'Click to copy' : 'Referral link unavailable'}
              />
              <button
                onClick={handleCopy}
                className="w-full md:w-auto bg-white dark:bg-[#6F23D5] text-[#6F23D5] dark:text-white py-[11px] px-[26px] rounded-[12px] font-bold cursor-pointer hover:bg-gray-100 dark:hover:bg-[#5a1fb8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!referLink}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ProfileCard;
