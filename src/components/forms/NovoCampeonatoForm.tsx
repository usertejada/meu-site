import { useState } from 'react';
import { Trophy, MapPin } from 'lucide-react';
import { GiSoccerBall, GiBasketballBall, GiVolleyballBall, GiSoccerField } from 'react-icons/gi';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import DatePicker from '@/components/common/DatePicker';

interface NovoCampeonatoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NovoCampeonatoForm({ isOpen, onClose }: NovoCampeonatoFormProps) {
  // === ESTADO DO FORMULÁRIO ===
  const [formData, setFormData] = useState({
    nome: '',
    modalidade: 'Futebol',
    descricao: '',
    dataInicio: '',
    dataTermino: '',
    formato: 'Pontos Corridos',
    status: 'Planejamento',
    cidade: 'Tabatinga'
  });

  // === OPÇÕES DE MODALIDADE (Com ícones do React Icons) ===
  const modalidadeOptions: DropdownOption[] = [
    { value: 'Futebol', label: 'Futebol', icon: GiSoccerBall, iconType: 'react-icons' },
    { value: 'Basquete', label: 'Basquete', icon: GiBasketballBall, iconType: 'react-icons' },
    { value: 'Vôlei', label: 'Vôlei', icon: GiVolleyballBall, iconType: 'react-icons' },
    { value: 'Futsal', label: 'Futsal', icon: GiSoccerField, iconType: 'react-icons' },
    { value: 'Handebol', label: 'Handebol', icon: GiSoccerField, iconType: 'react-icons' }
  ];

  // === OPÇÕES DE FORMATO (SEM ícones) ===
  const formatoOptions: DropdownOption[] = [
    { value: 'Pontos Corridos', label: 'Pontos Corridos' },
    { value: 'Eliminatória', label: 'Eliminatória' },
    { value: 'Mata-Mata', label: 'Mata-Mata' },
    { value: 'Grupos + Eliminatórias', label: 'Grupos + Eliminatórias' }
  ];

  // === OPÇÕES DE STATUS (SEM ícones) ===
  const statusOptions: DropdownOption[] = [
    { value: 'Planejamento', label: 'Planejamento' },
    { value: 'Inscrições', label: 'Inscrições' },
    { value: 'Em Andamento', label: 'Em Andamento' },
    { value: 'Finalizado', label: 'Finalizado' }
  ];

  // === OPÇÕES DE CIDADE (Com ícone do Lucide) ===
  const cidadeOptions: DropdownOption[] = [
    { value: 'Tabatinga', label: 'Tabatinga', icon: MapPin, iconType: 'lucide' },
    { value: 'Benjamin', label: 'Benjamin', icon: MapPin, iconType: 'lucide' },
    { value: 'Umariaçu', label: 'Umariaçu', icon: MapPin, iconType: 'lucide' }
  ];

  // === HANDLERS ===
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui você faria a lógica de salvar o campeonato
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Novo Campeonato"
      icon={Trophy}
      iconColor="text-blue-600"
      iconBg="bg-blue-100"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* === NOME E DATA DE INÍCIO === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Campeonato <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Copa de Futebol 2024"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* NOVO DATEPICKER AQUI */}
          <DatePicker
            name="dataInicio"
            value={formData.dataInicio}
            onChange={(value) => setFormData({ ...formData, dataInicio: value })}
            label="Data de Início"
            placeholder="Data"
            required
          />
        </div>

        {/* === DESCRIÇÃO === */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva o campeonato..."
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* === MODALIDADE E FORMATO === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formato
            </label>
            <Dropdown
              name="formato"
              value={formData.formato}
              onChange={(value) => setFormData({ ...formData, formato: value })}
              options={formatoOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modalidade
            </label>
            <Dropdown
              name="modalidade"
              value={formData.modalidade}
              onChange={(value) => setFormData({ ...formData, modalidade: value })}
              options={modalidadeOptions}
            />
          </div>
        </div>

        {/* === STATUS E CIDADE === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Dropdown
              name="status"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value })}
              options={statusOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cidade
            </label>
            <Dropdown
              name="cidade"
              value={formData.cidade}
              onChange={(value) => setFormData({ ...formData, cidade: value })}
              options={cidadeOptions}
            />
          </div>
        </div>

        {/* === BOTÕES === */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            Criar Campeonato
          </Button>
        </div>
      </form>
    </Modal>
  );
}