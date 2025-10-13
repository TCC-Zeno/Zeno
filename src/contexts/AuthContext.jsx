import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setColorBlindness,
  setEmployee,
  setTheme,
  userData,
} from "../redux/User/slice";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

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

        const owner = userSession.data.user || null;
        const employee = userSession.data.employee || null;

        const activeUser = employee || owner;

        if (activeUser) {
          dispatch(userData(activeUser));
          dispatch(setEmployee(!!employee));

          dispatch(setTheme(activeUser.color || owner?.color));
          dispatch(
            setColorBlindness(activeUser.accessibility || owner?.accessibility)
          );
          setUser(activeUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      setUser(null);
    } finally {
      setIsCheckingSession(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, [dispatch]);

  const login = async (email, password) => {
    try {
      setLoading(true);
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
        dispatch(setEmployee(response.data.employee));
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      console.error("Erro no login:", error);

      return {
        success: false,
        error: error.response?.data?.error || "Erro ao fazer login",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
        isCheckingSession,
        checkSession,
      }}
    >
      {children}
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
