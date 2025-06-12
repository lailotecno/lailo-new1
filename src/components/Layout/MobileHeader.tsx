import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Shield } from 'lucide-react';

interface MobileHeaderProps {
  onMenuOpen: () => void;
  onNotificationsClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  onMenuOpen,
  onNotificationsClick
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide header when scrolling down past 56px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 56) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`lg:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      aria-label="Main Navigation"
    >
      {/* Left Side: Logo */}
      <Link 
        to="/" 
        aria-label="Lailo Home" 
        className="flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Shield className="h-7 w-7 text-blue-600" />
      </Link>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-x-2">
        <button
          onClick={onNotificationsClick}
          aria-label="View notifications"
          className="flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Bell className="h-6 w-6" />
        </button>
        <button
          onClick={onMenuOpen}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;