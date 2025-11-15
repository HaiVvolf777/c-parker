import React, { useState, useEffect } from "react";
import { getActivityFeed } from "../../services/apiClient";

const PlatformActivity = () => {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getActivityFeed({
          limit: 50,
          offset: 0,
          eventNames: 'PaymentSent,UserRegistered'
        });
        console.log(data);        
        const mappedActivity = (data || []).map((item) => {
          let timeDisplay = 'now';
          if (item.timestamp) {
            const timeDiff = Date.now() - new Date(item.timestamp).getTime();
            const minutes = Math.floor(timeDiff / 60000);
            if (minutes < 1) timeDisplay = 'now';
            else if (minutes < 60) timeDisplay = `${minutes}min`;
            else {
              const hours = Math.floor(minutes / 60);
              timeDisplay = `${hours}hr`;
            }
          } else if (item.time) {
            timeDisplay = item.time;
          }

          const userId = item.userId ? `#${item.userId}` : item.userId || '#N/A';

          let eventDisplay = item.eventName || item.event || 'Unknown';
          if (eventDisplay === 'UserRegistered') {
            eventDisplay = 'joined';
          } else if (eventDisplay === 'PaymentSent') {
            eventDisplay = 'payment sent';
          }

          const plan = item.orbit || item.contract || 'N/A';
          const planDisplay = plan === 'ORBIT_A' ? 'Orbit A' : plan === 'ORBIT_B' ? 'Orbit B' : plan;
          let details = '';
          if (item.amount) {
            if (item.eventName === 'PaymentSent') {
              details = `earned ${item.amount} CCT`;
            } else {
              details = `${item.amount} CCT`;
            }
          } else if (item.eventName === 'UserRegistered') {
            details = 'instant payout';
          } else {
            details = item.details || item.description || '';
          }

          return {
            time: timeDisplay,
            id: userId,
            event: eventDisplay,
            plan: planDisplay,
            details: details,
            transactionHash: item.transactionHash || item.txHash || item.hash || null,
          };
        });

        setActivity(mappedActivity);
      } catch (err) {
        console.error('Error fetching activity:', err);
        setError(err.message || 'Failed to load activity');
        setActivity([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return (
    <div className="my-[100px] md:my-[150px] relative overflow-x-auto">
      <div className="container mx-auto px-6">
        <h3 className="text-gray-800 dark:text-white font-bold text-[28px] md:text-[40px]">Platform Activity (Live Updates)</h3>
        <p className="text-gray-600 dark:text-white text-[16px] md:text-[26px] mt-3 md:mt-5">Track user growth and payouts happening live.</p>
        <div className="mt-[40px] md:mt-[60px] text-white overflow-x-auto">
          <div className="border-2 border-gray-200 dark:border-[#141429] rounded-[10px] bg-white dark:bg-[#0B0B1A4D] backdrop-blur-[30px] py-2 md:py-[20px] px-4 md:px-[44px] min-w-max">
            {isLoading ? (
              <div className="py-12 text-center">
                <p className="text-gray-600 dark:text-white">Loading activity...</p>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-red-500">Error: {error}</p>
              </div>
            ) : activity.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-600 dark:text-white">No activity to display</p>
              </div>
            ) : (
              <div className="relative overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full min-w-[640px] md:min-w-[800px]">
                    <thead className="*:pt-[20px] md:*:pt-[44px] *:pb-[20px] md:*:pb-[30px] border-b-1 border-[#141429] px-4 md:px-[42px] *:text-[16px] md:*:text-[26px] *:text-[#747474] *:font-[400] sticky top-0 bg-white dark:bg-[#0B0B1A4D] backdrop-blur-[30px] z-10">
                      <tr>
                        <th></th><th>Time</th><th>ID</th><th>Event</th><th>Plan</th><th>Amount</th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.map((item, index) => (
                        <tr key={index} className=":py-[16px] md:*:py-[30px] border-b-1 border-gray-200 dark:border-[#141429] text-center *:text-[16px] md:*:text-[24px] *:text-gray-800 dark:*:text-white ">
                          <td>
                            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M27.733 14.7883C27.4356 14.7883 27.1505 14.6702 26.9402 14.4599C26.73 14.2497 26.6119 13.9645 26.6119 13.6672V10.4383C26.6539 9.80293 26.4441 9.17658 26.0278 8.69481C25.6115 8.21304 25.0222 7.9146 24.3875 7.86411H4.98723C4.68989 7.86411 4.40472 7.74599 4.19446 7.53574C3.98421 7.32548 3.86609 7.04032 3.86609 6.74297C3.86609 6.44562 3.98421 6.16046 4.19446 5.9502C4.40472 5.73995 4.68989 5.62183 4.98723 5.62183H24.3875C25.6191 5.66626 26.7829 6.1973 27.6236 7.09851C28.4643 7.99972 28.9132 9.19753 28.8721 10.4293V13.6582C28.8733 13.8077 28.8446 13.9559 28.7877 14.0942C28.7307 14.2324 28.6467 14.3579 28.5406 14.4632C28.4345 14.5685 28.3083 14.6515 28.1696 14.7073C28.0309 14.7632 27.8825 14.7907 27.733 14.7883Z" fill="#01F1E3" />
                              <path d="M24.3874 29.1032H4.98718C3.75553 29.0588 2.59177 28.5277 1.75109 27.6265C0.910413 26.7253 0.461431 25.5275 0.502601 24.2957V4.06133C0.502601 3.76398 0.620721 3.47882 0.830976 3.26856C1.04123 3.05831 1.3264 2.94019 1.62374 2.94019C1.92109 2.94019 2.20626 3.05831 2.41651 3.26856C2.62677 3.47882 2.74489 3.76398 2.74489 4.06133V24.2957C2.70288 24.9301 2.91296 25.5555 3.32948 26.0358C3.74601 26.5161 4.33529 26.8127 4.96924 26.8609H24.3874C25.0214 26.8127 25.6107 26.5161 26.0272 26.0358C26.4437 25.5555 26.6538 24.9301 26.6118 24.2957V22.0176C26.6118 21.7202 26.7299 21.4351 26.9402 21.2248C27.1504 21.0145 27.4356 20.8964 27.7329 20.8964C28.0303 20.8964 28.3154 21.0145 28.5257 21.2248C28.736 21.4351 28.8541 21.7202 28.8541 22.0176V24.2957C28.8953 25.5245 28.4488 26.7197 27.612 27.6204C26.7751 28.5211 25.6159 29.0541 24.3874 29.1032Z" fill="#01F1E3" />
                              <path d="M23.93 7.8643C23.6358 7.86434 23.3533 7.74868 23.1435 7.54229C22.9338 7.3359 22.8136 7.05532 22.8089 6.7611V4.27664C22.7878 3.74449 22.5573 3.24223 22.1675 2.87933C21.7778 2.51643 21.2603 2.32232 20.728 2.3393H4.58356C4.12588 2.32231 3.68011 2.4874 3.34389 2.7984C3.00767 3.1094 2.8084 3.54097 2.78973 3.9986C2.8084 4.45622 3.00767 4.88779 3.34389 5.19879C3.68011 5.5098 4.12588 5.67488 4.58356 5.65789H14.4496C14.747 5.65789 15.0321 5.77601 15.2424 5.98626C15.4526 6.19652 15.5708 6.48169 15.5708 6.77903C15.5708 7.07638 15.4526 7.36155 15.2424 7.5718C15.0321 7.78206 14.747 7.90018 14.4496 7.90018H4.55665C4.03411 7.90848 3.51506 7.81362 3.02923 7.62102C2.5434 7.42842 2.10034 7.14188 1.72542 6.77779C1.3505 6.4137 1.05109 5.97923 0.844337 5.49925C0.637584 5.01927 0.527551 4.50322 0.520538 3.98066C0.53941 2.92839 0.974988 1.92659 1.73168 1.19513C2.48837 0.463658 3.50435 0.0622796 4.55665 0.0790788H20.7011C21.2629 0.067191 21.8214 0.166533 22.3446 0.371386C22.8678 0.576239 23.3453 0.882555 23.7496 1.2727C24.1539 1.66285 24.477 2.12911 24.7004 2.64466C24.9238 3.1602 25.043 3.71484 25.0512 4.27664V6.7611C25.0465 7.05532 24.9263 7.3359 24.7165 7.54229C24.5068 7.74868 24.2243 7.86434 23.93 7.8643ZM28.4594 23.1119H22.2438C21.0297 23.1359 19.8557 22.6771 18.9796 21.8363C18.1034 20.9955 17.5968 19.8413 17.5709 18.6273V17.0039C17.5968 15.7898 18.1034 14.6357 18.9796 13.7948C19.8557 12.954 21.0297 12.4952 22.2438 12.5193H28.5222C28.9144 12.5205 29.3026 12.5989 29.6645 12.7501C30.0264 12.9013 30.355 13.1222 30.6315 13.4004C30.908 13.6786 31.1271 14.0085 31.2761 14.3713C31.4251 14.7341 31.5012 15.1228 31.5 15.515V20.17C31.4858 20.9629 31.1578 21.7179 30.5878 22.2694C30.0178 22.8209 29.2524 23.1239 28.4594 23.1119ZM22.2438 14.7705C21.6258 14.7462 21.0233 14.9674 20.5679 15.3859C20.1125 15.8043 19.8411 16.386 19.8132 17.0039V18.6721C19.8411 19.29 20.1125 19.8716 20.5679 20.2901C21.0233 20.7085 21.6258 20.9298 22.2438 20.9054H28.4594C28.6553 20.9055 28.8433 20.8283 28.9827 20.6906C29.122 20.5529 29.2015 20.3659 29.2039 20.17V15.515C29.1985 15.336 29.1247 15.1658 28.9976 15.0396C28.9303 14.9693 28.8496 14.9132 28.7602 14.8747C28.6709 14.8362 28.5747 14.816 28.4774 14.8154L22.2438 14.7705Z" fill="#01F1E3" />
                              <path d="M22.8628 18.9591C23.4819 18.9591 23.9839 18.4571 23.9839 17.8379C23.9839 17.2187 23.4819 16.7168 22.8628 16.7168C22.2436 16.7168 21.7416 17.2187 21.7416 17.8379C21.7416 18.4571 22.2436 18.9591 22.8628 18.9591Z" fill="#01F1E3" />
                            </svg>
                          </td>
                          <td>{item.time}</td>
                          <td><span className="text-white bg-[#00000D] keep-white px-[20px] md:px-[35px] py-2 rounded-[40px] text-[16px] md:text-[24px]">{item.id}</span></td>
                          <td>{item.event}</td>
                          <td>
                            <span className="relative inline-block rounded-md p-[1px]">
                              <span className="absolute inset-0 rounded-md bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></span>
                              <span className="relative block rounded-md bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-3 md:px-4 py-2 text-white keep-white text-[14px] md:text-[20px] font-semibold">{item.plan}</span>
                            </span>
                          </td>
                          <td>{item.details}</td>
                          <td>
                            {item.transactionHash && (
                              <a
                                href={`https://amoy.polygonscan.com/address/${item.transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block hover:opacity-80 transition-opacity cursor-pointer"
                                aria-label="View on Polygonscan"
                              >
                                <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M29.2356 21.3235V15.3529C29.2356 14.3293 28.5048 13.647 27.4084 13.647C26.3121 13.647 25.5812 14.3293 25.5812 15.3529V21.3235C25.5812 23.7117 23.5712 25.5882 21.0131 25.5882H8.22253C5.66441 25.5882 3.65446 23.7117 3.65446 21.3235V9.38228C3.65446 6.99405 5.66441 5.11758 8.22253 5.11758H14.6178C15.7142 5.11758 16.4451 4.43522 16.4451 3.41169C16.4451 2.38816 15.7142 1.70581 14.6178 1.70581H8.22253C3.65446 1.70581 0 5.11758 0 9.38228V21.3235C0 25.5882 3.65446 28.9999 8.22253 28.9999H21.0131C25.5812 28.9999 29.2356 25.5882 29.2356 21.3235Z" fill="white"/>
                                  <path d="M31.0628 10.2353V1.70588C31.0628 1.53529 31.0628 1.19412 30.8801 1.02353C30.6974 0.682353 30.3319 0.341176 29.9665 0.170588C29.7837 -1.65228e-07 29.4183 0 29.2356 0H20.4649C19.3685 0 18.6377 0.682353 18.6377 1.70588C18.6377 2.72941 19.3685 3.41176 20.4649 3.41176H24.8502L13.3387 14.1588C12.6078 14.8412 12.6078 15.8647 13.3387 16.5471C13.7041 16.8882 14.2523 17.0588 14.6178 17.0588C14.9832 17.0588 15.5314 16.8882 15.8968 16.5471L27.4083 5.8V10.2353C27.4083 11.2588 28.1392 11.9412 29.2356 11.9412C30.3319 11.9412 31.0628 11.2588 31.0628 10.2353Z" fill="white"/>
                                </svg>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformActivity;


