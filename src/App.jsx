import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/all-nodes" element={<AllNodes />} />
        <Route path="/dashboard/node-level-progression" element={<NodeLevelProgression />} />
        <Route path="/dashboard/all-nodes-b" element={<AllNodesB />} />
        <Route path="/dashboard/orbit-level-progression" element={<OrbitLevelProgression />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
