import { useState } from 'react';
import { Flag } from 'lucide-react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import SelecionarJogadorModal from './SelecionarJogadorModal';

export interface ResultadoData {
  placarA: number;
  placarB: number;
  cartoesAmarelosA: string[];
  cartoesVermelhoA: string[];
  cartoesAmarelosB: string[];
  cartoesVermelhoB: string[];
  descricao: string;
  tipoVitoria: 'normal' | 'wo';
  timeVencedorWO?: 'A' | 'B';
}

interface Jogador {
  id: string;
  nome: string;
  numero: number;
  posicao: string;
}

interface NovoResultadoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ResultadoData) => void;
  timeA: string;
  timeB: string;
  jogadoresTimeA?: Jogador[];
  jogadoresTimeB?: Jogador[];
}

const tipoVitoriaOptions: DropdownOption[] = [
  { value: 'normal', label: 'Resultado Normal' },
  { value: 'wo', label: 'Vitória por W.O.' }
];

const timeWOOptions: DropdownOption[] = [
  { value: 'A', label: 'Time A (Casa)' },
  { value: 'B', label: 'Time B (Visitante)' }
];

// Dados mockados de jogadores (você vai substituir pela API)
const jogadoresMock: Jogador[] = [
  { id: '1', nome: 'Gabriel Barbosa', numero: 10, posicao: 'Atacante' },
  { id: '2', nome: 'Bruno Henrique', numero: 27, posicao: 'Atacante' },
  { id: '3', nome: 'Arrascaeta', numero: 14, posicao: 'Meia' },
  { id: '4', nome: 'Gerson', numero: 8, posicao: 'Meia' },
  { id: '5', nome: 'Éverton Ribeiro', numero: 7, posicao: 'Meia' },
  { id: '6', nome: 'Filipe Luís', numero: 16, posicao: 'Lateral' },
  { id: '7', nome: 'Léo Pereira', numero: 4, posicao: 'Zagueiro' },
  { id: '8', nome: 'Rodrigo Caio', numero: 3, posicao: 'Zagueiro' },
  { id: '9', nome: 'Santos', numero: 1, posicao: 'Goleiro' },
  { id: '10', nome: 'Thiago Maia', numero: 5, posicao: 'Volante' }
];

