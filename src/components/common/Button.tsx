import { LucideIcon } from 'lucide-react';
import Icon from './Icon';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  onClick,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = ''
}: ButtonProps) {
  
  // === ESTILOS BASE ===
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  // === VARIANTES DE COR ===
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:cursor-not-allowed',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-blue-300 disabled:text-blue-300 disabled:cursor-not-allowed',
    ghost: 'text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed'
  };
  
  // === TAMANHOS ===
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <Icon icon={icon} size={16} strokeWidth={2.5} />
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <Icon icon={icon} size={16} strokeWidth={2.5} />
      )}
    </button>
  );
}