import React from "react";

const HowItWorks = () => {
  const cards = [
    { icon: 'svgs/onchain.svg', text: '100% On-chain' },
    { icon: 'svgs/orbita.svg', text: 'Join Orbit A or Orbit B Plan' },
    { icon: 'svgs/dollar.svg', text: 'Get Paid Instantly in CCT' },
  ];

  return (
    <div className="mt-[100px] md:mt-[150px] relative">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-white font-bold text-[28px] md:text-[40px] text-center">How It Works</h2>
        <div className="relative flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] sm:gap-[20px] md:gap-[30px] mx-auto mt-[40px] md:mt-[60px] z-10 w-full max-w-[1024px]">
            {cards.map((item, index) => (
              <div key={index} className="w-full bg-white dark:bg-[#0808084d] rounded-[10px] flex flex-col items-center justify-center gap-[16px] sm:gap-[20px] md:gap-[30px] p-[20px] sm:p-[24px] md:p-[45px] border-2 border-gray-200 dark:border-[#141429]">
                <img src={item.icon} alt="" className="w-[64px] h-[64px] md:w-[81px] md:h-[81px]" />
                <p className="text-white text-[20px] md:text-[26px] font-bold text-center">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="max-lg:hidden">
            <div className="w-1/4 h-15 absolute left-[25%] top-0 rounded-t-3xl border-t-4 border-x-4 border-solid border-[#6F23D5] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] -z-10"></div>
            <div className="w-1/4 h-15 absolute left-[50%] top-0 rounded-t-3xl border-t-4 border-x-4 border-solid border-[#6F23D5] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;


