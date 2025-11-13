import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext/getUser";
import { api } from "../../utils/api";
import Spinner from "react-spinners/ClipLoader";

export const SignIn = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  console.log(user);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const text = `
Roxiler Systems,
    This is Assignment for an Internship.
`;
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post(
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
      setLoading(false);
      if (res.data) navigate("/dashboard", { replace: true });
      // console.log(res.data);
    } catch (error) {
      const err = error as AxiosError<any>;
      setLoading(false);
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
          <span>
            <strong>Use for Admin access:</strong>{" "}
            <p className="text-slate-500">Email : rp207045@gmail.com</p>
            <p className="text-slate-500">Password : roshan12</p>
          </span>
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
          <div className="btn center flex items-center gap-3">
            <button
              className="center w-[50%] rounded-md h-10 bg-orange-500"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Login"}
            </button>

            {isLoading && <Spinner size={25} className="bg-green-500" />}
          </div>

          <Link to={"/signUp"} className="center">
            <p>Create new account! </p>
            <span className="text-blue-600 underline mx-2 hover:text-blue-800">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
      <div className="right w-[50%]">
        <div
          className="right-container center "
          style={{
            backgroundImage: "url('/store.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
            width: "100%",
          }}
        >
          <pre className="font-bold text-lg text-orange-500 mb-36">{text}</pre>
        </div>
      </div>
    </div>
  );
};
