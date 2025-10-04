import React from 'react';
import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';
import ActivityTableContainer from '../components/dashboard/platform-activity/ActivityTableContainer';
import SliderLevelNode from '../components/dashboard/nodes/SliderLevelNode';

const NodeLevelProgression = () => {
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
                  <div className="hidden lg:block w-[7%]">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#0B0B1A4D] border-2 border-gray-200 dark:border-[#141429] flex items-center justify-center p-4 hover:bg-gray-200 dark:hover:bg-[#1a1a2e] transition-colors cursor-pointer">
                      <img src="icons/arrow-left.svg" alt="" />
                    </div>
                  </div>

                  {/* Slides container  */}
                  <div className="w-full lg:w-[86%] relative">
                    <div className="flex items-center gap-5 lg:gap-8 overflow-hidden">
                      {/* slide  */}
                      <div className="w-full lg:w-[90%] bg-gradient-to-r from-[#4B158E] to-[#150628] rounded-[10px] p-7">
                        <div className="flex flex-col gap-0">
                          <div className="flex justify-between">
                            <div className="">
                              <p className="text-white text-[20px] lg:text-[30px] font-semibold ">
                                Lvl 1
                              </p>
                              <p className="text-white text-sm font-semibold ">
                                ID 1297
                              </p>
                            </div>

                            <div>
                              <button className="bg-[#FFFFFF33] text-white font-bold rounded-[10px] px-5 py-2  ">
                                Active
                              </button>
                            </div>
                          </div>

                          <div className="">
                            <SliderLevelNode className="w-full" />
                          </div>
                        </div>
                        <div className="flex gap-[20px]">
                          {[1, 1, 1].map((item, index) => (
                            <div className="flex items-center gap-[10px]">
                              <img src="icons/users.svg" alt="" />
                              <span className="text-white font-semibold">
                                4
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="hidden lg:block relative w-[10%] h-full bg-gradient-to-r from-[#4B158E] to-[#150628] rounded-[10px] p-7"></div>
                    </div>
                  </div>

                  {/* controller right  */}
                  <div className="hidden lg:block w-[7%]">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#0B0B1A4D] border-2 border-gray-200 dark:border-[#141429] flex items-center justify-center p-4 hover:bg-gray-200 dark:hover:bg-[#1a1a2e] transition-colors cursor-pointer">
                      <img src="icons/arrow-right.svg" alt="" />
                    </div>
                  </div>
                </div>

                {/* controller bar  */}
                <div className="w-full lg:w-[80%] mx-auto">
                  <div className="w-full lg:w-[85%] mx-auto">
                    <div className="w-full mt-8 bg-gray-100 dark:bg-[#D9D9D90D] rounded-[10px] px-11 py-4 border border-gray-200 dark:border-[#141429]">
                      <div className="flex items-center justify-between">
                        <img src="icons/arrow-left.svg" alt="" className="cursor-pointer hover:opacity-70 transition-opacity" />
                        <span className="text-gray-800 dark:text-white">Cycle: 1</span>
                        <img src="icons/arrow-right.svg" alt="" className="cursor-pointer hover:opacity-70 transition-opacity" />
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
