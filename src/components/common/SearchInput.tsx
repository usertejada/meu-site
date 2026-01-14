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
  placeholder = 'Buscar...',  // ← MUDEI AQUI
  disabled = false,
  className = '',
  maxWidth = 'max-w-md'
}: SearchInputProps) {
  
  return (
    <div className={`relative w-full ${maxWidth}`}>
      {/* === ÍCONE DE BUSCA === */}
      <Search 
        size={20} 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
      />
      
      {/* === INPUT === */}
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`block w-full pl-11 pr-4 py-2 text-base text-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${className}`}
      />
    </div>
  );
}