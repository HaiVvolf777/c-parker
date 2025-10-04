import React from 'react';

const ContractsCard = () => {
  return (
    <div className="bg-[#191932] rounded-[10px] p-[18px] mt-5">
      <p className="text-[#7D40FF] text-lg font-semibold ">Contracts</p>

      <div className="flex items-center justify-between my-[10px]">
        <div className="text-lg font-semibold">
          <span className="text-[#7D40FF] mr-4">Orbit A</span>
          <span className="text-[#01F1E3]">0xABC…123</span>
        </div>
        <div className="cursor-pointer">
          <img src="icons/copy.svg" alt="" />
        </div>
      </div>

      <hr className="text-[#141429] my-[10px]" />

      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">
          <span className="text-[#7D40FF] mr-4">Orbit B</span>
          <span className="text-[#01F1E3]">0xABC…123</span>
        </div>
        <div className="cursor-pointer">
          <img src="icons/copy.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContractsCard;
