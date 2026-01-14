import { Users, Save, User, Mail, UsersIcon, Calendar, UserCheck } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import FileInput from '@/components/common/FileInput';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';

interface NovoTimesFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NovoTimesForm({ isOpen, onClose }: NovoTimesFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    campeonato: '',
    logoFile: '',
    responsavel: '',
    tecnico: '',
    email: '',
    numJogadores: '',
    anoFundacao: ''
  });

  // Opções de campeonatos (futuramente virá do localStorage)
  const campeonatosOptions: DropdownOption[] = [
    { value: '', label: 'Selecione o campeonato' },
    { value: 'copa-verao-2024', label: 'Copa Verão 2024' },
    { value: 'campeonato', label: 'Campeonato' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDropdownChange = (value: string) => {
    setFormData({
      ...formData,
      campeonato: value
    });
  };

  const handleFileChange = (value: string) => {
    setFormData({
      ...formData,
      logoFile: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do time:', formData);
    // Aqui virá a lógica de salvar no localStorage
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      campeonato: '',
      logoFile: '',
      responsavel: '',
      tecnico: '',
      email: '',
      numJogadores: '',
      anoFundacao: ''
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Novo Time"
      icon={Users}
      iconColor="text-green-600"
      iconBg="bg-green-100"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Linha 1: Nome e Campeonato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            label="Nome do Time"
            placeholder="Ex: Flamengo"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campeonato <span className="text-red-500">*</span>
            </label>
            <Dropdown
              name="campeonato"
              value={formData.campeonato}
              onChange={handleDropdownChange}
              options={campeonatosOptions}
              placeholder="Selecione o campeonato"
              required
            />
          </div>
        </div>

        {/* Linha 2: Logo e Responsável */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput
            name="logoFile"
            value={formData.logoFile}
            onChange={handleFileChange}
            label="Logo do Time"
            placeholder="Selecione uma imagem"
            accept="image/*"
          />

          <Input
            name="responsavel"
            value={formData.responsavel}
            onChange={handleChange}
            label="Nome do Responsável"
            placeholder="Ex: João Silva"
            icon={UserCheck}
          />
        </div>

        {/* Linha 3: Técnico e Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="tecnico"
            value={formData.tecnico}
            onChange={handleChange}
            label="Técnico"
            placeholder="Ex: Jorge Jesus"
            icon={User}
          />

          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            label="Email de Contato"
            placeholder="contato@time.com"
            icon={Mail}
          />
        </div>

        {/* Linha 4: Número de Jogadores e Ano de Fundação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="numJogadores"
            value={formData.numJogadores}
            onChange={handleChange}
            type="number"
            label="Número de Jogadores"
            placeholder="Ex: 25"
            icon={UsersIcon}
            min="0"
          />

          <Input
            name="anoFundacao"
            value={formData.anoFundacao}
            onChange={handleChange}
            type="number"
            label="Ano de Fundação"
            placeholder="Ex: 1895"
            icon={Calendar}
            min="1800"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            icon={Save}
            iconPosition="left"
          >
            Cadastrar Time
          </Button>
        </div>
      </form>
    </Modal>
  );
}