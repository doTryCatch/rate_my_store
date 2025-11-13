import { AxiosError } from "axios";
import { api } from "../utils/api";
import { useContext, createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "STORE_OWNER";
  address: string;
}
interface rating {
  value: number;
  userId: string;
  storeId: string;
}

interface AllUsers {
  id: string;
  name: string;
  email: string;
  address: string;
  role: "ADMIN" | "USER" | "STORE_OWNER";
}
interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  ratings: rating[];
  averageRating: number;
}
interface AuthContextType {
  user: User | null;
  allUsers: AllUsers[] | null;
  isLoading: boolean;
  stores: Store[] | null;
  ratingInfo: rating[] | null;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllusers] = useState<AllUsers[] | null>(null);
  const [stores, setStore] = useState<Store[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [ratingInfo, setRatingInfo] = useState<rating[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/auth/me");
        const userInfo = response.data;
        setUser(userInfo);
        if (userInfo.role === "ADMIN") {
          const userData = await api.get("/auth/getAllUsers");
          const store = await api.get("/store/getAllStores");

          setAllusers(userData.data);
          console.log(store.data);
          setStore(store.data);
        }
        if (userInfo.role === "STORE_OWNER") {
          const store: any = await api.get("/store/getUserStores");
          const ratingInfo = store.data.filter(
            (data: any) => data.email === userInfo.email
          )[0];

          setRatingInfo(ratingInfo.ratings);

          setStore(store.data);
        }
        if (userInfo.role === "USER") {
          const store = await api.get("/store/getAllStores");
          console.log(store.data);

          setStore(store.data);
        }

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
    <AuthContext.Provider
      value={{ user, allUsers, isLoading, stores, ratingInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Null Context Error");
  return context;
};
