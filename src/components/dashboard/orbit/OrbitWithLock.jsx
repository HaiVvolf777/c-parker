import React, { useEffect, useRef } from 'react';
import { useProgress } from '../../../context/ProgressContext.jsx';
import Orbit from '../Orbit';

const OrbitWithLock = ({ className }) => {
  const { purchased, unlockedLevels, unlockNextLevel } = useProgress();
  const isLocked = !purchased;
  const containerRef = useRef(null);

  useEffect(() => {
    const svg = containerRef.current?.querySelector('svg');
    if (!svg) return;
    const circles = Array.from(svg.querySelectorAll('circle[r="50"]'));
    const pairs = Math.floor(circles.length / 2);
    const unlockedCount = isLocked ? 0 : Math.max(0, Math.min(pairs, unlockedLevels.orbitA ?? 0));
    circles.forEach((circle, index) => {
      const pairIndex = Math.floor(index / 2);
      circle.style.opacity = pairIndex < unlockedCount ? '1' : '0.25';
    });
  }, [isLocked, unlockedLevels.orbitA]);

  return (
    <div ref={containerRef} className={`relative ${className || ''}`}>
      <Orbit className="w-full h-auto" unlockedLevels={unlockedLevels.orbitA ?? 1} />
      {isLocked ? (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center rounded-[10px] px-6 text-center text-white">
          <div className="flex flex-col items-center gap-4 max-w-xs">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="font-semibold">Purchase to unlock</span>
            </div>
            <span className="text-sm text-white/80">Please complete your purchase to access level progression.</span>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-6 right-6">
          <button
            type="button"
            onClick={() => unlockNextLevel('orbitA')}
            className="rounded-full bg-[#6F23D5] hover:bg-[#5a1fb8] text-white text-sm font-semibold px-5 py-2 shadow-lg shadow-[#6F23D5]/40 transition-all"
          >
            Unlock Next Level
          </button>
        </div>
      )}
    </div>
  );
};

export default OrbitWithLock;


