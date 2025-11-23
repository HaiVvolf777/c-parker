import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../../../context/WalletContext.jsx';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { disconnectWallet } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 21V11H21V21H13ZM3 13V3H11V13H3ZM9 11V5H5V11H9ZM3 21V15H11V21H3ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 3H21V9H13V3ZM15 5V7H19V5H15Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Team',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
          <path d="M19 13C20.1 13 21 12.1 21 11C21 9.9 20.1 9 19 9C17.9 9 17 9.9 17 11C17 12.1 17.9 13 19 13ZM19 14.5C17.62 14.5 14.5 15.25 14.5 16.75V18.5H23.5V16.75C23.5 15.25 20.38 14.5 19 14.5Z" fill="currentColor" />
          <path d="M5 13C6.1 13 7 12.1 7 11C7 9.9 6.1 9 5 9C3.9 9 3 9.9 3 11C3 12.1 3.9 13 5 13ZM5 14.5C3.62 14.5 0.5 15.25 0.5 16.75V18.5H9.5V16.75C9.5 15.25 6.38 14.5 5 14.5Z" fill="currentColor" />
        </svg>
      ),
      subItems: [
        {
          name: 'Partners',
          path: '/dashboard/partners',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Links',
          path: '/dashboard/links',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Stats',
          path: '/dashboard/top-leaders',
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 9.2H8V19H5V9.2ZM10.6 5H13.4V19H10.6V5ZM16.2 13H19V19H16.2V13Z" fill="currentColor" />
            </svg>
          )
        }
      ]
    },
    {
      name: 'Social',
      path: '/dashboard/social',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM7 9H17V11H7V9ZM9 13H17V15H9V13ZM11 7H17V9H11V7Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Information',
      path: '/dashboard/information',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Promo & PDFs',
      path: '/dashboard/promo-pdfs',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor" />
        </svg>
      )
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogoClick = async () => {
    await disconnectWallet();
    navigate('/', { replace: true });
  };

  const toggleMenu = (name) => {
    setExpandedMenu(prev => prev === name ? null : name);
  };

  const renderNavItems = (onItemClick = () => { }) => (
    <div className="space-y-2">
      {navItems.map((item) => {
        if (item.subItems) {
          const isExpanded = expandedMenu === item.name;
          const isChildActive = item.subItems.some(sub => isActive(sub.path));

          return (
            <div key={item.name} className="px-[10px]">
              <div
                onClick={() => toggleMenu(item.name)}
                className={`flex items-center justify-between gap-[10px] px-[16px] py-[12px] rounded-[8px] cursor-pointer transition-colors border ${isChildActive || isExpanded
                  ? 'bg-[#13132B] border-[#13132B] text-white'
                  : 'bg-transparent hover:bg-[#13132B]/50 border-transparent'
                  }`}
              >
                <div className="flex items-center gap-[12px]">
                  <span className="text-[#6F23D5]">
                    {item.icon}
                  </span>
                  <span className="font-medium !text-white text-[15px]">
                    {item.name}
                  </span>
                </div>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="#6F23D5"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" />
                </svg>
              </div>

              {isExpanded && (
                <div className="mt-1 space-y-1">
                  {item.subItems.map((sub) => (
                    <div
                      key={sub.path}
                      onClick={() => { navigate(sub.path); onItemClick(); }}
                      className={`flex items-center gap-[12px] px-[16px] py-[10px] rounded-[8px] cursor-pointer transition-colors ${isActive(sub.path)
                        ? 'text-white'
                        : 'text-white hover:bg-[#13132B]/50'
                        }`}
                    >
                      <span className="text-[#6F23D5]">
                        {React.cloneElement(sub.icon, { width: 20, height: 20 })}
                      </span>
                      <span className="font-medium !text-white text-[14px]">
                        {sub.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <div key={item.path} className="px-[10px]">
            <div
              onClick={() => { navigate(item.path); onItemClick(); }}
              className={`flex items-center gap-[12px] px-[16px] py-[12px] rounded-[8px] cursor-pointer transition-colors border ${isActive(item.path)
                ? 'bg-[#13132B] border-[#13132B]'
                : 'bg-transparent hover:bg-[#13132B]/50 border-transparent'
                }`}
            >
              <span className="text-[#6F23D5]">
                {item.icon}
              </span>
              <span className="font-medium !text-white text-[15px]">
                {item.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <div className="xl:hidden absolute top-4 left-4">
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


            <div className='cursor-pointer' onClick={handleLogoClick}>
              {/* Light mode logo */}
              <img src="/images/logo-light.png" alt="C-Parker" className="h-8 md:h-10 w-auto block dark:hidden" />
              {/* Dark mode logo */}
              <img src="/images/logo.png" alt="C-Parker" className="h-8 md:h-10 w-auto hidden dark:block" />
            </div>

            <div className="space-y-2 mt-3">
              {renderNavItems(() => setIsOpen(false))}
            </div>
          </div>
        </div>
      )}

      <div className="hidden xl:block w-[20%] bg-white dark:bg-[#0B0B1A] border-r border-gray-200 dark:border-[#141429] py-[18px] px-[10px]">
        {/* Navigation Items */}
        <div className="space-y-2">
          {renderNavItems()}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
