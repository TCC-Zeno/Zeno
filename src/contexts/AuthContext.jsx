import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setColorBlindness, setTheme, userData } from "../redux/User/slice";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/check-session`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success && response.data.user) {
          const userSession = await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/session`,
            { withCredentials: true }
          );

          dispatch(userData(userSession.data.user));
          dispatch(setTheme(userSession.data.user.color));
          dispatch(setColorBlindness(userSession.data.user.accessibility));
          setUser(userSession.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
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
        toast.success("Login realizado com sucesso!");
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      console.error("Erro no login:", error);

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

      setUser(null);
    } catch (error) {
      console.error("Erro no logout:", error);
      setUser(null);
    }
  };

  const isAuthenticated = !!user;
  
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
