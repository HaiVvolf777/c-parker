import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 21V11H21V21H13ZM3 13V3H11V13H3ZM9 11V5H5V11H9ZM3 21V15H11V21H3ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 3H21V9H13V3ZM15 5V7H19V5H15Z" fill="#6F23D5" />
        </svg>
      )
    },
    // {
    //   name: 'All Nodes',
    //   path: '/dashboard/all-nodes',
    //   icon: (
    //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#6F23D5" />
    //       <path d="M2 17L12 22L22 17" fill="#6F23D5" />
    //       <path d="M2 12L12 17L22 12" fill="#6F23D5" />
    //     </svg>
    //   )
    // },
    {
      name: 'Node A Level Progression',
      path: '/dashboard/node-level-progression',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4V20L17 12L7 4Z" fill="#6F23D5" />
        </svg>
      )
    },
    {
      name: 'Node B Level Progression',
      path: '/dashboard/node-level-progression-b',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4V20L17 12L7 4Z" fill="#6F23D5" />
        </svg>
      )
    },
    {
      name: 'Orbit A Level Progression',
      path: '/dashboard/orbit-level-progression',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#6F23D5" strokeWidth="2" />
          <path d="M12 6V12L16 14" stroke="#6F23D5" strokeWidth="2" />
        </svg>
      )
    }
    ,
    {
      name: 'Orbit B Level Progression',
      path: '/dashboard/orbit-b-level-progression',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#6F23D5" strokeWidth="2" />
          <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12" stroke="#6F23D5" strokeWidth="2" />
        </svg>
      )
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="xl:hidden fixed top-4 left-4">
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((o) => !o)}
          className="p-3 rounded-md bg-white/80 dark:bg-[#0B0B1A] border border-[#E5E7EB] dark:border-[#141429] text-[#0a0a0a] dark:text-white shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-[280px] bg-white dark:bg-[#0B0B1A] border-r border-gray-200 dark:border-[#141429] py-[18px] px-[10px]">


            <div className='cursor-pointer'>
              {/* Light mode logo */}
              <a href="/"><img src="/images/logo-light.png" alt="C-Parker" className="h-8 md:h-10 w-auto block dark:hidden" /></a>
              {/* Dark mode logo */}
              <a href="/"><img src="/images/logo.png" alt="C-Parker" className="h-8 md:h-10 w-auto hidden dark:block" /></a>
            </div>

            <div className="space-y-2 mt-3">
              {navItems.map((item) => (
                <div key={item.path} className="p-[10px]">
                  <div
                    onClick={() => { navigate(item.path); setIsOpen(false); }}
                    className={`flex items-center gap-[10px] px-[10px] py-[10px] rounded-[8px] cursor-pointer transition-colors border ${isActive(item.path)
                        ? 'bg-[#6F23D5] text-white border-transparent'
                        : 'bg-white/60 dark:bg-[#0B0B1A4D] hover:bg-gray-100 dark:hover:bg-[#1a1a2e] border-[#E5E7EB] dark:border-[#141429]'
                      }`}
                  >
                    <span className={`font-medium ${isActive(item.path)
                        ? 'text-white'
                        : 'text-[#0a0a0a] dark:text-white'
                      }`}>
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="hidden xl:block w-[20%] bg-white dark:bg-[#0B0B1A] border-r border-gray-200 dark:border-[#141429] py-[18px] px-[10px]">
        {/* Navigation Items */}
        <div className="space-y-2">
          {navItems.map((item) => (
            <div key={item.path} className="p-[10px]">
              <div
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-[10px] px-[10px] py-[10px] rounded-[8px] cursor-pointer transition-colors border ${isActive(item.path)
                    ? 'bg-[#6F23D5] text-white border-transparent'
                    : 'bg-white/60 dark:bg-[#0B0B1A4D] hover:bg-gray-100 dark:hover:bg-[#1a1a2e] border-[#E5E7EB] dark:border-[#141429]'
                  }`}
              >
                <span className={`font-medium ${isActive(item.path)
                    ? 'text-white'
                    : 'text-[#0a0a0a] dark:text-white'
                  }`}>
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
