import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext.jsx';
import { usePreview } from '../context/PreviewContext.jsx';
import { getUserByWallet, ApiError } from '../services/apiClient.js';
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
  const navigate = useNavigate();
  const { account } = useWallet();
  const { previewUserId, isPreviewMode, clearPreview } = usePreview();
  const previousAccountRef = useRef(null);
  const hasCheckedWalletRef = useRef(false);

  // Redirect to home if no wallet connected and no preview user ID
  useEffect(() => {
    if (!account && !previewUserId) {
      navigate('/', { replace: true });
    }
  }, [account, previewUserId, navigate]);

  // Check if wallet is registered when connecting while in preview mode
  useEffect(() => {
    const checkWalletRegistration = async () => {
      // Only check if:
      // 1. We're in preview mode
      // 2. Account just got connected (was null, now has value)
      // 3. Haven't checked this account yet
      if (!isPreviewMode || !account || previousAccountRef.current === account) {
        previousAccountRef.current = account;
        return;
      }

      // Account just connected while previewing
      if (previousAccountRef.current === null && account) {
        try {
          // Check if wallet is registered
          await getUserByWallet(account.toLowerCase());
          // Wallet is registered, clear preview and stay on dashboard
          clearPreview();
          hasCheckedWalletRef.current = true;
        } catch (err) {
          if (err instanceof ApiError && err.status === 404) {
            // Wallet not registered - navigate to home immediately
            // Clear preview after navigation to prevent UserDataContext from trying to register
            navigate('/', { replace: true });
            // Use setTimeout to clear preview after navigation starts
            setTimeout(() => {
              clearPreview();
            }, 0);
            // The HomeNavbar will detect the account and show join modal
          } else {
            console.error('Error checking wallet registration:', err);
          }
        }
      }
      
      previousAccountRef.current = account;
    };

    checkWalletRegistration();
  }, [account, isPreviewMode, clearPreview, navigate]);
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
