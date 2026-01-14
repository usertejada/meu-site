import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight, Home } from 'lucide-react';
import Icon from './Icon';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const router = useRouter();

  // Se items não for fornecido, gera automaticamente baseado na rota
  const breadcrumbItems: BreadcrumbItem[] = items || generateBreadcrumbs(router.pathname);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {/* Home sempre aparece */}
      <Link
        href="/"
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
        aria-label="Voltar para home"
      >
        <Icon icon={Home} size={16} />
      </Link>

      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <React.Fragment key={index}>
            <Icon icon={ChevronRight} size={16} className="text-gray-400" />

            {isLast || !item.path ? (
              <span className="font-medium text-gray-900">{item.label}</span>
            ) : (
              <Link
                href={item.path}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

// Função helper para gerar breadcrumbs automaticamente
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === '/') return [];

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Mapa de rotas para labels amigáveis
  const routeLabels: Record<string, string> = {
    campeonato: 'Campeonatos',
    times: 'Times',
    jogadores: 'Jogadores',
    jogos: 'Jogos',
    resultado: 'Resultados',
    classificacao: 'Classificação',
    artilharia: 'Artilharia',
    carteirinha: 'Carteirinhas',
    configuracoes: 'Configurações',
    notificacoes: 'Notificações',
    relatorios: 'Relatórios',
    estatisticas: 'Estatísticas',
    trofeus: 'Troféus',
    novo: 'Novo',
    editar: 'Editar',
    detalhes: 'Detalhes'
  };

  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Se for o último segmento e for um ID (número), não adiciona
    if (index === pathSegments.length - 1 && !isNaN(Number(segment))) {
      return;
    }

    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    breadcrumbs.push({
      label,
      path: currentPath
    });
  });

  return breadcrumbs;
}