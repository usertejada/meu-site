import { 
  Plus, 
  User, 
  Mail, 
  Users as UsersIcon,
  Calendar,
  Eye,
  Edit,
  Lock,
  Unlock
} from 'lucide-react';
import { useState } from 'react';
import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import PageHeader from '@/components/common/PageHeader';
import SearchInput from '@/components/common/SearchInput';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import CardMenu, { CardMenuOption } from '@/components/common/CardMenu';
import NovoTimesForm from '@/components/forms/NovoTimesForm';

export default function Times() {
  // === ESTADOS ===
  const [busca, setBusca] = useState('');
  const [campeonatoSelecionado, setCampeonatoSelecionado] = useState('Todos os Campeonatos');
  const [modalAberto, setModalAberto] = useState(false);

  // === OPÇÕES DE CAMPEONATOS ===
  const campeonatosOptions: DropdownOption[] = [
    { value: 'Todos os Campeonatos', label: 'Todos os Campeonatos' },
    { value: 'Copa Verão 2024', label: 'Copa Verão 2024' },
    { value: 'Campeonato', label: 'Campeonato' }
  ];

  // === DADOS MOCKADOS ===
  const times = [
    {
      id: 1,
      nome: 'Astro Rei FC',
      sigla: 'AR',
      corFundo: 'bg-green-600',
      corBorda: 'border-green-600',
      campeonato: 'Copa Verão 2024',
      tecnico: 'Anderson Tejada',
      email: 'astrorefc@email.com',
      jogadores: 10,
      fundacao: '2023'
    },
    {
      id: 2,
      nome: 'Flamengo',
      sigla: 'F',
      corFundo: 'bg-red-600',
      corBorda: 'border-red-600',
      campeonato: 'Campeonato',
      tecnico: 'Jorge Jesus',
      email: 'contato@flamengo.com.br',
      jogadores: 25,
      fundacao: '1895'
    },
    {
      id: 3,
      nome: 'Corinthians',
      sigla: 'C',
      corFundo: 'bg-gray-800',
      corBorda: 'border-gray-800',
      campeonato: 'Campeonato',
      tecnico: 'Mano Menezes',
      email: 'contato@corinthians.com.br',
      jogadores: 26,
      fundacao: '1910'
    },
    {
      id: 4,
      nome: 'Palmeiras',
      sigla: 'P',
      corFundo: 'bg-green-700',
      corBorda: 'border-green-700',
      campeonato: 'Campeonato',
      tecnico: 'Abel Ferreira',
      email: 'contato@palmeiras.com.br',
      jogadores: 28,
      fundacao: '1914'
    },
    {
      id: 5,
      nome: 'Lakers Unidos',
      sigla: 'LU',
      corFundo: 'bg-purple-600',
      corBorda: 'border-purple-600',
      campeonato: 'Campeonato',
      tecnico: 'Carlos Silva',
      email: 'contato@lakersunidos.com',
      jogadores: 12,
      fundacao: '2015'
    }
  ];

  // === FUNÇÃO PARA GERAR OPÇÕES DO MENU ===
  const getMenuOptions = (timeId: number): CardMenuOption[] => [
    {
      label: 'Detalhes',
      icon: Eye,
      onClick: () => console.log('Ver detalhes:', timeId)
    },
    {
      label: 'Editar',
      icon: Edit,
      onClick: () => console.log('Editar:', timeId)
    },
    {
      label: 'Bloquear',
      icon: Lock,
      onClick: () => console.log('Bloquear:', timeId)
    },
    {
      label: 'Desbloquear',
      icon: Unlock,
      onClick: () => console.log('Desbloquear:', timeId)
    }
  ];

  return (
    <div>
      {/* === HEADER === */}
      <PageHeader
        title="Times"
        subtitle="Gerencie as equipes dos campeonatos"
        action={
          <Button 
            icon={Plus} 
            iconPosition="left" 
            variant="primary"
            onClick={() => setModalAberto(true)}
          >
            Novo Time
          </Button>
        }
      />

      {/* === BUSCA E FILTRO === */}
      <div className="flex flex-col md:flex-row items-stretch gap-3 mb-6">
        {/* Busca */}
        <div className="flex-1">
          <SearchInput
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar times..."
            maxWidth="max-w-none"
          />
        </div>

        {/* Dropdown de Campeonatos */}
        <div className="w-full md:w-auto md:min-w-[280px]">
          <Dropdown
            name="campeonato"
            value={campeonatoSelecionado}
            onChange={(value) => setCampeonatoSelecionado(value)}
            options={campeonatosOptions}
          />
        </div>
      </div>

      {/* === LISTA DE TIMES === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {times.map((time) => (
          <div
            key={time.id}
            className={`bg-white rounded-xl shadow-sm border-t-4 ${time.corBorda} border-x border-b border-gray-100 p-6 hover:shadow-md transition-shadow`}
          >
            {/* Cabeçalho do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Avatar com Sigla */}
                <div className={`w-12 h-12 ${time.corFundo} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">{time.sigla}</span>
                </div>

                {/* Nome e Campeonato */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-base mb-1 truncate">
                    {time.nome}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {time.campeonato}
                  </p>
                </div>
              </div>

              {/* Menu de Opções */}
              <CardMenu options={getMenuOptions(time.id)} />
            </div>

            {/* Informações do Time */}
            <div className="space-y-2.5 mb-4">
              {/* Técnico */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon icon={User} size={14} className="text-gray-400" />
                <span className="truncate">Técnico: {time.tecnico}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon icon={Mail} size={14} className="text-gray-400" />
                <span className="truncate">{time.email}</span>
              </div>

              {/* Jogadores */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon icon={UsersIcon} size={14} className="text-gray-400" />
                <span>{time.jogadores} jogadores</span>
              </div>

              {/* Fundação */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon icon={Calendar} size={14} className="text-gray-400" />
                <span>Fundado em {time.fundacao}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === MODAL === */}
      <NovoTimesForm
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}