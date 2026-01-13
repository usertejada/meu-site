interface FilterTabsProps {
  options: string[];
  active: string;
  onChange: (option: string) => void;
  className?: string;
}

export default function FilterTabs({
  options,
  active,
  onChange,
  className = ''
}: FilterTabsProps) {
  
  return (
    <div className={`flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1 overflow-x-auto ${className}`}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
            active === option
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}