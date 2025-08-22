import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setColorBlindness, setTheme, userData } from "../redux/User/slice";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Verificando sessão...");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/check-session`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Resposta do check-session:", response.data);

        if (response.data.success && response.data.user) {
          console.log("Sessão válida, buscando dados completos...");
          const userSession = await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/session`,
            { withCredentials: true }
          );

          console.log("Dados completos do usuário:", userSession.data.user);
          dispatch(userData(userSession.data.user));
          dispatch(setTheme(userSession.data.user.color));
          dispatch(setColorBlindness(userSession.data.user.accessibility));
          setUser(userSession.data.user);
        } else {
          console.log("Nenhuma sessão válida encontrada");
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);

        // Tente novamente após um curto período em caso de erro de rede
        setTimeout(() => {
          if (!user) setUser(null);
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);

      return {
        success: false,
        error: error.response?.data?.error || "Erro ao fazer login",
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("Logout realizado com sucesso");
      setUser(null);
    } catch (error) {
      console.error("Erro no logout:", error);
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  console.log("Dados:", { user, loading, isAuthenticated });

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
