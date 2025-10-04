import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    {
      name: 'All Nodes',
      path: '/dashboard/all-nodes',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#6F23D5" />
          <path d="M2 17L12 22L22 17" fill="#6F23D5" />
          <path d="M2 12L12 17L22 12" fill="#6F23D5" />
        </svg>
      )
    },
    {
      name: 'Node Level Progression',
      path: '/dashboard/node-level-progression',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4V20L17 12L7 4Z" fill="#6F23D5" />
        </svg>
      )
    },
    {
      name: 'Orbit Level Progression',
      path: '/dashboard/orbit-level-progression',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#6F23D5" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="#6F23D5" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="hidden xl:block w-[20%] bg-white dark:bg-[#0B0B1A] border-r border-gray-200 dark:border-[#141429] py-[18px] px-[10px]">
        {/* Navigation Items */}
        <div className="space-y-2">
          {navItems.map((item) => (
            <div key={item.path} className="p-[10px]">
              <div 
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-[10px] px-[10px] py-[10px] rounded-[5px] cursor-pointer transition-colors ${
                  isActive(item.path) 
                    ? 'bg-[#6F23D5] text-white' 
                    : 'bg-gray-100 dark:bg-[#FFFFFF0D] hover:bg-gray-200 dark:hover:bg-[#FFFFFF1A]'
                }`}
              >
                {item.icon}
                <span className={`font-medium ${
                  isActive(item.path) 
                    ? 'text-white' 
                    : 'text-gray-800 dark:text-white'
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
