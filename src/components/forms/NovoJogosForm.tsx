import { useState } from 'react';
import { Calendar, Save } from 'lucide-react';
import Modal from '@/components/common/Modal';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Input from '@/components/common/Input';
import DatePicker from '@/components/common/DatePicker';
import TimePicker from '@/components/common/TimePicker';
import Button from '@/components/common/Button';

interface NovoJogoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NovoJogoData) => void;
}

export interface NovoJogoData {
  campeonato: string;
  timeCasa: string;
  timeVisitante: string;
  data: string;
  hora: string;
  rodada: string;
  local: string;
}

// Opções mockadas - substituir por dados reais da API
const campeonatosOptions: DropdownOption[] = [
  { value: '', label: 'Selecione o campeonato' },
  { value: '1', label: 'Campeonato Brasileiro' },
  { value: '2', label: 'Copa Libertadores' },
  { value: '3', label: 'Campeonato Paulista' },
  { value: '4', label: 'Copa do Brasil' }
];

const timesOptions: DropdownOption[] = [
  { value: '', label: 'Selecione o time' },
  { value: '1', label: 'Palmeiras' },
  { value: '2', label: 'Flamengo' },
  { value: '3', label: 'Corinthians' },
  { value: '4', label: 'São Paulo' },
  { value: '5', label: 'Fluminense' },
  { value: '6', label: 'Botafogo' }
];

export default function NovoJogoForm({ isOpen, onClose, onSubmit }: NovoJogoFormProps) {
  const [formData, setFormData] = useState<NovoJogoData>({
    campeonato: '',
    timeCasa: '',
    timeVisitante: '',
    data: '',
    hora: '',
    rodada: '',
    local: ''
  });

  const handleChange = (field: keyof NovoJogoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      campeonato: '',
      timeCasa: '',
      timeVisitante: '',
      data: '',
      hora: '',
      rodada: '',
      local: ''
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Novo Jogo"
      icon={Calendar}
      iconColor="text-purple-600"
      iconBg="bg-purple-100"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campeonato */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campeonato <span className="text-red-500">*</span>
          </label>
          <Dropdown
            name="campeonato"
            value={formData.campeonato}
            onChange={(value) => handleChange('campeonato', value)}
            options={campeonatosOptions}
            placeholder="Selecione o campeonato"
            required
          />
        </div>

        {/* Time da Casa e Time Visitante */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time da Casa <span className="text-red-500">*</span>
            </label>
            <Dropdown
              name="timeCasa"
              value={formData.timeCasa}
              onChange={(value) => handleChange('timeCasa', value)}
              options={timesOptions}
              placeholder="Selecione o time"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Visitante <span className="text-red-500">*</span>
            </label>
            <Dropdown
              name="timeVisitante"
              value={formData.timeVisitante}
              onChange={(value) => handleChange('timeVisitante', value)}
              options={timesOptions}
              placeholder="Selecione o time"
              required
            />
          </div>
        </div>

        {/* Data e Hora */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data e Hora <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <DatePicker
              name="data"
              value={formData.data}
              onChange={(value) => handleChange('data', value)}
              placeholder="Data"
              required
            />
            
            <TimePicker
              name="hora"
              value={formData.hora}
              onChange={(value) => handleChange('hora', value)}
              placeholder="Hora"
              required
            />
          </div>
        </div>

        {/* Rodada */}
        <Input
          name="rodada"
          type="number"
          value={formData.rodada}
          onChange={(e) => handleChange('rodada', e.target.value)}
          label="Rodada"
          placeholder="Ex: 1"
          min="1"
        />

        {/* Local do Jogo */}
        <Input
          name="local"
          type="text"
          value={formData.local}
          onChange={(e) => handleChange('local', e.target.value)}
          label="Local do Jogo"
          placeholder="Ex: Estádio Maracanã"
        />

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="primary"
            icon={Save}
          >
            Agendar Jogo
          </Button>
        </div>
      </form>
    </Modal>
  );
}