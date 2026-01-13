import { Search } from 'lucide-react';
import Icon from './Icon';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxWidth?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  disabled = false,
  className = '',
  maxWidth = 'lg:max-w-md'
}: SearchInputProps) {
  
  return (
    <div className={`relative flex-1 ${maxWidth}`}>
      {/* === ÍCONE DE BUSCA === */}
      <Icon 
        icon={Search} 
        size={18} 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
      />
      
      {/* === INPUT === */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${className}`}
      />
    </div>
  );
}