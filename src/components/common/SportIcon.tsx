import { IconType } from 'react-icons';

interface SportIconProps {
  icon: IconType;
  size?: number;
  className?: string;
}

export default function SportIcon({ 
  icon: IconComponent, 
  size = 18,
  className = '' 
}: SportIconProps) {
  return (
    <IconComponent 
      size={size}
      color="#6B7280"
      style={{ 
        display: 'block',
        flexShrink: 0
      }}
    />
  );
}