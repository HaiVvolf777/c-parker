import React, { useState } from 'react';
import withAdminGuard from '../components/admin/withAdminGuard.jsx';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { useAnnouncements } from '../context/AnnouncementsContext.jsx';

const AdminDashboardBase = () => {
  const { logout } = useAdminAuth();
  const { announcements, videos, addAnnouncement, removeAnnouncement, addVideo, removeVideo } = useAnnouncements();
  const [annInput, setAnnInput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [annError, setAnnError] = useState('');
  const [videoError, setVideoError] = useState('');

  const handleAddAnnouncement = () => {
    if (!annInput.trim()) {
      setAnnError('Announcement cannot be empty');
      return;
    }
    addAnnouncement(annInput.trim());
    setAnnInput('');
    setAnnError('');
  };

  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      setVideoError('Please provide a video URL');
      return;
    }
    addVideo(videoUrl.trim());
    setVideoUrl('');
    setVideoError('');
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
            {annError && <p className="mt-2 text-sm text-red-500">{annError}</p>}
            <button onClick={handleAddAnnouncement} className="mt-3 rounded-md bg-[#6F23D5] hover:bg-[#5a1fb8] text-white font-bold px-4 py-2">Add</button>
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
            {videoError && <p className="mt-2 text-sm text-red-500">{videoError}</p>}
            <button onClick={handleAddVideo} className="mt-3 rounded-md bg-[#6F23D5] hover:bg-[#5a1fb8] text-white font-bold px-4 py-2">Add</button>
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

