import React, { useEffect, useMemo, useState } from 'react';
import { useWallet } from '../../../context/WalletContext.jsx';
import { useUserData } from '../../../context/UserDataContext.jsx';

const ProfileCard = () => {
  const { account } = useWallet();
  const {
    user,
    isLoading,
    isRegistering,
    error,
    registrationMessage,
    refresh,
    acknowledgeRegistration,
  } = useUserData();
  const [copied, setCopied] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [modalState, setModalState] = useState('hidden');

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

  useEffect(() => {
    const registrationError =
      !user &&
      typeof error?.message === 'string' &&
      error.message.toLowerCase().includes('register');

    if (isRegistering) {
      setModalState('registering');
      return;
    }

    if (registrationMessage) {
      setModalState('success');
      return;
    }

    if (registrationError) {
      setModalState('error');
      return;
    }

    setModalState((prev) => (prev === 'hidden' ? prev : 'hidden'));
  }, [isRegistering, registrationMessage, error, user]);

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

  const handleCopyAddress = async () => {
    if (!account) return;

    try {
      await navigator.clipboard.writeText(account);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
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
        invited {registeredDate || '—'} by{' '}
        <span className="text-[#EE9C04] font-bold">
          ID {user.referrerId ?? 'N/A'}
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
          <div className="relative h-[150px] w-[150px]">
            <div className="h-full w-full border-4 border-[#6F23D5] bg-gradient-to-br from-purple-400 to-purple-600 rounded-full overflow-hidden flex items-center justify-center">
              <img src="/images/3d-illustration-human-avatar-profile.png" alt="Profile Avatar" className="w-full h-full object-cover" />
            </div>
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
              {account && (
                <button
                  onClick={handleCopyAddress}
                  className="text-white keep-white hover:text-gray-200 transition-colors p-1 relative"
                  title={copiedAddress ? "Copied!" : "Copy full address"}
                >
                  {copiedAddress ? (
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              )}
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
                  fill="white"
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
    {modalState !== 'hidden' && (
      <RegistrationModal
        state={modalState}
        message={registrationMessage}
        errorMessage={error?.message ?? ''}
        onClose={() => {
          acknowledgeRegistration();
          setModalState('hidden');
        }}
        onRetry={() => {
          acknowledgeRegistration();
          refresh();
        }}
      />
    )}
  </>
  );
};

const RegistrationModal = ({ state, message, errorMessage, onClose, onRetry }) => {
  const isRegistering = state === 'registering';
  const isSuccess = state === 'success';
  const isError = state === 'error';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-[#141429] bg-white dark:bg-[#0B0B1A] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wallet Registration</h3>
          <button
            type="button"
            onClick={isRegistering ? undefined : onClose}
            className={`text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition ${
              isRegistering ? 'cursor-not-allowed opacity-50' : ''
            }`}
            aria-label="Close registration modal"
            disabled={isRegistering}
          >
            ×
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-[#bdbdbd]">
          {isRegistering && (
            <>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#6F23D5]/10">
                  <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#6F23D5] border-t-transparent" />
                </span>
                <p className="font-medium text-gray-900 dark:text-white">Registering your wallet on-chain</p>
              </div>
              <p>Please confirm the registration transaction in MetaMask. This process may take a few moments.</p>
            </>
          )}

          {isSuccess && (
            <>
              <p className="font-medium text-emerald-500">
                {message || 'Registration transaction confirmed. Your dashboard will refresh shortly.'}
              </p>
              <p>You can close this window once the dashboard updates with your latest data.</p>
            </>
          )}

          {isError && (
            <>
              <p className="font-medium text-red-500">{errorMessage || 'Registration failed. Please try again.'}</p>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {isError && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-lg border border-transparent bg-[#6F23D5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5a1fb8]"
            >
              Try Again
            </button>
          )}
          {!isRegistering && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 dark:border-[#141429] px-4 py-2 text-sm font-semibold text-gray-700 dark:text-white transition hover:bg-gray-100 dark:hover:bg-[#1a1a2e]"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
