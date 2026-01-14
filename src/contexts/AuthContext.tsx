import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  avatar?: string;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Simula carregamento do usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    } else {
      // Usuário padrão para desenvolvimento
      const defaultUser: User = {
        id: '1',
        name: 'Administrador',
        email: 'admin@championsystem.com',
        role: 'admin',
        initials: 'AD'
      };
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simula uma chamada de API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: '1',
          name: 'Administrador',
          email: email,
          role: 'admin',
          initials: email.substring(0, 2).toUpperCase()
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Role helper functions
export function hasRole(user: User | null, role: User['role']): boolean {
  if (!user) return false;
  const roleHierarchy = { user: 0, moderator: 1, admin: 2 };
  return roleHierarchy[user.role] >= roleHierarchy[role];
}

export function getRoleName(role: User['role']): string {
  const roleNames = {
    admin: 'Administrador',
    moderator: 'Moderador',
    user: 'Usuário'
  };
  return roleNames[role];
}