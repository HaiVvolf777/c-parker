import React from "react";

const CTA = ({ socials }) => {
  return (
    <div className="mt-[100px] md:mt-[150px] relative ">
      <div className="container mx-auto px-6 ">
        <div className=" bg-white dark:bg-[#0B0B1A4D] rounded-[10px] p-[24px] md:p-[45px] border-2 border-gray-200 dark:border-[#141429] ">
          <p className="text-white text-[18px] md:text-[26px] text-center w-full md:w-[70%] lg:w-[55%] mx-auto ">Be part of the Parker journey. Join thousands already earning in Carbon Credit Token.</p>
          <div className="flex flex-wrap items-center justify-center gap-[16px] md:gap-[30px] mt-[20px] md:mt-[30px]">
            {socials.map((item, index) => (
              <div key={index} className="relative rounded-[12px] flex items-center justify-center gap-[12px] md:gap-[20px] text-white p-[1px]">
                <div className="absolute inset-0 rounded-[12px] p-[1px] bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                <div className="relative w-full h-full rounded-[12px] bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-[20px] md:px-[38px] py-[9px] flex items-center justify-center gap-3 md:gap-5">
                  <img src={item.icon} alt={item.label} className="w-[24px] h-[24px] md:w-[34px] md:h-[32px]" />
                  <span className="text-white keep-white text-[18px] md:text-[26px] font-bold">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;


