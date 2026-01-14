import React, { useEffect } from 'react';
import { X, LucideIcon } from 'lucide-react';
import Icon from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
  maxWidth = 'lg'
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl'
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />

      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon icon={icon} size={20} className={iconColor} />
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>
            
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icon icon={X} size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}