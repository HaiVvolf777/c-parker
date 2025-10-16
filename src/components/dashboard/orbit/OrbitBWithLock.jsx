import React from 'react';
import { useProgress } from '../../../context/ProgressContext.jsx';
import Orbitb from '../Orbitb';

const OrbitBWithLock = ({ className }) => {
  const { purchased } = useProgress();
  const isLocked = !purchased;
  return (
    <div className={`relative ${className || ''}`}>
      <Orbitb className="w-full h-auto" />
      {isLocked && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center rounded-[10px]">
          <div className="flex items-center gap-3 text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="font-semibold">Purchase to unlock</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrbitBWithLock;


