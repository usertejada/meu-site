// components/FilterTabs.tsx
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
    <div className={`inline-flex items-center gap-1 bg-gray-50 p-1 rounded-lg ${className}`}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`
            px-3 py-2 text-sm font-medium rounded-md transition-all
            ${active === option 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}