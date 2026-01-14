import { Upload } from 'lucide-react';
import { useRef } from 'react';
import Icon from './Icon';

interface FileInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function FileInput({
  name,
  value,
  onChange,
  label,
  placeholder = 'Nenhum arquivo selecionado',
  accept = 'image/*',
  required = false,
  disabled = false
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const getFileName = () => {
    if (value) {
      return value.substring(0, 30) + (value.length > 30 ? '...' : '');
    }
    return placeholder;
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="w-full flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <Icon icon={Upload} size={18} className="text-gray-400" />
        <span className={value ? 'text-gray-700' : 'text-gray-400'}>
          {getFileName()}
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
        required={required}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
}