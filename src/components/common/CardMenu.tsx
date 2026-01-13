import { MoreVertical, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import Icon from './Icon';

export interface CardMenuOption {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface CardMenuProps {
  options: CardMenuOption[];
}

export default function CardMenu({ options }: CardMenuProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <button 
        onClick={() => setMenuAberto(!menuAberto)}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
      >
        <Icon icon={MoreVertical} size={20} />
      </button>

      {menuAberto && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setMenuAberto(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-8 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.onClick();
                  setMenuAberto(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Icon icon={option.icon} size={16} className="text-gray-500" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}