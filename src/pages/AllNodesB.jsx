import React from 'react';
import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';

const AllNodesB = () => {
  const allLevelData = [
    { id: 1, name: 'Lvl 1', earning: 20, users: 5, refresh: 1, opened: true },
    { id: 2, name: 'Lvl 2', earning: 40, users: 5, refresh: 1, opened: true },
    { id: 3, name: 'Lvl 3', earning: 80, users: 5, refresh: 1, opened: true },
    { id: 4, name: 'Lvl 4', earning: 160, users: 5, refresh: 1, opened: false },
    { id: 5, name: 'Lvl 5', earning: 320, users: 5, refresh: 1, opened: false },
    { id: 6, name: 'Lvl 6', earning: 640, users: 5, refresh: 1, opened: false },
  ];

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
                <h2 className="text-gray-800 dark:text-white text-[36px] font-bold">
                  Orbit B Level Progression
                </h2>
                <p className="text-gray-600 dark:text-[#747474] text-[20px] font-bold mt-[10px]">
                  <span className="text-[#01F1E3]">ID 1297</span> | 1 out of 12 levels
                </p>
              </div>
              <div className="">
                <button className="text-white font-bold text-[24px] bg-[#7D40FF] hover:bg-[#5a1fb8] px-6 py-2 leading-[100%] rounded-[10px] cursor-pointer transition-colors">
                  10 CCT
                </button>
              </div>
            </div>

            {/* All Levels  */}
            <div className="w-full mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {allLevelData.map((item) => (
                  <div
                    key={item.id}
                    className={`${
                      item.opened
                        ? 'bg-[#3A126F]' // slightly different tone for Orbit B
                        : 'bg-gray-100 dark:bg-[#D9D9D90D]'
                    } rounded-[10px] py-3 px-4 border border-gray-200 dark:border-[#141429]`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-gray-800 dark:text-white text-[20px] font-semibold">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-[10px]">
                        <img src="icons/orbit-icon.png" className="w-7 h-7" alt="" />
                        <p className="text-gray-800 dark:text-white text-[20px] font-semibold">
                          {item.earning}
                        </p>
                      </div>
                    </div>

                    {item.opened ? (
                      <>
                        <div className="mt-3">
                          <div className="flex items-center justify-center">
                            <img src="svgs/node.svg" alt="" />
                          </div>
                          <div className="flex gap-5 items-center">
                            {[1, 1].map((_, index) => (
                              <div key={index} className="flex items-center gap-[10px]">
                                <img src="icons/user-white.svg" alt="" />
                                <span className="text-white font-semibold">4</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mt-3 mb-14">
                          <div className="flex items-center justify-center">
                            <img src="icons/lock.svg" alt="" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllNodesB;


