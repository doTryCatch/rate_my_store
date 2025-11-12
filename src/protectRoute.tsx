import { Navigate } from "react-router";
import { useAuth } from "./AuthContext/getUser";

export const ProtectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <>loading...</>;
  if (!user) return <Navigate to="/signIn" replace />;

  return <>{children}</>;
};
