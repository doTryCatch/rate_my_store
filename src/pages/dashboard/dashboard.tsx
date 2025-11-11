import React from "react";
import { useAuth } from "../../AuthContext/getUser";
export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard of {user?.role}</h1>
    </div>
  );
};
