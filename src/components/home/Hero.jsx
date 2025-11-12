import React, { useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const Hero = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [descRef, isDescVisible] = useScrollAnimation({ threshold: 0.2 });
  const [buttonRef, isButtonVisible] = useScrollAnimation({ threshold: 0.2 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investment, setInvestment] = useState('');
  const [error, setError] = useState('');

  const handleJoinClick = () => {
    setIsModalOpen(true);
    setError('');
    setInvestment('');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!investment || Number(investment) <= 0) {
      setError('Please enter a positive number.');
      return;
    }
    // Placeholder: handle the numeric submission (send to API, etc.)
    console.log('Submitted amount:', Number(investment));
    handleClose();
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
              className={`relative rounded-xl p-[1px] w-full sm:w-auto animate-fade-in-up hover:scale-105 transition-transform duration-300 ${isButtonVisible ? 'animate' : ''}`}
              onClick={handleJoinClick}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E] animate-pulse-slow"></div>
              <div className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-6 md:px-10 py-2 text-[18px] md:text-[26px] text-white keep-white font-bold text-center">
                Join Now
              </div>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={handleClose}>
          <div className="w-full max-w-md rounded-2xl border border-[#141429] bg-white dark:bg-[#0B0B1A] p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#0a0a0a] dark:text-white">Enter Amount</h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-[#747474] hover:text-[#0a0a0a] dark:hover:text-white"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-[#0a0a0a] dark:text-[#bdbdbd] mb-2">
                Investment Amount
              </label>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="w-full rounded-md border border-[#141429] bg-white dark:bg-[#0B0B1A] px-4 py-2 text-[#0a0a0a] dark:text-white outline-none"
                placeholder="Enter amount"
                min="0"
              />
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-[#6F23D5] hover:bg-[#5a1fb8] text-white font-bold py-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;


