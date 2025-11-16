import React, { useEffect, useRef, useState } from 'react';
import { useUserData } from '../../../context/UserDataContext.jsx';
import { useWallet } from '../../../context/WalletContext.jsx';
import { getUserLevels, ApiError } from '../../../services/apiClient.js';
import { purchaseOrbitALevelWithWallet } from '../../../services/levelPurchaseService.js';
import MessageModal from '../../common/MessageModal.jsx';
import Orbit from '../Orbit';

const OrbitWithLock = ({ className }) => {
  const { user } = useUserData();
  const { provider } = useWallet();
  const containerRef = useRef(null);
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, type: 'success', message: '' });

  // Fetch levels from API
  useEffect(() => {
    const fetchLevels = async () => {
      if (!user?.userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getUserLevels(user.userId, { orbit: 'ORBIT_A' });
        // Strictly filter to only ORBIT_A levels to prevent cross-orbit contamination
        const orbitALevels = (data || []).filter(level => level.orbit === 'ORBIT_A');
        setLevels(orbitALevels);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setLevels([]);
        } else {
          console.error('Error fetching levels:', err);
          setLevels([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, [user?.userId]);

  // Strictly filter to only ORBIT_A levels
  const orbitALevels = levels.filter(level => level.orbit === 'ORBIT_A');
  
  // Check if user has any active levels (only ORBIT_A)
  const hasActiveLevels = orbitALevels.some(level => level.isActive);
  
  // Get the highest active level number (only from ORBIT_A)
  const maxActiveLevel = orbitALevels
    .filter(level => level.isActive)
    .reduce((max, level) => Math.max(max, level.levelNumber || 0), 0);

  // Update circle opacity based on active levels
  useEffect(() => {
    const svg = containerRef.current?.querySelector('svg');
    if (!svg) return;
    
    const circles = Array.from(svg.querySelectorAll('circle[r="50"]'));
    
    if (!hasActiveLevels) {
      // If no active levels, make all circles dim
      circles.forEach((circle) => {
        circle.style.opacity = '0.25';
      });
      return;
    }

    // Show levels up to maxActiveLevel
    circles.forEach((circle, index) => {
      const pairIndex = Math.floor(index / 2);
      // Level numbers are 1-indexed, so pairIndex 0 = level 1, pairIndex 1 = level 2, etc.
      const levelNumber = pairIndex + 1;
      const isUnlocked = levelNumber <= maxActiveLevel;
      circle.style.opacity = isUnlocked ? '1' : '0.25';
    });
  }, [hasActiveLevels, maxActiveLevel, orbitALevels]);

  return (
    <div ref={containerRef} className={`relative ${className || ''}`}>
      <Orbit className="w-full h-auto" unlockedLevels={maxActiveLevel || 1} />
      {!isLoading && !hasActiveLevels && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center rounded-[10px] px-6 text-center text-white">
          <div className="flex flex-col items-center gap-4 max-w-xs">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="font-semibold">Purchase to unlock</span>
            </div>
            <span className="text-sm text-white/80">Please complete your purchase to access level progression.</span>
          </div>
        </div>
      )}
      {!isLoading && hasActiveLevels && (
        <div className="absolute bottom-6 right-6">
          <button
            type="button"
            onClick={async () => {
              if (!provider) {
                setModalState({ isOpen: true, type: 'error', message: 'Please connect your wallet first' });
                return;
              }
              
              const nextLevel = Math.min(maxActiveLevel + 1, 10);
              if (nextLevel > 10) {
                setModalState({ isOpen: true, type: 'error', message: 'Maximum level is 10' });
                return;
              }

              try {
                setIsProcessing(true);
                const result = await purchaseOrbitALevelWithWallet(provider, nextLevel);
                if (result.success) {
                  // Refresh only ORBIT_A levels
                  const data = await getUserLevels(user.userId, { orbit: 'ORBIT_A' });
                  const orbitALevels = (data || []).filter(level => level.orbit === 'ORBIT_A');
                  setLevels(orbitALevels);
                  setModalState({ isOpen: true, type: 'success', message: result.message || 'Level purchased successfully!' });
                } else {
                  setModalState({ isOpen: true, type: 'error', message: result.message || 'Failed to purchase level' });
                }
              } catch (err) {
                console.error('Purchase error:', err);
                setModalState({ isOpen: true, type: 'error', message: err.message || 'Failed to purchase level. Please try again.' });
              } finally {
                setIsProcessing(false);
              }
            }}
            disabled={isProcessing}
            className="rounded-full bg-[#6F23D5] hover:bg-[#5a1fb8] text-white text-sm font-semibold px-5 py-2 shadow-lg shadow-[#6F23D5]/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Unlock Next Level'}
          </button>
        </div>
      )}
      <MessageModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        type={modalState.type}
        message={modalState.message}
      />
    </div>
  );
};

export default OrbitWithLock;


