import { 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  Trophy,
  MoreVertical,
  Award,
  Target
} from 'lucide-react';
import { useState } from 'react';
import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import PageHeader from '@/components/common/PageHeader';
import NovoCampeonatoForm from '@/components/forms/NovoCampeonatoForm';

export default function Campeonato() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const filtros = ['Todos', 'Ativos', 'Inscrições', 'Planejamento'];

  const campeonatos = [
    {
      id: 1,
      nome: "Copa Verão 2024",
      icone: Trophy,
      iconeColor: "text-blue-600",
      iconeBg: "bg-blue-100",
      status: "Em Andamento",
      statusColor: "green",
      descricao: "Campeonato de futebol de verão com os melhores times da região",
      dataInicio: "30 nov",
      dataFim: "27 fev",
      timesInscritos: 2,
      maxTimes: 16,
      tipo: "Pontos Corridos"
    },
    {
      id: 2,
      nome: "Torneio de Basquete...",
      icone: Target,
      iconeColor: "text-orange-600",
      iconeBg: "bg-orange-100",
      status: "Inscrições",
      statusColor: "blue",
      descricao: "Competição municipal de basquete para todas as idades",
      dataInicio: "14 jan",
      dataFim: "14 mar",
      timesInscritos: 0,
      maxTimes: 8,
      tipo: "Eliminatória"
    },
    {
      id: 3,
      nome: "Liga Municipal 2024",
      icone: Award,
      iconeColor: "text-green-600",
      iconeBg: "bg-green-100",
      status: "Em Andamento",
      statusColor: "green",
      descricao: "Campeonato oficial da cidade com premiação para os vencedores",
      dataInicio: "10 jan",
      dataFim: "30 abr",
      timesInscritos: 8,
      maxTimes: 20,
      tipo: "Pontos Corridos"
    },
    {
      id: 4,
      nome: "Torneio Primavera 2024",
      icone: Trophy,
      iconeColor: "text-purple-600",
      iconeBg: "bg-purple-100",
      status: "Planejamento",
      statusColor: "gray",
      descricao: "Competição regional com times amadores e profissionais",
      dataInicio: "15 set",
      dataFim: "20 dez",
      timesInscritos: 0,
      maxTimes: 12,
      tipo: "Eliminatórias"
    }
  ];

  const getStatusColor = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-700",
      blue: "bg-blue-100 text-blue-700",
      gray: "bg-gray-100 text-gray-700"
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div>
      {/* Header Responsivo - Usa o componente PageHeader */}
      <PageHeader
        title="Campeonatos"
        subtitle="Gerencie todos os seus torneios"
        action={
          <Button 
            icon={Plus} 
            iconPosition="left" 
            variant="primary" 
            fullWidth
            onClick={() => setModalAberto(true)}
          >
            Novo Campeonato
          </Button>
        }
      />

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6">
        {/* Input de Busca */}
        <div className="relative flex-1 lg:max-w-md">
          <Icon 
            icon={Search} 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Buscar campeonatos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tabs de Filtro */}
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1 overflow-x-auto">
          {filtros.map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFiltroAtivo(filtro)}
              className={`px-2 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                filtroAtivo === filtro
                  ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campeonatos.map((campeonato) => (
          <div
            key={campeonato.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            {/* Cabeçalho do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className={`w-12 h-12 ${campeonato.iconeBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon icon={campeonato.icone} size={24} className={campeonato.iconeColor} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-base mb-1">
                    {campeonato.nome}
                  </h3>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      campeonato.statusColor
                    )}`}
                  >
                    {campeonato.status}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <Icon icon={MoreVertical} size={20} />
              </button>
            </div>

            {/* Descrição */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {campeonato.descricao}
            </p>

            {/* Informações */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mb-4">
              <div className="flex items-center gap-1.5">
                <Icon icon={Calendar} size={14} className="text-gray-400" />
                <span>
                  {campeonato.dataInicio} - {campeonato.dataFim}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon icon={Users} size={14} className="text-gray-400" />
                <span>
                  {campeonato.timesInscritos} de {campeonato.maxTimes} times
                </span>
              </div>
              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                {campeonato.tipo}
              </span>
            </div>

            {/* Botão Ver Detalhes */}
            <Button
              icon={Trophy}
              iconPosition="left"
              variant="outline"
              size="sm"
              fullWidth
            >
              Ver Detalhes
            </Button>
          </div>
        ))}
      </div>

      {/* Modal Novo Campeonato */}
      <NovoCampeonatoForm
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}