import React from 'react';

const HomePage = () => {
  const statsData = [
    {
      title: 'Total Members',
      value: '12,345',
      subText: '+340 today',
      isCCT: false,
    },
    {
      title: 'New Members (24h)',
      value: '245',
      subText: 'joined today',
      isCCT: false,
    },
    {
      title: 'CCT Earned (24hr)',
      value: '8,920',
      subText: 'in Orbit A & B',
      isCCT: true,
    },
    {
      title: 'Total CCT Earned',
      value: '1,245,000',
      subText: 'across all users',
      isCCT: false,
    },
  ];

  const activityData = [
    {
      time: '1min',
      id: '#1023',
      event: 'reached Level 4',
      plan: 'Orbit A',
      details: 'earned 250 CCT',
    },
    {
      time: '2min',
      id: '#876',
      event: 'joined',
      plan: 'Orbit B',
      details: 'instant payout',
    },
    {
      time: '1min',
      id: '#1023',
      event: 'reached Level 4',
      plan: 'Orbit A',
      details: 'earned 250 CCT',
    },
    {
      time: '2min',
      id: '#876',
      event: 'joined',
      plan: 'Orbit B',
      details: 'instant payout',
    },
    {
      time: '2min',
      id: '#876',
      event: 'joined',
      plan: 'Orbit B',
      details: 'instant payout',
    },
  ];

  return (
    <div className="h-auto w-full relative">
      {/* Eclips */}
      <img
        src="svgs/top-eclips.svg"
        className="absolute -top-[100px] left-[8%] rotate-[180] z-1  "
        alt=""
      />

      {/* Navbar  */}
      <div className="container mx-auto bg-transparent h-[70px] p-3 flex justify-between items-center border-2 border-[#21213C] rounded-xl backdrop-blur-[60px] mt-[37px] relative z-[10]">
        <div>
          <img src="images/logo.png" alt="" />
        </div>
        <div className="bg-[#00000666] w-[496px]  rounded-[10px] p-3">
          <div className="flex items-center gap-[10px] overflow-hidden">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7205 19.3706L15.3032 13.9533C16.5221 12.4321 17.1849 10.5402 17.1818 8.59089C17.1818 3.84633 13.3357 0 8.59089 0C3.84633 0 0 3.84633 0 8.59089C0 13.3355 3.84633 17.1818 8.59089 17.1818C10.6193 17.1818 12.4835 16.4788 13.9533 15.303L19.3706 20.7203C19.4591 20.8091 19.5643 20.8795 19.6801 20.9275C19.7959 20.9755 19.9201 21.0001 20.0454 21C20.2342 21 20.4187 20.944 20.5757 20.8391C20.7327 20.7343 20.855 20.5852 20.9273 20.4108C20.9996 20.2364 21.0185 20.0445 20.9817 19.8593C20.9449 19.6742 20.854 19.5041 20.7205 19.3706ZM8.59089 15.2727C4.90063 15.2727 1.90909 12.2812 1.90909 8.59089C1.90909 4.90063 4.90063 1.90909 8.59089 1.90909C12.2814 1.90909 15.2727 4.90063 15.2727 8.59089C15.2727 12.2812 12.2814 15.2727 8.59089 15.2727Z"
                fill="#747474"
              />
            </svg>

            <input
              type="text"
              placeholder="Enter ID to check status"
              className="text-[#747474] "
            />
          </div>
        </div>
        <div>
          <button className="relative rounded-xl p-[1px]">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
            <div className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-10 py-2 text-[20px] text-white font-bold">
              Connect Wallet
            </div>
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="w-full h-[100vh] relative">
        {/* Background Image */}
        <img
          src="images/hero-right.png"
          className="absolute right-0 -top-[50px] z-0"
          alt=""
        />

        {/* Content */}
        <div className="container mx-auto h-full relative z-[10]">
          <div className="grid grid-cols-2 h-full items-center gap-10">
            <div>
              <h1 className="text-white font-bold text-[72px] leading-[70px]">
                Earn at the <br /> Speed of Parker
              </h1>
              <p className="text-white text-[26px] my-[30px]">
                Decentralized Orbit A & Orbit B plans powered by <br />
                Carbon Credit Token (CCT). Instant payouts, <br />
                secured on-chain.
              </p>

              <button className="relative rounded-xl p-[1px]">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                <div className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-10 py-2 text-[26px] text-white font-bold">
                  Join Now
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Members Stats  */}
      <div className="w-full py-[150px] ">
        <div className="container mx-auto px-[54px] py-10 bg-[#0B0B1A4D] border-2 border-[#141429] rounded-[10px]">
          <div className="flex items-center justify-between">
            {statsData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 items-center justify-center "
              >
                <span className="text-[22px] font-semibold text-center  text-white ">
                  {item.title}
                </span>
                <div className="relative">
                  <span className="text-[45px] font-semibold text-center text-[#7D40FF] ">
                    {item.value}
                  </span>
                  {item.isCCT && (
                    <span className="text-[26px] font-semibold text-center text-[#747474] absolute bottom-0  ">
                      CCT
                    </span>
                  )}
                </div>
                <span className="text-[18px] font-semibold text-center text-[#747474] ">
                  {item.subText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Status  */}
      <div className="relative">
        {/* Eclips */}
        {/* <img src="svgs/ellipse-2.svg" className="absolute top-0  " alt="" /> */}

        <div className="container mx-auto">
          <h2 className="text-white font-bold text-[56px] text-center">
            Verified on Blockchain
          </h2>

          <p className="text-white text-[26px] mt-5 text-center">
            Transparent. Immutable. All payouts flow directly <br /> to your
            wallet — no delays, no intermediaries.
          </p>

          <div className="grid  grid-cols-2 gap-[30px] mt-[80px] px-[45px] ">
            {[1, 2].map((_, index) => (
              <div className="p-8 rounded-[10px] bg-[#0B0B1A4D] border-2 border-[#141429] backdrop-blur-[30px] ">
                <div className="flex items-center gap-3">
                  <img src="icons/orbit-icon.png" alt="" />
                  <span className="text-white text-[36px] font-semibold  ">
                    Orbit A
                  </span>
                </div>

                <div className="rounded-[10px] border-[1px] border-white px-4 py-3 flex items-center justify-between my-[30px] ">
                  <span className="text-white text-[24px] ">
                    0saC3adbbc2ea1f62a50f57a
                  </span>

                  <button>
                    <svg
                      width="35"
                      height="36"
                      viewBox="0 0 35 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4999 12.7502C10.4999 11.7837 11.2834 11.0002 12.2499 11.0002H29.7499C30.7164 11.0002 31.4999 11.7837 31.4999 12.7502V30.2503C31.4999 31.2168 30.7164 32.0003 29.7499 32.0003H12.2499C11.2834 32.0003 10.4999 31.2168 10.4999 30.2503V12.7502ZM6.99993 30.2503C6.99993 33.1498 9.35043 35.5003 12.2499 35.5003H29.7499C32.6494 35.5003 34.9999 33.1498 34.9999 30.2503V12.7502C34.9999 9.85075 32.6494 7.50024 29.7499 7.50024H12.2499C9.35043 7.50024 6.99993 9.85075 6.99993 12.7502V30.2503Z"
                        fill="white"
                      />
                      <path
                        d="M28 6.62517C28 5.89472 28.0086 5.27722 27.9009 4.7299L27.8992 4.72648C27.6967 3.70772 27.1981 2.77101 26.4636 2.03654C25.7291 1.30207 24.7924 0.803438 23.7737 0.600992L23.7703 0.599283C23.2229 0.491579 22.6054 0.500162 21.875 0.500162H8.74998C7.14925 0.500162 5.77244 0.496184 4.67576 0.643717C3.52859 0.798099 2.42978 1.14653 1.53806 2.03825C0.646349 2.92996 0.297915 4.02877 0.143532 5.17595C-0.00400162 6.27262 -2.47955e-05 7.64943 -2.47955e-05 9.25017V23.2502C-2.47955e-05 24.8509 -0.00400162 26.2277 0.143532 27.3244C0.297915 28.4716 0.646349 29.5704 1.53806 30.4621C2.42978 31.3538 3.52859 31.7022 4.67576 31.8566C5.77244 32.0042 7.14925 32.0002 8.74998 32.0002H10.5V28.5002H8.74998C7.05021 28.5002 5.95139 28.4962 5.14231 28.3874C4.38441 28.2853 4.1463 28.1211 4.01267 27.9875C3.87905 27.8539 3.7148 27.6157 3.61277 26.8578C3.50393 26.0488 3.49998 24.9499 3.49998 23.2502V9.25017C3.49998 7.5504 3.50393 6.45157 3.61277 5.6425C3.7148 4.8846 3.87905 4.64648 4.01267 4.51286C4.1463 4.37924 4.38441 4.21499 5.14231 4.11296C5.95139 4.00411 7.05021 4.00016 8.74998 4.00016H21.875C22.7719 4.00016 22.9671 4.00912 23.0952 4.03434L23.0969 4.03263C23.4346 4.10075 23.7437 4.26923 23.9873 4.51286C24.2309 4.75649 24.3994 5.06557 24.4675 5.40324L24.4658 5.40495C24.491 5.53305 24.5 5.72827 24.5 6.62517V7.50017H28V6.62517Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-white text-[24px] ">
                    View on Explorer
                  </span>
                  <svg
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.293 0.792893C10.6835 0.402369 11.3165 0.402369 11.707 0.792893L17.707 6.79289C18.0976 7.18342 18.0976 7.81643 17.707 8.20696L11.707 14.207C11.3165 14.5975 10.6835 14.5975 10.293 14.207C9.90244 13.8164 9.90244 13.1834 10.293 12.7929L14.5859 8.49992H1C0.447715 8.49992 0 8.05221 0 7.49992C0 6.94764 0.447715 6.49992 1 6.49992H14.5859L10.293 2.20696C9.90244 1.81643 9.90244 1.18342 10.293 0.792893Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instant Payouts  */}
      <div className="mt-[150px]">
        <div className="container mx-auto px-6">
          <svg
            className="mx-auto"
            width="62"
            height="58"
            viewBox="0 0 62 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_10_123)">
              <path
                d="M50.0306 28.8598C49.5483 28.8598 49.0858 28.6682 48.7448 28.3272C48.4037 27.9861 48.2121 27.5236 48.2121 27.0413V21.8041C48.2804 20.7736 47.9401 19.7577 47.2649 18.9763C46.5896 18.1948 45.6338 17.7108 44.6043 17.6289H13.1374C12.6551 17.6289 12.1926 17.4373 11.8516 17.0963C11.5105 16.7552 11.3189 16.2927 11.3189 15.8104C11.3189 15.3281 11.5105 14.8656 11.8516 14.5246C12.1926 14.1835 12.6551 13.9919 13.1374 13.9919H44.6043C46.602 14.064 48.4896 14.9254 49.8532 16.3871C51.2167 17.8488 51.945 19.7917 51.8782 21.7896V27.0268C51.8802 27.2693 51.8336 27.5097 51.7413 27.7339C51.6489 27.9582 51.5127 28.1617 51.3405 28.3325C51.1684 28.5033 50.9638 28.6379 50.7389 28.7285C50.5139 28.819 50.2731 28.8637 50.0306 28.8598Z"
                fill="#7D40FF"
              />
              <path
                d="M44.6043 52.078H13.1374C11.1397 52.0059 9.25207 51.1446 7.8885 49.6829C6.52494 48.2211 5.79669 46.2783 5.86347 44.2804V11.4606C5.86347 10.9783 6.05506 10.5157 6.39609 10.1747C6.73712 9.83368 7.19966 9.64209 7.68195 9.64209C8.16424 9.64209 8.62677 9.83368 8.9678 10.1747C9.30883 10.5157 9.50042 10.9783 9.50042 11.4606V44.2804C9.43228 45.3094 9.77304 46.3236 10.4486 47.1027C11.1242 47.8819 12.08 48.3628 13.1083 48.4411H44.6043C45.6325 48.3628 46.5883 47.8819 47.2639 47.1027C47.9395 46.3236 48.2802 45.3094 48.2121 44.2804V40.5853C48.2121 40.103 48.4037 39.6404 48.7447 39.2994C49.0858 38.9584 49.5483 38.7668 50.0306 38.7668C50.5129 38.7668 50.9754 38.9584 51.3164 39.2994C51.6575 39.6404 51.8491 40.103 51.8491 40.5853V44.2804C51.916 46.2734 51.1917 48.212 49.8343 49.6729C48.477 51.1338 46.5968 51.9984 44.6043 52.078Z"
                fill="#7D40FF"
              />
              <path
                d="M43.8624 17.629C43.3851 17.6291 42.9269 17.4415 42.5867 17.1067C42.2465 16.772 42.0515 16.3169 42.0439 15.8397V11.8099C42.0098 10.9468 41.6359 10.1321 41.0037 9.54351C40.3714 8.95489 39.5322 8.64004 38.6688 8.66759H12.4828C11.7404 8.64003 11.0174 8.90779 10.4721 9.41223C9.92672 9.91668 9.60351 10.6167 9.57323 11.3589C9.60351 12.1012 9.92672 12.8012 10.4721 13.3056C11.0174 13.8101 11.7404 14.0778 12.4828 14.0503H28.4854C28.9677 14.0503 29.4302 14.2419 29.7712 14.5829C30.1122 14.9239 30.3038 15.3865 30.3038 15.8687C30.3038 16.351 30.1122 16.8136 29.7712 17.1546C29.4302 17.4956 28.9677 17.6872 28.4854 17.6872H12.4391C11.5916 17.7007 10.7497 17.5468 9.96169 17.2344C9.17368 16.9221 8.45504 16.4573 7.84693 15.8667C7.23882 15.2762 6.75318 14.5715 6.41783 13.793C6.08249 13.0145 5.90401 12.1774 5.89264 11.3298C5.92325 9.62308 6.62975 7.99818 7.85709 6.81175C9.08442 5.62533 10.7323 4.9743 12.4391 5.00155H38.6252C39.5363 4.98227 40.4422 5.1434 41.2908 5.47566C42.1394 5.80793 42.9139 6.30477 43.5697 6.93758C44.2255 7.57039 44.7497 8.32667 45.112 9.16287C45.4743 9.99907 45.6676 10.8987 45.6809 11.8099V15.8397C45.6732 16.3169 45.4783 16.772 45.1381 17.1067C44.7979 17.4415 44.3397 17.6291 43.8624 17.629ZM51.209 42.3603H41.1274C39.1582 42.3993 37.2539 41.6552 35.8329 40.2914C34.4118 38.9276 33.59 37.0556 33.548 35.0864V32.4532C33.59 30.4841 34.4118 28.612 35.8329 27.2482C37.2539 25.8844 39.1582 25.1403 41.1274 25.1793H51.3109C51.947 25.1812 52.5766 25.3084 53.1636 25.5537C53.7506 25.7989 54.2836 26.1573 54.7321 26.6085C55.1806 27.0597 55.5358 27.5948 55.7775 28.1833C56.0192 28.7718 56.1426 29.4021 56.1407 30.0383V37.5886C56.1178 38.8748 55.5857 40.0994 54.6612 40.9939C53.7367 41.8884 52.4953 42.3797 51.209 42.3603ZM41.1274 28.8308C40.125 28.7914 39.1478 29.1502 38.4091 29.8289C37.6704 30.5076 37.2303 31.4511 37.1849 32.4532V35.1591C37.2303 36.1613 37.6704 37.1047 38.4091 37.7834C39.1478 38.4622 40.125 38.821 41.1274 38.7815H51.209C51.5268 38.7816 51.8317 38.6563 52.0577 38.433C52.2838 38.2097 52.4127 37.9063 52.4165 37.5886V30.0383C52.4078 29.7479 52.288 29.472 52.0819 29.2673C51.9728 29.1532 51.8419 29.0623 51.6969 28.9998C51.552 28.9373 51.396 28.9046 51.2381 28.9036L41.1274 28.8308Z"
                fill="#7D40FF"
              />
              <path
                d="M42.1312 35.6245C43.1356 35.6245 43.9497 34.8103 43.9497 33.806C43.9497 32.8017 43.1356 31.9875 42.1312 31.9875C41.1269 31.9875 40.3128 32.8017 40.3128 33.806C40.3128 34.8103 41.1269 35.6245 42.1312 35.6245Z"
                fill="#7D40FF"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_10_123"
                x="0.859253"
                y="0"
                width="60.2815"
                height="57.0781"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.45 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_10_123"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_10_123"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>

          <p className="text-white text-[26px] mt-[30px] text-center">
            Every earning is instantly transferred to your connected wallet in
            Carbon Credit Token (CCT). <br />
            No pending balances. No waiting.
          </p>
        </div>
      </div>

      {/* Video & Announcements */}
      <div className="mt-[150px] relative">
        <div className="container mx-auto">
          <h2 className="text-white font-bold text-[56px] text-center">
            Video & Announcements
          </h2>

          <p className="text-white text-[26px] mt-5 text-center">
            Stay updated with the latest news and learn more about <br /> how
            C-Parker works.
          </p>

          <div className="grid grid-cols-2 gap-[60px] mt-20">
            <div>
              <div className="relative inline-block mb-[30px]">
                {/* Background Image */}
                <img
                  src="images/video-thumbnail.png"
                  alt="Video Thumbnail"
                  className="block w-full h-auto"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#00000099] border border-[#141429] flex items-center justify-center">
                  <img
                    src="icons/play.svg"
                    alt="Play Icon"
                    className="w-16 h-16"
                  />
                </div>
              </div>

              <p className="text-white text-[30px] leading-[50px] font-bold">
                Watch: How to get started with Orbit A & Orbit B
              </p>
            </div>

            <div>
              <div className="mb-[10px] ">
                <span className="text-[#7D40FF] ">08/01</span>
                <p className="text-white w-[60%] text-[20px] my-[10px]">
                  Orbit B Update – Faster payout cycle enabled.
                </p>
                <hr className="text-[#7474744D]" />
              </div>

              <div className="mb-[10px] ">
                <span className="text-[#7D40FF] ">08/01</span>
                <p className="text-white w-[60%] text-[20px] my-[10px]">
                  Community AMA – Join us on Telegram.
                </p>
                <hr className="text-[#7474744D]" />
              </div>

              <div className="mb-[10px] ">
                <span className="text-[#7D40FF] ">08/01</span>
                <p className="text-white w-[60%] text-[20px] my-[10px]">
                  Parker Pool milestone: 5,000,000 CCT pooled!
                </p>
                <hr className="text-[#7474744D]" />
              </div>

              <div className="mb-[10px] ">
                <span className="text-[#7D40FF] ">08/01</span>
                <p className="text-white w-[60%] text-[20px] my-[10px]">
                  UI improvements - Performance updates & more
                </p>
              </div>

              <button className="relative rounded-xl p-[2px] my-[22px]">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                <div className="relative rounded-xl bg-[#00000e] px-7 py-4 text-white font-bold">
                  View All Announcements
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Activity  */}
      <div className="my-[150px] relative">
        <div className="container mx-auto">
          <h3 className="text-white font-bold text-[40px]">
            Platform Activity (Live Updates)
          </h3>

          <p className="text-white text-[26px] mt-5">
            Track user growth and payouts happening live.
          </p>

          {/* table  */}
          <div className="mt-[60px] text-white ">
            <div className="border-2 border-[#141429] rounded-[10px] bg-[#0B0B1A4D] backdrop-blur-[30px] px-[44px]">
              <table className=" w-full">
                <thead className="*:pt-[44px] *:pb-[30px] border-b-1 border-[#141429] px-[42px]  *:text-[26px] *:text-[#747474] *:font-[400] ">
                  <th></th>
                  <th>Time</th>
                  <th>ID</th>
                  <th>Event</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th></th>
                </thead>

                <tbody>
                  {activityData.map((item, index) => (
                    <tr
                      key={index}
                      className="*:py-[30px] border-b-1 border-[#141429] text-center *:text-[24px] *:text-white "
                    >
                      <td>
                        <svg
                          className="mx-auto"
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.078125"
                            width="59"
                            height="59"
                            rx="29.5"
                            fill="#01F1E3"
                            fill-opacity="0.1"
                          />
                          <path
                            d="M41.733 28.7883C41.4356 28.7883 41.1505 28.6702 40.9402 28.4599C40.73 28.2497 40.6119 27.9645 40.6119 27.6672V24.4383C40.6539 23.8029 40.4441 23.1766 40.0278 22.6948C39.6115 22.213 39.0222 21.9146 38.3875 21.8641H18.9872C18.6899 21.8641 18.4047 21.746 18.1945 21.5357C17.9842 21.3255 17.8661 21.0403 17.8661 20.743C17.8661 20.4456 17.9842 20.1605 18.1945 19.9502C18.4047 19.7399 18.6899 19.6218 18.9872 19.6218H38.3875C39.6191 19.6663 40.7829 20.1973 41.6236 21.0985C42.4643 21.9997 42.9132 23.1975 42.8721 24.4293V27.6582C42.8733 27.8077 42.8446 27.9559 42.7877 28.0942C42.7307 28.2324 42.6467 28.3579 42.5406 28.4632C42.4345 28.5685 42.3083 28.6515 42.1696 28.7073C42.0309 28.7632 41.8825 28.7907 41.733 28.7883Z"
                            fill="#01F1E3"
                          />
                          <path
                            d="M38.3874 43.1032H18.9872C17.7555 43.0588 16.5918 42.5277 15.7511 41.6265C14.9104 40.7253 14.4614 39.5275 14.5026 38.2957V18.0613C14.5026 17.764 14.6207 17.4788 14.831 17.2686C15.0412 17.0583 15.3264 16.9402 15.6237 16.9402C15.9211 16.9402 16.2063 17.0583 16.4165 17.2686C16.6268 17.4788 16.7449 17.764 16.7449 18.0613V38.2957C16.7029 38.9301 16.913 39.5555 17.3295 40.0358C17.746 40.5161 18.3353 40.8127 18.9692 40.8609H38.3874C39.0214 40.8127 39.6107 40.5161 40.0272 40.0358C40.4437 39.5555 40.6538 38.9301 40.6118 38.2957V36.0176C40.6118 35.7202 40.7299 35.4351 40.9402 35.2248C41.1504 35.0145 41.4356 34.8964 41.7329 34.8964C42.0303 34.8964 42.3154 35.0145 42.5257 35.2248C42.736 35.4351 42.8541 35.7202 42.8541 36.0176V38.2957C42.8953 39.5245 42.4488 40.7197 41.612 41.6204C40.7751 42.5211 39.6159 43.0541 38.3874 43.1032Z"
                            fill="#01F1E3"
                          />
                          <path
                            d="M37.93 21.8643C37.6358 21.8643 37.3533 21.7487 37.1435 21.5423C36.9338 21.3359 36.8136 21.0553 36.8089 20.7611V18.2766C36.7878 17.7445 36.5573 17.2422 36.1675 16.8793C35.7778 16.5164 35.2603 16.3223 34.728 16.3393H18.5836C18.1259 16.3223 17.6801 16.4874 17.3439 16.7984C17.0077 17.1094 16.8084 17.541 16.7897 17.9986C16.8084 18.4562 17.0077 18.8878 17.3439 19.1988C17.6801 19.5098 18.1259 19.6749 18.5836 19.6579H28.4496C28.747 19.6579 29.0321 19.776 29.2424 19.9863C29.4526 20.1965 29.5708 20.4817 29.5708 20.779C29.5708 21.0764 29.4526 21.3615 29.2424 21.5718C29.0321 21.7821 28.747 21.9002 28.4496 21.9002H18.5567C18.0341 21.9085 17.5151 21.8136 17.0292 21.621C16.5434 21.4284 16.1003 21.1419 15.7254 20.7778C15.3505 20.4137 15.0511 19.9792 14.8443 19.4992C14.6376 19.0193 14.5276 18.5032 14.5205 17.9807C14.5394 16.9284 14.975 15.9266 15.7317 15.1951C16.4884 14.4637 17.5044 14.0623 18.5567 14.0791H34.7011C35.2629 14.0672 35.8214 14.1665 36.3446 14.3714C36.8678 14.5762 37.3453 14.8826 37.7496 15.2727C38.1539 15.6628 38.477 16.1291 38.7004 16.6447C38.9238 17.1602 39.043 17.7148 39.0512 18.2766V20.7611C39.0465 21.0553 38.9263 21.3359 38.7165 21.5423C38.5068 21.7487 38.2243 21.8643 37.93 21.8643ZM42.4594 37.1119H36.2438C35.0297 37.1359 33.8557 36.6771 32.9796 35.8363C32.1034 34.9955 31.5968 33.8413 31.5709 32.6273V31.0039C31.5968 29.7898 32.1034 28.6357 32.9796 27.7948C33.8557 26.954 35.0297 26.4952 36.2438 26.5193H42.5222C42.9144 26.5205 43.3026 26.5989 43.6645 26.7501C44.0264 26.9013 44.355 27.1222 44.6315 27.4004C44.908 27.6786 45.1271 28.0085 45.2761 28.3713C45.4251 28.7341 45.5012 29.1228 45.5 29.515V34.17C45.4858 34.9629 45.1578 35.7179 44.5878 36.2694C44.0178 36.8209 43.2524 37.1239 42.4594 37.1119ZM36.2438 28.7705C35.6258 28.7462 35.0233 28.9674 34.5679 29.3859C34.1125 29.8043 33.8411 30.386 33.8132 31.0039V32.6721C33.8411 33.29 34.1125 33.8716 34.5679 34.2901C35.0233 34.7085 35.6258 34.9298 36.2438 34.9054H42.4594C42.6553 34.9055 42.8433 34.8283 42.9827 34.6906C43.122 34.5529 43.2015 34.3659 43.2039 34.17V29.515C43.1985 29.336 43.1247 29.1658 42.9976 29.0396C42.9303 28.9693 42.8496 28.9132 42.7602 28.8747C42.6709 28.8362 42.5747 28.816 42.4774 28.8154L36.2438 28.7705Z"
                            fill="#01F1E3"
                          />
                          <path
                            d="M36.8628 32.9591C37.4819 32.9591 37.9839 32.4571 37.9839 31.8379C37.9839 31.2187 37.4819 30.7168 36.8628 30.7168C36.2436 30.7168 35.7416 31.2187 35.7416 31.8379C35.7416 32.4571 36.2436 32.9591 36.8628 32.9591Z"
                            fill="#01F1E3"
                          />
                        </svg>
                      </td>
                      <td>{item.time}</td>
                      <td>
                        <span className="text-white bg-[#00000D] px-[35px] py-2 rounded-[40px] text-[24px] ">
                          {item.id}
                        </span>
                      </td>
                      <td>reached Level 4</td>
                      <td>
                        <span className="relative inline-block rounded-md p-[1px]">
                          <span className="absolute inset-0 rounded-md bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></span>
                          <span className="relative block rounded-md bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-4 py-2 text-white text-[20px] font-semibold ">
                            Orbit A
                          </span>
                        </span>
                      </td>
                      <td>earned 250 CCT</td>
                      <td>
                        <svg
                          className="mx-auto"
                          width="32"
                          height="30"
                          viewBox="0 0 32 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M29.5052 21.4016V15.431C29.5052 14.4075 28.7743 13.7251 27.678 13.7251C26.5817 13.7251 25.8508 14.4075 25.8508 15.431V21.4016C25.8508 23.7898 23.8408 25.6663 21.2827 25.6663H8.49212C5.934 25.6663 3.92405 23.7898 3.92405 21.4016V9.46041C3.92405 7.07217 5.934 5.1957 8.49212 5.1957H14.8874C15.9838 5.1957 16.7146 4.51335 16.7146 3.48982C16.7146 2.46629 15.9838 1.78394 14.8874 1.78394H8.49212C3.92405 1.78394 0.269592 5.1957 0.269592 9.46041V21.4016C0.269592 25.6663 3.92405 29.0781 8.49212 29.0781H21.2827C25.8508 29.0781 29.5052 25.6663 29.5052 21.4016Z"
                            fill="white"
                          />
                          <path
                            d="M31.3325 10.3134V1.78401C31.3325 1.61342 31.3325 1.27224 31.1497 1.10165C30.967 0.760478 30.6016 0.419301 30.2361 0.248713C30.0534 0.0781248 29.688 0.078125 29.5052 0.078125H20.7345C19.6382 0.078125 18.9073 0.760478 18.9073 1.78401C18.9073 2.80754 19.6382 3.48989 20.7345 3.48989H25.1199L13.6083 14.2369C12.8775 14.9193 12.8775 15.9428 13.6083 16.6252C13.9738 16.9664 14.522 17.1369 14.8874 17.1369C15.2529 17.1369 15.801 16.9664 16.1665 16.6252L27.678 5.87813V10.3134C27.678 11.3369 28.4089 12.0193 29.5052 12.0193C30.6016 12.0193 31.3325 11.3369 31.3325 10.3134Z"
                            fill="white"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-[150px] relative">
        <div className="container mx-auto">
          <h2 className="text-white font-bold text-[32px] md:text-[40px] text-center">
            How It Works
          </h2>

          <div className="flex-col items-center justify-center">
            {/* steps  */}
            <div className="flex ml-[250px] -z-[10]">
              <div className="relative w-[336.11px] h-[138px] rounded-[20px] border-t-[4px] border-r-[4px] border-l-[4px] border-b-0 border-solid [border-image:linear-gradient(180deg,#30126F_0%,#6F23D5_50%)_1] top-[140px] left-[171px]"></div>
              <div className="relative w-[336.11px] h-[138px] rounded-[20px] border-t-[4px] border-r-[4px] border-l-[4px] border-b-0 border-solid [border-image:linear-gradient(180deg,#30126F_0%,#6F23D5_50%)_1] top-[140px] left-[171px]"></div>
            </div>

            {/* cards  */}
            <div className="flex items-center justify-center gap-[30px] flex-wrap mx-auto mt-[60px] z-1">
              {[1, 1, 1].map((item, index) => (
                <div className="w-[317px] bg-[#0B0B1A4D] rounded-[10px] flex flex-col items-center justify-center gap-[30px] p-[45px] border-2 border-[#141429] ">
                  <svg
                    width="81"
                    height="81"
                    viewBox="0 0 81 81"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="0.578125"
                      width="79"
                      height="79"
                      rx="11.5"
                      fill="#150F3E"
                    />
                    <rect
                      x="1"
                      y="0.578125"
                      width="79"
                      height="79"
                      rx="11.5"
                      stroke="url(#paint0_linear_11_1952)"
                    />
                    <mask
                      id="mask0_11_1952"
                      // style="mask-type:luminance"
                      maskUnits="userSpaceOnUse"
                      x="16"
                      y="15"
                      width="49"
                      height="50"
                    >
                      <path
                        d="M65 15.5781H16V64.5781H65V15.5781Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_11_1952)">
                      <path
                        d="M39.853 51.819L40.3583 51.2173C40.9149 50.5542 41.9049 50.4677 42.5679 51.0243L43.7715 52.0342C44.4345 52.5908 44.521 53.5807 43.9652 54.2438L43.4599 54.8455L38.9205 60.2478C37.4306 62.0195 35.2271 63.0469 32.9142 63.0469C31.0721 63.0469 29.2843 62.3961 27.8725 61.2125L21.867 56.1708C20.0953 54.6809 19.0678 52.4782 19.0678 50.1569C19.0678 48.3148 19.7186 46.5347 20.9107 45.1236L29.9818 34.3191C29.9818 34.3115 29.9818 34.3115 29.9818 34.3115C31.4717 32.5398 33.6752 31.52 35.9881 31.52C37.8302 31.52 39.618 32.1708 41.029 33.3552L44.0004 35.8481L44.5968 36.3511C45.2591 36.9085 45.3448 37.9 44.7882 38.563L43.7853 39.7589C43.2294 40.4219 42.2395 40.5085 41.5764 39.9526L40.9747 39.4473L38.0025 36.9537C37.4382 36.4836 36.7247 36.2248 35.9881 36.2248C35.0625 36.2248 34.1843 36.6321 33.5887 37.338L24.5091 48.1502C24.039 48.7144 23.7726 49.428 23.7726 50.1653C23.7726 51.0902 24.1876 51.9683 24.8935 52.564L30.899 57.6056C31.4641 58.0841 32.1776 58.3429 32.9142 58.3429C33.8398 58.3429 34.718 57.9348 35.3136 57.2213L39.853 51.819Z"
                        fill="white"
                      />
                      <path
                        d="M41.1477 28.3373L40.6424 28.939C40.0866 29.6021 39.0966 29.6886 38.4336 29.132L37.2292 28.1221C36.5662 27.5655 36.4797 26.5756 37.0363 25.9125L37.5416 25.3108L42.081 19.9085C43.5709 18.1368 45.7736 17.1094 48.0866 17.1094C49.9294 17.1094 51.7172 17.7602 53.1282 18.9438L59.1338 23.9855C60.9062 25.4754 61.9329 27.6781 61.9329 29.9994C61.9329 31.8415 61.2821 33.6216 60.0908 35.0327L51.0189 45.8372C51.0189 45.8448 51.0189 45.8448 51.0189 45.8448C49.529 47.6165 47.3263 48.6363 45.0133 48.6363C43.1705 48.6363 41.3828 47.9855 39.9717 46.8011L37.0003 44.3082L36.4039 43.8052C35.7424 43.2478 35.6566 42.2563 36.2125 41.5933L37.2155 40.3974C37.7721 39.7344 38.7613 39.6478 39.4243 40.2037L40.0268 40.709L42.9982 43.2026C43.5625 43.6727 44.2761 43.9315 45.0133 43.9315C45.9382 43.9315 46.8164 43.5242 47.4128 42.8183L56.4916 32.0061C56.9625 31.4419 57.2289 30.7283 57.2289 29.991C57.2289 29.0661 56.8132 28.188 56.1073 27.5923L50.1017 22.5507C49.5374 22.0722 48.8239 21.8134 48.0866 21.8134C47.1617 21.8134 46.2835 22.2215 45.6879 22.935L41.1477 28.3373Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_11_1952"
                        x1="0.5"
                        y1="40.0781"
                        x2="80.5"
                        y2="40.0781"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#324AB9" />
                        <stop offset="1" stop-color="#4B158E" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <p className="text-white text-[26px] font-bold ">
                    100% On-chain
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Parker Pool */}
      <div className="mt-[150px] relative">
        <div className="container mx-auto">
          <div className=" w-full md:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto border-2 border-[#141429] rounded-[10px] bg-[#0B0B1A4D] backdrop-blur-[100px] px-[40px] md:px-[100px] py-[54px]">
            {/* Title */}
            <h2 className="text-white font-bold text-[32px] md:text-[40px] text-center">
              The Parker Pool
            </h2>

            {/* Subtitle */}
            <p className="text-white text-[20px] md:text-[26px] mt-5 text-center">
              Already <span className="text-[#7D40FF]">4,405,726</span> Carbon
              Credit Tokens pooled in — growing every second.
            </p>

            {/* Image with Centered Text */}
            <div className="relative flex justify-center items-center mt-8">
              <img
                src="svgs/parker-pool.svg"
                alt="Parker Pool"
                className="w-full max-w-[400px] h-auto"
              />
              <span className="absolute text-[24px] md:text-[30px] text-white font-bold text-center top-1/4 left-1/2 -translate-x-1/2 translate-y-[80px]">
                4,405,726
              </span>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative inline-flex rounded-[12px] text-white text-center p-[1px] mt-8 mx-auto">
                <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                <div className="relative rounded-[12px] bg-[#00000e] px-[32px] md:px-[48px] py-[13px]">
                  View Pool on Explorer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why C-Parker */}
      <div className="mt-[150px] relative">
        <div className="container mx-auto">
          <h2 className="text-white font-bold text-[56px] text-center">
            Why C-Parker
          </h2>

          <div className="flex items-center justify-center gap-[30px] flex-wrap w-[50%] mx-auto mt-[60px]">
            {[1, 1, 1, 1].map((item, index) => (
              <div className=" bg-[#0B0B1A4D] rounded-[10px] flex flex-col items-center justify-center gap-[30px] p-[45px] border-2 border-[#141429] ">
                <svg
                  width="81"
                  height="81"
                  viewBox="0 0 81 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="0.578125"
                    width="79"
                    height="79"
                    rx="11.5"
                    fill="#150F3E"
                  />
                  <rect
                    x="1"
                    y="0.578125"
                    width="79"
                    height="79"
                    rx="11.5"
                    stroke="url(#paint0_linear_11_1952)"
                  />
                  <mask
                    id="mask0_11_1952"
                    // style="mask-type:luminance"
                    maskUnits="userSpaceOnUse"
                    x="16"
                    y="15"
                    width="49"
                    height="50"
                  >
                    <path d="M65 15.5781H16V64.5781H65V15.5781Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_11_1952)">
                    <path
                      d="M39.853 51.819L40.3583 51.2173C40.9149 50.5542 41.9049 50.4677 42.5679 51.0243L43.7715 52.0342C44.4345 52.5908 44.521 53.5807 43.9652 54.2438L43.4599 54.8455L38.9205 60.2478C37.4306 62.0195 35.2271 63.0469 32.9142 63.0469C31.0721 63.0469 29.2843 62.3961 27.8725 61.2125L21.867 56.1708C20.0953 54.6809 19.0678 52.4782 19.0678 50.1569C19.0678 48.3148 19.7186 46.5347 20.9107 45.1236L29.9818 34.3191C29.9818 34.3115 29.9818 34.3115 29.9818 34.3115C31.4717 32.5398 33.6752 31.52 35.9881 31.52C37.8302 31.52 39.618 32.1708 41.029 33.3552L44.0004 35.8481L44.5968 36.3511C45.2591 36.9085 45.3448 37.9 44.7882 38.563L43.7853 39.7589C43.2294 40.4219 42.2395 40.5085 41.5764 39.9526L40.9747 39.4473L38.0025 36.9537C37.4382 36.4836 36.7247 36.2248 35.9881 36.2248C35.0625 36.2248 34.1843 36.6321 33.5887 37.338L24.5091 48.1502C24.039 48.7144 23.7726 49.428 23.7726 50.1653C23.7726 51.0902 24.1876 51.9683 24.8935 52.564L30.899 57.6056C31.4641 58.0841 32.1776 58.3429 32.9142 58.3429C33.8398 58.3429 34.718 57.9348 35.3136 57.2213L39.853 51.819Z"
                      fill="white"
                    />
                    <path
                      d="M41.1477 28.3373L40.6424 28.939C40.0866 29.6021 39.0966 29.6886 38.4336 29.132L37.2292 28.1221C36.5662 27.5655 36.4797 26.5756 37.0363 25.9125L37.5416 25.3108L42.081 19.9085C43.5709 18.1368 45.7736 17.1094 48.0866 17.1094C49.9294 17.1094 51.7172 17.7602 53.1282 18.9438L59.1338 23.9855C60.9062 25.4754 61.9329 27.6781 61.9329 29.9994C61.9329 31.8415 61.2821 33.6216 60.0908 35.0327L51.0189 45.8372C51.0189 45.8448 51.0189 45.8448 51.0189 45.8448C49.529 47.6165 47.3263 48.6363 45.0133 48.6363C43.1705 48.6363 41.3828 47.9855 39.9717 46.8011L37.0003 44.3082L36.4039 43.8052C35.7424 43.2478 35.6566 42.2563 36.2125 41.5933L37.2155 40.3974C37.7721 39.7344 38.7613 39.6478 39.4243 40.2037L40.0268 40.709L42.9982 43.2026C43.5625 43.6727 44.2761 43.9315 45.0133 43.9315C45.9382 43.9315 46.8164 43.5242 47.4128 42.8183L56.4916 32.0061C56.9625 31.4419 57.2289 30.7283 57.2289 29.991C57.2289 29.0661 56.8132 28.188 56.1073 27.5923L50.1017 22.5507C49.5374 22.0722 48.8239 21.8134 48.0866 21.8134C47.1617 21.8134 46.2835 22.2215 45.6879 22.935L41.1477 28.3373Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_11_1952"
                      x1="0.5"
                      y1="40.0781"
                      x2="80.5"
                      y2="40.0781"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#324AB9" />
                      <stop offset="1" stop-color="#4B158E" />
                    </linearGradient>
                  </defs>
                </svg>

                <p className="text-white text-[26px] font-bold ">
                  100% On-chain
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-[150px] relative ">
        <div className="container mx-auto px-12 ">
          <div className=" bg-[#0B0B1A4D] rounded-[10px] p-[45px] border-2 border-[#141429] ">
            <p className="text-white text-[26px] text-center w-[55%] mx-auto ">
              Be part of the Parker journey. Join thousands already earning in
              Carbon Credit Token.
            </p>

            <div className="flex items-center justify-center gap-[30px] mt-[30px]">
              {[1, 1, 1].map((item, index) => (
                <div className="relative rounded-[12px] flex items-center justify-center gap-[20px] text-white p-[1px]">
                  <div className="absolute inset-0 rounded-[12px] p-[1px] bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                  <div className="relative w-full h-full rounded-[12px] bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-[38px] py-[9px] flex items-center justify-center gap-5 ">
                    <svg
                      width="34"
                      height="32"
                      viewBox="0 0 34 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32.8645 0.808899C32.4244 0.44347 31.8934 0.203973 31.3278 0.115896C30.7623 0.0278188 30.1834 0.0944568 29.6527 0.308719L1.95607 11.4712C1.36376 11.7144 0.859568 12.1318 0.510415 12.6678C0.161262 13.2038 -0.0163398 13.8331 0.00118225 14.4722C0.0187043 15.1113 0.230522 15.73 0.60852 16.2461C0.986518 16.7623 1.51282 17.1514 2.11757 17.362L7.71999 19.307L10.8427 29.6152C10.8851 29.7529 10.9467 29.884 11.0256 30.0046C11.0376 30.0231 11.0545 30.0369 11.0672 30.0549C11.1584 30.1819 11.2686 30.2942 11.394 30.3878C11.4296 30.4149 11.4638 30.4403 11.5019 30.4644C11.6486 30.5616 11.8111 30.6326 11.9821 30.6744L12.0004 30.6759L12.0108 30.6804C12.1136 30.7013 12.2183 30.7119 12.3232 30.712C12.3333 30.712 12.3423 30.7072 12.3523 30.707C12.5106 30.7043 12.6676 30.677 12.8176 30.6263C12.8525 30.6144 12.8824 30.5946 12.9163 30.5803C13.0281 30.534 13.1341 30.4747 13.232 30.4035C13.3104 30.3376 13.3888 30.2717 13.4673 30.2058L17.6434 25.6031L23.8722 30.4197C24.4206 30.8459 25.0955 31.0776 25.7905 31.0781C26.5187 31.0772 27.2244 30.8264 27.7894 30.3677C28.3544 29.9091 28.7442 29.2705 28.8936 28.5591L33.936 3.84924C34.0503 3.2931 34.011 2.71642 33.8222 2.18088C33.6335 1.64534 33.3024 1.1711 32.8645 0.808899ZM12.936 19.7982C12.7217 20.0113 12.5753 20.2828 12.515 20.5786L12.0366 22.8989L10.8248 18.8984L17.1077 15.6325L12.936 19.7982ZM25.7664 27.9805L18.4056 22.2886C18.0977 22.051 17.7114 21.938 17.3237 21.9721C16.936 22.0061 16.5754 22.1848 16.3138 22.4724L14.9763 23.946L15.449 21.6528L26.3957 10.7254C26.657 10.4649 26.8162 10.1196 26.8445 9.75206C26.8727 9.38452 26.7682 9.01903 26.5498 8.72179C26.3314 8.42455 26.0136 8.21522 25.6539 8.13171C25.2942 8.0482 24.9165 8.09605 24.5891 8.26657L8.87873 16.4319L3.12275 14.3292L30.9084 3.233L25.7664 27.9805Z"
                        fill="white"
                      />
                    </svg>
                    <span className="text-white text-[26px] font-bold ">
                      Telegram
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer  */}
      <footer className="text-white py-[30px] mt-[150px]">
        <div>
          <h2 className="text-white font-bold text-[56px] text-center mb-[20px]">
            C-Parker
          </h2>
          <p className="text-white text-center mb-[30px]">
            C-Parker is a decentralized program. Payouts are instant, secured by{' '}
            <br />
            smart contracts. DYOR before participating.
          </p>
          <div className="flex items-center gap-10 w-fit mx-auto  mb-[30px]">
            <span>Home</span>
            <span>About</span>
            <span>Contact Us</span>
            <span>Support</span>
          </div>
          <p className="text-center">© 2025 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