export default function NovoResultadoForm({
  isOpen,
  onClose,
  onSubmit,
  timeA,
  timeB,
  jogadoresTimeA = jogadoresMock,
  jogadoresTimeB = jogadoresMock
}: NovoResultadoFormProps) {
  const [formData, setFormData] = useState<ResultadoData>({
    placarA: 0,
    placarB: 0,
    cartoesAmarelosA: [],
    cartoesVermelhoA: [],
    cartoesAmarelosB: [],
    cartoesVermelhoB: [],
    descricao: '',
    tipoVitoria: 'normal'
  });

  // Estados para controlar modais de seleção
  const [modalJogadorAberto, setModalJogadorAberto] = useState(false);
  const [tipoCartaoSelecionado, setTipoCartaoSelecionado] = useState<'amarelo' | 'vermelho'>('amarelo');
  const [timeSelecionado, setTimeSelecionado] = useState<'A' | 'B'>('A');

  const handleChange = (field: keyof ResultadoData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const abrirModalJogador = (tipo: 'amarelo' | 'vermelho', time: 'A' | 'B') => {
    setTipoCartaoSelecionado(tipo);
    setTimeSelecionado(time);
    setModalJogadorAberto(true);
  };

  const adicionarCartao = (jogador: string) => {
    const campo = tipoCartaoSelecionado === 'amarelo' 
      ? (timeSelecionado === 'A' ? 'cartoesAmarelosA' : 'cartoesAmarelosB')
      : (timeSelecionado === 'A' ? 'cartoesVermelhoA' : 'cartoesVermelhoB');

    setFormData(prev => ({
      ...prev,
      [campo]: [...prev[campo], jogador]
    }));
  };

  const removerCartao = (tipo: 'amarelo' | 'vermelho', time: 'A' | 'B', index: number) => {
    const campo = tipo === 'amarelo' 
      ? (time === 'A' ? 'cartoesAmarelosA' : 'cartoesAmarelosB')
      : (time === 'A' ? 'cartoesVermelhoA' : 'cartoesVermelhoB');

    setFormData(prev => ({
      ...prev,
      [campo]: prev[campo].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      placarA: 0,
      placarB: 0,
      cartoesAmarelosA: [],
      cartoesVermelhoA: [],
      cartoesAmarelosB: [],
      cartoesVermelhoB: [],
      descricao: '',
      tipoVitoria: 'normal'
    });
  };

  const jogadoresAtual = timeSelecionado === 'A' ? jogadoresTimeA : jogadoresTimeB;
  const timeAtual = timeSelecionado === 'A' ? timeA : timeB;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Inserir Resultado da Partida"
        icon={Flag}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Vitória */}
          <Dropdown
            name="tipoVitoria"
            label="Tipo de Resultado"
            value={formData.tipoVitoria}
            onChange={(value) => handleChange('tipoVitoria', value)}
            options={tipoVitoriaOptions}
          />

          {formData.tipoVitoria === 'wo' && (
            <Dropdown
              name="timeVencedorWO"
              label="Time Vencedor por W.O."
              value={formData.timeVencedorWO || ''}
              onChange={(value) => handleChange('timeVencedorWO', value as 'A' | 'B')}
              options={timeWOOptions}
              required
            />
          )}

          {formData.tipoVitoria === 'normal' && (
            <>
              {/* Placar */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="placarA"
                  label={`Placar ${timeA}`}
                  type="number"
                  value={formData.placarA.toString()}
                  onChange={(e) => handleChange('placarA', parseInt(e.target.value) || 0)}
                  min="0"
                  required
                />
                <Input
                  name="placarB"
                  label={`Placar ${timeB}`}
                  type="number"
                  value={formData.placarB.toString()}
                  onChange={(e) => handleChange('placarB', parseInt(e.target.value) || 0)}
                  min="0"
                  required
                />
              </div>

              {/* Cartões Time A */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">{timeA} - Cartões</h3>
                
                <div className="space-y-4">
                  {/* Amarelos Time A */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Cartões Amarelos
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => abrirModalJogador('amarelo', 'A')}
                      >
                        + Adicionar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.cartoesAmarelosA.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Nenhum cartão amarelo</p>
                      ) : (
                        formData.cartoesAmarelosA.map((jogador, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                          >
                            🟨 {jogador}
                            <button
                              type="button"
                              onClick={() => removerCartao('amarelo', 'A', idx)}
                              className="ml-1 text-yellow-600 hover:text-yellow-800"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Vermelhos Time A */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Cartões Vermelhos
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => abrirModalJogador('vermelho', 'A')}
                      >
                        + Adicionar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.cartoesVermelhoA.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Nenhum cartão vermelho</p>
                      ) : (
                        formData.cartoesVermelhoA.map((jogador, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                          >
                            🟥 {jogador}
                            <button
                              type="button"
                              onClick={() => removerCartao('vermelho', 'A', idx)}
                              className="ml-1 text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cartões Time B */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">{timeB} - Cartões</h3>
                
                <div className="space-y-4">
                  {/* Amarelos Time B */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Cartões Amarelos
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => abrirModalJogador('amarelo', 'B')}
                      >
                        + Adicionar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.cartoesAmarelosB.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Nenhum cartão amarelo</p>
                      ) : (
                        formData.cartoesAmarelosB.map((jogador, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                          >
                            🟨 {jogador}
                            <button
                              type="button"
                              onClick={() => removerCartao('amarelo', 'B', idx)}
                              className="ml-1 text-yellow-600 hover:text-yellow-800"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Vermelhos Time B */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Cartões Vermelhos
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => abrirModalJogador('vermelho', 'B')}
                      >
                        + Adicionar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.cartoesVermelhoB.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Nenhum cartão vermelho</p>
                      ) : (
                        formData.cartoesVermelhoB.map((jogador, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                          >
                            🟥 {jogador}
                            <button
                              type="button"
                              onClick={() => removerCartao('vermelho', 'B', idx)}
                              className="ml-1 text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Descrição */}
          <TextArea
            name="descricao"
            label="Descrição da Partida"
            value={formData.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
            placeholder="Descreva os principais acontecimentos da partida..."
            rows={4}
          />

          {/* Botões */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Salvar Resultado
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Seleção de Jogador */}
      <SelecionarJogadorModal
        isOpen={modalJogadorAberto}
        onClose={() => setModalJogadorAberto(false)}
        onSelect={adicionarCartao}
        timeNome={timeAtual}
        jogadores={jogadoresAtual}
        tipoCartao={tipoCartaoSelecionado}
      />
    </>
  );
}