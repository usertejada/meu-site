import { 
  Trophy, 
  Users, 
  Calendar, 
  CheckCircle, 
  TrendingUp,
  MapPin
} from 'lucide-react';
import Icon from '@/components/common/Icon';
import PageHeader from '@/components/common/PageHeader';

export default function Home() {
  const campeonatos = [
    {
      id: 1,
      nome: "Copa Verão 2024",
      descricao: "Campeonato de futebol de verão com os melhores times da região",
      dataInicio: "30 nov",
      dataFim: "27 fev",
      maxTimes: 16,
      tipo: "Pontos Corridos",
      status: "Em Andamento"
    },
    {
      id: 2,
      nome: "Torneio Primavera 2024",
      descricao: "Competição regional com times amadores e profissionais",
      dataInicio: "15 set",
      dataFim: "20 dez",
      maxTimes: 12,
      tipo: "Eliminatórias",
      status: "Em Andamento"
    },
    {
      id: 3,
      nome: "Liga Municipal 2024",
      descricao: "Campeonato oficial da cidade com premiação para os vencedores",
      dataInicio: "10 jan",
      dataFim: "30 abr",
      maxTimes: 20,
      tipo: "Pontos Corridos",
      status: "Em Andamento"
    }
  ];

  const proximosJogos = [
    {
      id: 1,
      campeonato: "Copa Verão 2024",
      fase: "Semifinal",
      rodada: "1ª Rodada",
      horario: "20:00",
      timeA: "Vasco da Gama",
      timeB: "Flamengo",
      data: "01/03/25",
      local: "Allianz Parque",
      status: "agendado"
    },
    {
      id: 2,
      campeonato: "Torneio Primavera 2024",
      fase: "Final",
      rodada: "Jogo Único",
      horario: "16:00",
      timeA: "Corinthians",
      timeB: "Palmeiras",
      data: "28/02/25",
      local: "Maracanã",
      status: "andamento"
    },
    {
      id: 3,
      campeonato: "Liga Municipal 2024",
      fase: "Quartas de Final",
      rodada: "2ª Rodada",
      horario: "19:30",
      timeA: "São Paulo",
      timeB: "Santos",
      data: "05/03/25",
      local: "Morumbi",
      status: "agendado"
    },
    {
      id: 4,
      campeonato: "Copa Verão 2024",
      fase: "Oitavas",
      rodada: "1ª Rodada",
      horario: "21:00",
      timeA: "Grêmio",
      timeB: "Internacional",
      data: "25/02/25",
      local: "Arena do Grêmio",
      status: "finalizado"
    },
    {
      id: 5,
      campeonato: "Torneio Primavera 2024",
      fase: "3ª Rodada",
      rodada: "3ª Rodada",
      horario: "18:00",
      timeA: "Atlético-MG",
      timeB: "Cruzeiro",
      data: "10/03/25",
      local: "Mineirão",
      status: "agendado"
    },
    {
      id: 6,
      campeonato: "Liga Municipal 2024",
      fase: "2ª Rodada",
      rodada: "2ª Rodada",
      horario: "20:30",
      timeA: "Botafogo",
      timeB: "Fluminense",
      data: "12/03/25",
      local: "Nilton Santos",
      status: "andamento"
    }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      agendado: {
        color: "bg-blue-500",
        text: "Agendado",
        textColor: "text-blue-700"
      },
      andamento: {
        color: "bg-yellow-500",
        text: "Em Andamento",
        textColor: "text-yellow-700"
      },
      finalizado: {
        color: "bg-red-500",
        text: "Finalizado",
        textColor: "text-red-700"
      }
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div>
      {/* Header Responsivo */}
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral dos seus campeonatos"
      />

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card Total Campeonatos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium text-sm">Total Campeonatos</h3>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Icon icon={Trophy} size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-2">2</p>
          <div className="flex items-center text-sm text-green-600">
            <Icon icon={TrendingUp} size={16} className="mr-1" />
            <span>1 ativos</span>
          </div>
        </div>

        {/* Card Times Cadastrados */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium text-sm">Times Cadastrados</h3>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Icon icon={Users} size={24} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-2">6</p>
          <div className="flex items-center text-sm text-green-600">
            <Icon icon={TrendingUp} size={16} className="mr-1" />
            <span>Registrados</span>
          </div>
        </div>

        {/* Card Próximos Jogos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium text-sm">Próximos Jogos</h3>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Icon icon={Calendar} size={24} className="text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-2">1</p>
          <div className="flex items-center text-sm text-green-600">
            <Icon icon={TrendingUp} size={16} className="mr-1" />
            <span>Esta semana</span>
          </div>
        </div>

        {/* Card Jogos Realizados */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 font-medium text-sm">Jogos Realizados</h3>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Icon icon={CheckCircle} size={24} className="text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-2">2</p>
          <div className="flex items-center text-sm text-green-600">
            <Icon icon={TrendingUp} size={16} className="mr-1" />
            <span>Finalizados</span>
          </div>
        </div>
      </div>

      {/* Campeonatos Ativos - Grid 3 Colunas */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <Icon icon={Trophy} size={24} className="text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Campeonatos Ativos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campeonatos.map((campeonato) => (
            <div key={campeonato.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-base mb-1">{campeonato.nome}</h3>
                  <span className="inline-block bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                    {campeonato.status}
                  </span>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                  <Icon icon={Trophy} size={24} className="text-blue-600" />
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {campeonato.descricao}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center">
                  <Icon icon={Calendar} size={14} className="mr-1.5" />
                  <span>{campeonato.dataInicio} - {campeonato.dataFim}</span>
                </div>
                <div className="flex items-center">
                  <Icon icon={Users} size={14} className="mr-1.5" />
                  <span>Até {campeonato.maxTimes} times</span>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full font-medium">
                  {campeonato.tipo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Próximos Jogos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
        <div className="flex items-center mb-6">
          <Icon icon={Calendar} size={24} className="text-purple-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Próximos Jogos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proximosJogos.map((jogo) => {
            const statusConfig = getStatusConfig(jogo.status);
            return (
              <div key={jogo.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                {/* Cabeçalho Centralizado */}
                <div className="text-center mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    {jogo.campeonato} · {jogo.fase}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className={`text-xs font-semibold ${statusConfig.textColor}`}>
                      {statusConfig.text.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-600 font-medium">{jogo.data}</span>
                  </div>
                </div>

                {/* Times */}
                <div className="space-y-3 mb-4">
                  {/* Time A */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <Icon icon={Users} size={18} className="text-gray-600" />
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{jogo.timeA}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-800 ml-4">0</span>
                  </div>

                  {/* Time B */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <Icon icon={Users} size={18} className="text-gray-600" />
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{jogo.timeB}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-800 ml-4">1</span>
                  </div>
                </div>

                {/* Local */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon icon={MapPin} size={14} className="text-gray-400" />
                  <span className="text-xs font-medium">{jogo.local}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}