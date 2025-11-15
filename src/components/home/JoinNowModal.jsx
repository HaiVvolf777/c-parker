import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { registerUserWithWallet } from "../../services/registrationService";

const JoinNowModal = ({ isOpen, onClose }) => {
  const { account, provider } = useWallet();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleJoinNow = async () => {
    if (!account || !provider) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsRegistering(true);
      setError('');
      const result = await registerUserWithWallet(provider, 1);
      if (result.success) {
        console.log('Registration successful:', result);
        // Close modal and redirect to dashboard
        onClose();
        navigate('/dashboard');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-[#141429] bg-white dark:bg-[#0B0B1A] p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#0a0a0a] dark:text-white">Join Orbit</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#747474] hover:text-[#0a0a0a] dark:hover:text-white text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="mb-6">
          <p className="text-[#0a0a0a] dark:text-[#bdbdbd] mb-4">
            Welcome! To become a part of the Orbit community, you need to complete your registration and make the required payment.
          </p>
          <p className="text-sm text-[#0a0a0a] dark:text-[#bdbdbd] mb-4">
            Click "Join Now" below to proceed with registration and payment.
          </p>
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-[#141429] bg-white dark:bg-[#0B0B1A] text-[#0a0a0a] dark:text-white font-semibold py-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleJoinNow}
            disabled={isRegistering}
            className="flex-1 rounded-md bg-[#6F23D5] hover:bg-[#5a1fb8] text-white font-bold py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRegistering ? 'Processing...' : 'Join Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinNowModal;

