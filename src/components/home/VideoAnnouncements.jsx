import React, { useMemo } from "react";

const VideoAnnouncements = () => {
  const storedAnnouncements = useMemo(() => {
    try {
      const raw = localStorage.getItem('cparker_announcements_v1');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const announcements = storedAnnouncements.length
    ? storedAnnouncements.map((a) => a.text)
    : [
        "Orbit B Update – Faster payout cycle enabled.",
        "Community AMA – Join us on Telegram.",
        "Parker Pool milestone: 5,000,000 CCT pooled!",
        "UI improvements - Performance updates & more",
      ];

  const latestVideoUrl = useMemo(() => {
    try {
      const raw = localStorage.getItem('cparker_videos_v1');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) && parsed.length ? parsed[0].url : '';
    } catch {
      return '';
    }
  }, []);

  return (
    <div className="mt-[100px] md:mt-[150px] relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-white font-bold text-[28px] sm:text-[40px] md:text-[56px] text-center">Video & Announcements</h2>
        <p className="text-white text-[16px] sm:text-[20px] md:text-[26px] mt-5 text-center leading-relaxed">Stay updated with the latest news and learn more about <br className="hidden md:block" />how C-Parker works.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[60px] mt-10 md:mt-20">
          <div>
            {latestVideoUrl ? (
              <div className="w-full aspect-video rounded-lg overflow-hidden border border-[#141429]">
                <iframe
                  src={latestVideoUrl}
                  title="Latest video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <>
                <div className="relative inline-block mb-[20px] md:mb-[30px] w-full">
                  <img src="images/video-thumbnail.png" alt="Video Thumbnail" className="block w-full h-auto rounded-lg" />
                  <div className="absolute inset-0 bg-[#00000099] border border-[#141429] flex items-center justify-center rounded-lg">
                    <img src="icons/play.svg" alt="Play Icon" className="w-12 h-12 sm:w-16 sm:h-16" />
                  </div>
                </div>
                <p className="text-white text-[20px] sm:text-[24px] md:text-[30px] leading-[32px] sm:leading-[40px] md:leading-[50px] font-bold">Watch: How to get started with Orbit A & Orbit B</p>
              </>
            )}
          </div>
          <div>
            {announcements.map((item, idx) => (
              <div key={idx} className="mb-[15px]">
                <span className="text-[#7D40FF] text-sm sm:text-base">08/01</span>
                <p className="text-white w-full md:w-[60%] text-[16px] sm:text-[18px] md:text-[20px] my-[8px]">{item}</p>
                {idx < announcements.length - 1 && <hr className="text-[#7474744D]" />}
              </div>
            ))}
            <button className="relative rounded-xl p-[2px] my-[20px]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></div>
              <div className="relative rounded-xl bg-[#00000e] px-5 sm:px-7 py-3 sm:py-4 text-white keep-white font-bold text-sm sm:text-base">View All Announcements</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnnouncements;


