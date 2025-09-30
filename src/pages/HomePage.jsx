import React from "react";

const HomePage = () => {
  const statsData = [
    {
      title: "Total Members",
      value: "12,345",
      subText: "+340 today",
      isCCT: false,
    },
    {
      title: "New Members (24h)",
      value: "245",
      subText: "joined today",
      isCCT: false,
    },
    {
      title: "CCT Earned (24hr)",
      value: "8,920",
      subText: "in Orbit A & B",
      isCCT: true,
    },
    {
      title: "Total CCT Earned",
      value: "1,245,000",
      subText: "across all users",
      isCCT: false,
    },
  ];

  const activityData = [
    {
      time: "1min",
      id: "#1023",
      event: "reached Level 4",
      plan: "Orbit A",
      details: "earned 250 CCT",
    },
    {
      time: "2min",
      id: "#876",
      event: "joined",
      plan: "Orbit B",
      details: "instant payout",
    },
    {
      time: "1min",
      id: "#1023",
      event: "reached Level 4",
      plan: "Orbit A",
      details: "earned 250 CCT",
    },
    {
      time: "2min",
      id: "#876",
      event: "joined",
      plan: "Orbit B",
      details: "instant payout",
    },
    {
      time: "2min",
      id: "#876",
      event: "joined",
      plan: "Orbit B",
      details: "instant payout",
    },
  ];

  const features = [
    {
      image: "svgs/onchain.svg",
      text: "100% On-chain",
    },
    {
      image: "svgs/star.svg",
      text: "High Security",
    },
    {
      image: "svgs/wallet.svg",
      text: "Fast Transactions",
    },
    {
      image: "svgs/rocket.svg",
      text: "Strong Community",
    },
  ];

  const socials = [
    {
      label: "Telegram",
      icon: "svgs/telegram.svg",
    },
    {
      label: "Discord",
      icon: "svgs/discord.svg",
    },
    {
      label: "Twitter",
      icon: "svgs/twitter.svg",
    },
  ];

  return (
    <div className="h-auto w-full relative">
      {/* Eclips */}
      <img
        src="svgs/top-eclips.svg"
        className="absolute -top-[100px] left-[8%] rotate-[180] z-1 hidden md:block"
        alt=""
      />

      {/* Navbar  */}
      <div className="container mx-auto bg-transparent min-h-[70px] p-3 flex flex-col gap-3 md:flex-row md:justify-between md:items-center border-2 border-[#21213C] rounded-xl backdrop-blur-[60px] mt-[20px] md:mt-[37px] relative z-[10]">
        <div className="flex items-center justify-between">
          <img
            src="images/logo.png"
            alt="C-Parker"
            className="h-8 md:h-10 w-auto"
          />
        </div>
        <div className="bg-[#00000666] w-full md:w-[496px] rounded-[10px] p-3">
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
              className="text-[#747474] bg-transparent outline-none w-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="relative rounded-xl p-[1px] w-full sm:w-auto">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
            <div className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-6 md:px-10 py-2 text-[16px] md:text-[20px] text-white keep-white font-bold text-center">
              Connect Wallet
            </div>
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="w-full min-h-[70vh] md:h-[100vh] relative">
        {/* Background Image */}
        <img
          src="images/hero-right.png"
          className="absolute right-0 -top-[50px] z-0 hidden md:block"
          alt=""
        />

        {/* Content */}
        <div className="container mx-auto h-full relative z-[10]">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-8 md:gap-10 py-10 md:py-0">
            <div>
              <h1 className="text-white font-bold text-[36px] leading-[42px] md:text-[72px] md:leading-[70px]">
                Earn at the <br /> Speed of Parker
              </h1>
              <p className="text-white text-[18px] md:text-[26px] my-[20px] md:my-[30px]">
                Decentralized Orbit A & Orbit B plans powered by <br />
                Carbon Credit Token (CCT). Instant payouts, <br />
                secured on-chain.
              </p>

              <button className="relative rounded-xl p-[1px] w-full sm:w-auto">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                <div className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-6 md:px-10 py-2 text-[18px] md:text-[26px] text-white keep-white font-bold text-center">
                  Join Now
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Members Stats  */}
      <div className="w-full py-[80px] md:py-[150px] ">
        <div className="container mx-auto px-6 md:px-[54px] py-10 bg-[#0B0B1A4D] border-2 border-[#141429] rounded-[10px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
            {statsData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 items-center justify-center "
              >
                <span className="text-[16px] md:text-[22px] font-semibold text-center  text-white ">
                  {item.title}
                </span>
                <div className="relative">
                  <span className="text-[28px] md:text-[45px] font-semibold text-center text-[#7D40FF] ">
                    {item.value}
                  </span>
                  {item.isCCT && (
                    <span className="text-[16px] md:text-[26px] font-semibold text-center text-[#747474] absolute bottom-0  ">
                      CCT
                    </span>
                  )}
                </div>
                <span className="text-[14px] md:text-[18px] font-semibold text-center text-[#747474] ">
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

        <div className="container mx-auto px-6">
          <h2 className="text-white font-bold text-[36px] md:text-[56px] text-center">
            Verified on Blockchain
          </h2>

          <p className="text-white text-[18px] md:text-[26px] mt-5 text-center">
            Transparent. Immutable. All payouts flow directly <br /> to your
            wallet — no delays, no intermediaries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[30px] mt-[40px] md:mt-[80px] px-0 md:px-[45px] ">
            {[1, 2].map((_, index) => (
              <div className="p-8 rounded-[10px] bg-[#0B0B1A4D] border-2 border-[#141429] backdrop-blur-[30px] ">
                <div className="flex items-center gap-3">
                  <img src="icons/orbit-icon.png" alt="" />
                  <span className="text-white text-[24px] md:text-[36px] font-semibold">
                    Orbit {index === 0 ? "A" : "B"}
                  </span>
                </div>

                <div className="rounded-[10px] border-[1px] border-white px-3 md:px-4 py-3 flex items-center justify-between my-[20px] md:my-[30px] overflow-hidden">
                  <span className="text-white text-[14px] md:text-[24px] truncate ">
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
                  <span className="text-white text-[16px] md:text-[24px] ">
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
      <div className="mt-[100px] md:mt-[150px]">
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
      <div className="mt-[100px] md:mt-[150px] relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-white font-bold text-[28px] sm:text-[40px] md:text-[56px] text-center">
            Video & Announcements
          </h2>

          <p className="text-white text-[16px] sm:text-[20px] md:text-[26px] mt-5 text-center leading-relaxed">
            Stay updated with the latest news and learn more about{" "}
            <br className="hidden md:block" />
            how C-Parker works.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[60px] mt-10 md:mt-20">
            {/* Left: Video */}
            <div>
              <div className="relative inline-block mb-[20px] md:mb-[30px] w-full">
                <img
                  src="images/video-thumbnail.png"
                  alt="Video Thumbnail"
                  className="block w-full h-auto rounded-lg"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#00000099] border border-[#141429] flex items-center justify-center rounded-lg">
                  <img
                    src="icons/play.svg"
                    alt="Play Icon"
                    className="w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
              </div>

              <p className="text-white text-[20px] sm:text-[24px] md:text-[30px] leading-[32px] sm:leading-[40px] md:leading-[50px] font-bold">
                Watch: How to get started with Orbit A & Orbit B
              </p>
            </div>

            {/* Right: Announcements */}
            <div>
              {[
                "Orbit B Update – Faster payout cycle enabled.",
                "Community AMA – Join us on Telegram.",
                "Parker Pool milestone: 5,000,000 CCT pooled!",
                "UI improvements - Performance updates & more",
              ].map((item, idx) => (
                <div key={idx} className="mb-[15px]">
                  <span className="text-[#7D40FF] text-sm sm:text-base">
                    08/01
                  </span>
                  <p className="text-white w-full md:w-[60%] text-[16px] sm:text-[18px] md:text-[20px] my-[8px]">
                    {item}
                  </p>
                  {idx < 3 && <hr className="text-[#7474744D]" />}
                </div>
              ))}

              <button className="relative rounded-xl p-[2px] my-[20px]">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                <div className="relative rounded-xl bg-[#00000e] px-5 sm:px-7 py-3 sm:py-4 text-white font-bold text-sm sm:text-base">
                  View All Announcements
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Activity  */}
      <div className="my-[100px] md:my-[150px] relative">
        <div className="container mx-auto px-6">
          <h3 className="text-white font-bold text-[28px] md:text-[40px]">
            Platform Activity (Live Updates)
          </h3>

          <p className="text-white text-[16px] md:text-[26px] mt-3 md:mt-5">
            Track user growth and payouts happening live.
          </p>

          {/* table  */}
          <div className="mt-[40px] md:mt-[60px] text-white overflow-x-auto">
            <div className="border-2 border-[#141429] rounded-[10px] bg-[#0B0B1A4D] backdrop-blur-[30px] px-4 md:px-[44px] min-w-max">
              <table className="w-full min-w-[800px]">
                <thead className="*:pt-[20px] md:*:pt-[44px] *:pb-[20px] md:*:pb-[30px] border-b-1 border-[#141429] px-4 md:px-[42px] *:text-[16px] md:*:text-[26px] *:text-[#747474] *:font-[400] ">
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
                      className="*:py-[16px] md:*:py-[30px] border-b-1 border-[#141429] text-center *:text-[16px] md:*:text-[24px] *:text-white "
                    >
                      {/* Left Icon */}
                      <td>
                        <svg
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
                            d="M41.733 28.7885C41.4356 28.7885 41.1505 28.6704 40.9402 28.4602C40.73 28.2499 40.6119 27.9647 40.6119 27.6674V24.4385C40.6539 23.8032 40.4441 23.1768 40.0278 22.6951C39.6115 22.2133 39.0222 21.9148 38.3875 21.8644H18.9872C18.6899 21.8644 18.4047 21.7462 18.1945 21.536C17.9842 21.3257 17.8661 21.0406 17.8661 20.7432C17.8661 20.4459 17.9842 20.1607 18.1945 19.9504C18.4047 19.7402 18.6899 19.6221 18.9872 19.6221H38.3875C39.6191 19.6665 40.7829 20.1975 41.6236 21.0988C42.4643 22 42.9132 23.1978 42.8721 24.4295V27.6584C42.8733 27.8079 42.8446 27.9562 42.7877 28.0944C42.7307 28.2327 42.6467 28.3581 42.5406 28.4634C42.4345 28.5687 42.3083 28.6517 42.1696 28.7076C42.0309 28.7634 41.8825 28.7909 41.733 28.7885Z"
                            fill="#01F1E3"
                          />
                          <path
                            d="M38.3874 43.1029H18.9872C17.7555 43.0585 16.5918 42.5275 15.7511 41.6263C14.9104 40.7251 14.4614 39.5272 14.5026 38.2955V18.0611C14.5026 17.7637 14.6207 17.4786 14.831 17.2683C15.0412 17.0581 15.3264 16.9399 15.6237 16.9399C15.9211 16.9399 16.2063 17.0581 16.4165 17.2683C16.6268 17.4786 16.7449 17.7637 16.7449 18.0611V38.2955C16.7029 38.9299 16.913 39.5552 17.3295 40.0356C17.746 40.5159 18.3353 40.8124 18.9692 40.8607H38.3874C39.0214 40.8124 39.6107 40.5159 40.0272 40.0356C40.4437 39.5552 40.6538 38.9299 40.6118 38.2955V36.0173C40.6118 35.72 40.7299 35.4348 40.9402 35.2246C41.1504 35.0143 41.4356 34.8962 41.7329 34.8962C42.0303 34.8962 42.3154 35.0143 42.5257 35.2246C42.736 35.4348 42.8541 35.72 42.8541 36.0173V38.2955C42.8953 39.5242 42.4488 40.7194 41.612 41.6201C40.7751 42.5208 39.6159 43.0539 38.3874 43.1029Z"
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

                      {/* Time */}
                      <td>{item.time}</td>

                      {/* ID */}
                      <td>
                        <span className="text-white bg-[#00000D] px-[20px] md:px-[35px] py-2 rounded-[40px] text-[16px] md:text-[24px]">
                          {item.id}
                        </span>
                      </td>

                      {/* Event */}
                      <td>{item.event}</td>

                      {/* Plan */}
                      <td>
                        <span className="relative inline-block rounded-md p-[1px]">
                          <span className="absolute inset-0 rounded-md bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></span>
                          <span className="relative block rounded-md bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-3 md:px-4 py-2 text-white keep-white text-[14px] md:text-[20px] font-semibold">
                            {item.plan}
                          </span>
                        </span>
                      </td>

                      {/* Details */}
                      <td>{item.details}</td>

                      {/* Right Icon */}
                      <td>
                        <svg
                          className="mx-auto"
                          width="32"
                          height="30"
                          viewBox="0 0 32 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* … keep your right icon paths … */}
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
      <div className="mt-[100px] md:mt-[150px] relative">
        <div className="container mx-auto px-6 relative">
          <h2 className="text-white font-bold text-[28px] md:text-[40px] text-center">
            How It Works
          </h2>

          <div className="relative flex flex-col items-center justify-center">
            {/* cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] sm:gap-[20px] md:gap-[30px] mx-auto mt-[40px] md:mt-[60px] z-10 w-full max-w-[1024px]">
              {[1, 1, 1].map((item, index) => (
                <div
                  key={index}
                  className="w-full bg-[#0808084d] rounded-[10px] flex flex-col items-center justify-center gap-[16px] sm:gap-[20px] md:gap-[30px] p-[20px] sm:p-[24px] md:p-[45px] border-2 border-[#141429]"
                >
                  {/* icon */}
                  <svg
                    width="80"
                    height="81"
                    viewBox="0 0 80 81"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.578125"
                      width="79"
                      height="79"
                      rx="11.5"
                      fill="url(#paint0_linear_11_1881)"
                    />
                    <rect
                      x="0.5"
                      y="0.578125"
                      width="79"
                      height="79"
                      rx="11.5"
                      stroke="url(#paint1_linear_11_1881)"
                    />
                    <path
                      d="M52.1272 40.2826C51.8199 40.2826 51.5251 40.1605 51.3078 39.9432C51.0905 39.7259 50.9684 39.4311 50.9684 39.1238V35.7864C51.0119 35.1297 50.795 34.4823 50.3647 33.9844C49.9345 33.4864 49.3254 33.1779 48.6693 33.1257H28.6171C28.3097 33.1257 28.015 33.0037 27.7977 32.7863C27.5803 32.569 27.4583 32.2743 27.4583 31.9669C27.4583 31.6596 27.5803 31.3648 27.7977 31.1475C28.015 30.9302 28.3097 30.8081 28.6171 30.8081H48.6693C49.9423 30.854 51.1452 31.4029 52.0141 32.3344C52.8831 33.2659 53.3471 34.504 53.3046 35.7771V39.1145C53.3058 39.2691 53.2762 39.4223 53.2173 39.5652C53.1585 39.7081 53.0717 39.8378 52.962 39.9466C52.8523 40.0554 52.7219 40.1412 52.5785 40.1989C52.4352 40.2566 52.2817 40.2851 52.1272 40.2826Z"
                      fill="white"
                    />
                    <path
                      d="M48.6693 55.0784H28.6171C27.344 55.0324 26.1411 54.4836 25.2722 53.5521C24.4033 52.6206 23.9392 51.3825 23.9818 50.1093V29.195C23.9818 28.8876 24.1039 28.5929 24.3212 28.3755C24.5385 28.1582 24.8333 28.0361 25.1406 28.0361C25.4479 28.0361 25.7427 28.1582 25.96 28.3755C26.1773 28.5929 26.2994 28.8876 26.2994 29.195V50.1093C26.256 50.7651 26.4731 51.4114 26.9037 51.9079C27.3342 52.4044 27.9433 52.7109 28.5985 52.7607H48.6693C49.3245 52.7109 49.9336 52.4044 50.3641 51.9079C50.7947 51.4114 51.0118 50.7651 50.9684 50.1093V47.7546C50.9684 47.4473 51.0905 47.1525 51.3078 46.9352C51.5251 46.7179 51.8199 46.5958 52.1272 46.5958C52.4345 46.5958 52.7293 46.7179 52.9466 46.9352C53.1639 47.1525 53.286 47.4473 53.286 47.7546V50.1093C53.3287 51.3794 52.8671 52.6148 52.0022 53.5457C51.1372 54.4767 49.939 55.0277 48.6693 55.0784Z"
                      fill="white"
                    />
                    <path
                      d="M48.1965 33.1255C47.8923 33.1255 47.6004 33.006 47.3836 32.7926C47.1668 32.5793 47.0425 32.2893 47.0377 31.9852V29.4172C47.0159 28.8672 46.7776 28.3481 46.3748 27.973C45.9719 27.5979 45.4371 27.3973 44.8869 27.4148H28.1999C27.7268 27.3972 27.2661 27.5679 26.9185 27.8893C26.571 28.2108 26.3651 28.6569 26.3458 29.1299C26.3651 29.6029 26.571 30.0489 26.9185 30.3704C27.2661 30.6918 27.7268 30.8625 28.1999 30.8449H38.3975C38.7048 30.8449 38.9996 30.967 39.2169 31.1843C39.4342 31.4016 39.5563 31.6964 39.5563 32.0037C39.5563 32.3111 39.4342 32.6058 39.2169 32.8231C38.9996 33.0405 38.7048 33.1626 38.3975 33.1626H28.1721C27.632 33.1711 27.0955 33.0731 26.5933 32.874C26.0911 32.6749 25.6332 32.3788 25.2457 32.0024C24.8582 31.6261 24.5487 31.177 24.335 30.6809C24.1213 30.1848 24.0076 29.6514 24.0003 29.1113C24.0198 28.0237 24.47 26.9882 25.2521 26.2322C26.0343 25.4761 27.0844 25.0613 28.1721 25.0786H44.8591C45.4397 25.0663 46.017 25.169 46.5578 25.3808C47.0985 25.5925 47.5921 25.9091 48.01 26.3124C48.4279 26.7156 48.7619 27.1976 48.9928 27.7304C49.2237 28.2633 49.3469 28.8366 49.3553 29.4172V31.9852C49.3504 32.2893 49.2262 32.5793 49.0094 32.7926C48.7926 33.006 48.5006 33.1255 48.1965 33.1255ZM52.8781 48.8854H46.4536C45.1987 48.9103 43.9853 48.4361 43.0797 47.567C42.1741 46.6979 41.6504 45.505 41.6236 44.2502V42.5722C41.6504 41.3173 42.1741 40.1244 43.0797 39.2553C43.9853 38.3862 45.1987 37.912 46.4536 37.9369H52.943C53.3484 37.9381 53.7496 38.0192 54.1237 38.1754C54.4978 38.3317 54.8374 38.5601 55.1232 38.8476C55.409 39.1352 55.6354 39.4762 55.7894 39.8512C55.9434 40.2262 56.0221 40.6279 56.0208 41.0333V45.8447C56.0062 46.6643 55.6672 47.4447 55.078 48.0147C54.4889 48.5847 53.6978 48.8978 52.8781 48.8854ZM46.4536 40.2638C45.8148 40.2387 45.1921 40.4673 44.7214 40.8998C44.2506 41.3323 43.9702 41.9336 43.9413 42.5722V44.2965C43.9702 44.9351 44.2506 45.5363 44.7214 45.9688C45.1921 46.4014 45.8148 46.63 46.4536 46.6049H52.8781C53.0806 46.6049 53.2749 46.5251 53.419 46.3828C53.563 46.2405 53.6451 46.0471 53.6476 45.8447V41.0333C53.642 40.8482 53.5657 40.6724 53.4343 40.5419C53.3648 40.4693 53.2814 40.4113 53.189 40.3715C53.0967 40.3317 52.9972 40.3108 52.8967 40.3102L46.4536 40.2638Z"
                      fill="white"
                    />
                    <path
                      d="M47.0934 44.5935C47.7334 44.5935 48.2522 44.0747 48.2522 43.4347C48.2522 42.7947 47.7334 42.2759 47.0934 42.2759C46.4534 42.2759 45.9345 42.7947 45.9345 43.4347C45.9345 44.0747 46.4534 44.5935 47.0934 44.5935Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_11_1881"
                        x1="0"
                        y1="40.0781"
                        x2="80"
                        y2="40.0781"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#150F3E" />
                        <stop offset="0.5" stop-color="#200F46" />
                        <stop offset="1" stop-color="#3A126F" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_11_1881"
                        x1="0"
                        y1="40.0781"
                        x2="80"
                        y2="40.0781"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#324AB9" />
                        <stop offset="1" stop-color="#4B158E" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <p className="text-white text-[20px] md:text-[26px] font-bold">
                    100% On-chain
                  </p>
                </div>
              ))}
            </div>

            {/* steps (behind cards) */}
            <div className="max-lg:hidden">
              <div className="w-1/4 h-15 absolute left-[25%] top-0 rounded-t-3xl border-t-4 border-x-4 border-solid border-[#6F23D5] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] -z-10"></div>
              <div className="w-1/4 h-15 absolute left-[50%] top-0 rounded-t-3xl border-t-4 border-x-4 border-solid border-[#6F23D5] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* The Parker Pool */}
      <div className="mt-[100px] md:mt-[150px] relative">
        <div className="container mx-auto px-6">
          <div className=" w-full md:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto border-2 border-[#141429] rounded-[10px] bg-[#0B0B1A4D] backdrop-blur-[100px] px-[24px] md:px-[100px] py-[40px] md:py-[54px]">
            {/* Title */}
            <h2 className="text-white font-bold text-[28px] md:text-[40px] text-center">
              The Parker Pool
            </h2>

            {/* Subtitle */}
            <p className="text-white text-[16px] md:text-[26px] mt-5 text-center">
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
              <span className="absolute text-[20px] md:text-[30px] text-white font-bold text-center top-1/4 left-1/2 -translate-x-1/2 translate-y-[80px]">
                4,405,726
              </span>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative inline-flex rounded-[12px] text-white text-center p-[1px] mt-8 mx-auto">
                <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                <div className="relative rounded-[12px] bg-[#00000e] px-[24px] md:px-[48px] py-[13px] text-[14px] md:text-[16px]">
                  View Pool on Explorer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why C-Parker */}
      <div className="mt-[150px] relative">
        <div className="container mx-auto px-6">
          <h2 className="text-white font-bold text-[36px] md:text-[56px] text-center">
            Why C-Parker
          </h2>

          <div className="flex flex-wrap justify-center gap-[20px] md:gap-[30px] mt-[40px] md:mt-[80px] px-0 md:px-[45px] max-w-[800px] mx-auto">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-[#0B0B1A4D] rounded-[10px] flex flex-col items-center justify-center border-2 border-[#141429] w-[280px] md:w-[317px] h-[220px] md:h-[242px]"
              >
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-[64px] h-[64px] md:w-[81px] md:h-[81px]"
                />

                <p className="text-white text-[20px] md:text-[26px] font-bold">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-[100px] md:mt-[150px] relative ">
        <div className="container mx-auto px-6 ">
          <div className=" bg-[#0B0B1A4D] rounded-[10px] p-[24px] md:p-[45px] border-2 border-[#141429] ">
            <p className="text-white text-[18px] md:text-[26px] text-center w-full md:w-[70%] lg:w-[55%] mx-auto ">
              Be part of the Parker journey. Join thousands already earning in
              Carbon Credit Token.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-[16px] md:gap-[30px] mt-[20px] md:mt-[30px]">
              {socials.map((item, index) => (
                <div
                  key={index}
                  className="relative rounded-[12px] flex items-center justify-center gap-[12px] md:gap-[20px] text-white p-[1px]"
                >
                  <div className="absolute inset-0 rounded-[12px] p-[1px] bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
                  <div className="relative w-full h-full rounded-[12px] bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-[20px] md:px-[38px] py-[9px] flex items-center justify-center gap-3 md:gap-5">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-[24px] h-[24px] md:w-[34px] md:h-[32px]"
                    />
                    <span className="text-white keep-white text-[18px] md:text-[26px] font-bold">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer  */}
      <footer className="text-white py-[30px] mt-[100px] md:mt-[150px]">
        <div>
          <h2 className="text-white font-bold text-[36px] md:text-[56px] text-center mb-[20px]">
            C-Parker
          </h2>
          <p className="text-white text-center text-[14px] md:text-[16px] mb-[30px] px-6">
            C-Parker is a decentralized program. Payouts are instant, secured by{" "}
            <br />
            smart contracts. DYOR before participating.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10 w-fit mx-auto mb-[30px] px-6">
            <span className="cursor-pointer">Home</span>
            <span className="cursor-pointer">About</span>
            <span className="cursor-pointer">Contact Us</span>
            <span className="cursor-pointer">Support</span>
          </div>
          <p className="text-center text-[12px] md:text-[14px]">
            © 2025 All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
