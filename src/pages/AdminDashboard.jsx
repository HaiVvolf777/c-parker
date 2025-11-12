import React, { useEffect, useState } from 'react';
import withAdminGuard from '../components/admin/withAdminGuard.jsx';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';

const ANN_KEY = 'cparker_announcements_v1';
const VID_KEY = 'cparker_videos_v1';

const AdminDashboardBase = () => {
  const { logout } = useAdminAuth();
  const [annInput, setAnnInput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    try {
      const a = JSON.parse(localStorage.getItem(ANN_KEY) || '[]');
      const v = JSON.parse(localStorage.getItem(VID_KEY) || '[]');
      setAnnouncements(Array.isArray(a) ? a : []);
      setVideos(Array.isArray(v) ? v : []);
    } catch {
      setAnnouncements([]);
      setVideos([]);
    }
  }, []);

  const saveAnnouncements = (list) => {
    setAnnouncements(list);
    localStorage.setItem(ANN_KEY, JSON.stringify(list));
  };

  const saveVideos = (list) => {
    setVideos(list);
    localStorage.setItem(VID_KEY, JSON.stringify(list));
  };

  const addAnnouncement = () => {
    if (!annInput.trim()) return;
    const entry = { text: annInput.trim(), date: new Date().toISOString().slice(0, 10) };
    const next = [entry, ...announcements].slice(0, 20);
    saveAnnouncements(next);
    setAnnInput('');
  };

  const addVideo = () => {
    if (!videoUrl.trim()) return;
    const entry = { url: videoUrl.trim(), date: new Date().toISOString() };
    const next = [entry, ...videos].slice(0, 10);
    saveVideos(next);
    setVideoUrl('');
  };

  const removeAnnouncement = (idx) => {
    const next = announcements.filter((_, i) => i !== idx);
    saveAnnouncements(next);
  };

  const removeVideo = (idx) => {
    const next = videos.filter((_, i) => i !== idx);
    saveVideos(next);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#00000e] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0a0a0a] dark:text-white">Admin Dashboard</h1>
          <button onClick={logout} className="text-white font-bold bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md">Logout</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="rounded-xl border border-[#141429] p-5 bg-white/80 dark:bg-[#0B0B1A]">
            <h2 className="text-lg font-semibold text-[#0a0a0a] dark:text-white">Add Announcement</h2>
            <input
              value={annInput}
              onChange={(e) => setAnnInput(e.target.value)}
              className="mt-3 w-full rounded-md border border-[#141429] bg-white dark:bg-[#0B0B1A] px-3 py-2 text-[#0a0a0a] dark:text-white outline-none"
              placeholder="Type announcement text"
            />
            <button onClick={addAnnouncement} className="mt-3 rounded-md bg-[#6F23D5] hover:bg-[#5a1fb8] text-white font-bold px-4 py-2">Add</button>
            <ul className="mt-4 space-y-2 max-h-64 overflow-auto">
              {announcements.map((a, idx) => (
                <li key={idx} className="flex items-center justify-between bg-white/60 dark:bg-[#0B0B1A4D] border border-[#141429] rounded-md px-3 py-2">
                  <div>
                    <span className="text-xs text-[#747474] dark:text-[#bdbdbd] mr-2">{a.date}</span>
                    <span className="text-[#0a0a0a] dark:text-white">{a.text}</span>
                  </div>
                  <button onClick={() => removeAnnouncement(idx)} className="text-sm text-red-500 hover:text-red-600">Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[#141429] p-5 bg-white/80 dark:bg-[#0B0B1A]">
            <h2 className="text-lg font-semibold text-[#0a0a0a] dark:text-white">Add Video (URL)</h2>
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mt-3 w-full rounded-md border border-[#141429] bg-white dark:bg-[#0B0B1A] px-3 py-2 text-[#0a0a0a] dark:text-white outline-none"
              placeholder="https://... (YouTube/Vimeo/embed)"
            />
            <button onClick={addVideo} className="mt-3 rounded-md bg-[#6F23D5] hover:bg-[#5a1fb8] text-white font-bold px-4 py-2">Add</button>
            <ul className="mt-4 space-y-2 max-h-64 overflow-auto">
              {videos.map((v, idx) => (
                <li key={idx} className="flex items-center justify-between bg-white/60 dark:bg-[#0B0B1A4D] border border-[#141429] rounded-md px-3 py-2">
                  <div className="truncate max-w-[70%]"><span className="text-xs text-[#747474] dark:text-[#bdbdbd] mr-2">{new Date(v.date).toLocaleDateString()}</span><a href={v.url} target="_blank" rel="noreferrer" className="text-[#324AB9] hover:underline truncate">{v.url}</a></div>
                  <button onClick={() => removeVideo(idx)} className="text-sm text-red-500 hover:text-red-600">Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = withAdminGuard(AdminDashboardBase);

export default AdminDashboard;

