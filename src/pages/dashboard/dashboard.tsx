import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext/getUser";
import { ProfileNav } from "../../components/profileNav";
import { Store } from "../../components/store";
import { IoAddCircle } from "react-icons/io5/index";
import { AddStore } from "../../components/addStore";
import { Users } from "../../components/users";
import { AddUser } from "../../components/addUser";
import { Profile } from "../../components/profile";
import { StoreCards } from "../../components/StoreCard";
import { StoreDashboard } from "../../components/storeDashboard";
import { AdminDashboard } from "../../components/adminDashboard";

export const Dashboard = () => {
  const { user } = useAuth();
  const [navComponents, setNavComponents] = useState([
    "Profile",
    "Dashboard",
    "Stores",
    "Users",
  ]);
  useEffect(() => {
    if (user?.role === "STORE_OWNER")
      setNavComponents(["Profile", "Dashboard"]);
    if (user?.role === "USER") setNavComponents(["Profile", "Stores"]);
  }, [user]);

  const [activeComponent, setactiveComponent] = useState("Dashboard");
  const [isaddCard, setAddCard] = useState(false);
  return (
    <div className="dashboard flex relative">
      <div className="left-nav sticky top-0 w-[20%] h-[100vh] text-[#fff] bg-[#1a1919] ">
        <div className="nav-container ">
          <div className="h-16 center bg-[#141414] flex items-center justify-center">
            {user?.name}
          </div>
          <ul className="m-2 space-y-2">
            {navComponents.map((item) => (
              <li
                key={item}
                onClick={() => setactiveComponent(item)}
                className={`h-10 px-4 py-2 w-full cursor-pointer rounded-sm transition-colors ${
                  activeComponent === item
                    ? "bg-[#ea2868] text-white font-medium"
                    : " hover:text-white"
                } `}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dashboard-body-area w-[80%]  p-6">
        <ProfileNav />
        <pre className="text-2xl font-bold mt-4">{user?.role},</pre>
        <div className="heading flex justify-between">
          {" "}
          <h1 className="text-2xl font-bold mt-4">
            Welcome to the {activeComponent}
          </h1>
          <div className="add mr-10 cursor-pointer hover:scale-110">
            {user?.role === "ADMIN" &&
              activeComponent !== "Dashboard" &&
              activeComponent !== "Profile" && (
                <IoAddCircle
                  className="h-8 w-8"
                  onClick={() => setAddCard(true)}
                />
              )}
          </div>
        </div>
        {isaddCard && (
          <div
            className="fixed inset-0 bg-black bg-opacity-55 flex items-center justify-center z-50"
            onClick={() => setAddCard(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {activeComponent === "Stores" && <AddStore />}
              {activeComponent === "Users" && <AddUser />}
            </div>
          </div>
        )}
        {activeComponent === "Profile" && <Profile />}
        {activeComponent === "Dashboard" && user?.role === "STORE_OWNER" && (
          <StoreDashboard />
        )}
        {activeComponent === "Dashboard" && user?.role === "ADMIN" && (
          <AdminDashboard />
        )}
        {activeComponent === "Stores" && user?.role === "ADMIN" && <Store />}
        {activeComponent === "Stores" && user?.role === "USER" && (
          <StoreCards />
        )}
        {activeComponent === "Users" && <Users />}
      </div>
    </div>
  );
};
