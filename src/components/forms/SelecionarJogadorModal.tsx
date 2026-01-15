import { useState } from 'react';
import { User } from 'lucide-react';
import Modal from '@/components/common/Modal';
import SearchInput from '@/components/common/SearchInput';
import Button from '@/components/common/Button';

interface Jogador {
  id: string;
  nome: string;
  numero: number;
  posicao: string;
}

interface SelecionarJogadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (jogador: string) => void;
  timeNome: string;
  jogadores: Jogador[];
  tipoCartao: 'amarelo' | 'vermelho';
}

export default function SelecionarJogadorModal({
  isOpen,
  onClose,
  onSelect,
  timeNome,
  jogadores,
  tipoCartao
}: SelecionarJogadorModalProps) {
  const [busca, setBusca] = useState('');
  const [jogadorSelecionado, setJogadorSelecionado] = useState<string | null>(null);

  // Filtra jogadores pela busca
  const jogadoresFiltrados = jogadores.filter(jogador =>
    jogador.nome.toLowerCase().includes(busca.toLowerCase()) ||
    jogador.numero.toString().includes(busca) ||
    jogador.posicao.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSelecionar = () => {
    if (jogadorSelecionado) {
      onSelect(jogadorSelecionado);
      setJogadorSelecionado(null);
      setBusca('');
      onClose();
    }
  };

  const handleClose = () => {
    setJogadorSelecionado(null);
    setBusca('');
    onClose();
  };

  const corCartao = tipoCartao === 'amarelo' ? 'yellow' : 'red';
  const bgCartao = tipoCartao === 'amarelo' ? 'bg-yellow-100' : 'bg-red-100';
  const textCartao = tipoCartao === 'amarelo' ? 'text-yellow-700' : 'text-red-700';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Adicionar Cartão ${tipoCartao === 'amarelo' ? '🟨 Amarelo' : '🟥 Vermelho'}`}
      icon={User}
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Info do Time */}
        <div className={`${bgCartao} ${textCartao} px-4 py-3 rounded-lg`}>
          <p className="text-sm font-semibold">
            Selecione um jogador do {timeNome}
          </p>
        </div>

        {/* Busca */}
        <SearchInput
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, número ou posição..."
        />

        {/* Lista de Jogadores */}
        <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
          {jogadoresFiltrados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">Nenhum jogador encontrado</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {jogadoresFiltrados.map((jogador) => (
                <button
                  key={jogador.id}
                  type="button"
                  onClick={() => setJogadorSelecionado(jogador.nome)}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                    jogadorSelecionado === jogador.nome ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  {/* Número */}
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-gray-700 text-sm">
                      #{jogador.numero}
                    </span>
                  </div>

                  {/* Info do Jogador */}
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">{jogador.nome}</p>
                    <p className="text-sm text-gray-500">{jogador.posicao}</p>
                  </div>

                  {/* Check se selecionado */}
                  {jogadorSelecionado === jogador.nome && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleSelecionar}
            disabled={!jogadorSelecionado}
          >
            Adicionar Cartão
          </Button>
        </div>
      </div>
    </Modal>
  );
}