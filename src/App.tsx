import React from "react";
import {
  BrowserRouter,
  useNavigate,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { SignIn } from "./pages/loginAndSignUp/signIn";
import { PageNotFound } from "./pages/pageNotFound_404/pageNotFound";
import { SignUp } from "./pages/loginAndSignUp/signUp";
import { useAuth } from "./AuthContext/getUser";
import { Dashboard } from "./pages/dashboard/dashboard";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">{/* <SignIn /> */}</div>
      {/* routes setup  */}
      <RoutesSetup />
    </BrowserRouter>
  );
};
function ProtectedRoutes({ children }: { children: React.JSX.Element }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/signIn" replace />;

  return children;
}
function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/signIn" element={<SignIn />} />

      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
