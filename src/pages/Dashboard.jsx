import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';
import ProfileCard from '../components/dashboard/cards/ProfileCard';
import EarningOverviewCard from '../components/dashboard/cards/EarningOverviewCard';
import CParkerProgramsContainer from '../components/dashboard/programs/CParkerProgramsContainer';
import ActivityContainerWithStats from '../components/dashboard/platform-activity/ActivityContainerWithStats';
import UpdatesCard from '../components/dashboard/cards/UpdatesCard';
import TotalNumbersCard from '../components/dashboard/cards/TotalNumbersCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#00000e] transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen py-8 p-5 md:px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
          <ProfileCard />
          <TotalNumbersCard />

          {/* Earning Overview  */}
          <div>
            <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 mt-5">
              <EarningOverviewCard className="w-full lg:w-[75%]" />
              <UpdatesCard className="w-full lg:w-[25%]" />
            </div>
          </div>

          <CParkerProgramsContainer />
          <ActivityContainerWithStats />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
