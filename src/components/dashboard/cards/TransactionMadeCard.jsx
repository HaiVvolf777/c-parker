import React from 'react';

const TransactionMadeCard = () => {
  return (
    <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] p-[18px] mt-5 border-2 border-[#E5E7EB] dark:border-[#141429] ">
      <div>
        <p className="text-[#0a0a0a] dark:text-white text-lg  ">Transaction Made (CCT)</p>

        <div className="flex items-baseline-last gap-[6px] mt-[10px]">
          <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold ">16,875</span>

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

            <span className="text-[#65FFE3] text-sm ">124</span>
          </div>
        </div>
      </div>

      <hr className="text-[#E5E7EB] dark:text-[#141429] my-[10px]" />
      <div>
        <p className="text-[#0a0a0a] dark:text-white text-lg  ">Turnover (CCT)</p>

        <div className="flex items-baseline-last gap-[6px] mt-[10px]">
          <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold ">16,875</span>

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

            <span className="text-[#65FFE3] text-sm ">124</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionMadeCard;
