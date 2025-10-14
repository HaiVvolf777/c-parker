import React, { useState } from 'react';
import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';
import ActivityTableContainer from '../components/dashboard/platform-activity/ActivityTableContainer';
import SliderLevelNode from '../components/dashboard/nodes/SliderLevelNode';

const NodeLevelProgression = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const prevSlide = () => setSlideIndex((i) => (i + 2) % 3);
  const nextSlide = () => setSlideIndex((i) => (i + 1) % 3);
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#00000e] transition-colors">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="min-h-screen py-8 px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
            {/* overview  */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 dark:text-[#747474] text-[20px] font-bold mt-[10px]">
                  <span className="text-[#F0B90B]">ID 1297</span> | 1 out of 12
                  levels
                </p>
              </div>
              <div className="">
                <button className="text-white font-bold text-[24px] bg-[#6F23D5] hover:bg-[#5a1fb8] px-6 py-2 leading-[100%] rounded-[10px] cursor-pointer transition-colors">
                  10 CCT
                </button>
              </div>
            </div>

            {/* Level Carousal  */}
            <div className="w-full mt-5">
              <div className="w-full xl:w-[80%] mx-auto">
                <div className="flex items-center justify-between gap-12 ">
                  {/* controller left  */}
                  <div className="w-[7%]">
                    <button onClick={prevSlide} type="button" aria-label="Previous"
                      className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#0B0B1A4D] border-2 border-gray-200 dark:border-[#141429] flex items-center justify-center p-4 hover:bg-gray-200 dark:hover:bg-[#1a1a2e] transition-colors cursor-pointer text-gray-800 dark:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Slides container  */}
                  <div className="w-full lg:w-[86%] relative">
                    <div className="flex items-center gap-5 lg:gap-8 overflow-hidden">
                      {/* slide  */}
                      <div className="w-full lg:w-[90%] bg-gradient-to-r from-[#4B158E] to-[#150628] rounded-[10px] p-7">
                        <div className="flex flex-col gap-0">
                          <div className="flex justify-between">
                            <div className="">
                              <p className="text-[#0a0a0a] dark:text-white text-[20px] lg:text-[30px] font-semibold ">
                                Lvl 1
                              </p>
                              <p className="text-[#6B7280] dark:text-white text-sm font-semibold ">
                                ID 1297
                              </p>
                            </div>

                            <div>
                              <button className="bg-[#FFFFFF33] text-white keep-white font-bold rounded-[10px] px-5 py-2  ">
                                Active
                              </button>
                            </div>
                          </div>

                           <div className="">
                             <SliderLevelNode className="w-full" stage={slideIndex} />
                           </div>
                        </div>
                        <div className="flex gap-[20px]">
                          {[
                            { icon: '/svgs/two.svg', text: '4' },
                            { icon: '/svgs/recycle.svg', text: '1' },
                            { icon: '/svgs/layer.svg', text: '5 CCT' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-[10px]">
                              <div className="w-10 h-10 rounded-full border-2 dark:bg-[#0B0B1A4D] dark:border-[#141429] flex items-center justify-center">
                                <img src={item.icon} alt="" className="w-5 h-5" />
                              </div>
                              <span className="text-white keep-white font-semibold">
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="hidden lg:block relative w-[10%] h-full bg-gradient-to-r from-[#4B158E] to-[#150628] rounded-[10px] p-7"></div>
                    </div>
                  </div>

                  {/* controller right  */}
                  <div className="w-[7%]">
                    <button onClick={nextSlide} type="button" aria-label="Next"
                      className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#0B0B1A4D] border-2 border-gray-200 dark:border-[#141429] flex items-center justify-center p-4 hover:bg-gray-200 dark:hover:bg-[#1a1a2e] transition-colors cursor-pointer text-gray-800 dark:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* controller bar  */}
                <div className="w-full lg:w-[80%] mx-auto">
                  <div className="w-full lg:w-[85%] mx-auto">
                      <div className="w-full mt-8 bg-gray-100 dark:bg-[#D9D9D90D] rounded-[10px] px-11 py-4 border border-gray-200 dark:border-[#141429]">
                      <div className="flex items-center justify-between text-gray-800 dark:text-white">
                        <button onClick={prevSlide} type="button" aria-label="Previous" className="hover:opacity-80">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <span>Cycle: {slideIndex + 1}</span>
                        <button onClick={nextSlide} type="button" aria-label="Next" className="hover:opacity-80">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Activity  */}
            <div className="">
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
