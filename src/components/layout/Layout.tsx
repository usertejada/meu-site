import Sidebar from './Sidebar';
import Breadcrumb from '../common/Breadcrumb';

interface LayoutProps {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl';
}

export default function Layout({ 
  children, 
  showBreadcrumb = true,
  maxWidth = '7xl' 
}: LayoutProps) {
  const maxWidthClasses = {
    full: '',
    '7xl': 'max-w-7xl mx-auto',
    '6xl': 'max-w-6xl mx-auto',
    '5xl': 'max-w-5xl mx-auto'
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6 lg:p-8">
          {/* Breadcrumb */}
          {showBreadcrumb && (
            <div className="mb-6">
              <Breadcrumb />
            </div>
          )}

          {/* Conteúdo principal */}
          <div className={maxWidthClasses[maxWidth]}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}