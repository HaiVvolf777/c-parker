import React from 'react';

const EarningGraphCard = () => {
  const statsGraphData = [
    {
      value: '30%',
    },
    {
      value: 80,
    },
    {
      value: 88,
    },
    {
      value: 45,
    },
    {
      value: 12,
    },
    {
      value: 66,
    },
    {
      value: 76,
    },
    {
      value: 23,
    },
    {
      value: 87,
    },
    {
      value: 12,
    },
  ];
  return (
    <div className="bg-[#191932] rounded-[10px] p-[18px] mt-5 ">
      <div>
        <p className="text-white">Total Earnings (CCT)</p>

        <div className="flex items-baseline-last gap-[6px] mt-[10px]">
          <span className="text-white text-[20px] font-bold ">8,920</span>

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
        <p className="text-white opacity-60 text-sm ">
          Compared to $21,490 last year
        </p>

        <div className="mt-5">
          <div className="flex gap-[10px]">
            {statsGraphData.map((item, index) => (
              <div key={index} className="relative h-[87px] w-[27px] ">
                <div className="w-[10px] mx-auto h-[100%] rounded-[100px] bg-[#05050F] z-1"></div>
                <div
                  className={`w-[100%] h-[40%] rounded-[100px] bg-[#FF04B4] z-10 absolute bottom-0`}
                ></div>
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningGraphCard;
