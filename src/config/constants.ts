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
  Bell,
  FileText,
  Award,
  TrendingUp,
  type LucideIcon
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  icon: LucideIcon;
  badge?: number;
  description?: string;
  roles?: ('admin' | 'moderator' | 'user')[];
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// Navegação principal
export const mainNavigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: Home,
    description: 'Visão geral do sistema',
    roles: ['admin', 'moderator', 'user']
  },
  {
    name: 'Campeonatos',
    path: '/campeonato',
    icon: Trophy,
    description: 'Gerenciar campeonatos',
    roles: ['admin', 'moderator']
  },
  {
    name: 'Times',
    path: '/times',
    icon: Users,
    description: 'Cadastro de times',
    roles: ['admin', 'moderator']
  },
  {
    name: 'Jogadores',
    path: '/jogadores',
    icon: UserCircle,
    description: 'Cadastro de jogadores',
    roles: ['admin', 'moderator']
  },
  {
    name: 'Jogos',
    path: '/jogos',
    icon: Calendar,
    description: 'Calendário de partidas',
    roles: ['admin', 'moderator', 'user']
  }
];

// Seção de gerenciamento
export const managementItems: NavigationItem[] = [
  {
    name: 'Gerenciar Resultados',
    path: '/resultado',
    icon: Settings,
    description: 'Atualizar placares',
    roles: ['admin', 'moderator']
  },
  {
    name: 'Classificação',
    path: '/classificacao',
    icon: BarChart3,
    description: 'Tabela de classificação',
    roles: ['admin', 'moderator', 'user']
  },
  {
    name: 'Artilharia',
    path: '/artilharia',
    icon: Target,
    description: 'Ranking de artilheiros',
    roles: ['admin', 'moderator', 'user']
  }
];

// Seção de recursos adicionais
export const additionalItems: NavigationItem[] = [
  {
    name: 'Carteirinhas',
    path: '/carteirinha',
    icon: CreditCard,
    description: 'Emitir carteirinhas',
    roles: ['admin', 'moderator']
  },
  {
    name: 'Relatórios',
    path: '/relatorios',
    icon: FileText,
    description: 'Relatórios e estatísticas',
    roles: ['admin']
  },
  {
    name: 'Troféus',
    path: '/trofeus',
    icon: Award,
    description: 'Premiações e conquistas',
    roles: ['admin', 'moderator']
  }
];

// Seção de configurações
export const settingsItems: NavigationItem[] = [
  {
    name: 'Configurações',
    path: '/configuracoes',
    icon: Settings,
    description: 'Configurações do sistema',
    roles: ['admin']
  },
  {
    name: 'Notificações',
    path: '/notificacoes',
    icon: Bell,
    description: 'Central de notificações',
    roles: ['admin', 'moderator', 'user']
  },
  {
    name: 'Estatísticas',
    path: '/estatisticas',
    icon: TrendingUp,
    description: 'Análise de dados',
    roles: ['admin']
  }
];

// Todas as seções organizadas
export const navigationSections: NavigationSection[] = [
  {
    title: 'NAVEGAÇÃO',
    items: mainNavigationItems
  },
  {
    title: 'GERENCIAMENTO',
    items: managementItems
  },
  {
    title: 'RECURSOS',
    items: additionalItems
  },
  {
    title: 'SISTEMA',
    items: settingsItems
  }
];

// Função helper para filtrar itens por role do usuário
export function filterNavigationByRole(
  items: NavigationItem[],
  userRole?: 'admin' | 'moderator' | 'user'
): NavigationItem[] {
  if (!userRole) return [];
  return items.filter(item => !item.roles || item.roles.includes(userRole));
}

// src/config/constants.ts

// ... (mantenha suas outras constantes acima)

export const MODAL_IDS = {
  GENERIC_MODAL: 'generic-modal',
  CONFIRM_DELETE: 'confirm-delete',
  EDIT_USER: 'edit-user',
  NEW_CHAMPIONSHIP: 'new-championship' // Adicione esta linha exata
} as const;

