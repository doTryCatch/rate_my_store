import React, { useState } from "react";
import { useAuth } from "../../AuthContext/getUser";
import { ProfileNav } from "../../components/profileNav";
import { Store } from "../../components/store";
import { IoAddCircle } from "react-icons/io5";

export const Dashboard = () => {
  const { user } = useAuth();
  const navComponents = ["Dashboard", "Stores", "Users"];
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="dashboard flex">
      <div className="left-nav w-[20%] h-[100vh] text-[#fff] bg-[#1a1919] ">
        <div className="nav-container ">
          <div className="h-16 center bg-[#141414] flex items-center justify-center">
            {user?.role} : {user?.name}
          </div>
          <ul className="m-2 space-y-2">
            {navComponents.map((item) => (
              <li
                key={item}
                onClick={() => setActiveNav(item)}
                className={`h-10 px-4 py-2 w-full cursor-pointer rounded-sm transition-colors ${
                  activeNav === item
                    ? "bg-[#ea2868] text-white font-medium"
                    : " hover:text-white"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dashboard-body-area w-[80%] p-6">
        <ProfileNav />
        <pre className="text-2xl font-bold mt-4">{user?.role},</pre>
        <div className="heading flex justify-between">
          {" "}
          <h1 className="text-2xl font-bold mt-4">
            Welcome to the {activeNav}
          </h1>
          <div className="add mr-10 cursor-pointer hover:scale-110">
            <IoAddCircle className="h-8 w-8" />
          </div>
        </div>

        {activeNav === "Dashboard" && <p>Dashboard content goes here.</p>}
        {activeNav === "Stores" && <Store />}
        {activeNav === "Users" && <p>Users management panel.</p>}
      </div>
    </div>
  );
};
