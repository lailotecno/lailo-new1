import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  Users, 
  Settings, 
  Home,
  Shield,
  Bell,
  LogOut,
  LogIn
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const mainNavItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Buscar', path: '/buscador', icon: Search },
    { name: 'Favoritos', path: '/favoritos', icon: Heart },
    { name: 'Leiloeiros', path: '/leiloeiros', icon: Users },
  ];

  const bottomNavItems = [
    { name: 'Notificações', path: '/notifications', icon: Bell },
    { name: 'Configurações', path: '/configuracoes', icon: Settings },
    { name: 'Admin', path: '/admin', icon: Shield },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-16 lg:flex-col">
      <div className="flex h-full flex-col items-center bg-white border-r border-gray-200 py-3">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex h-10 w-10 items-center justify-center rounded-lg mb-6 hover:bg-gray-50 transition-colors" 
          aria-label="Lailo Home"
        >
          <Shield className="h-5 w-5 text-blue-600" />
        </Link>

        {/* Main Navigation */}
        <nav className="flex flex-1 flex-col items-center space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.path} className="group relative">
                <Link
                  to={item.path}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  aria-label={item.name}
                >
                  <Icon className="h-4 w-4" />
                </Link>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.path} className="group relative">
                <Link
                  to={item.path}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  aria-label={item.name}
                >
                  <Icon className="h-4 w-4" />
                </Link>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {item.name}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Separator */}
          <div className="w-6 h-px bg-gray-200 my-2" />
          
          {/* Login/Logout */}
          <div className="group relative">
            <Link
              to="/auth/login"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              aria-label="Entrar"
            >
              <LogIn className="h-4 w-4" />
            </Link>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Entrar
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;