import { useState } from 'react';
import { Calendar, Clock, MapPin, Edit, Zap, Share2, Plus } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchInput from '@/components/common/SearchInput';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import FilterTabs from '@/components/common/FilterTabs';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import NovoJogoForm, { NovoJogoData } from '@/components/forms/NovoJogosForm';

// Tipos
interface Jogo {
  id: string;
  campeonato: string;
  data: string;
  hora: string;
  local: string;
  timeA: string;
  timeB: string;
  placarA: number;
  placarB: number;
  rodada: number;
  status: 'agendado' | 'ao-vivo' | 'finalizado';
}

// Dados mockados
const jogosMock: Jogo[] = [
  {
    id: '1',
    campeonato: 'Campeonato Brasileiro',
    data: '30 de dezembro',
    hora: '20:00',
    local: 'Allianz Parque',
    timeA: 'Palmeiras',
    timeB: 'Flamengo',
    placarA: 0,
    placarB: 0,
    rodada: 3,
    status: 'agendado'
  },
  {
    id: '2',
    campeonato: 'Copa Libertadores',
    data: '22 de dezembro',
    hora: '16:00',
    local: 'Arena Corinthians',
    timeA: 'Corinthians',
    timeB: 'São Paulo',
    placarA: 1,
    placarB: 3,
    rodada: 2,
    status: 'finalizado'
  },
  {
    id: '3',
    campeonato: 'Campeonato Paulista',
    data: '15 de dezembro',
    hora: '15:00',
    local: 'Estádio Maracanã',
    timeA: 'Fluminense',
    timeB: 'Botafogo',
    placarA: 2,
    placarB: 2,
    rodada: 1,
    status: 'finalizado'
  }
];

const campeonatosOptions: DropdownOption[] = [
  { value: 'todos', label: 'Todos os Campeonatos' },
  { value: 'brasileiro', label: 'Campeonato Brasileiro' },
  { value: 'libertadores', label: 'Copa Libertadores' },
  { value: 'paulista', label: 'Campeonato Paulista' }
];

export default function JogosPage() {
  const [busca, setBusca] = useState('');
  const [campeonatoSelecionado, setCampeonatoSelecionado] = useState('todos');
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [modalAberto, setModalAberto] = useState(false);

  // Filtra jogos
  const jogosFiltrados = jogosMock.filter(jogo => {
    const matchBusca = jogo.timeA.toLowerCase().includes(busca.toLowerCase()) ||
                       jogo.timeB.toLowerCase().includes(busca.toLowerCase()) ||
                       jogo.campeonato.toLowerCase().includes(busca.toLowerCase());
    
    const matchCampeonato = campeonatoSelecionado === 'todos' || 
                           jogo.campeonato.toLowerCase().includes(campeonatoSelecionado);
    
    const matchStatus = filtroAtivo === 'Todos' ||
                       (filtroAtivo === 'Agendados' && jogo.status === 'agendado') ||
                       (filtroAtivo === 'Ao Vivo' && jogo.status === 'ao-vivo') ||
                       (filtroAtivo === 'Finalizados' && jogo.status === 'finalizado');
    
    return matchBusca && matchCampeonato && matchStatus;
  });

  const handleNovoJogo = (data: NovoJogoData) => {
    console.log('Novo jogo criado:', data);
    // Aqui você faria a chamada à API para criar o jogo
  };

  const getStatusBadge = (status: Jogo['status']) => {
    switch (status) {
      case 'agendado':
        return <Badge variant="info">Agendado</Badge>;
      case 'ao-vivo':
        return <Badge variant="warning">Ao Vivo</Badge>;
      case 'finalizado':
        return <Badge variant="default">Finalizado</Badge>;
    }
  };

  return (
    <div>
        {/* Header */}
        <PageHeader
          title="Jogos"
          subtitle="Gerencie partidas e resultados"
          action={
            <Button 
              icon={Plus} 
              variant="primary"
              onClick={() => setModalAberto(true)}
            >
              Novo Jogo
            </Button>
          }
        />

        {/* Barra de Ações */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <SearchInput
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <Dropdown
            name="campeonato"
            value={campeonatoSelecionado}
            onChange={setCampeonatoSelecionado}
            options={campeonatosOptions}
            className="lg:w-64"
          />

          <div className="flex gap-2 ml-auto">
            <Button
              icon={Zap}
              variant="outline"
              onClick={() => console.log('Gerar jogos')}
            >
              Gerar
            </Button>

            <Button
              icon={Share2}
              variant="ghost"
              onClick={() => console.log('Compartilhar')}
            >
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <FilterTabs
          options={['Todos', 'Agendados', 'Ao Vivo', 'Finalizados']}
          active={filtroAtivo}
          onChange={setFiltroAtivo}
          className="mb-6"
        />

        {/* Lista de Jogos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jogosFiltrados.map((jogo) => (
            <div
              key={jogo.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {jogo.campeonato}
                  </h3>
                  {getStatusBadge(jogo.status)}
                </div>
                
                <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <Icon icon={Edit} size={18} />
                </button>
              </div>

              {/* Informações do Jogo */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon icon={Calendar} size={16} className="text-gray-400" />
                  <span>{jogo.data}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon icon={Clock} size={16} className="text-gray-400" />
                  <span>{jogo.hora}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon icon={MapPin} size={16} className="text-gray-400" />
                  <span>{jogo.local}</span>
                </div>
              </div>

              {/* Placar */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {jogo.timeA}
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {jogo.placarA}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <span className="text-2xl font-light text-gray-400">×</span>
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {jogo.timeB}
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {jogo.placarB}
                  </p>
                </div>
              </div>

              {/* Rodada */}
              <div className="mt-6 flex justify-center">
                <Badge variant="success" size="md">
                  Rodada {jogo.rodada}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há jogos */}
        {jogosFiltrados.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Nenhum jogo encontrado</p>
            <Button
              icon={Plus}
              variant="primary"
              onClick={() => setModalAberto(true)}
            >
              Criar Novo Jogo
            </Button>
          </div>
        )}
    

      {/* Modal de Novo Jogo */}
      <NovoJogoForm
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSubmit={handleNovoJogo}
      />
    </div>
  );
}