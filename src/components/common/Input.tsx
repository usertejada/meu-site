import { LucideIcon } from 'lucide-react';
import Icon from './Icon';

interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'number' | 'url' | 'password' | 'tel';
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  min?: string | number;
  max?: string | number;
  className?: string;
}

export default function Input({
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  required = false,
  disabled = false,
  icon,
  min,
  max,
  className = ''
}: InputProps) {
  
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon icon={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors`}
        />
      </div>
    </div>
  );
}