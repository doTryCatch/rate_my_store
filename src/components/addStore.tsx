import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/getUser";
import { FaRegUserCircle } from "react-icons/fa/index";
import { api } from "../utils/api";
import Spinner from "react-spinners/ClipLoader";

export const AddStore = () => {
  const { allUsers } = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isUserListOpen, setIsUserListOpened] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const handleAddStore = async () => {
    setLoading(true);

    try {
      await api.post("/store/create", {
        name,
        email,
        address,
      });
      toast.success("Store Created successfully!");
    } catch (error) {
      const err = error as AxiosError<any>;
      console.log(err.response);
      toast.error(
        err?.response?.data?.msg || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="left-container   w-[60vh] p-10 bg-white  space-y-3 rounded-lg">
      <strong className="center text-[24px] font-bold">Add Store</strong>

      <div className="Name  center  bg-slate-100">
        <input
          type="text"
          placeholder="Name"
          className=" h-10 w-[95%] m-2 border-none outline-none bg-transparent "
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="email-container relative">
        <div className="email-area flex justify-between">
          <div className="email center  bg-slate-100 w-[90%]">
            <input
              type="text"
              placeholder="Email"
              value={email || ""}
              className=" h-10 w-[95%] m-2 border-none outline-none bg-transparent "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="select-icon center">
            <FaRegUserCircle
              className="h-8 w-8 hover:scale-110 cursor-pointer"
              onClick={() => setIsUserListOpened(!isUserListOpen)}
            />
          </div>

          {isUserListOpen && (
            <div className="absolute left-5 top-12 w-full bg-white border rounded mt-1 max-h-60 overflow-auto shadow-lg z-50">
              {allUsers &&
                allUsers.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setEmail(user.email);
                      setIsUserListOpened(false);
                    }}
                  >
                    {user.role === "USER" && (
                      <div className="p-2 hover:bg-gray-100 cursor-pointer">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-gray-500 text-sm">
                          {user.email}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="address center  bg-slate-100">
        <input
          type="text"
          placeholder="Address"
          className=" w-[95%] h-10  m-2 border-none outline-none bg-transparent "
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="btn center flex items-center gap-3">
        <button
          className=" center w-[50%] rounded-md h-10 bg-orange-500 "
          onClick={handleAddStore}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Add Store"}
        </button>

        {isLoading && <Spinner size={25} className="bg-green-500" />}
      </div>
    </div>
  );
};
