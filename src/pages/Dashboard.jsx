import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';
import ProfileCard from '../components/dashboard/cards/ProfileCard';
import EarningOverviewCard from '../components/dashboard/cards/EarningOverviewCard';
import CParkerProgramsContainer from '../components/dashboard/programs/CParkerProgramsContainer';
import ActivityContainerWithStats from '../components/dashboard/platform-activity/ActivityContainerWithStats';
import UpdatesCard from '../components/dashboard/cards/UpdatesCard';
import TotalNumbersCard from '../components/dashboard/cards/TotalNumbersCard';
import useScrollAnimation from '../hooks/useScrollAnimation';
import PaymentsBreakdown from '../components/dashboard/payments/PaymentsBreakdown';
import NetworkOverview from '../components/dashboard/network/NetworkOverview';
import MatrixExplorer from '../components/dashboard/network/MatrixExplorer';

const Dashboard = () => {
  const [profileRef, isProfileVisible] = useScrollAnimation({ threshold: 0.1 });
  const [numbersRef, isNumbersVisible] = useScrollAnimation({ threshold: 0.1 });
  const [earningRef, isEarningVisible] = useScrollAnimation({ threshold: 0.1 });
  const [updatesRef, isUpdatesVisible] = useScrollAnimation({ threshold: 0.1 });
  const [programsRef, isProgramsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activityRef, isActivityVisible] = useScrollAnimation({ threshold: 0.1 });
  const [paymentsRef, isPaymentsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [networkRef, isNetworkVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-white dark:bg-[#00000e] transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen py-8 p-5 md:px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
          <div 
            ref={profileRef}
            className={`animate-fade-in-up ${isProfileVisible ? 'animate' : ''}`}
          >
            <ProfileCard />
          </div>
          
          <div 
            ref={numbersRef}
            className={`animate-fade-in-up ${isNumbersVisible ? 'animate' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <TotalNumbersCard />
          </div>

          {/* Earning Overview  */}
          <div>
            <div className="grid grid-cols-1 lg:flex lg:justify-between gap-5 mt-5">
              <div 
                ref={earningRef}
                className={`w-full lg:w-[75%] animate-fade-in-up ${isEarningVisible ? 'animate' : ''}`}
                style={{ transitionDelay: '400ms' }}
              >
                <EarningOverviewCard />
              </div>
              <div 
                ref={updatesRef}
                className={`w-full lg:w-[25%] animate-fade-in-up ${isUpdatesVisible ? 'animate' : ''}`}
                style={{ transitionDelay: '600ms' }}
              >
                <UpdatesCard />
              </div>
            </div>
          </div>

          <div 
            ref={programsRef}
            className={`animate-fade-in-up ${isProgramsVisible ? 'animate' : ''}`}
            style={{ transitionDelay: '800ms' }}
          >
            <CParkerProgramsContainer />
          </div>
          
          <div 
            ref={activityRef}
            className={`animate-fade-in-up ${isActivityVisible ? 'animate' : ''}`}
            style={{ transitionDelay: '1000ms' }}
          >
            <ActivityContainerWithStats />
          </div>

          <div
            ref={paymentsRef}
            className={`mt-8 animate-fade-in-up ${isPaymentsVisible ? 'animate' : ''}`}
            style={{ transitionDelay: '1200ms' }}
          >
            <PaymentsBreakdown />
          </div>

          <div
            ref={networkRef}
            className={`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-in-up ${
              isNetworkVisible ? 'animate' : ''
            }`}
            style={{ transitionDelay: '1400ms' }}
          >
            <NetworkOverview />
            <MatrixExplorer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
