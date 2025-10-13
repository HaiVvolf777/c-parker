import React, { useState } from 'react';

const ProfileCard = () => {
  const [copied, setCopied] = useState(false);

  const referLink = '0saC3adbbc2ea1f62a50f57a';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = referLink;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
  <>
    <div className="bg-white dark:bg-[#0B0B1A4D] w-full p-4 md:p-[30px] border-2 border-gray-200 dark:border-[#141429] rounded-[10px]">
      <div className="grid grid-col-1 lg:grid-cols-2 gap-5">
        {/* profile  */}
        <div className="flex flex-col md:flex-row gap-[28px] items-center">
          <div className="relative h-[150px] w-[150px] border-4 border-[#6F23D5] bg-gray-100 dark:bg-white rounded-full">
            <img src="images/profile.png" alt="" className="w-full h-full rounded-full object-cover" />
            <div className="rounded-full absolute bottom-0 right-2">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="33.9997" height="34" rx="16.9998" fill="#6F23D5" />
                <path
                  d="M21.1333 25H11.5333C10.1333 25 9 23.8666 9 22.4666V12.8666C9 11.4666 10.1333 10.3333 11.5333 10.3333H16.3333C16.7333 10.3333 17 10.6 17 11C17 11.4 16.7333 11.6666 16.3333 11.6666H11.5333C10.8667 11.6666 10.3333 12.2 10.3333 12.8666V22.4C10.3333 23.0666 10.8667 23.6 11.5333 23.6H21.0667C21.7333 23.6 22.2667 23.0666 22.2667 22.4V17.6666C22.2667 17.2666 22.5333 17 22.9333 17C23.3333 17 23.6 17.2666 23.6 17.6666V22.4666C23.6667 23.8666 22.5333 25 21.1333 25Z"
                  fill="white"
                />
                <path
                  d="M13 21.6667C12.8 21.6667 12.6667 21.6 12.5334 21.4667C12.4 21.3333 12.3334 21.0667 12.3334 20.8667L13 17.5333C13 17.4 13.0667 17.2667 13.2 17.2L21.2 9.2C21.4667 8.93333 21.8667 8.93333 22.1334 9.2L24.8 11.8667C25.0667 12.1333 25.0667 12.5333 24.8 12.8L16.8 20.8C16.7334 20.8667 16.6 20.9333 16.4667 21L13.1334 21.6667H13ZM14.2667 18L13.8667 20.1333L16 19.7333L23.4 12.3333L21.6667 10.6L14.2667 18Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-gray-800 dark:text-white text-[36px] text-center md:text-start font-extrabold mb-[10px]">
              ID 2355
            </h2>
            <div className="flex gap-[10px] items-center justify-center md:justify-start mb-[10px]">
              <span className="text-lg text-[#6F23D5] font-semibold">
                h9w434....4h89
              </span>
              <div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.19982 4.90003C4.19982 4.51344 4.51322 4.20004 4.89982 4.20004H11.8998C12.2864 4.20004 12.5998 4.51344 12.5998 4.90003V11.9C12.5998 12.2866 12.2864 12.6 11.8998 12.6H4.89982C4.51322 12.6 4.19982 12.2866 4.19982 11.9V4.90003ZM2.79983 11.9C2.79983 13.0598 3.74003 14 4.89982 14H11.8998C13.0596 14 13.9998 13.0598 13.9998 11.9V4.90003C13.9998 3.74024 13.0596 2.80005 11.8998 2.80005H4.89982C3.74003 2.80005 2.79983 3.74024 2.79983 4.90003V11.9Z"
                    fill="#6F23D5"
                  />
                  <path
                    d="M11.2001 2.45005C11.2001 2.15787 11.2036 1.91087 11.1605 1.69195L11.1598 1.69058C11.0788 1.28308 10.8794 0.908396 10.5856 0.614611C10.2918 0.320827 9.91712 0.121374 9.50961 0.0403966L9.50825 0.0397131C9.28932 -0.00336851 9.04232 6.4892e-05 8.75015 6.4892e-05H3.50018C2.8599 6.4892e-05 2.30917 -0.00152624 1.87051 0.0574864C1.41164 0.119239 0.972122 0.258611 0.615438 0.615295C0.258755 0.971979 0.119382 1.4115 0.0576296 1.87036C-0.00138283 2.30903 0.000206947 2.85975 0.000206947 3.50004V9.1C0.000206947 9.74029 -0.00138283 10.291 0.0576296 10.7297C0.119382 11.1885 0.258755 11.6281 0.615438 11.9847C0.972122 12.3414 1.41164 12.4808 1.87051 12.5426C2.30917 12.6016 2.8599 12.6 3.50018 12.6H4.20018V11.2H3.50018C2.82028 11.2 2.38075 11.1984 2.05713 11.1549C1.75397 11.1141 1.65872 11.0484 1.60528 10.9949C1.55183 10.9415 1.48613 10.8462 1.44532 10.5431C1.40178 10.2194 1.4002 9.7799 1.4002 9.1V3.50004C1.4002 2.82014 1.40178 2.38061 1.44532 2.05698C1.48613 1.75383 1.55183 1.65858 1.60528 1.60513C1.65872 1.55168 1.75397 1.48598 2.05713 1.44517C2.38075 1.40164 2.82028 1.40006 3.50018 1.40006H8.75015C9.1089 1.40006 9.18699 1.40364 9.23823 1.41373L9.23891 1.41304C9.37398 1.44029 9.49761 1.50768 9.59506 1.60513C9.69251 1.70258 9.75991 1.82622 9.78715 1.96128L9.78647 1.96197C9.79656 2.0132 9.80014 2.09129 9.80014 2.45005V2.80005H11.2001V2.45005Z"
                    fill="#6F23D5"
                  />
                </svg>
              </div>
            </div>

            <p className="text-gray-600 dark:text-[#747474] text-center md:text-start">
              invited 01.06.2025 by{' '}
              <span className="text-[#EE9C04] font-bold">ID 1297</span>
            </p>
          </div>
        </div>

        <div className="w-full bg-gradient-to-r from-[#6F23D5] to-[#F3F4F6] dark:to-[#00000E] backdrop-blur-[30px] px-5 py-[18px] rounded-[10px]">
          <div className="w-full flex flex-col gap-[40px]">
            <div className="flex gap-[6px]">
              <span className="text-gray-800 dark:text-white text-[20px] font-semibold">
                Refer Link
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.4 9H6.6V5.4H5.4V9ZM6 0C2.685 0 0 2.685 0 6C0 9.315 2.685 12 6 12C9.315 12 12 9.315 12 6C12 2.685 9.315 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM5.4 4.2H6.6V3H5.4V4.2Z"
                  fill="#6F23D5"
                />
              </svg>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-[10px] w-full">
              <input
                type="text"
                value={referLink}
                disabled={true}
                className="bg-white dark:bg-[#00000066] text-[#0a0a0a] dark:text-[#4DD9E8] md:text-[20px] font-bold px-[18px] py-3 rounded-[10px] w-full overflow-x-scroll cursor-pointer border border-gray-200 dark:border-transparent shadow-sm"
                onClick={handleCopy}
                title="Click to copy"
              />
              <button onClick={handleCopy} className="w-full md:w-auto bg-white dark:bg-[#6F23D5] text-[#6F23D5] dark:text-white py-[11px] px-[26px] rounded-[12px] font-bold cursor-pointer hover:bg-gray-100 dark:hover:bg-[#5a1fb8] transition-colors">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ProfileCard;
