import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/getUser";
import { api } from "../utils/api";
export const AddStore = () => {
  const { user } = useAuth();
  console.log(user);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleAddStore = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        address,
      });
      toast.success("Register successfully!");
      navigate("/signIn");
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(
        err?.response?.data?.msg || "Something went wrong. Please try again."
      );
    }
  };
  return (
    <div className="signIn  flex items-center h-[100vh] justify-between  ">
      <div className="left w-[50%] h-[100%]  flex items-center justify-center  bg-pink-400">
        <div className="left-container  w-[50%] p-10 bg-white  space-y-3">
          <strong className="center text-[24px] font-bold">Sign Up</strong>
          <div className="Name  center  bg-slate-100">
            <input
              type="text"
              placeholder="Name"
              className=" h-10 w-[95%] m-2 border-none outline-none bg-transparent "
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email center  bg-slate-100">
            <input
              type="text"
              placeholder="Email"
              className=" h-10 w-[95%] m-2 border-none outline-none bg-transparent "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pass center  bg-slate-100">
            <input
              type="password"
              placeholder="Password"
              className=" w-[95%] h-10  m-2 border-none outline-none bg-transparent "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="address center  bg-slate-100">
            <input
              type="text"
              placeholder="Address"
              className=" w-[95%] h-10  m-2 border-none outline-none bg-transparent "
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="btn center ">
            <button
              className=" center w-[50%] rounded-md h-10 bg-orange-500 "
              onClick={handleAddStore}
            >
              Add Store
            </button>
          </div>

          <Link to={"/signUp"} className="center">
            <p>Already have an account! </p>
            <span className="text-blue-600 underline mx-2 hover:text-blue-800">
              Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
