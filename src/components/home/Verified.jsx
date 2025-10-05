import React, { useState } from "react";

const Verified = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1200);
    }
  };

  const addresses = [
    '0saC3adbbc2ea1f62a50f57a',
    '0saC3adbbc2ea1f62a50f57a',
  ];

  return (
    <div className="relative">
      <div className="container mx-auto px-6">
        <h2 className="text-white font-bold text-[36px] md:text-[56px] text-center">Verified on Blockchain</h2>
        <p className="text-white text-[18px] md:text-[26px] mt-5 text-center">Transparent. Immutable. All payouts flow directly <br /> to your wallet — no delays, no intermediaries.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[30px] mt-[40px] md:mt-[80px] px-0 md:px-[45px] ">
          {[0, 1].map((_, index) => (
            <div key={index} className="p-8 rounded-[10px] bg-white dark:bg-[#0B0B1A4D] border-2 border-gray-200 dark:border-[#141429] backdrop-blur-[30px] ">
              <div className="flex items-center gap-3">
                <img src="icons/orbit-icon.png" alt="" />
                <span className="text-white text-[24px] md:text-[36px] font-semibold">Orbit {index === 0 ? 'A' : 'B'}</span>
              </div>
              <div className="rounded-[10px] border-[1px] border-white px-3 md:px-4 py-3 flex items-center justify-between my-[20px] md:my-[30px] overflow-hidden">
                <span className="text-white text-[14px] md:text-[24px] truncate ">{addresses[index]}</span>
                <button onClick={() => handleCopy(addresses[index], index)} className="flex items-center gap-2">
                  <img src="icons/copy.svg" alt="Copy" className="w-5 h-5 invert dark:invert-0" />
                  {copiedIndex === index && (
                    <span className="text-white text-sm md:text-base">Copied</span>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-800 dark:text-white text-[16px] md:text-[24px] ">View on Explorer</span>
                <img src="icons/arrow-right.svg" alt="" className="w-4 h-4 invert dark:invert-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Verified;


