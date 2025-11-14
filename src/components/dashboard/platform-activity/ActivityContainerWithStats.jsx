import ActivityTableContainer from './ActivityTableContainer';
import ContractsCard from '../cards/ContractsCard';
import MemberReceivedCard from '../cards/MemberReceivedCard';
import TotalMembersCard from '../cards/TotalMembersCard';
import TransactionMadeCard from '../cards/TransactionMadeCard';
import LeaderboardCard from './LeaderboardCard';
import RecentUsersCard from './RecentUsersCard';

const ActivityContainerWithStats = () => (
  <div className="mt-5">
    <h2 className="text-[#0a0a0a] dark:text-white text-[30px] font-bold mb-5">Platform Activity</h2>

    <div className="w-full flex flex-col lg:flex-row gap-5">
      <div className="w-full lg:w-[70%] overflow-x-scroll">
        <ActivityTableContainer className="!mt-0" isDashboard />
      </div>
      <div className="w-full lg:w-[30%] flex flex-col gap-5">
        <TotalMembersCard />
        <TransactionMadeCard />
        <MemberReceivedCard />
        <LeaderboardCard />
        <RecentUsersCard />
        <ContractsCard />
      </div>
    </div>
  </div>
);

export default ActivityContainerWithStats;
