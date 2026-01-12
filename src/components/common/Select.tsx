import { LucideIcon, ChevronDown } from 'lucide-react';
import Icon from './Icon';

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Select({
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  className = ''
}: SelectProps) {
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      {/* Ícone da opção selecionada */}
      {selectedOption?.icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Icon icon={selectedOption.icon} size={18} className="text-gray-500" />
        </div>
      )}

      {/* Select nativo estilizado */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full ${selectedOption?.icon ? 'pl-10' : 'pl-4'} pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Ícone chevron */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon icon={ChevronDown} size={18} className="text-gray-400" />
      </div>
    </div>
  );
}