import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext/getUser";
export const SignIn = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const handleLogin = async () => {
    console.log(email, " ", password);
    try {
      const res = await axios.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success("Logging Success!");
      if (res.data) navigate("/dashboard", { replace: true });
      // console.log(res.data);
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
          <strong className="center text-[24px] font-bold">Sign In</strong>
          <div className="email  center  bg-slate-100">
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
          <div className="btn center ">
            <button
              className=" center w-[50%] rounded-md h-10 bg-orange-500 "
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <Link to={"/signUp"} className="">
            SignUp
          </Link>
        </div>
      </div>
      <div className="right w-[50%]">
        <div className="right-container">
          <pre>This is Assignment for an Internship</pre>
        </div>
      </div>
    </div>
  );
};
