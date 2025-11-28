import React from 'react';
import { useDashboardData } from '../../../context/DashboardDataContext';

const EarningOverviewCard = ({ className }) => {
  const { data } = useDashboardData();
  const { profit, passiveIncome } = data.payments.totals;

  const rulesData = [
    {
      id: 1,
      title: 'Top 300 Leaders',
      icon: 'icons/crown.svg',
      total: 0,
    },
    {
      id: 2,
      title: 'Unconditional Passives',
      icon: 'icons/chain.svg',
      total: 0,
    },
    {
      id: 3,
      title: 'Active users',
      icon: 'icons/user.svg',
      total: 0,
    },
  ];
  return (
    <>
      <div
        className={`rounded-[10px] bg-white/60 dark:bg-[#0B0B1A4D] border-2 border-[#E5E7EB] dark:border-[#141429] p-[18px] ${className}`}
      >
        <p className="text-[24px] font-semibold text-[#0a0a0a] dark:text-white ">
          Earnings Overview
        </p>

        <div className="mt-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-[25%] ">
              <div className="bg-[#7D40FF] border-2 border-[#141429] p-4 rounded-[10px] ">
                <p className="text-white keep-white text-lg font-semibold ">Profit</p>
                <div className="flex items-center justify-between mt-[22px] mb-4">
                  <span className="text-white keep-white text-sm ">CCT</span>
                  <img src="/icons/CCT.svg" alt="CCT" />
                </div>

                <p className="text-white keep-white text-[40px] font-extrabold ">{profit}</p>
              </div>
            </div>

            <div className="w-full md:w-[75%] ">
              <div className="bg-white/60 dark:bg-[#0B0B1A4D] border-2 border-[#E5E7EB] dark:border-[#141429] px-4 py-5 rounded-[10px] ">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-[40%] border-r-0 md:border-r-[1px] border-[#E5E7EB] dark:border-[#141429] md:pr-6 ">
                    <p className="lg:text-lg font-semibold text-[#0a0a0a] dark:text-white ">
                      Total Passive Income
                    </p>
                    <div className="flex items-center justify-between mt-[22px] mb-4">
                      <span className="text-[#0a0a0a] dark:text-white text-[24px] font-bold ">
                        {passiveIncome}
                      </span>
                      <img src="/icons/CCT.svg" alt="CCT" />
                    </div>

                    <div className="">
                      <button className="w-full text-white keep-white font-bold bg-[#EE9C04] py-3 leading-[100%] rounded-[10px] cursor-pointer ">
                        Claim
                      </button>
                    </div>
                  </div>

                  <hr className="text-[#E5E7EB] dark:text-[#141429] block md:hidden" />

                  <div className="w-full md:w-[60%]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280] dark:text-[#9aa0a6] text-sm ">Rules</span>
                      <img src="icons/rules.svg" alt="" />
                    </div>

                    {rulesData.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between mt-5"
                      >
                        <div className="flex items-center gap-1 ">
                          <img src={item.icon} alt={item.title} />
                          <span className="text-[#6B7280] dark:text-[#9aa0a6] text-sm ">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[#6B7280] dark:text-[#9aa0a6] text-sm ">
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
