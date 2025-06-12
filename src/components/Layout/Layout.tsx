import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // This would come from your auth context
  const [user] = useState(undefined); // This would come from your auth context

  const handleMenuOpen = () => setIsMobileMenuOpen(true);
  const handleMenuClose = () => setIsMobileMenuOpen(false);
  const handleNotificationsClick = () => {
    console.log('Notifications clicked');
  };
  const handleLoginClick = () => {
    console.log('Login clicked');
  };
  const handleLogoutClick = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Header */}
      <MobileHeader 
        onMenuOpen={handleMenuOpen}
        onNotificationsClick={handleNotificationsClick}
      />
      
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        user={user}
        onClose={handleMenuClose}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-16">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;