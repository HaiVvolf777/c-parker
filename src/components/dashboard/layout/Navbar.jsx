import React from 'react';

const Navbar = () => {
  return (
    <>
      <div className="w-full p-5 h-[83px] bg-white dark:bg-[#00000E] border-b border-gray-200 dark:border-[#141429]">
        <div className="flex item-center justify-between ">
          <div>
            {/* Light mode logo */}
            <img src="images/logo-light.png" alt="C-Parker" className="h-8 md:h-10 w-auto block dark:hidden" />
            {/* Dark mode logo */}
            <img src="images/logo.png" alt="C-Parker" className="h-8 md:h-10 w-auto hidden dark:block" />
          </div>

          <div className="hidden md:flex items-center gap-[10px]">
            <span className="text-gray-800 dark:text-white text-[20px] font-semibold ">
              Preview ID
            </span>
            <input
              type="text"
              placeholder="Enter ID"
              className="bg-gray-100 dark:bg-[#FFFFFF1A] px-[18px] py-3 rounded-[10px] text-gray-800 dark:text-[#D9D9D94D] placeholder-gray-500 dark:placeholder-[#D9D9D94D] border border-gray-200 dark:border-[#141429]"
            />
            <button className="bg-[#6F23D5] hover:bg-[#5a1fb8] text-white text-[20px] font-bold rounded-[12px] px-5 py-2 transition-colors">
              Go
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
