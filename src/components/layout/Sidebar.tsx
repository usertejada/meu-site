import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  Trophy,
  Users,
  UserCircle,
  Calendar,
  Settings,
  BarChart3,
  Target,
  CreditCard,
  Menu,
  X,
  Plus
} from 'lucide-react';
import Icon from '../common/Icon';
import Button from '../common/Button';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  // Trava o scroll do body quando o sidebar está aberto no mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Campeonatos', path: '/campeonato', icon: Trophy },
    { name: 'Times', path: '/times', icon: Users },
    { name: 'Jogadores', path: '/jogadores', icon: UserCircle },
    { name: 'Jogos', path: '/jogos', icon: Calendar },
    { name: 'Gerenciar Resultados', path: '/resultado', icon: Settings },
    { name: 'Classificação', path: '/classificacao', icon: BarChart3 },
    { name: 'Artilharia', path: '/artilharia', icon: Target },
    { name: 'Carteirinhas', path: '/carteirinha', icon: CreditCard },
  ];

  return (
    <>
      {/* Botão Hamburguer/X - Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 lg:hidden bg-blue-600 text-white p-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        <Icon icon={isOpen ? X : Menu} size={20} />
      </button>

      {/* Overlay - Mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static flex flex-col`}
        style={{ height: '100dvh' }}
      >
        {/* Header do Sidebar - FIXO */}
        <div className="flex-shrink-0 p-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Icon icon={Trophy} size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-800 leading-tight">ChampionSystem</h1>
              <p className="text-[11px] text-gray-500 leading-tight">Gestão de Campeonatos</p>
            </div>
          </div>
        </div>

        {/* Navegação - COM SCROLL */}
        <div className="flex-1 overflow-y-auto py-4" style={{ 
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}>
          <div className="px-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              NAVEGAÇÃO
            </p>
            <nav className="space-y-0.5">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon icon={item.icon} size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Ações Rápidas */}
          <div className="px-3 mt-6">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              AÇÕES RÁPIDAS
            </p>
            <Button 
              icon={Plus} 
              iconPosition="left" 
              fullWidth
            >
              Novo Campeonato
            </Button>
          </div>
        </div>

        {/* Usuário - Footer FIXO */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              U
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 leading-tight">Usuário</p>
              <p className="text-xs text-gray-500 leading-tight">Administrador</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}