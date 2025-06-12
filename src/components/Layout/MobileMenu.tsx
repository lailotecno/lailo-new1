import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Heart, 
  Users, 
  Settings, 
  LogOut, 
  X, 
  LogIn,
  Bell,
  Shield
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn?: boolean;
  user?: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  onClose: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isLoggedIn = false,
  user,
  onClose,
  onLoginClick,
  onLogoutClick,
}) => {
  const navigate = useNavigate();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const menuItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Search, label: 'Buscar', path: '/buscador' },
    { icon: Heart, label: 'Favoritos', path: '/favoritos' },
    { icon: Users, label: 'Leiloeiros', path: '/leiloeiros' },
  ];

  const loggedInMenuItems = [
    { icon: Bell, label: 'Notificações', path: '/notifications' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
    { icon: Shield, label: 'Admin', path: '/admin' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLoginClick = () => {
    navigate('/auth/login');
    onClose();
  };
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div 
        className={`lg:hidden fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-white shadow-lg sm:w-4/5 md:w-3/5 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <header className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
            <h2 id="mobile-menu-title" className="sr-only">Menu Principal</h2>
            <div className="w-11"></div> {/* Spacer */}
            <span className="font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              aria-label="Fechar menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </header>

          {/* User Info Section */}
          {isLoggedIn && user && (
            <>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-200 mx-4" />
            </>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                className="w-full flex items-center gap-3 px-3 py-4 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label={label}
              >
                <Icon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
            
            {isLoggedIn && (
              <>
                <div className="h-px bg-gray-200 my-2" />
                {loggedInMenuItems.map(({ icon: Icon, label, path }) => (
                  <button
                    key={path}
                    onClick={() => handleNavigation(path)}
                    className="w-full flex items-center gap-3 px-3 py-4 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </>
            )}
          </nav>

          {/* Footer Actions */}
          <footer className="mt-auto border-t border-gray-200 p-4">
            {isLoggedIn ? (
              <button
                onClick={onLogoutClick}
                className="w-full flex items-center gap-3 px-3 py-4 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Sair da conta"
              >
                <LogOut className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Sair</span>
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Entrar na sua conta"
              >
                <LogIn className="h-5 w-5" />
                <span className="font-medium">Entrar</span>
              </button>
            )}
          </footer>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;