import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
  toggleModal: (modalId: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [openModals, setOpenModals] = useState<Set<string>>(new Set());

  const openModal = (modalId: string) => {
    setOpenModals((prev) => new Set(prev).add(modalId));
  };

  const closeModal = (modalId: string) => {
    setOpenModals((prev) => {
      const newSet = new Set(prev);
      newSet.delete(modalId);
      return newSet;
    });
  };

  const isModalOpen = (modalId: string) => {
    return openModals.has(modalId);
  };

  const toggleModal = (modalId: string) => {
    if (openModals.has(modalId)) {
      closeModal(modalId);
    } else {
      openModal(modalId);
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal deve ser usado dentro de um ModalProvider');
  }
  return context;
}