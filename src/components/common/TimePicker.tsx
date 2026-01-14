import { useState, useEffect } from 'react';
import { Clock, X } from 'lucide-react';
import Icon from './Icon';

interface TimePickerProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
}

export default function TimePicker({
  name,
  value,
  onChange,
  placeholder = 'Selecione a hora',
  required = false,
  label,
  disabled = false
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hora, setHora] = useState('12');
  const [minuto, setMinuto] = useState('00');

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      setHora(h);
      setMinuto(m);
    }
  }, [value]);

  const horas = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutos = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleConfirm = () => {
    onChange(`${hora}:${minuto}`);
    setIsOpen(false);
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
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className="w-full flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <Icon icon={Clock} size={18} className="text-gray-400" />
        <span className={value ? 'text-gray-700' : 'text-gray-400'}>
          {value || placeholder}
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Card do Seletor de Hora */}
          <div 
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 text-sm">Selecionar Hora</h3>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon icon={X} size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Seletores */}
            <div className="p-4">
              <div className="flex gap-3 mb-4">
                {/* Seletor de Horas */}
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-2 text-center">
                    Hora
                  </label>
                  <div className="h-48 overflow-y-auto border border-gray-200 rounded-lg">
                    {horas.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHora(h)}
                        className={`w-full px-3 py-2 text-sm text-center hover:bg-blue-50 transition-colors ${
                          hora === h ? 'bg-blue-600 text-white font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Separador */}
                <div className="flex items-center justify-center pt-6">
                  <span className="text-2xl font-bold text-gray-400">:</span>
                </div>

                {/* Seletor de Minutos */}
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-2 text-center">
                    Minuto
                  </label>
                  <div className="h-48 overflow-y-auto border border-gray-200 rounded-lg">
                    {minutos.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMinuto(m)}
                        className={`w-full px-3 py-2 text-sm text-center hover:bg-blue-50 transition-colors ${
                          minuto === m ? 'bg-blue-600 text-white font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botão Confirmar */}
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <input type="hidden" name={name} value={value} required={required} />
    </div>
  );
}