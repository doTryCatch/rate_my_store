import { useContext, createContext, useState, useEffect } from "react";
interface User {
  name: string;
  role: string;
}
interface AuthContextType {
  user: User | null;
  setUser: (name: User) => void;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    //fetch user from local storage or api
    setUser({ name: "Roshan", role: "admin" });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Null Context Error");
  return context;
};
