import { useState } from 'react';
import { useRouter } from 'next/router';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import SearchInput from '@/components/common/SearchInput';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import DatePicker from '@/components/common/DatePicker';
import FileInput from '@/components/common/FileInput';
import CardMenu, { CardMenuOption } from '@/components/common/CardMenu';

interface Jogador {
  id: string;
  nome: string;
  foto?: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  idade: number;
  posicao: string;
  numeroPreferido: number;
  time?: string;
  gols?: number;
  jogos?: number;
}

export default function JogadoresPage() {
  const router = useRouter();

  // Estado dos jogadores (simulado - virá da API)
  const [jogadores, setJogadores] = useState<Jogador[]>([
    {
      id: '1',
      nome: 'Anderson Tejada',
      email: 'anderson@email.com',
      telefone: '(11) 98765-4321',
      dataNascimento: '1995-03-15',
      idade: 28,
      posicao: 'meio-campista',
      numeroPreferido: 10,
      time: 'Astro Rei FC',
      gols: 8,
      jogos: 15
    },
    {
      id: '2',
      nome: 'Roger Guedes',
      email: 'roger@email.com',
      telefone: '(11) 98765-4322',
      dataNascimento: '1996-05-20',
      idade: 27,
      posicao: 'atacante',
      numeroPreferido: 9,
      gols: 12,
      jogos: 15
    },
    {
      id: '3',
      nome: 'Gabriel Barbosa',
      email: 'gabriel@email.com',
      telefone: '(11) 98765-4323',
      dataNascimento: '1996-08-30',
      idade: 27,
      posicao: 'atacante',
      numeroPreferido: 10,
      gols: 15,
      jogos: 14
    },
    {
      id: '4',
      nome: 'Dudu Silva',
      email: 'dudu@email.com',
      telefone: '(11) 98765-4324',
      dataNascimento: '1992-01-07',
      idade: 31,
      posicao: 'atacante',
      numeroPreferido: 7,
      gols: 10,
      jogos: 13
    },
    {
      id: '5',
      nome: 'Arrascaeta',
      email: 'arrascaeta@email.com',
      telefone: '(11) 98765-4325',
      dataNascimento: '1994-06-01',
      idade: 29,
      posicao: 'meio-campista',
      numeroPreferido: 14,
      gols: 6,
      jogos: 15
    }
  ]);

  // Estados de filtros e busca
  const [busca, setBusca] = useState('');
  const [filtroTime, setFiltroTime] = useState('todos');
  const [filtroPosicao, setFiltroPosicao] = useState('todas');

  // Modal de novo jogador
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [jogadorSelecionado, setJogadorSelecionado] = useState<Jogador | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    posicao: '',
    numeroPreferido: '',
    foto: ''
  });

  // Opções de filtros
  const timesOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todos os Times' },
    { value: 'astro-rei', label: 'Astro Rei FC' },
    { value: 'time-b', label: 'Time B' },
    { value: 'time-c', label: 'Time C' }
  ];

  const posicoesOptions: DropdownOption[] = [
    { value: 'todas', label: 'Todas as Posições' },
    { value: 'goleiro', label: 'Goleiro' },
    { value: 'zagueiro', label: 'Zagueiro' },
    { value: 'lateral', label: 'Lateral' },
    { value: 'meio-campista', label: 'Meio-campista' },
    { value: 'atacante', label: 'Atacante' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNovoJogador = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      posicao: '',
      numeroPreferido: '',
      foto: ''
    });
    setModalNovoAberto(true);
  };

  const handleEditarJogador = (jogador: Jogador) => {
    setJogadorSelecionado(jogador);
    setFormData({
      nome: jogador.nome,
      email: jogador.email,
      telefone: jogador.telefone,
      dataNascimento: jogador.dataNascimento,
      posicao: jogador.posicao,
      numeroPreferido: jogador.numeroPreferido.toString(),
      foto: jogador.foto || ''
    });
    setModalEditarAberto(true);
  };

  const handleExcluirJogador = (jogador: Jogador) => {
    setJogadorSelecionado(jogador);
    setModalExcluirAberto(true);
  };

  const handleVerDetalhes = (id: string) => {
    router.push(`/jogador?id=${id}`);
  };

  const handleSalvarNovo = () => {
    console.log('Salvando novo jogador:', formData);
    // Aqui você fará a chamada para a API
    setModalNovoAberto(false);
  };

  const handleSalvarEdicao = () => {
    console.log('Salvando edição:', formData);
    // Aqui você fará a chamada para a API
    setModalEditarAberto(false);
  };

  const handleConfirmarExclusao = () => {
    console.log('Excluindo jogador:', jogadorSelecionado?.id);
    // Aqui você fará a chamada para a API
    setJogadores(jogadores.filter(j => j.id !== jogadorSelecionado?.id));
    setModalExcluirAberto(false);
  };

  // Filtrar jogadores
  const jogadoresFiltrados = jogadores.filter(jogador => {
    const matchBusca = jogador.nome.toLowerCase().includes(busca.toLowerCase());
    const matchTime = filtroTime === 'todos' || jogador.time?.toLowerCase().includes(filtroTime);
    const matchPosicao = filtroPosicao === 'todas' || jogador.posicao === filtroPosicao;
    
    return matchBusca && matchTime && matchPosicao;
  });

  const getPosicaoLabel = (posicao: string) => {
    const labels: Record<string, string> = {
      'goleiro': 'Goleiro',
      'zagueiro': 'Zagueiro',
      'lateral': 'Lateral',
      'meio-campista': 'Meio-campista',
      'atacante': 'Atacante'
    };
    return labels[posicao] || posicao;
  };

  const getPosicaoBadge = (posicao: string) => {
    const badges: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
      'goleiro': 'warning',
      'zagueiro': 'default',
      'lateral': 'info',
      'meio-campista': 'success',
      'atacante': 'warning'
    };
    return badges[posicao] || 'default';
  };

  return (
    <div>
      {/* Header */}
      <PageHeader
        title="Jogadores"
        subtitle="Gerencie os craques dos seus campeonatos"
        action={
          <Button
            variant="primary"
            icon={Plus}
            onClick={handleNovoJogador}
          >
            Novo Jogador
          </Button>
        }
      />

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchInput
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <Dropdown
          name="filtroTime"
          value={filtroTime}
          onChange={setFiltroTime}
          options={timesOptions}
          placeholder="Filtrar por time"
        />

        <Dropdown
          name="filtroPosicao"
          value={filtroPosicao}
          onChange={setFiltroPosicao}
          options={posicoesOptions}
          placeholder="Filtrar por posição"
        />
      </div>

      {/* Grid de Jogadores */}
      {jogadoresFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jogadoresFiltrados.map((jogador) => {
            const menuOptions: CardMenuOption[] = [
              {
                label: 'Ver Detalhes',
                icon: Eye,
                onClick: () => handleVerDetalhes(jogador.id)
              },
              {
                label: 'Editar',
                icon: Edit,
                onClick: () => handleEditarJogador(jogador)
              },
              {
                label: 'Excluir',
                icon: Trash2,
                onClick: () => handleExcluirJogador(jogador)
              }
            ];

            return (
              <div
                key={jogador.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                {/* Card Header com Menu */}
                <div className="p-4 flex items-start justify-between border-b border-gray-100">
                  <div className="flex-1" onClick={() => handleVerDetalhes(jogador.id)}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                        {jogador.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-base truncate">
                          {jogador.nome}
                        </h3>
                        {jogador.time && (
                          <p className="text-sm text-gray-600 truncate">{jogador.time}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant={getPosicaoBadge(jogador.posicao)}>
                        {getPosicaoLabel(jogador.posicao)}
                      </Badge>
                      <Badge variant="default">#{jogador.numeroPreferido}</Badge>
                    </div>
                  </div>

                  <CardMenu options={menuOptions} />
                </div>

                {/* Card Body */}
                <div 
                  className="p-4 space-y-2"
                  onClick={() => handleVerDetalhes(jogador.id)}
                >
                  {jogador.jogos !== undefined && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Jogos</span>
                      <span className="font-semibold text-gray-800">{jogador.jogos}</span>
                    </div>
                  )}
                  
                  {jogador.gols !== undefined && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Gols</span>
                      <span className="font-semibold text-green-600">{jogador.gols}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100">
                    <span className="text-gray-600">Idade</span>
                    <span className="font-semibold text-gray-800">{jogador.idade} anos</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Nenhum jogador encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              {busca || filtroTime !== 'todos' || filtroPosicao !== 'todas'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece cadastrando o primeiro jogador'}
            </p>
            {!busca && filtroTime === 'todos' && filtroPosicao === 'todas' && (
              <Button variant="primary" icon={Plus} onClick={handleNovoJogador}>
                Cadastrar Primeiro Jogador
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Modal Novo Jogador */}
      <Modal
        isOpen={modalNovoAberto}
        onClose={() => setModalNovoAberto(false)}
        title="Novo Jogador"
        icon={Plus}
        maxWidth="2xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="nome"
              label="Nome Completo"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite o nome"
              required
            />

            <Input
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@exemplo.com"
              required
            />

            <Input
              name="telefone"
              label="Telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleInputChange}
              placeholder="(00) 00000-0000"
              required
            />

            <DatePicker
              name="dataNascimento"
              label="Data de Nascimento"
              value={formData.dataNascimento}
              onChange={(value) => setFormData(prev => ({ ...prev, dataNascimento: value }))}
              required
            />

            <Dropdown
              name="posicao"
              value={formData.posicao}
              onChange={(value) => setFormData(prev => ({ ...prev, posicao: value }))}
              options={posicoesOptions.filter(p => p.value !== 'todas')}
              placeholder="Selecione a posição"
              required
            />

            <Input
              name="numeroPreferido"
              label="Número Preferido"
              type="number"
              value={formData.numeroPreferido}
              onChange={handleInputChange}
              placeholder="10"
              min={1}
              max={99}
              required
            />
          </div>

          <FileInput
            name="foto"
            label="Foto do Jogador"
            value={formData.foto}
            onChange={(value) => setFormData(prev => ({ ...prev, foto: value }))}
            placeholder="Selecione uma foto"
            accept="image/*"
          />

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setModalNovoAberto(false)}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSalvarNovo}
              fullWidth
            >
              Cadastrar Jogador
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal Editar Jogador */}
      <Modal
        isOpen={modalEditarAberto}
        onClose={() => setModalEditarAberto(false)}
        title="Editar Jogador"
        icon={Edit}
        maxWidth="2xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="nome"
              label="Nome Completo"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite o nome"
              required
            />

            <Input
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@exemplo.com"
              required
            />

            <Input
              name="telefone"
              label="Telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleInputChange}
              placeholder="(00) 00000-0000"
              required
            />

            <DatePicker
              name="dataNascimento"
              label="Data de Nascimento"
              value={formData.dataNascimento}
              onChange={(value) => setFormData(prev => ({ ...prev, dataNascimento: value }))}
              required
            />

            <Dropdown
              name="posicao"
              value={formData.posicao}
              onChange={(value) => setFormData(prev => ({ ...prev, posicao: value }))}
              options={posicoesOptions.filter(p => p.value !== 'todas')}
              placeholder="Selecione a posição"
              required
            />

            <Input
              name="numeroPreferido"
              label="Número Preferido"
              type="number"
              value={formData.numeroPreferido}
              onChange={handleInputChange}
              placeholder="10"
              min={1}
              max={99}
              required
            />
          </div>

          <FileInput
            name="foto"
            label="Foto do Jogador"
            value={formData.foto}
            onChange={(value) => setFormData(prev => ({ ...prev, foto: value }))}
            placeholder="Selecione uma foto"
            accept="image/*"
          />

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setModalEditarAberto(false)}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSalvarEdicao}
              fullWidth
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal Excluir */}
      <Modal
        isOpen={modalExcluirAberto}
        onClose={() => setModalExcluirAberto(false)}
        title="Excluir Jogador"
        icon={Trash2}
        iconColor="text-red-600"
        iconBg="bg-red-100"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Tem certeza que deseja excluir o jogador{' '}
            <strong className="text-gray-800">{jogadorSelecionado?.nome}</strong>?
          </p>
          <p className="text-sm text-red-600">
            Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.
          </p>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setModalExcluirAberto(false)}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmarExclusao}
              fullWidth
              className="bg-red-600 hover:bg-red-700 active:bg-red-800"
            >
              Excluir Jogador
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}