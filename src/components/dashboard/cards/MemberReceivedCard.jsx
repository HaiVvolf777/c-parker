import React from 'react';

const MemberReceivedCard = () => {
  return (
    <div className="bg-[#191932] rounded-[10px] p-[18px] mt-5 ">
      <p className="text-[#7D40FF] text-lg font-semibold ">Members Received</p>

      <div>
        <div className="my-[10px]">
          <span className="text-white text-[34px] font-extrabold ">
            250 CCT
          </span>
        </div>

        <p className="text-[#F0B90B] text-lg font-semibold ">Orbit A</p>
      </div>
      <hr className="my-[10px] text-[#141429]" />

      <div>
        <div className="my-[10px]">
          <span className="text-white text-[34px] font-extrabold ">
            Instant Payout
          </span>
        </div>

        <p className="text-[#F0B90B] text-lg font-semibold ">Orbit B</p>
      </div>
    </div>
  );
};

export default MemberReceivedCard;
