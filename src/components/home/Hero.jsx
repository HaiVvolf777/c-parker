import React from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { useWallet } from "../../context/WalletContext";

const Hero = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [descRef, isDescVisible] = useScrollAnimation({ threshold: 0.2 });
  const [buttonRef, isButtonVisible] = useScrollAnimation({ threshold: 0.2 });
  const { account, connectWallet, isConnecting } = useWallet();

  const handleJoinClick = () => {
    if (!account) {
      connectWallet();
    }
  };

  return (
    <div className="w-full min-h[70vh] md:h-[100vh] relative overflow-hidden">
      <img 
        src="images/hero-right.png" 
        className="absolute right-0 -top-[50px] z-0 hidden lg:block animate-float" 
        alt="" 
      />
      <div className="container mx-auto h-full relative z-[10]">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-8 md:gap-10 py-10 md:py-0">
          <div ref={heroRef} className={`animate-fade-in-up ${isHeroVisible ? 'animate' : ''}`}>
            <h1 
              ref={titleRef}
              className={`text-white hero-heading font-bold text-[36px] leading-[42px] md:text-[72px] md:leading-[70px] animate-slide-in-left ${isTitleVisible ? 'animate' : ''}`}
            >
              Earn at the <br /> Speed of Parker
            </h1>
            <p 
              ref={descRef}
              className={`text-white hero-desc text-[18px] md:text-[26px] my-[20px] md:my-[30px] animate-fade-in-up ${isDescVisible ? 'animate' : ''}`}
            >
              Decentralized Orbit A & Orbit B plans powered by <br />Carbon Credit Token (CCT). Instant payouts, <br />secured on-chain.
            </p>
            <button 
              ref={buttonRef}
              className={`relative rounded-xl p-[1px] w-full sm:w-auto animate-fade-in-up hover:scale-105 transition-transform duration-300 ${isButtonVisible ? 'animate' : ''} ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleJoinClick}
              disabled={isConnecting}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E] animate-pulse-slow"></div>
              <div className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-6 md:px-10 py-2 text-[18px] md:text-[26px] text-white keep-white font-bold text-center">
                {isConnecting ? 'Connecting...' : 'Join Now'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


