import { GrLogout } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
export const ProfileNav = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await api.get("/auth/logout");
      navigate("/signIn");
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err?.response?.data || "Failed to logOut!");
    }
  };
  return (
    <div className="profile-nav flex justify-end p-2 0 space-x-10 ">
      <div className="search"></div>
      <div className="profile  cursor-pointer">
        <FaUserCircle className="h-8 w-8 hover:border hover:scale-110 hover:border-red-600  hover:rounded-full" />
      </div>
      <div className="logout hover:scale-110 cursor-pointer">
        <GrLogout className="h-8 w-8 mr-5" onClick={handleLogOut} />
      </div>
    </div>
  );
};
