import { AxiosError } from "axios";
import { api } from "../utils/api";
import { useContext, createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "STORE_OWNER";
}
interface AuthContextType {
  user: User | null;
  setUser: (name: User) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data);
        navigate("/dashboard", { replace: true });

        // console.log(response.data);
      } catch (error) {
        setUser(null);
        const err = error as AxiosError<any>;
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Null Context Error");
  return context;
};
