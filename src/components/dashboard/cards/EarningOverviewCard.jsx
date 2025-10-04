import React from 'react';

const EarningOverviewCard = ({ className }) => {
  const rulesData = [
    {
      id: 1,
      title: 'Top 300 Leaders',
      icon: 'icons/rules/crown.svg',
      total: 2,
    },
    {
      id: 2,
      title: 'Top 300 Leaders',
      icon: 'icons/rules/crown.svg',
      total: 2,
    },
    {
      id: 3,
      title: 'Top 300 Leaders',
      icon: 'icons/rules/crown.svg',
      total: 2,
    },
  ];
  return (
    <>
      <div
        className={`rounded-[10px] bg-[#0B0B1A4D] border-2 border-[#141429] p-[18px] ${className}`}
      >
        <p className="text-[24px] text-white font-semibold ">
          Earnings Overview
        </p>

        <div className="mt-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-[25%] ">
              <div className="bg-[#7D40FF] border-2 border-[#141429] p-4 rounded-[10px] ">
                <p className="text-white text-lg font-semibold ">Profit</p>
                <div className="flex items-center justify-between mt-[22px] mb-4">
                  <span className="text-white text-sm ">CCT</span>
                  <img src="icons/profit-icon.png" alt="" />
                </div>

                <p className="text-white text-[40px] font-extrabold ">2</p>
              </div>
            </div>

            <div className="w-full md:w-[75%] ">
              <div className="bg-[#0B0B1A4D] border-2 border-[#141429] px-4 py-5 rounded-[10px] ">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-[40%] border-r-0 md:border-r-1 border-[#141429] md:pr-6 ">
                    <p className="text-white lg:text-lg font-semibold ">
                      Total Passive Income
                    </p>
                    <div className="flex items-center justify-between mt-[22px] mb-4">
                      <span className="text-white text-[24px] font-bold ">
                        2
                      </span>
                      <img src="icons/profit-icon.png" alt="" />
                    </div>

                    <div className="">
                      <button className="w-full text-white font-bold bg-[#EE9C04] py-3 leading-[100%] rounded-[10px] cursor-pointer ">
                        Claim
                      </button>
                    </div>
                  </div>

                  <hr className="text-[#141429] block md:hidden" />

                  <div className="w-full md:w-[60%]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#747474] text-sm ">Rules</span>
                      <img src="icons/rules.svg" alt="" />
                    </div>

                    {rulesData.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between mt-5"
                      >
                        <div className="flex items-center gap-1 ">
                          <img src={item.icon} alt={item.title} />
                          <span className="text-[#747474] text-sm ">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[#747474] text-sm ">
                          {item.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarningOverviewCard;
