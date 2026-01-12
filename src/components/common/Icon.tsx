import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function Icon({ 
  icon: IconComponent, 
  size = 18, 
  strokeWidth = 2,
  className = '' 
}: IconProps) {
  return (
    <IconComponent 
      className={className} 
      size={size} 
      strokeWidth={strokeWidth} 
    />
  );
}