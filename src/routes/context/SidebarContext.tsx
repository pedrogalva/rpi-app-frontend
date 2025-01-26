import React, { createContext, useState, useContext, ReactNode } from "react";

// Tipo para o contexto
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: (open: boolean) => void;
}

// Cria o contexto
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provedor do contexto
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook para usar o contexto
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
