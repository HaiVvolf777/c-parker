import React from 'react';
import Sidebar from '../components/dashboard/layout/Sidebar';
import Navbar from '../components/dashboard/layout/Navbar';
import OrbitBWithLock from '../components/dashboard/orbit/OrbitBWithLock.jsx';
import TotalMembersCard from '../components/dashboard/cards/TotalMembersCard';
import EarningGraphCard from '../components/dashboard/orbit/EarningGraphCard';
import TotalEarningCard from '../components/dashboard/orbit/TotalEarningCard';
import useScrollAnimation from '../hooks/useScrollAnimation';
import withProgressGuard from '../components/dashboard/nodes/withProgressGuard.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const OrbitBLevelProgressionBase = () => {
  const [overviewRef, isOverviewVisible] = useScrollAnimation({ threshold: 0.1 });
  const [orbitRef, isOrbitVisible] = useScrollAnimation({ threshold: 0.1 });
  const [statsRef, isStatsVisible] = useScrollAnimation({ threshold: 0.1 });
  const { unlockedLevels, unlockNextLevel } = useProgress();
  const {
    account,
    isConnecting,
    hasProvider,
    connectWallet,
    error: walletError,
  } = useWallet();
  const currentLevel = Math.max(unlockedLevels?.orbitB ?? 1, 1);
  const nextLevel = Math.min(currentLevel + 1, 12);
  const isAtCap = currentLevel >= 12;

  const handleActionClick = () => {
    if (!hasProvider) {
      window.open('https://metamask.io/download.html', '_blank', 'noopener');
      return;
    }

    if (!account) {
      connectWallet();
      return;
    }

    if (!isAtCap) {
      unlockNextLevel('orbitB');
    }
  };

  const actionLabel = (() => {
    if (!hasProvider) return 'Install MetaMask';
    if (isConnecting) return 'Connecting...';
    if (!account) return 'Connect Wallet';
    if (isAtCap) return 'Max Level Reached';
    return `Unlock next (Lv ${nextLevel})`;
  })();

  const isActionDisabled = isConnecting || (account && isAtCap);

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
                  <span className="text-[#F0B90B] animate-pulse-slow">ID 1297</span> | {currentLevel} out of 12
                  levels
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={handleActionClick}
                  disabled={isActionDisabled}
                  className="text-white font-bold text-[24px] bg-[#6F23D5] hover:bg-[#5a1fb8] hover:scale-105 px-6 py-2 leading-[100%] rounded-[10px] cursor-pointer transition-all duration-300"
                >
                  {actionLabel}
                </button>
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
    </>
  );
};

const OrbitBLevelProgression = withProgressGuard(OrbitBLevelProgressionBase);

export default OrbitBLevelProgression;