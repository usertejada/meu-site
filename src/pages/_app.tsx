// src/pages/_app.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Adicione este
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
