// pages/jogador/index.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Trophy,
  Target,
  Activity,
  TrendingUp,
  Award,
  Edit,
  ArrowLeft,
  Flag
} from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import FilterTabs from '@/components/common/FilterTabs';
import NovoJogadorForm from '@/components/forms/NovoJogadorForm';

// Tipos
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
  cidade: string;
  estado: string;
}

interface Estatistica {
  campeonato: string;
  jogos: number;
  gols: number;
  assistencias: number;
  cartoesAmarelos: number;
  cartoesVermelhos: number;
}

interface Conquista {
  titulo: string;
  campeonato: string;
  ano: string;
  tipo: 'campeao' | 'vice' | 'artilheiro' | 'melhor-jogador';
}

export default function JogadorPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [filtroEstatisticas, setFiltroEstatisticas] = useState('Todas');
  
  // Estado do jogador (simulado)
  const [jogador] = useState<Jogador>({
    id: '1',
    nome: 'Anderson Tejada',
    foto: '',
    email: 'anderson@email.com',
    telefone: '(11) 98765-4321',
    dataNascimento: '1995-03-15',
    idade: 28,
    posicao: 'meio-campista',
    numeroPreferido: 10,
    time: 'Astro Rei FC',
    cidade: 'São Paulo',
    estado: 'SP'
  });

  // Estatísticas por campeonato
  const [estatisticas] = useState<Estatistica[]>([
    {
      campeonato: 'Campeonato Paulista 2024',
      jogos: 15,
      gols: 8,
      assistencias: 5,
      cartoesAmarelos: 2,
      cartoesVermelhos: 0
    },
    {
      campeonato: 'Copa Regional 2024',
      jogos: 10,
      gols: 4,
      assistencias: 3,
      cartoesAmarelos: 1,
      cartoesVermelhos: 1
    },
    {
      campeonato: 'Campeonato Paulista 2023',
      jogos: 18,
      gols: 12,
      assistencias: 7,
      cartoesAmarelos: 3,
      cartoesVermelhos: 0
    }
  ]);

  // Conquistas
  const [conquistas] = useState<Conquista[]>([
    {
      titulo: 'Campeão',
      campeonato: 'Campeonato Paulista',
      ano: '2024',
      tipo: 'campeao'
    },
    {
      titulo: 'Artilheiro',
      campeonato: 'Copa Regional',
      ano: '2023',
      tipo: 'artilheiro'
    },
    {
      titulo: 'Vice-Campeão',
      campeonato: 'Campeonato Paulista',
      ano: '2023',
      tipo: 'vice'
    }
  ]);

  // Form data para edição
  const formData = {
    nome: jogador.nome,
    email: jogador.email,
    telefone: jogador.telefone,
    dataNascimento: jogador.dataNascimento,
    posicao: jogador.posicao,
    numeroPreferido: jogador.numeroPreferido.toString(),
    cidade: jogador.cidade,
    estado: jogador.estado,
    foto: jogador.foto || ''
  };

  // Carrega dados quando o ID mudar
  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simula carregamento da API
      setTimeout(() => {
        console.log('Carregando jogador com ID:', id);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const calcularTotais = () => {
    return estatisticas.reduce(
      (acc, est) => ({
        jogos: acc.jogos + est.jogos,
        gols: acc.gols + est.gols,
        assistencias: acc.assistencias + est.assistencias,
        cartoesAmarelos: acc.cartoesAmarelos + est.cartoesAmarelos,
        cartoesVermelhos: acc.cartoesVermelhos + est.cartoesVermelhos
      }),
      { jogos: 0, gols: 0, assistencias: 0, cartoesAmarelos: 0, cartoesVermelhos: 0 }
    );
  };

  const totais = calcularTotais();

  const getConquistaBadge = (tipo: string) => {
    switch (tipo) {
      case 'campeao': return 'success';
      case 'artilheiro': return 'warning';
      case 'vice': return 'info';
      default: return 'default';
    }
  };

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

  const handleSalvarEdicao = (data: any) => {
    console.log('Salvando edição:', data);
    // Aqui você faria a chamada para API
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações do jogador...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => router.push('/jogadores')}
          className="mb-4"
        >
          Voltar
        </Button>

        <PageHeader
          title={jogador.nome}
          subtitle="Informações completas do jogador"
          action={
            <Button
              variant="primary"
              icon={Edit}
              onClick={() => setModalEditarAberto(true)}
            >
              Editar Jogador
            </Button>
          }
        />
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Informações Pessoais */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card de Perfil */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                {jogador.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{jogador.nome}</h2>
              {jogador.time && (
                <p className="text-gray-600 mb-3">{jogador.time}</p>
              )}
              <div className="flex gap-2">
                <Badge variant="info">{getPosicaoLabel(jogador.posicao)}</Badge>
                <Badge variant="default">#{jogador.numeroPreferido}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="text-gray-800 font-medium truncate">{jogador.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-xs">Telefone</p>
                  <p className="text-gray-800 font-medium">{jogador.telefone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-xs">Idade</p>
                  <p className="text-gray-800 font-medium">{jogador.idade} anos</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-xs">Localização</p>
                  <p className="text-gray-800 font-medium">{jogador.cidade}, {jogador.estado}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Conquistas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={20} className="text-yellow-600" />
              <h3 className="text-lg font-bold text-gray-800">Conquistas</h3>
            </div>

            {conquistas.length > 0 ? (
              <div className="space-y-3">
                {conquistas.map((conquista, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {conquista.titulo}
                      </h4>
                      <Badge variant={getConquistaBadge(conquista.tipo) as any} size="sm">
                        {conquista.ano}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{conquista.campeonato}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma conquista registrada
              </p>
            )}
          </div>
        </div>

        {/* Coluna Direita - Estatísticas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={18} className="text-blue-600" />
                <span className="text-xs text-gray-500">Jogos</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totais.jogos}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target size={18} className="text-green-600" />
                <span className="text-xs text-gray-500">Gols</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totais.gols}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-purple-600" />
                <span className="text-xs text-gray-500">Assistências</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totais.assistencias}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flag size={18} className="text-yellow-600" />
                <span className="text-xs text-gray-500">Amarelos</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totais.cartoesAmarelos}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flag size={18} className="text-red-600" />
                <span className="text-xs text-gray-500">Vermelhos</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totais.cartoesVermelhos}</p>
            </div>
          </div>

          {/* Estatísticas Detalhadas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award size={20} className="text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">Estatísticas por Campeonato</h3>
            </div>

            <FilterTabs
              options={['Todas', ...estatisticas.map(e => e.campeonato.split(' ')[0])]}
              active={filtroEstatisticas}
              onChange={setFiltroEstatisticas}
              className="mb-6"
            />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                      Campeonato
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">
                      Jogos
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">
                      Gols
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">
                      Assist.
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">
                      <span className="text-yellow-600">●</span>
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600">
                      <span className="text-red-600">●</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {estatisticas.map((est, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        {est.campeonato}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-center">
                        {est.jogos}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-center">
                        {est.gols}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-center">
                        {est.assistencias}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-center">
                        {est.cartoesAmarelos}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-center">
                        {est.cartoesVermelhos}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-800">Total</td>
                    <td className="py-3 px-4 text-sm text-gray-800 text-center">
                      {totais.jogos}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 text-center">
                      {totais.gols}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 text-center">
                      {totais.assistencias}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 text-center">
                      {totais.cartoesAmarelos}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 text-center">
                      {totais.cartoesVermelhos}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edição usando componente reutilizável */}
      <NovoJogadorForm
        isOpen={modalEditarAberto}
        onClose={() => setModalEditarAberto(false)}
        onSave={handleSalvarEdicao}
        jogadorData={formData}
        mode="edit"
      />
    </div>
  );
}