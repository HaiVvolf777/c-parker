import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { registerUserWithWallet } from "../../services/registrationService";

const JoinNowModal = ({ isOpen, onClose }) => {
  const { account, provider } = useWallet();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [referrerId, setReferrerId] = useState('');

  // Auto-fill referrer ID from URL parameter on mount or when modal opens
  useEffect(() => {
    if (isOpen) {
      const refParam = searchParams.get('ref');
      if (refParam) {
        setReferrerId(refParam);
      } else {
        // Leave empty if no ref parameter (optional)
        setReferrerId('');
      }
    }
  }, [isOpen, searchParams]);

  const handleJoinNow = async () => {
    if (!account || !provider) {
      setError('Please connect your wallet first');
      return;
    }

    // Validate referrer ID (optional - only validate if provided)
    let referrerIdNum = 1; // Default to 1 if not provided
    if (referrerId.trim() !== '') {
      const parsed = parseInt(referrerId.trim(), 10);
      if (isNaN(parsed) || parsed < 1) {
        setError('Please enter a valid referrer ID (must be 1 or greater) or leave it empty');
        return;
      }
      referrerIdNum = parsed;
    }

    try {
      setIsRegistering(true);
      setError('');
      console.log('Registering with referrer ID:', referrerIdNum);
      const result = await registerUserWithWallet(provider, referrerIdNum);
      if (result.success) {
        console.log('Registration successful:', result);
        console.log('Registered with referrer ID:', referrerIdNum);
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

  if (!isOpen || typeof document === 'undefined') return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div 
        className="relative w-full max-w-md rounded-2xl border border-[#141429] bg-white dark:bg-[#0B0B1A] p-6 shadow-xl z-10" 
        onClick={(e) => e.stopPropagation()}
      >
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
          
          {/* Referrer ID Input Field */}
          <div className="mb-4">
            <label htmlFor="referrerId" className="block text-sm font-medium text-[#0a0a0a] dark:text-[#bdbdbd] mb-2">
              Referrer ID <span className="text-xs text-gray-500">(Optional - ID of user who invited you)</span>
            </label>
            <input
              id="referrerId"
              type="number"
              min="1"
              value={referrerId}
              onChange={(e) => setReferrerId(e.target.value)}
              placeholder="Enter referrer ID (optional - leave empty to use default)"
              className="w-full px-4 py-2 rounded-md border border-[#141429] bg-white dark:bg-[#0B0B1A] text-[#0a0a0a] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6F23D5] focus:border-transparent transition-colors"
            />
            {searchParams.get('ref') && (
              <p className="text-xs text-[#6F23D5] mt-1">
                ✓ Referrer ID auto-filled from your referral link
              </p>
            )}
            {!searchParams.get('ref') && referrerId.trim() === '' && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty to register without a referrer (will use default referrer ID: 1)
              </p>
            )}
          </div>
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

  return createPortal(modalContent, document.body);
};

export default JoinNowModal;

