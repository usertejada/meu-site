import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { IconType } from 'react-icons';
import Icon from './Icon';
import SportIcon from './SportIcon';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: LucideIcon | IconType;
  iconType?: 'lucide' | 'react-icons';
}

interface DropdownProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Dropdown({
  name,
  value,
  onChange,
  options,
  placeholder = 'Selecione...',
  required = false,
  disabled = false,
  className = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  // Atualiza a posição do dropdown
  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  // Calcula a posição inicial e adiciona listener de scroll
  useEffect(() => {
    if (isOpen) {
      updatePosition();

      // Detecta scroll em qualquer elemento
      const handleScroll = () => {
        updatePosition();
      };

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [isOpen]);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const renderIcon = (option: DropdownOption) => {
    if (!option.icon) return null;
    
    return option.iconType === 'react-icons' ? (
      <SportIcon icon={option.icon as IconType} size={18} />
    ) : (
      <Icon icon={option.icon as LucideIcon} size={18} className="text-gray-600" strokeWidth={2} />
    );
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
            isOpen ? 'ring-1 ring-blue-500' : ''
          }`}
        >
          <div className="flex items-center gap-2 flex-1">
            {selectedOption?.icon && renderIcon(selectedOption)}
            <span className={selectedOption ? 'text-gray-700' : 'text-gray-400'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          
          <Icon 
            icon={ChevronDown} 
            size={18} 
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      </div>

      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: `${position.top + 4}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
            zIndex: 99999
          }}
          className="bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-blue-50 transition-colors ${
                option.value === value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              {option.icon && renderIcon(option)}
              <span>{option.label}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}