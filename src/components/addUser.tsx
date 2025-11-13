import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "react-spinners/ClipLoader";
import { api } from "../utils/api";

export const AddUser = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        address,
        role,
      });
      toast.success("New User added successfully!");
    } catch (error) {
      const err = error as AxiosError<any>;
      console.log(err);
      toast.error(
        err?.response?.data || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="left-container   w-[60vh] p-10 bg-white  space-y-3">
      <strong className="center text-[24px] font-bold">Add New User</strong>
      <div className="Name  center  bg-slate-100">
        <input
          type="text"
          placeholder="Name"
          className=" h-10 w-[95%] m-2 border-none outline-none bg-transparent "
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="address center  bg-slate-100">
        <input
          type="text"
          placeholder="Address"
          className=" w-[95%] h-10  m-2 border-none outline-none bg-transparent "
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="address center  bg-slate-100 ">
        <select
          name="Role"
          id="role"
          className="w-[100%]  "
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <div className="btn center flex items-center gap-3">
        <button
          className=" center w-[50%] rounded-md h-10 bg-orange-500 "
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Add User"}
        </button>

        {isLoading && <Spinner size={25} className="bg-green-500" />}
      </div>
    </div>
  );
};
