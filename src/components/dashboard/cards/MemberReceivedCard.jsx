import React from 'react';

const MemberReceivedCard = () => {
  return (
    <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] p-[18px] mt-5 border-2 border-[#E5E7EB] dark:border-[#141429] ">
      <p className="text-[#0a0a0a] dark:text-[#7D40FF] text-lg font-semibold ">Members Received</p>

      <div>
        <div className="my-[10px]">
          <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold ">
            250 CCT
          </span>
        </div>

        <p className="text-[#9A7D0A] dark:text-[#F0B90B] text-lg font-semibold ">Orbit A</p>
      </div>
      <hr className="my-[10px] text-[#E5E7EB] dark:text-[#141429]" />

      <div>
        <div className="my-[10px]">
          <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold ">
            Instant Payout
          </span>
        </div>

        <p className="text-[#9A7D0A] dark:text-[#F0B90B] text-lg font-semibold ">Orbit B</p>
      </div>
    </div>
  );
};

export default MemberReceivedCard;
