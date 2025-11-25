import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import { AnnouncementsProvider } from './context/AnnouncementsContext.jsx';
import { WalletProvider } from './context/WalletContext.jsx';
import { UserDataProvider } from './context/UserDataContext.jsx';
import { DashboardDataProvider } from './context/DashboardDataContext.jsx';
import { PreviewProvider } from './context/PreviewContext.jsx';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import Dashboard from './pages/Dashboard';
import AllNodesB from './pages/AllNodesB';
import AllNodes from './pages/AllNodes';
import NodeLevelProgression from './pages/NodeLevelProgression';
import OrbitLevelProgression from './pages/OrbitLevelProgression';
import NotFound from './pages/NotFound';
import OrbitBLevelProgression from './pages/OrbitBLevelProgression';
import NodeLevelProgressionB from './pages/NodeLevelProgressionB';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TopLeaders from './pages/TopLeaders';
import Partners from './pages/Partners';
import Social from './pages/Social';
import Information from './pages/Information';
import PromoPdfs from './pages/PromoPdfs';
import Links from './pages/Links';
function App() {
  return (
    <AdminAuthProvider>
      <WalletProvider>
        <PreviewProvider>
          <UserDataProvider>
            <DashboardDataProvider>
              <ProgressProvider>
                <AnnouncementsProvider>
                  <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="/dashboard/all-nodes" element={<AllNodes />} /> */}
                    <Route path="/dashboard/cycle-level-progression" element={<NodeLevelProgression />} />
                    <Route path="/dashboard/cycle-level-progression-b" element={<NodeLevelProgressionB />} />
                    <Route path="/dashboard/all-nodes-b" element={<AllNodesB />} />
                    <Route path="/dashboard/orbit-level-progression" element={<OrbitLevelProgression />} />
                    <Route path="/dashboard/orbit-b-level-progression" element={<OrbitBLevelProgression />} />
                    <Route path="/dashboard/top-leaders" element={<TopLeaders />} />
                    <Route path="/dashboard/partners" element={<Partners />} />
                    <Route path="/dashboard/social" element={<Social />} />
                    <Route path="/dashboard/information" element={<Information />} />
                    <Route path="/dashboard/promo-pdfs" element={<PromoPdfs />} />
                    <Route path="/dashboard/links" element={<Links />} />
                    {/* <Route path="/dashboard/all-nodes" element={<Orbitb />} /> */}
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  </BrowserRouter>
                </AnnouncementsProvider>
              </ProgressProvider>
            </DashboardDataProvider>
          </UserDataProvider>
        </PreviewProvider>
      </WalletProvider>
    </AdminAuthProvider>
  );
}

export default App;
