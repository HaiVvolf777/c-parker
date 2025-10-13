import React from 'react';

const TotalEarningCard = () => {
  return (
    <div className="bg-white/60 dark:bg-[#191932] border-2 border-[#E5E7EB] dark:border-[#141429] rounded-[10px] p-[18px] mt-5 ">
      <div>
        <p className="text-[#0a0a0a] dark:text-white text-lg font-semibold ">
          Total Earnings (CCT)
        </p>

        <div className="flex items-baseline-last gap-[6px] mt-[10px]">
          <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold ">8,920</span>

          <div className="flex">
            <svg
              width="14"
              height="25"
              viewBox="0 0 14 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00004 9.09766L13 17.0977H1L7.00004 9.09766Z"
                fill="#65FFE3"
              />
            </svg>

            <span className="text-[#65FFE3] text-sm ">10%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalEarningCard;
