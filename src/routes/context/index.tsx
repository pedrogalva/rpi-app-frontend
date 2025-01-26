import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { SidebarProvider } from "./SidebarContext";

// Agrupa os contextos
const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
