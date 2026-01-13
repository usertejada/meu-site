import { 
  Plus, 
  Calendar, 
  Trophy,
  Award,
  Target,
  Edit,
  Eye
} from 'lucide-react';
import { useState } from 'react';
import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import PageHeader from '@/components/common/PageHeader';
import SearchInput from '@/components/common/SearchInput';
import FilterTabs from '@/components/common/FilterTabs';
import CardMenu, { CardMenuOption } from '@/components/common/CardMenu';
import NovoCampeonatoForm from '@/components/forms/NovoCampeonatoForm';

export default function Campeonato() {
  // === ESTADOS ===
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  // === DADOS ===
  const filtros = ['Todos', 'Ativos', 'Inscrições', 'Gestão'];

  // Dados mockados para demonstração (futuramente virá do localStorage)
  const campeonatos = [
    {
      id: 1,
      nome: "Copa Verão 2024",
      icone: Trophy,
      iconeColor: "text-blue-600",
      iconeBg: "bg-blue-100",
      status: "Progresso",
      badgeVariant: "success" as const,
      descricao: "Campeonato de futebol de verão com os melhores times da região",
      dataInicio: "30 nov",
      dataFim: "27 fev",
      timesInscritos: 2,
      maxTimes: 16,
      tipo: "Brasileirao"
    },
    {
      id: 2,
      nome: "Torneio de Basquete Municipal 2024",
      icone: Target,
      iconeColor: "text-orange-600",
      iconeBg: "bg-orange-100",
      status: "Inscrições",
      badgeVariant: "info" as const,
      descricao: "Competição municipal de basquete para todas as idades",
      dataInicio: "14 jan",
      dataFim: "14 mar",
      timesInscritos: 0,
      maxTimes: 8,
      tipo: "Chaveado"
    },
    {
      id: 3,
      nome: "Liga Municipal 2024",
      icone: Award,
      iconeColor: "text-green-600",
      iconeBg: "bg-green-100",
      status: "Progresso",
      badgeVariant: "success" as const,
      descricao: "Campeonato oficial da cidade com premiação para os vencedores",
      dataInicio: "10 jan",
      dataFim: "30 abr",
      timesInscritos: 8,
      maxTimes: 20,
      tipo: "Brasileirão"
    },
    {
      id: 4,
      nome: "Torneio Primavera 2024",
      icone: Trophy,
      iconeColor: "text-purple-600",
      iconeBg: "bg-purple-100",
      status: "Planejando",
      badgeVariant: "default" as const,
      descricao: "Competição regional com times amadores e profissionais",
      dataInicio: "15 set",
      dataFim: "20 dez",
      timesInscritos: 0,
      maxTimes: 12,
      tipo: "Por Grupo"
    }
  ];

  // === FUNÇÃO PARA GERAR OPÇÕES DO MENU ===
  const getMenuOptions = (campeonatoId: number): CardMenuOption[] => [
    {
      label: 'Detalhes',
      icon: Eye,
      onClick: () => console.log('Ver detalhes:', campeonatoId)
    },
    {
      label: 'Editar',
      icon: Edit,
      onClick: () => console.log('Editar:', campeonatoId)
    }
  ];

  return (
    <div>
      {/* === HEADER === */}
      <PageHeader
        title="Campeonatos"
        subtitle="Gerencie todos os seus torneios"
        action={
          <Button 
            icon={Plus} 
            iconPosition="left" 
            variant="primary"
            onClick={() => setModalAberto(true)}
          >
            Novo Campeonato
          </Button>
        }
      />

      {/* === BUSCA E FILTROS === */}
      <div className="flex flex-col md:flex-row items-stretch gap-3 mb-6">
        {/* Busca - ocupa todo espaço disponível */}
        <div className="flex-1">
          <div className="relative w-full">
            <SearchInput
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar campeonatos..."
              maxWidth="max-w-none"
            />
          </div>
        </div>

        {/* Filtros - ocupa largura completa em tablet+ */}
        <div className="w-full md:flex-1">
          <FilterTabs
            options={filtros}
            active={filtroAtivo}
            onChange={setFiltroAtivo}
            className="md:w-full"
          />
        </div>
      </div>

      {/* === LISTA DE CAMPEONATOS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campeonatos.map((campeonato) => (
          <div
            key={campeonato.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            {/* Cabeçalho do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Ícone */}
                <div className={`w-12 h-12 ${campeonato.iconeBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon icon={campeonato.icone} size={24} className={campeonato.iconeColor} />
                </div>

                {/* Nome e Status */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-base mb-1 truncate">
                    {campeonato.nome}
                  </h3>
                  <Badge variant={campeonato.badgeVariant}>
                    {campeonato.status}
                  </Badge>
                </div>
              </div>

              {/* Menu de Opções */}
              <CardMenu options={getMenuOptions(campeonato.id)} />
            </div>

            {/* Descrição - Máximo 2 linhas */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
              {campeonato.descricao}
            </p>

            {/* Informações */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mb-4">
              {/* Datas */}
              <div className="flex items-center gap-1.5">
                <Icon icon={Calendar} size={14} className="text-gray-400" />
                <span>
                  {campeonato.dataInicio} - {campeonato.dataFim}
                </span>
              </div>

              {/* Tipo */}
              <Badge variant="default" size="sm">
                {campeonato.tipo}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* === MODAL === */}
      <NovoCampeonatoForm
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}