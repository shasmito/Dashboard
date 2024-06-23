import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const DashboardSidebar = ({ toggleSidebar, setToggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Notice', path: '/dashboard/notice' },
    { name: 'Settings', path: '/settings' },
    {
      name: 'Academic',
      path: '/academic',
      dropdownItems: [
        { name: 'Undergrad', path: '/academic/undergrad' },
        { name: 'Postgrad', path: '/academic/postgrad' }
      ]
    },
    { name: 'Messages', path: '/messages' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Support', path: '/support' }
  ];

  const closeSidebarOnSmallScreen = () => {
    if (window.innerWidth <= 768) {
      setToggleSidebar(false);
    }
  };

  return (
    <div className={`fixed h-full bg-white shadow-lg w-64 z-30 ${toggleSidebar ? "left-0" : "-left-64"} transition-all duration-300`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <FaBars className="cursor-pointer text-2xl" onClick={() => setToggleSidebar(!toggleSidebar)} />
        </div>

        <nav>
          {menuItems.map((menuItem) => (
            <SidebarItem
              key={menuItem.name}
              itemName={menuItem.name}
              isActive={currentPath.startsWith(menuItem.path)}
              to={menuItem.path}
              dropdownItems={menuItem.dropdownItems}
              closeSidebarOnSmallScreen={closeSidebarOnSmallScreen}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

const SidebarItem = ({ itemName, isActive, to, dropdownItems, closeSidebarOnSmallScreen }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClick = (e) => {
    if (dropdownItems) {
      e.preventDefault();
      handleToggleDropdown(e);
    } else {
      closeSidebarOnSmallScreen();
    }
  };

  return (
    <div className="relative">
      <Link
        className={`block py-4 px-6 hover:bg-gray-200 w-full cursor-pointer ${isActive ? 'font-bold bg-gray-200' : ''}`}
        onClick={handleClick}
        to={to}
      >
        {itemName}
      </Link>

      {dropdownItems && (
        <div className={`pl-6 ${isDropdownOpen ? 'block' : 'hidden'}`}>
          {dropdownItems.map((item, index) => (
            <Link key={index} to={item.path} className="block py-2 hover:bg-gray-100" onClick={closeSidebarOnSmallScreen}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
