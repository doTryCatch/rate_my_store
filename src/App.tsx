import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { SignIn } from "./pages/loginAndSignUp/signIn";
import { PageNotFound } from "./pages/pageNotFound_404/pageNotFound";
import { SignUp } from "./pages/loginAndSignUp/signUp";

import { Dashboard } from "./pages/dashboard/dashboard";
import { ProtectedRoutes } from "./protectRoute";
// import { useAuth } from "./AuthContext/getUser";

export const App = () => {
  // const { user } = useAuth();
  // if (user) <Navigate to="/dashboard" replace />;
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
};
