import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';
import ActivityTableContainer from '../components/dashboard/platform-activity/ActivityTableContainer';
import SliderLevelNode from '../components/dashboard/nodes/SliderLevelNode';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useUserData } from '../context/UserDataContext';
import { getLevelCycles } from '../services/apiClient';

import { useProgress } from '../context/ProgressContext';
import { useNavigate } from 'react-router-dom';

const NodeLevelProgression = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserData();
  const { unlockedLevels } = useProgress();

  // Initialize level from location state or default to 1
  const [currentLevel, setCurrentLevel] = useState(location.state?.level || 1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [cycles, setCycles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userId = user?.userId;
  const isLocked = currentLevel > (unlockedLevels?.orbitA || 0);

  useEffect(() => {
    const fetchCycles = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const data = await getLevelCycles(userId, 'ORBIT_A', currentLevel);
        console.log('Fetched cycle data:', data);
        console.log('Cycles array:', data.cycles);
        setCycles(data.cycles || []);
        // Reset to first cycle when level changes
        setSlideIndex(0);
      } catch (error) {
        console.error("Failed to fetch cycles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCycles();
  }, [userId, currentLevel]);

  const prevLevel = () => setCurrentLevel((prev) => Math.max(1, prev - 1));
  const nextLevel = () => setCurrentLevel((prev) => Math.min(10, prev + 1));

  // Scroll animation hooks
  const [overviewRef, isOverviewVisible] = useScrollAnimation({ threshold: 0.1 });
  const [carouselRef, isCarouselVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activityRef, isActivityVisible] = useScrollAnimation({ threshold: 0.1 });

  const currentCycle = cycles[slideIndex] || {};
  console.log('Current cycle data being passed to SliderLevelNode:', currentCycle);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#00000e] transition-colors">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="min-h-screen py-8 px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
            {/* overview  */}
            <div
              ref={overviewRef}
              className={`flex items-start justify-between animate-fade-in-up ${isOverviewVisible ? 'animate' : ''}`}
            >
              <div>
                <p className="text-gray-600 dark:text-[#747474] text-[20px] font-bold mt-[10px]">
                  <span className="text-[#F0B90B] animate-pulse-slow">ID {userId}</span> | {currentLevel} out of 10
                  levels
                </p>
              </div>
            </div>

            {/* Level Carousal  */}
            <div
              ref={carouselRef}
              className={`w-full mt-5 relative z-[1000] animate-fade-in-up ${isCarouselVisible ? 'animate' : ''}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-full xl:w-[80%] mx-auto mb-12 overflow-visible">
                <div className="flex items-center justify-between gap-4 md:gap-8 lg:gap-12">
                  {/* controller left  */}
                  <div className="w-[15%] sm:w-[10%] lg:w-[7%]">
                    <button
                      onClick={prevLevel}
                      disabled={currentLevel <= 1}
                      type="button"
                      aria-label="Previous Level"
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-100 dark:bg-[#0B0B1A4D] border-2 border-gray-200 dark:border-[#141429] flex items-center justify-center p-2 sm:p-3 lg:p-4 transition-all duration-300 text-gray-800 dark:text-white touch-manipulation ${currentLevel <= 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-200 dark:hover:bg-[#1a1a2e] hover:scale-110 cursor-pointer'
                        }`}>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Slides container  */}
                  <div className="w-[70%] sm:w-[80%] lg:w-[86%] relative">
                    <div className="flex items-center gap-5 lg:gap-8 overflow-hidden">
                      {/* slide  */}
                      <div className="w-full bg-gradient-to-r from-[#4B158E] to-[#150628] rounded-[10px] p-4 md:p-7">
                        <div className="flex flex-col gap-0">
                          <div className="flex justify-between">
                            <div className="">
                              <p className="text-[#0a0a0a] dark:text-white text-[20px] lg:text-[30px] font-semibold ">
                                Lvl {currentLevel}
                              </p>
                              <p className="text-[#6B7280] dark:text-white text-sm font-semibold ">
                                ID {userId}
                              </p>
                            </div>
                          </div>

                          <div className="w-full overflow-hidden relative">
                            <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                              <SliderLevelNode className="w-full" stage={slideIndex} cycleData={currentCycle} showLocked={true} level={currentLevel} userId={userId} />
                            </div>
                            {isLocked && (
                              <div
                                onClick={() => navigate('/dashboard/orbit-level-progression')}
                                className="absolute inset-0 z-10 bg-black/60 flex items-center justify-center cursor-pointer backdrop-blur-sm rounded-[10px] hover:bg-black/70 transition-colors"
                              >
                                <span className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-6 md:px-10 py-2 text-[14px] md:text-[20px] text-white keep-white font-bold text-center transition-transform duration-300 hover:scale-105">
                                  Activate level first
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-[20px]">
                          {[
                            { icon: '/svgs/two.svg', text: `${currentCycle.positionsFilled || 0}/${currentCycle.maxPositions || 4}` },
                            { icon: '/svgs/recycle.svg', text: `${currentCycle.cycleNumber || 1}` },
                            { icon: '/svgs/layer.svg', text: `${currentCycle.totalEarnings || 0} CCT` }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 sm:gap-[10px]">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 dark:bg-[#0B0B1A4D] dark:border-[#141429] flex items-center justify-center">
                                <img src={item.icon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <span className="text-white keep-white font-semibold text-sm sm:text-base">
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* <div className="hidden lg:block relative w-[10%] h-full bg-gradient-to-r from-[#4B158E] to-[#150628] rounded-[10px] p-7"></div> */}
                    </div>
                  </div>

                  {/* controller right  */}
                  <div className="w-[15%] sm:w-[10%] lg:w-[7%]">
                    <button
                      onClick={nextLevel}
                      disabled={currentLevel >= 10}
                      type="button"
                      aria-label="Next Level"
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-100 dark:bg-[#0B0B1A4D] border-2 border-gray-200 dark:border-[#141429] flex items-center justify-center p-2 sm:p-3 lg:p-4 transition-all duration-300 text-gray-800 dark:text-white touch-manipulation ${currentLevel >= 10
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-200 dark:hover:bg-[#1a1a2e] hover:scale-110 cursor-pointer'
                        }`}>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* controller bar  */}
                <div className="w-[70%] sm:w-[80%] lg:w-[86%] mx-auto relative z-50">
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full mt-6 md:mt-8 bg-gray-100 dark:bg-[#D9D9D90D] rounded-[10px] px-6 md:px-11 py-3 md:py-4 border border-gray-200 dark:border-[#141429] relative cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center justify-between text-gray-800 dark:text-white text-sm md:text-base font-medium">
                      <span>Cycle: {(currentCycle.cycleNumber || slideIndex + 1)}</span>
                      <svg
                        className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-[100]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen(false);
                          }}
                        />
                        <div
                          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0B0B1A] border border-gray-200 dark:border-[#141429] rounded-[10px] shadow-lg z-[101] max-h-60 overflow-y-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {cycles.length > 0 ? (
                            cycles.map((cycle, index) => (
                              <button
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSlideIndex(index);
                                  setIsDropdownOpen(false);
                                }}
                                type="button"
                                className={`w-full text-left px-4 py-3 text-sm md:text-base font-medium transition-colors ${slideIndex === index
                                  ? 'bg-gray-100 dark:bg-[#1a1a2e] text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#141429]'
                                  }`}
                              >
                                Cycle: {cycle.cycleNumber || index + 1}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm md:text-base text-gray-500 dark:text-gray-400">
                              No cycles available
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Activity  */}
            <div
              ref={activityRef}
              className={`animate-fade-in-up relative z-0 ${isActivityVisible ? 'animate' : ''}`}
              style={{ transitionDelay: '400ms' }}
            >
              <h2 className="text-gray-800 dark:text-white text-[30px] font-bold mb-5">
                Platform Activity
              </h2>
              <div className="overflow-x-scroll">
                <ActivityTableContainer className="!mt-0" isDashboard={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NodeLevelProgression;
