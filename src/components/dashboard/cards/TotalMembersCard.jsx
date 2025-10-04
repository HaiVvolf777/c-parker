import React from 'react';

const TotalMembersCard = () => {
  return (
    <div className="bg-[#7D40FF] rounded-[10px] p-[18px] ">
      <p className="text-white text-lg font-semibold ">Members Total</p>
      <div className="flex items-baseline-last gap-[6px] mt-[10px]">
        <span className="text-white text-[34px] font-extrabold ">
          7,541,390
        </span>

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
  );
};

export default TotalMembersCard;
