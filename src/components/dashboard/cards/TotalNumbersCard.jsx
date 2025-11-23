import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../../context/UserDataContext.jsx';

const formatNumber = (value, options = {}) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '--';
  }
  return new Intl.NumberFormat(undefined, options).format(value);
};

const toFloat = (value) => {
  if (value === null || value === undefined) return 0;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const computeEarningsRatio = (earnedString, missedString) => {
  const earned = toFloat(earnedString);
  const missed = toFloat(missedString);
  const total = earned + missed;
  if (total <= 0) return 0;
  return (earned / total) * 100;
};

const TotalNumbersCard = () => {
  const navigate = useNavigate();
  const { userStats, isLoading } = useUserData();

  const ratioValue = useMemo(() => {
    if (!userStats) return null;
    return computeEarningsRatio(userStats.ratioLast24h, userStats.totalMissed);
  }, [userStats]);

  const data = useMemo(() => ([
    {
      id: 1,
      title: 'Partners',
      total: userStats?.totalPartners ?? null,
      icon: (
        <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0.5" width="64" height="64" rx="32" fill="#01F1E3" fillOpacity="0.1" />
          <path d="M32.4014 32.7847C33.0814 32.187 33.6268 31.4477 34.0007 30.6171C34.3745 29.7864 34.568 28.8839 34.568 27.9706C34.568 26.2545 33.8966 24.6087 32.7016 23.3952C31.5065 22.1817 29.8857 21.5 28.1957 21.5C26.5056 21.5 24.8848 22.1817 23.6898 23.3952C22.4947 24.6087 21.8234 26.2545 21.8234 27.9706C21.8234 28.8839 22.0168 29.7864 22.3907 30.6171C22.7645 31.4477 23.3099 32.187 23.99 32.7847C22.2059 33.605 20.6922 34.9297 19.63 36.6005C18.5678 38.2712 18.0019 40.2172 18 42.2059C18 42.5491 18.1343 42.8783 18.3733 43.121C18.6123 43.3637 18.9365 43.5 19.2745 43.5C19.6125 43.5 19.9366 43.3637 20.1756 43.121C20.4146 42.8783 20.5489 42.5491 20.5489 42.2059C20.5489 40.1466 21.3546 38.1716 22.7886 36.7154C24.2226 35.2592 26.1676 34.4412 28.1957 34.4412C30.2237 34.4412 32.1687 35.2592 33.6027 36.7154C35.0368 38.1716 35.8424 40.1466 35.8424 42.2059C35.8424 42.5491 35.9767 42.8783 36.2157 43.121C36.4547 43.3637 36.7789 43.5 37.1169 43.5C37.4549 43.5 37.779 43.3637 38.018 43.121C38.2571 42.8783 38.3913 42.5491 38.3913 42.2059C38.3895 40.2172 37.8236 38.2712 36.7613 36.6005C35.6991 34.9297 34.1854 33.605 32.4014 32.7847ZM28.1957 31.8529C27.4395 31.8529 26.7003 31.6252 26.0715 31.1986C25.4428 30.772 24.9527 30.1657 24.6633 29.4563C24.3739 28.7469 24.2982 27.9663 24.4458 27.2132C24.5933 26.4601 24.9574 25.7683 25.4921 25.2254C26.0268 24.6824 26.7081 24.3126 27.4498 24.1628C28.1914 24.013 28.9602 24.0899 29.6588 24.3838C30.3574 24.6776 30.9546 25.1752 31.3747 25.8137C31.7948 26.4521 32.019 27.2027 32.019 27.9706C32.019 29.0003 31.6162 29.9877 30.8992 30.7158C30.1822 31.4439 29.2097 31.8529 28.1957 31.8529ZM40.6089 32.2671C41.4245 31.3344 41.9573 30.1823 42.1431 28.9494C42.3289 27.7165 42.1598 26.4553 41.6562 25.3176C41.1526 24.18 40.3359 23.2144 39.3044 22.5371C38.273 21.8598 37.0707 21.4997 35.8424 21.5C35.5044 21.5 35.1802 21.6363 34.9412 21.879C34.7022 22.1217 34.568 22.4509 34.568 22.7941C34.568 23.1373 34.7022 23.4665 34.9412 23.7092C35.1802 23.9519 35.5044 24.0882 35.8424 24.0882C36.8564 24.0882 37.8289 24.4973 38.5459 25.2254C39.263 25.9534 39.6658 26.9409 39.6658 27.9706C39.664 28.6503 39.4865 29.3176 39.151 29.9058C38.8155 30.494 38.3338 30.9825 37.7541 31.3224C37.5651 31.433 37.4073 31.5911 37.2958 31.7814C37.1842 31.9718 37.1226 32.188 37.1169 32.4094C37.1115 32.6291 37.1614 32.8466 37.2617 33.0413C37.3621 33.236 37.5096 33.4016 37.6904 33.5224L38.1874 33.8588L38.3531 33.9494C39.8893 34.6893 41.1853 35.8595 42.0885 37.3223C42.9917 38.7851 43.4644 40.4794 43.4509 42.2059C43.4509 42.5491 43.5852 42.8783 43.8242 43.121C44.0632 43.3637 44.3874 43.5 44.7254 43.5C45.0634 43.5 45.3876 43.3637 45.6266 43.121C45.8656 42.8783 45.9998 42.5491 45.9998 42.2059C46.0103 40.22 45.5204 38.2643 44.5769 36.5248C43.6333 34.7852 42.2674 33.3196 40.6089 32.2671Z" fill="#01F1E3" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Team',
      total: userStats?.totalTeamSize ?? null,
      icon: (
        <div className="text-[#01F1E3] bg-[#01F1E3]/10 rounded-full w-[64px] h-[64px] flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
            <path d="M19 13C20.1 13 21 12.1 21 11C21 9.9 20.1 9 19 9C17.9 9 17 9.9 17 11C17 12.1 17.9 13 19 13ZM19 14.5C17.62 14.5 14.5 15.25 14.5 16.75V18.5H23.5V16.75C23.5 15.25 20.38 14.5 19 14.5Z" fill="currentColor" />
            <path d="M5 13C6.1 13 7 12.1 7 11C7 9.9 6.1 9 5 9C3.9 9 3 9.9 3 11C3 12.1 3.9 13 5 13ZM5 14.5C3.62 14.5 0.5 15.25 0.5 16.75V18.5H9.5V16.75C9.5 15.25 6.38 14.5 5 14.5Z" fill="currentColor" />
          </svg>
        </div>
      )
    },
    {
      id: 4,
      title: 'Ratio',
      total: `${userStats?.ratioLast24h + '%'}` ?? null,
      accent: true,
      icon: (
        <div className="text-[#01F1E3] bg-[#01F1E3]/10 rounded-full w-[64px] h-[64px] flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 9.2H8V19H5V9.2ZM10.6 5H13.4V19H10.6V5ZM16.2 13H19V19H16.2V13Z" fill="currentColor" />
          </svg>
        </div>
      )
    },
  ]), [userStats, ratioValue]);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {data.map((item) => (
            <div key={item.id} className="">
              <div className="h-full rounded-[10px] bg-white dark:bg-[#191932] border-2 border-gray-200 dark:border-[#141429] p-[18px]">
                <div className="flex items-center justify-between">
                  <span className="text-[20px] text-gray-600 dark:text-[#747474] font-semibold">
                    {item.title}
                  </span>
                  <div>
                    {item.icon}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-gray-800 dark:text-white text-[40px] font-extrabold">
                    {isLoading ? '...' : item.total ?? '--'}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div>
            <div className="h-full rounded-[10px] bg-gradient-to-r from-[#FF04B4] to-[#EE9C04] border-2 border-gray-200 dark:border-[#141429] p-[18px]">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center flex-row-reverse gap-6 justify-end">
                  <span className="text-lg text-white font-semibold">
                    Top Leaders
                  </span>
                  <div>
                    <svg width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect y="0.5" width="64" height="64" rx="32" fill="white" fill-opacity="0.3" />
                      <path d="M26.4735 24.4791C26.467 23.6916 27.0999 23.048 27.8874 23.0414L39.9871 22.9403C40.7747 22.9337 41.4183 23.5666 41.4249 24.3541L41.526 36.4538C41.5326 37.2414 40.8997 37.885 40.1121 37.8916C39.3246 37.8982 38.681 37.2652 38.6744 36.4777L38.602 27.8204L25.0177 41.6338C24.4655 42.1953 23.5627 42.2028 23.0011 41.6506C22.4396 41.0984 22.432 40.1955 22.9843 39.634L36.5685 25.8207L27.9113 25.893C27.1237 25.8996 26.4801 25.2667 26.4735 24.4791Z" fill="white" />
                    </svg>

                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => navigate('/dashboard/top-leaders')}
                    className="text-white font-bold bg-white/20 dark:bg-[#150F3E99] px-6 py-[16px] leading-[100%] rounded-[10px] cursor-pointer hover:bg-white/30 dark:hover:bg-[#6F23D5] transition-colors"
                  >
                    See Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalNumbersCard;
