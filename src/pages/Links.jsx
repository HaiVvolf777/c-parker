import React from 'react';
import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';

const Links = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen py-8 p-5 md:px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
          <div className="mb-6">
            <h1 className="text-[#0a0a0a] dark:text-white text-[28px] md:text-[36px] font-bold">
              Links
            </h1>
            <p className="text-[#6B7280] dark:text-white/60 text-sm mt-2">
              Useful links and resources
            </p>
          </div>

          <div className="bg-white/60 dark:bg-[#191932] border-2 border-[#E5E7EB] dark:border-[#141429] rounded-[10px] p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#0a0a0a] dark:text-white mb-4">
                  Coming Soon
                </h2>
                <p className="text-[#6B7280] dark:text-white/60">
                  This section is under development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;

