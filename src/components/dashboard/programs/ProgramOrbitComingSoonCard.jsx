import React from 'react';

const ProgramOrbitComingSoonCard = () => {
  return (
    <div className="w-full mt-[30px]">
      <div 
        className="px-7 py-10 rounded-[10px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage: 'url(images/orbitc-bg.png)'
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 rounded-[10px]"></div>
        
        {/* Content */}
        <div className="relative z-10 ">
          <div className="">
            <p className="text-[30px] font-bold !text-white">Orbit C</p>

            <p className="font-semibold mt-[10px] mb-[30px] !text-white">
              Bigger rewards. Faster payouts. <br /> Next-level performance.
            </p>

            <div className="">
              <button className="text-white keep-white font-bold bg-gradient-to-r from-[#FF04B4] via-[#FF4000] to-[#F0B90B] border-[1px] border-[#FFD85B4D] px-[60px] py-3 rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramOrbitComingSoonCard;
