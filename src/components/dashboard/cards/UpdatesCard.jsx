import React from 'react';

const UpdatesCard = ({ className }) => {
  return (
    <>
      <div
        className={`h-full rounded-[10px] bg-gradient-to-r from-[#01F1E3] to-[#3D9988] border-2 border-[#141429] p-[18px] ${className}`}
      >
        <div className="flex flex-col justify-between h-full ">
          <div>
            <div>
              <img src="icons/i.svg" alt="" />
            </div>
            <div className="my-4">
              <p className="text-lg text-white font-semibold ">Updates</p>
              <p className="text-sm text-white mt-4 ">
                System upgrade scheduled for tomorrow
              </p>
            </div>
          </div>

          <div className="">
            <button className="text-white font-bold bg-[#150F3E99] px-6 py-[9px] leading-[100%] rounded-[10px] cursor-pointer ">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatesCard;
