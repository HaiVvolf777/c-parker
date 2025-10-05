import React from "react";

const Stats = ({ stats }) => {
  return (
    <div className="w-full py-[80px] md:py-[150px] ">
      <div className="container mx-auto px-6 md:px-[54px] py-10 bg-white dark:bg-[#0B0B1A4D] border-2 border-gray-200 dark:border-[#141429] rounded-[10px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 items-center justify-center ">
              <span className="text-[16px] md:text-[22px] font-semibold text-center  text-white ">{item.title}</span>
              <div className="relative">
                <span className="text-[28px] md:text-[45px] font-semibold text-center text-[#7D40FF] ">{item.value}</span>
                {item.isCCT && (
                  <span className="text-[16px] md:text-[26px] font-semibold text-center text-[#747474] absolute bottom-0  ">CCT</span>
                )}
              </div>
              <span className="text-[14px] md:text-[18px] font-semibold text-center text-[#747474] ">{item.subText}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;


