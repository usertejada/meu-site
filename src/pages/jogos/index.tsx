import { useState } from 'react';
import { Zap, Share2, Plus } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchInput from '@/components/common/SearchInput';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import FilterTabs from '@/components/common/FilterTabs';
import Button from '@/components/common/Button';
import MatchCard from '@/components/common/MatchCard';
import NovoJogoForm, { NovoJogoData } from '@/components/forms/NovoJogosForm';
import NovoResultadoForm, { ResultadoData } from '@/components/forms/NovoResultadoForm';

// Tipos
interface Jogo {
  id: string;
  campeonato: string;
  data: string;
  hora: string;
  local: string;
  timeA: string;
  timeB: string;
  logoA?: string;
  logoB?: string;
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
    logoA: 'https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png',
    logoB: 'https://logodetimes.com/times/flamengo/logo-flamengo-256.png',
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
    logoA: 'https://logodetimes.com/times/corinthians/logo-corinthians-256.png',
    logoB: 'https://logodetimes.com/times/sao-paulo/logo-sao-paulo-256.png',
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
    logoA: 'https://logodetimes.com/times/fluminense/logo-fluminense-256.png',
    logoB: 'https://logodetimes.com/times/botafogo/logo-botafogo-256.png',
    placarA: 2,
    placarB: 2,
    rodada: 1,
    status: 'finalizado'
  },
  {
    id: '4',
    campeonato: 'Campeonato Brasileiro',
    data: '28 de dezembro',
    hora: '18:00',
    local: 'Neo Química Arena',
    timeA: 'Corinthians',
    timeB: 'Santos',
    logoA: 'https://logodetimes.com/times/corinthians/logo-corinthians-256.png',
    logoB: 'https://logodetimes.com/times/santos/logo-santos-256.png',
    placarA: 3,
    placarB: 1,
    rodada: 3,
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
  const [modalResultadoAberto, setModalResultadoAberto] = useState(false);
  const [jogoSelecionado, setJogoSelecionado] = useState<Jogo | null>(null);

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

  // Agrupa jogos por campeonato
  const jogosAgrupados = jogosFiltrados.reduce((grupos, jogo) => {
    const campeonato = jogo.campeonato;
    if (!grupos[campeonato]) {
      grupos[campeonato] = [];
    }
    grupos[campeonato].push(jogo);
    return grupos;
  }, {} as Record<string, Jogo[]>);

  const handleNovoJogo = (data: NovoJogoData) => {
    console.log('Novo jogo criado:', data);
    // Aqui você faria a chamada à API para criar o jogo
  };

  const handleInserirResultado = (jogo: Jogo) => {
    setJogoSelecionado(jogo);
    setModalResultadoAberto(true);
  };

  const handleSalvarResultado = (data: ResultadoData) => {
    console.log('Resultado salvo para jogo:', jogoSelecionado?.id, data);
    // Aqui você faria a chamada à API para salvar o resultado
    // E atualizaria o status do jogo para 'finalizado'
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

        {/* Lista de Jogos Agrupados por Campeonato */}
        <div className="space-y-8">
          {Object.entries(jogosAgrupados).map(([campeonato, jogos]) => (
            <div key={campeonato}>
              {/* Título do Campeonato */}
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {campeonato}
              </h2>

              {/* Grid de Jogos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {jogos.map((jogo) => (
                  <MatchCard
                    key={jogo.id}
                    rodada={jogo.rodada}
                    date={jogo.data}
                    time={jogo.hora}
                    homeTeam={{ 
                      name: jogo.timeA, 
                      score: jogo.placarA,
                      logo: jogo.logoA
                    }}
                    awayTeam={{ 
                      name: jogo.timeB, 
                      score: jogo.placarB,
                      logo: jogo.logoB
                    }}
                    venue={jogo.local}
                    status={jogo.status}
                    onInserirResultado={() => handleInserirResultado(jogo)}
                  />
                ))}
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

      {/* Modal de Inserir Resultado */}
      {jogoSelecionado && (
        <NovoResultadoForm
          isOpen={modalResultadoAberto}
          onClose={() => {
            setModalResultadoAberto(false);
            setJogoSelecionado(null);
          }}
          onSubmit={handleSalvarResultado}
          timeA={jogoSelecionado.timeA}
          timeB={jogoSelecionado.timeB}
        />
      )}
    </div>
  );
}