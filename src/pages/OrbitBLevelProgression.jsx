import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/layout/Sidebar';
import Navbar from '../components/dashboard/layout/Navbar';
import OrbitBWithLock from '../components/dashboard/orbit/OrbitBWithLock.jsx';
import TotalMembersCard from '../components/dashboard/cards/TotalMembersCard';
import EarningGraphCard from '../components/dashboard/orbit/EarningGraphCard';
import TotalEarningCard from '../components/dashboard/orbit/TotalEarningCard';
import MessageModal from '../components/common/MessageModal.jsx';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useUserData } from '../context/UserDataContext.jsx';
import { useWallet } from '../context/WalletContext.jsx';
import { getUserLevels, ApiError } from '../services/apiClient.js';

const OrbitBLevelProgression = () => {
  const [overviewRef, isOverviewVisible] = useScrollAnimation({ threshold: 0.1 });
  const [orbitRef, isOrbitVisible] = useScrollAnimation({ threshold: 0.1 });
  const [statsRef, isStatsVisible] = useScrollAnimation({ threshold: 0.1 });
  const { user } = useUserData();
  const {
    hasProvider,
    error: walletError,
  } = useWallet();
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        const data = await getUserLevels(user.userId, { orbit: 'ORBIT_B' });
        // Strictly filter to only ORBIT_B levels to prevent cross-orbit contamination
        const orbitBLevels = (data || []).filter(level => level.orbit === 'ORBIT_B');
        setLevels(orbitBLevels);
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

  // Strictly filter to only ORBIT_B levels
  const orbitBLevels = levels.filter(level => level.orbit === 'ORBIT_B');
  
  // Get the highest active level number (only from ORBIT_B)
  const maxActiveLevel = orbitBLevels
    .filter(level => level.isActive)
    .reduce((max, level) => Math.max(max, level.levelNumber || 0), 0);

  const currentLevel = maxActiveLevel || 0;

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#00000e] transition-colors">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="h-fit lg:min-h-screen py-8 px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
            {/* overview  */}
            <div ref={overviewRef} className={`flex items-start justify-between animate-fade-in-up ${isOverviewVisible ? 'animate' : ''}`}>
              <div>
                <h2 className="text-gray-800 dark:text-white text-[36px] font-bold">
                  Orbit B Level Progression
                </h2>
                <p className="text-gray-600 dark:text-[#747474] text-[20px] font-bold mt-[10px]">
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span className="text-[#F0B90B] animate-pulse-slow">ID {user?.userId || 'N/A'}</span> | {currentLevel} out of 10
                      levels
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {!hasProvider && (
                  <span className="text-sm text-[#F04438]">
                    MetaMask is required to manage orbit levels.
                  </span>
                )}
                {walletError && hasProvider && (
                  <span className="text-sm text-[#F04438]">
                    {walletError.message}
                  </span>
                )}
              </div>
            </div>

            {/* Orbit B  */}
            <div className="flex flex-col lg:flex-row">
              <div ref={orbitRef} className={`w-full lg:w-[75%] animate-fade-in-up ${isOrbitVisible ? 'animate' : ''}`} style={{ transitionDelay: '200ms' }}>
                <OrbitBWithLock className="" />
              </div>
              <div ref={statsRef} className={`w-full lg:w-[25%] animate-fade-in-up ${isStatsVisible ? 'animate' : ''}`} style={{ transitionDelay: '400ms' }}>
                <h2 className="text-gray-800 dark:text-white text-[30px] font-bold mb-5">
                  General statistics
                </h2>
                <TotalMembersCard />
                <TotalEarningCard />
                <EarningGraphCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MessageModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        type={modalState.type}
        message={modalState.message}
      />
    </>
  );
};

export default OrbitBLevelProgression;