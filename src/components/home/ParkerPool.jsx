import React from "react";

const ParkerPool = () => {
  return (
    <div className="mt-[100px] md:mt-[150px] relative">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img src="/images/Bubble-2.png" alt="" className="hidden sm:block absolute w-[200px] md:w-[300px] -top-10 left-[10%] opacity-20 dark:opacity-60" />
        <img src="/images/Bubble-2.png" alt="" className="hidden sm:block absolute w-[160px] md:w-[220px] top-[5%] right-[12%] opacity-15 dark:opacity-50" />
        <img src="/images/Bubble-2.png" alt="" className="hidden sm:block absolute w-[180px] md:w-[240px] bottom-[8%] left-[18%] opacity-15 dark:opacity-40" />
        <img src="/images/Bubble-3.png" alt="" className="hidden sm:block absolute w-[200px] md:w-[260px] bottom-[6%] right-[20%] opacity-15 dark:opacity-45" />
        <img src="/images/Bubble-5.png" alt="" className="hidden sm:block absolute w-[120px] md:w-[180px] top-[38%] left-[48%] -translate-x-1/2 opacity-10 dark:opacity-35" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className=" w-full md:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto border-2 border-gray-200 dark:border-[#141429] rounded-[10px] bg-white dark:bg-[#0B0B1A4D] backdrop-blur-[100px] px-[24px] md:px-[100px] py-[40px] md:py-[54px] relative overflow-hidden">
          <h2 className="text-white font-bold text-[28px] md:text-[40px] text-center">The Parker Pool</h2>
          <p className="text-white text-[16px] md:text-[26px] mt-5 text-center">Already <span className="text-[#7D40FF]">4,405,726</span> Carbon Credit Tokens pooled in — growing every second.</p>
          <div className="relative flex justify-center items-center mt-8">
            <img src="svgs/parker-pool.svg" alt="Parker Pool" className="w-full max-w-[400px] h-auto" />
            <span className="absolute text-[20px] md:text-[30px] text-white keep-white font-bold text-center top-1/4 left-1/2 -translate-x-1/2 translate-y-[80px]">4,405,726</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative inline-flex rounded[12px] text-white text-center p-[1px] mt-8 mx-auto">
              <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
              <div className="relative rounded-[12px] bg-[#00000e] px-[24px] md:px-[48px] py-[13px] text-[14px] md:text-[16px] text-white keep-white">View Pool on Explorer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkerPool;


