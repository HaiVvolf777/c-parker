import React from 'react';

const ProgramOrbitCard = ({ data }) => {
  // Determine background image based on orbit type
  const getBackgroundImage = () => {
    if (data.title === 'Orbit A') {
      return 'url(images/orbita-bg.png)';
    } else if (data.title === 'Orbit B') {
      return 'url(images/orbitb-bg.png)';
    }
    return 'url(images/orbit-a.png)'; // fallback
  };

  return (
    <>
      <div 
        className="border-2 border-gray-200 dark:border-[#141429] px-7 py-5 rounded-[10px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{
          backgroundImage: getBackgroundImage()
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 rounded-[10px]"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col gap-[30px]">
            <p className="text-white text-[24px] font-bold">{data.title}</p>

            <p className="text-[#01F1E3] text-[38px] font-extrabold">
              {data.cct}
            </p>

            <div className="">
              <button className="text-white font-bold bg-[#7D40FF] hover:bg-[#5a1fb8] px-[67px] py-2 leading-[100%] rounded-[10px] cursor-pointer transition-colors">
                Preview
              </button>
            </div>
          </div>
          <div className="w-[190px] h-[171px] flex items-center justify-center">
            <img src="images/orbit-a.png" className="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramOrbitCard;
