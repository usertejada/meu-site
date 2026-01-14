import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Plus, Trophy } from 'lucide-react';
import Icon from '../common/Icon';
import Button from '../common/Button';
import UserDropdown from '../common/UserDropdown';
import { useModal } from '@/contexts/ModalContext';
import { useAuth } from '@/contexts/AuthContext';
import { navigationSections, filterNavigationByRole } from '@/config/navigation';
import { MODAL_IDS } from '@/config/constants';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { openModal } = useModal();
  const { user } = useAuth();

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

  // Fecha sidebar no mobile quando a rota muda
  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  return (
    <>
      {/* Botão Hamburguer/X - Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 lg:hidden bg-blue-600 text-white p-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <Icon icon={isOpen ? X : Menu} size={20} />
      </button>

      {/* Overlay - Mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static flex flex-col border-r border-gray-200`}
        style={{ height: '100dvh' }}
      >
        {/* Header do Sidebar - FIXO */}
        <div className="flex-shrink-0 p-5 border-b border-gray-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <Icon icon={Trophy} size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-800 leading-tight">
                ChampionSystem
              </h1>
              <p className="text-[11px] text-gray-500 leading-tight">
                Gestão de Campeonatos
              </p>
            </div>
          </div>
        </div>

        {/* Navegação - COM SCROLL */}
        <div
          className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          {navigationSections.map((section, sectionIndex) => {
            // Filtra itens baseado na role do usuário
            const filteredItems = filterNavigationByRole(section.items, user?.role);

            if (filteredItems.length === 0) return null;

            return (
              <div key={sectionIndex} className={`px-3 ${sectionIndex > 0 ? 'mt-6' : ''}`}>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                  {section.title}
                </p>
                <nav className="space-y-0.5">
                  {filteredItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      title={item.description}
                    >
                      <div className="flex items-center space-x-3">
                        {/* Indicador de página ativa */}
                        {isActive(item.path) && (
                          <div className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full" />
                        )}
                        
                        <Icon
                          icon={item.icon}
                          size={18}
                          strokeWidth={2}
                          className={isActive(item.path) ? 'text-blue-600' : ''}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>

                      {/* Badge de notificações */}
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            );
          })}

          {/* Ações Rápidas */}
          <div className="px-3 mt-6">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
              AÇÕES RÁPIDAS
            </p>
            <Button
              icon={Plus}
              iconPosition="left"
              fullWidth
              onClick={() => openModal(MODAL_IDS.NEW_CHAMPIONSHIP)}
            >
              Novo Campeonato
            </Button>
          </div>
        </div>

        {/* Usuário - Footer FIXO */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <UserDropdown />
        </div>
      </aside>
    </>
  );
}