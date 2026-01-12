import { useState } from 'react';
import { Trophy, Footprints, Circle, Disc, Flame, Hand, MapPin, Target, Award, Clock } from 'lucide-react';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Select, { SelectOption } from '@/components/common/Select';

interface NovoCampeonatoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NovoCampeonatoForm({ isOpen, onClose }: NovoCampeonatoFormProps) {
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

  // Opções de Modalidade com ícones
  const modalidadeOptions: SelectOption[] = [
    { value: 'Futebol', label: 'Futebol', icon: Footprints },
    { value: 'Basquete', label: 'Basquete', icon: Circle },
    { value: 'Vôlei', label: 'Vôlei', icon: Disc },
    { value: 'Futsal', label: 'Futsal', icon: Flame },
    { value: 'Handebol', label: 'Handebol', icon: Hand }
  ];

  // Opções de Formato com ícones
  const formatoOptions: SelectOption[] = [
    { value: 'Pontos Corridos', label: 'Pontos Corridos', icon: Target },
    { value: 'Eliminatória', label: 'Eliminatória', icon: Award },
    { value: 'Mata-Mata', label: 'Mata-Mata', icon: Trophy },
    { value: 'Grupos + Eliminatórias', label: 'Grupos + Eliminatórias', icon: Target }
  ];

  // Opções de Status com ícones
  const statusOptions: SelectOption[] = [
    { value: 'Planejamento', label: 'Planejamento', icon: Clock },
    { value: 'Inscrições', label: 'Inscrições', icon: Award },
    { value: 'Em Andamento', label: 'Em Andamento', icon: Trophy },
    { value: 'Finalizado', label: 'Finalizado', icon: Target }
  ];

  // Opções de Cidade com ícones
  const cidadeOptions: SelectOption[] = [
    { value: 'Tabatinga', label: 'Tabatinga', icon: MapPin },
    { value: 'Benjamin', label: 'Benjamin', icon: MapPin },
    { value: 'Umariaçu', label: 'Umariaçu', icon: MapPin }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui você faria a lógica de salvar o campeonato
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome e Modalidade */}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modalidade
            </label>
            <Select
              name="modalidade"
              value={formData.modalidade}
              onChange={handleChange}
              options={modalidadeOptions}
            />
          </div>
        </div>

        {/* Descrição */}
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

        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data de Início <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formato
            </label>
            <Select
              name="formato"
              value={formData.formato}
              onChange={handleChange}
              options={formatoOptions}
            />
          </div>
        </div>

        {/* Status e Cidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cidade
            </label>
            <Select
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              options={cidadeOptions}
            />
          </div>
        </div>

        {/* Botões */}
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