import React from 'react';
import Sidebar from '../components/dashboard/layout/Sidebar';
import Navbar from '../components/dashboard/layout/Navbar';
import Orbit from '../components/dashboard/Orbit';
import TotalMembersCard from '../components/dashboard/cards/TotalMembersCard';
import EarningGraphCard from '../components/dashboard/orbit/EarningGraphCard';
import TotalEarningCard from '../components/dashboard/orbit/TotalEarningCard';

const OrbitALevelProgression = () => {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#00000e] transition-colors">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="h-fit lg:min-h-screen py-8 px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
            {/* overview  */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-gray-800 dark:text-white text-[36px] font-bold">
                  Orbit A Level Progression
                </h2>
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

            {/* Orbit  */}
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-[75%]">
                <Orbit className="" />
              </div>
              <div className="w-full lg:w-[25%]">
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

export default OrbitALevelProgression;
