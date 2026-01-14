import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // SEMPRE força tema claro
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // Remove a classe dark e força tema claro
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  const applyTheme = (newTheme: Theme) => {
    // Sempre remove a classe dark
    document.documentElement.classList.remove('dark');
  };

  const setTheme = (newTheme: Theme) => {
    // Sempre mantém como light
    setThemeState('light');
    localStorage.setItem('theme', 'light');
    applyTheme('light');
  };

  const toggleTheme = () => {
    // Não faz nada - mantém sempre claro
    // Você pode remover essa função depois se quiser
    console.log('Tema bloqueado no modo claro');
  };

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}