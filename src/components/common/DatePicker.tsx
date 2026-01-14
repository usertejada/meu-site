import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Icon from './Icon';

interface DatePickerProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
}

export default function DatePicker({
  name,
  value,
  onChange,
  placeholder = 'Selecione a data',
  required = false,
  label,
  disabled = false
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      const [year, month] = value.split('-');
      return new Date(parseInt(year), parseInt(month) - 1);
    }
    return new Date();
  });

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const formatarData = (data: string) => {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const gerarDias = () => {
    const ano = currentMonth.getFullYear();
    const mes = currentMonth.getMonth();
    
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    
    const dias: (number | null)[] = [];
    
    for (let i = 0; i < primeiroDia; i++) {
      dias.push(null);
    }
    
    for (let i = 1; i <= ultimoDia; i++) {
      dias.push(i);
    }
    
    return dias;
  };

  const handleDayClick = (dia: number) => {
    const ano = currentMonth.getFullYear();
    const mes = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const diaStr = String(dia).padStart(2, '0');
    onChange(`${ano}-${mes}-${diaStr}`);
    setIsOpen(false);
  };

  const isDiaSelecionado = (dia: number) => {
    if (!value) return false;
    const [ano, mes, diaVal] = value.split('-');
    return (
      parseInt(diaVal) === dia &&
      parseInt(mes) - 1 === currentMonth.getMonth() &&
      parseInt(ano) === currentMonth.getFullYear()
    );
  };

  const isDiaHoje = (dia: number) => {
    const hoje = new Date();
    return (
      dia === hoje.getDate() &&
      currentMonth.getMonth() === hoje.getMonth() &&
      currentMonth.getFullYear() === hoje.getFullYear()
    );
  };

  const navegarMes = (direcao: number) => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direcao
    ));
  };

  const irParaHoje = () => {
    const hoje = new Date();
    setCurrentMonth(hoje);
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    onChange(`${ano}-${mes}-${dia}`);
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
        <Icon icon={Calendar} size={18} className="text-gray-400" />
        <span className={value ? 'text-gray-700' : 'text-gray-400'}>
          {value ? formatarData(value) : placeholder}
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
          
          {/* Card do Calendário */}
          <div 
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 text-sm">Selecionar Data</h3>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon icon={X} size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Calendário */}
            <div className="p-4">
              {/* Navegação do Mês */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navegarMes(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon icon={ChevronLeft} size={20} className="text-gray-600" />
                </button>
                
                <span className="font-semibold text-gray-800">
                  {meses[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                
                <button
                  type="button"
                  onClick={() => navegarMes(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon icon={ChevronRight} size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Dias da Semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {diasSemana.map((dia, idx) => (
                  <div key={idx} className="text-center text-xs font-medium text-gray-500 py-1">
                    {dia}
                  </div>
                ))}
              </div>

              {/* Dias do Mês */}
              <div className="grid grid-cols-7 gap-1">
                {gerarDias().map((dia, idx) => (
                  <div key={idx}>
                    {dia ? (
                      <button
                        type="button"
                        onClick={() => handleDayClick(dia)}
                        className={`w-full aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                          isDiaSelecionado(dia)
                            ? 'bg-blue-600 text-white font-semibold hover:bg-blue-700'
                            : isDiaHoje(dia)
                            ? 'bg-blue-100 text-blue-600 font-medium hover:bg-blue-200'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {dia}
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>
                ))}
              </div>

              {/* Botão Hoje */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={irParaHoje}
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Hoje
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <input type="hidden" name={name} value={value} required={required} />
    </div>
  );
}