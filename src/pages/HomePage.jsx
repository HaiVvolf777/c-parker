import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext.jsx";
import { HomeNavbar, Hero, Stats, Verified, VideoAnnouncements, PlatformActivity, HowItWorks, ParkerPool, CTA, Footer as HomeFooter, Eclips } from "../components/home";

const HomePage = () => {
  const navigate = useNavigate();
  const { account } = useWallet();

  useEffect(() => {
    if (account) {
      navigate("/dashboard", { replace: true });
    }
  }, [account, navigate]);

  // Sync with system theme by toggling `dark` on <html>
  useEffect(() => {
    const m = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      if (m.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    apply();
    try {
      m.addEventListener('change', apply);
      return () => m.removeEventListener('change', apply);
    } catch (_) {
      m.addListener(apply);
      return () => m.removeListener(apply);
    }
  }, []);
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
    <div className="h-auto w-full relative bg-white text-[#0a0a0a] dark:bg-[#00000e] dark:text-white">
      <Eclips />
      <HomeNavbar />
      <div className="mt-6 md:mt-0 mx-6 md:mx-0">
        <Hero />
      </div>

      <Stats stats={statsData} />
      <Verified />

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
      <VideoAnnouncements />

      {/* Platform Activity  */}
      <PlatformActivity activity={activityData} />

       {/* How It Works */}
       <HowItWorks />

      {/* The Parker Pool */}
      <ParkerPool />

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
                className="bg-white dark:bg-[#0B0B1A4D] rounded-[10px] flex flex-col items-center justify-center border-2 border-gray-200 dark:border-[#141429] w-[280px] md:w-[317px] h-[220px] md:h-[242px]"
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

      <CTA socials={socials} />

      {/* Footer  */}
      <HomeFooter />
    </div>
  );
};

export default HomePage;
