import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Tipo para o contexto de autenticação
interface AuthContextType {
  // isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  validateLogin: () => boolean;
}

// Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor do contexto de autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Função para logar o usuário
  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    // setIsAuthenticated(true);
  };

  // Função para deslogar o usuário
  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("token");
  };

  const validateLogin = () => {
    if (
      localStorage.getItem("isAuthenticated") !== "true" ||
      localStorage.getItem("token") === null
    ) {
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ login, logout, validateLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type RouteChangeValidatorProps = {
  children: ReactNode;
};

export const RouteChangeValidator = ({
  children,
}: RouteChangeValidatorProps) => {
  const { validateLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const val = validateLogin();
    if (!val && !window.location.pathname.includes("/auth")) {
      navigate("/auth");
    }
  }, [validateLogin, navigate]);

  return <>{children}</>;
};
