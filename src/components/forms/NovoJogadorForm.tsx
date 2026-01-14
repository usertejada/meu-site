// components/forms/NovoJogadorForm.tsx
import { Plus, User, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import DatePicker from '@/components/common/DatePicker';
import FileInput from '@/components/common/FileInput';

interface NovoJogadorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: FormData) => void;
  jogadorData?: FormData;
  mode?: 'create' | 'edit';
}

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  posicao: string;
  numeroPreferido: string;
  cidade: string;
  estado: string;
  foto: string;
}

export default function NovoJogadorForm({
  isOpen,
  onClose,
  onSave,
  jogadorData,
  mode = 'create'
}: NovoJogadorFormProps) {
  
  const [formData, setFormData] = useState<FormData>(
    jogadorData || {
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      posicao: '',
      numeroPreferido: '',
      cidade: '',
      estado: '',
      foto: ''
    }
  );

  // Opções de posição
  const posicoesOptions: DropdownOption[] = [
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

  const handleSubmit = () => {
    console.log('Salvando jogador:', formData);
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleClose = () => {
    // Reseta o formulário ao fechar
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      posicao: '',
      numeroPreferido: '',
      cidade: '',
      estado: '',
      foto: ''
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Novo Jogador' : 'Editar Jogador'}
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
            icon={User}
          />

          <Input
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="email@exemplo.com"
            required
            icon={Mail}
          />

          <Input
            name="telefone"
            label="Telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleInputChange}
            placeholder="(00) 00000-0000"
            required
            icon={Phone}
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
            label="Posição"
            value={formData.posicao}
            onChange={(value) => setFormData(prev => ({ ...prev, posicao: value }))}
            options={posicoesOptions}
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

          <Input
            name="cidade"
            label="Cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            placeholder="Digite a cidade"
            required
            icon={MapPin}
          />

          <Input
            name="estado"
            label="Estado"
            value={formData.estado}
            onChange={handleInputChange}
            placeholder="SP"
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
            onClick={handleClose}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            fullWidth
          >
            {mode === 'create' ? 'Cadastrar Jogador' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}