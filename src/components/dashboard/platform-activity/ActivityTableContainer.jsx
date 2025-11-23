import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const formatTimeAgo = (secondsAgo) => {
  if (secondsAgo === null || secondsAgo === undefined) return '--';
  if (secondsAgo < 60) return `${secondsAgo}s ago`;
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
  return `${Math.floor(secondsAgo / 86400)}d ago`;
};

const formatAmount = (amount) => {
  if (!amount && amount !== 0) return '--';
  const numeric = Number.parseFloat(amount);
  if (Number.isNaN(numeric)) return `${amount} CCT`;
  return `${numeric.toLocaleString(undefined, { maximumFractionDigits: 4 })} CCT`;
};

const eventLabelMap = {
  UserRegistered: 'joined the platform',
  OrbitBActivated: 'activated Orbit B',
  LevelPurchased: 'purchased a level',
  PaymentSent: 'received a payment',
};

const ActivityTableContainer = ({ className, isDashboard = false }) => {
  const { data, isLoading, error, refresh } = useDashboardData();
  const activityData = data.activityFeed || [];

  return (
    <div className={`mt-[60px] min-w-[700px] text-[#0a0a0a] dark:text-white ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-semibold text-[#0a0a0a] dark:text-white">Live activity from Orbit A & B</p>
        <button
          type="button"
          onClick={refresh}
          className="text-sm text-[#7D40FF] hover:text-[#5a1fb8] font-semibold transition-colors"
        >
          Refresh
        </button>
      </div>
      <div className="border-2 border-[#E5E7EB] dark:border-[#141429] rounded-[10px] bg-white/60 dark:bg-[#0B0B1A4D] backdrop-blur-[30px] px-[44px]">
        <table className="w-full">
          <thead>
            <tr
              className={`*:pt-[44px] *:pb-[30px] border-b-[1px] border-[#E5E7EB] dark:border-[#141429] px-[42px] *:font-[400] ${
                isDashboard ? '*:text-[18px]' : '*:text-[20px]'
              } *:text-[#6B7280] dark:*:text-[#9aa0a6]`}
            >
              <th></th>
              <th>Time</th>
              <th>ID</th>
              <th>Event</th>
              <th>Contract</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#6B7280] dark:text-[#9aa0a6]">
                  Syncing on-chain activity...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-red-500">
                  {error.message}
                </td>
              </tr>
            )}

            {!isLoading && !error && activityData.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#6B7280] dark:text-[#9aa0a6]">
                  No activity yet. Try refreshing in a few seconds.
                </td>
              </tr>
            )}

            {activityData.map((item) => (
              <tr
                key={`${item.transactionHash}-${item.id}`}
                className={`*:py-[30px] *px-4 border-b-[1px] border-[#E5E7EB] dark:border-[#141429] text-center ${
                  isDashboard ? '*:text-[16px]' : '*:text-[20px]'
                } hover:bg-[#F3F4F6] dark:hover:bg-[#0B0B1A] transition-colors`}
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
                    <rect x="0.5" y="0.078125" width="59" height="59" rx="29.5" fill="#01F1E3" fillOpacity="0.1" />
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
                <td>{formatTimeAgo(item.secondsAgo)}</td>
                <td>
                  <span className="bg-[#F3F4F6] text-[#0a0a0a] dark:bg-[#00000D] dark:text-white px-[35px] py-2 rounded-[40px]">
                    #{item.userId ?? '—'}
                  </span>
                </td>
                <td>{eventLabelMap[item.eventName] ?? item.eventName}</td>
                <td>
                  <span className="relative inline-block rounded-md p-[1px]">
                    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-[#324AB9] to-[#4B158E]" />
                    <span
                      className={`relative block rounded-md px-4 py-2 font-semibold ${
                        isDashboard ? 'text-[16px]' : 'text-[20px]'
                      } text-[#0a0a0a] dark:text-white bg-white dark:bg-gradient-to-r dark:from-[#150F3E] dark:via-[#200F46] dark:to-[#3A126F]`}
                    >
                      {item.contract}
                    </span>
                  </span>
                </td>
                <td className="text-[#0a0a0a] dark:text-white">{formatAmount(item.amount)}</td>
                <td>
                  {item.transactionHash ? (
                    <a
                      className="inline-block hover:opacity-80 transition-opacity cursor-pointer mx-auto"
                      href={`https://polygonscan.com/tx/${item.transactionHash}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View transaction on Polygonscan"
                    >
                      <svg width="20" height="20" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.2356 21.3235V15.3529C29.2356 14.3293 28.5048 13.647 27.4084 13.647C26.3121 13.647 25.5812 14.3293 25.5812 15.3529V21.3235C25.5812 23.7117 23.5712 25.5882 21.0131 25.5882H8.22253C5.66441 25.5882 3.65446 23.7117 3.65446 21.3235V9.38228C3.65446 6.99405 5.66441 5.11758 8.22253 5.11758H14.6178C15.7142 5.11758 16.4451 4.43522 16.4451 3.41169C16.4451 2.38816 15.7142 1.70581 14.6178 1.70581H8.22253C3.65446 1.70581 0 5.11758 0 9.38228V21.3235C0 25.5882 3.65446 28.9999 8.22253 28.9999H21.0131C25.5812 28.9999 29.2356 25.5882 29.2356 21.3235Z" fill="white"/>
                        <path d="M31.0628 10.2353V1.70588C31.0628 1.53529 31.0628 1.19412 30.8801 1.02353C30.6974 0.682353 30.3319 0.341176 29.9665 0.170588C29.7837 -1.65228e-07 29.4183 0 29.2356 0H20.4649C19.3685 0 18.6377 0.682353 18.6377 1.70588C18.6377 2.72941 19.3685 3.41176 20.4649 3.41176H24.8502L13.3387 14.1588C12.6078 14.8412 12.6078 15.8647 13.3387 16.5471C13.7041 16.8882 14.2523 17.0588 14.6178 17.0588C14.9832 17.0588 15.5314 16.8882 15.8968 16.5471L27.4083 5.8V10.2353C27.4083 11.2588 28.1392 11.9412 29.2356 11.9412C30.3319 11.9412 31.0628 11.2588 31.0628 10.2353Z" fill="white"/>
                      </svg>
                    </a>
                  ) : (
                    <span className="text-[#6B7280] dark:text-[#9aa0a6] text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTableContainer;