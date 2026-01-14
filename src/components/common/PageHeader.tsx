import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  mobileActionFullWidth?: boolean;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  action,
  mobileActionFullWidth = true 
}: PageHeaderProps) {
  return (
    <>
      {/* === VERSÃO DESKTOP === */}
      {/* Layout horizontal: título à esquerda, ação à direita */}
      <div className="hidden lg:flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* === VERSÃO MOBILE === */}
      {/* Layout vertical: título no topo, ação embaixo */}
      <div className="lg:hidden mb-8">
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        {action && (
          <div className={mobileActionFullWidth ? 'w-full' : ''}>
            {action}
          </div>
        )}
      </div>
    </>
  );
}