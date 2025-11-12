import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ANN_KEY = 'cparker_announcements_v1';
const VID_KEY = 'cparker_videos_v1';

const defaultAnnouncements = [
  { text: 'Orbit B Update – Faster payout cycle enabled.', date: '2025-01-10' },
  { text: 'Community AMA – Join us on Telegram.', date: '2025-01-06' },
  { text: 'Parker Pool milestone: 5,000,000 CCT pooled!', date: '2025-01-02' },
  { text: 'UI improvements - Performance updates & more', date: '2024-12-28' },
];

const AnnouncementsContext = createContext({
  announcements: defaultAnnouncements,
  videos: [],
  addAnnouncement: () => {},
  removeAnnouncement: () => {},
  addVideo: () => {},
  removeVideo: () => {},
});

const readLocal = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const AnnouncementsProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState(() => readLocal(ANN_KEY, defaultAnnouncements));
  const [videos, setVideos] = useState(() => readLocal(VID_KEY, []));

  useEffect(() => {
    localStorage.setItem(ANN_KEY, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(VID_KEY, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === ANN_KEY) {
        setAnnouncements(readLocal(ANN_KEY, defaultAnnouncements));
      }
      if (event.key === VID_KEY) {
        setVideos(readLocal(VID_KEY, []));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addAnnouncement = (text) => {
    const entry = { text, date: new Date().toISOString().slice(0, 10) };
    setAnnouncements((prev) => [entry, ...prev].slice(0, 20));
  };

  const removeAnnouncement = (index) => {
    setAnnouncements((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addVideo = (url) => {
    const entry = { url, date: new Date().toISOString() };
    setVideos((prev) => [entry, ...prev].slice(0, 10));
  };

  const removeVideo = (index) => {
    setVideos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const value = useMemo(
    () => ({
      announcements,
      videos,
      addAnnouncement,
      removeAnnouncement,
      addVideo,
      removeVideo,
    }),
    [announcements, videos],
  );

  return <AnnouncementsContext.Provider value={value}>{children}</AnnouncementsContext.Provider>;
};

export const useAnnouncements = () => useContext(AnnouncementsContext);


