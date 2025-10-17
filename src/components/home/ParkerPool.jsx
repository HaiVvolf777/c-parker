import React from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const ParkerPool = () => {
  const [containerRef, isContainerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [descRef, isDescVisible] = useScrollAnimation({ threshold: 0.2 });
  const [poolRef, isPoolVisible] = useScrollAnimation({ threshold: 0.2 });
  const [buttonRef, isButtonVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="mt-[100px] md:mt-[150px] relative">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img src="/images/Bubble-2.png" alt="" className="hidden sm:block absolute w-[200px] md:w-[300px] -top-10 left-[10%] opacity-70 dark:opacity-60 animate-float-slow" />
        <img src="/images/Bubble-2.png" alt="" className="hidden sm:block absolute w-[160px] md:w-[220px] top-[5%] right-[12%] opacity-70 dark:opacity-50 animate-float animation-delay-1000" />
        <img src="/images/Bubble-2.png" alt="" className="hidden sm:block absolute w-[180px] md:w-[240px] bottom-[8%] left-[18%] opacity-70 dark:opacity-40 animate-float-slow animation-delay-2000" />
        <img src="/images/Bubble-3.png" alt="" className="hidden sm:block absolute w-[200px] md:w-[260px] bottom-[6%] right-[20%] opacity-70 dark:opacity-45 animate-float animation-delay-1500" />
        <img src="/images/Bubble-5.png" alt="" className="hidden sm:block absolute w-[120px] md:w-[180px] top-[38%] left-[48%] -translate-x-1/2 opacity-10 dark:opacity-35 animate-float-slow animation-delay-500" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={containerRef}
          className={`w-full md:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto border-2 border-gray-200 dark:border-[#141429] rounded-[10px] bg-white dark:bg-[#0B0B1A4D] backdrop-blur-[100px] px-[24px] md:px-[100px] py-[40px] md:py-[54px] relative overflow-hidden animate-fade-in-up hover:scale-105 transition-all duration-500 ${isContainerVisible ? 'animate' : ''}`}
        >
          <h2 
            ref={titleRef}
            className={`text-white font-bold text-[28px] md:text-[40px] text-center animate-fade-in-up ${isTitleVisible ? 'animate' : ''}`}
          >
            The Parker Pool
          </h2>
          <p 
            ref={descRef}
            className={`text-white text-[16px] md:text-[26px] mt-5 text-center animate-fade-in-up ${isDescVisible ? 'animate' : ''}`}
          >
            Already <span className="text-[#7D40FF] animate-pulse-slow">4,405,726</span> Carbon Credit Tokens pooled in — growing every second.
          </p>
          <div 
            ref={poolRef}
            className={`relative flex justify-center items-center mt-8 animate-fade-in-up ${isPoolVisible ? 'animate' : ''}`}
          >
            <img src="svgs/parker-pool.svg" alt="Parker Pool" className="w-full max-w-[400px] h-auto hover:scale-110 transition-transform duration-500" />
            <span className={`absolute text-[20px] md:text-[30px] text-white keep-white font-bold text-center top-1/4 left-1/2 -translate-x-1/2 translate-y-[80px] animate-count-up ${isPoolVisible ? 'animate' : ''}`}>4,405,726</span>
          </div>
          <div 
            ref={buttonRef}
            className={`flex items-center justify-center animate-fade-in-up ${isButtonVisible ? 'animate' : ''}`}
          >
            <div className="relative inline-flex rounded[12px] text-white text-center p-[1px] mt-8 mx-auto hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-[#324AB9] to-[#4B158E] animate-pulse-slow"></div>
              <div className="relative rounded-[12px] bg-[#00000e] px-[24px] md:px-[48px] py-[13px] text-[14px] md:text-[16px] text-white keep-white">View Pool on Explorer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkerPool;


