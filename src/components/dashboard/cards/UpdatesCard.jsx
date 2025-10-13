import React from 'react';

const UpdatesCard = ({ className }) => {
  return (
    <>
      <div
        className={`h-full rounded-[10px] border-2 border-[#141429] p-[18px] ${className}`}
        style={{
          backgroundImage: "url('/images/updatesbg.png'), linear-gradient(90deg, rgba(1,241,227,0.45) 0%, rgba(61,153,136,0.45) 100%)",
          backgroundSize: 'cover, cover',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat, no-repeat',
        }}
      >
        <div className="flex flex-col justify-between h-full text-[#0a0a0a] dark:text-white">
          <div>
            <div>
              <img src="svgs/i.svg" alt="" />
            </div>
            <div className="my-4">
              <p className="text-lg text-[#0a0a0a] dark:text-white font-semibold ">Updates</p>
              <p className="text-sm text-[#0a0a0a] dark:text-white mt-4 ">
                System upgrade scheduled for tomorrow
              </p>
            </div>
          </div>

          <div className="">
            <button className="text-white keep-white font-bold bg-[#7D40FF] px-6 py-[9px] leading-[100%] rounded-[10px] cursor-pointer ">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatesCard;
