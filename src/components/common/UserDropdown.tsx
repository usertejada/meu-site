import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  Bell,
  HelpCircle
} from 'lucide-react';
import Icon from './Icon';
import { useAuth, getRoleName } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    router.push('/login');
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do usuário */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
          {user.initials}
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</p>
          <p className="text-xs text-gray-500 leading-tight">{getRoleName(user.role)}</p>
        </div>
        <Icon
          icon={ChevronDown}
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Info do usuário */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <button
              onClick={() => handleNavigation('/perfil')}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Icon icon={User} size={16} />
              <span>Meu Perfil</span>
            </button>

            <button
              onClick={() => handleNavigation('/notificacoes')}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Icon icon={Bell} size={16} />
              <span>Notificações</span>
            </button>

            <button
              onClick={() => handleNavigation('/configuracoes')}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Icon icon={Settings} size={16} />
              <span>Configurações</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Icon icon={theme === 'dark' ? Sun : Moon} size={16} />
              <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
            </button>
          </div>

          {/* Divisor */}
          <div className="border-t border-gray-100 my-1"></div>

          {/* Ajuda e Logout */}
          <div className="py-1">
            <button
              onClick={() => handleNavigation('/ajuda')}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Icon icon={HelpCircle} size={16} />
              <span>Ajuda e Suporte</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Icon icon={LogOut} size={16} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}