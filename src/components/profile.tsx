import { AxiosError } from "axios";
import { useAuth } from "../AuthContext/getUser";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import { useState } from "react";

export const Profile = () => {
  const [pass, setPass] = useState<string>("null");
  const { user } = useAuth();
  const handlePassUpdate = async () => {
    try {
      await api.post("/auth/updateUser", {
        password: pass,
        email: user?.email,
      });
      toast.success("password changed successfully!");
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err?.response?.data || "failed updating password");
    }
  };
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-xl font-semibold border-b pb-2">
          <strong>ID:</strong> {user?.id}
        </h1>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <strong>Name:</strong>
            <span>{user?.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <strong>Address:</strong>
            <span>{user?.address}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t">
          <strong>Email:</strong>
          <span>{user?.email}</span>
        </div>

        {/* update password */}
        <div className="pt-4 border-t">
          <h2 className="font-medium text-lg mb-3">Update Password</h2>

          <div className="flex flex-col space-y-3">
            <input
              type="password"
              placeholder="Enter new password"
              value={pass}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-blue-200"
              onChange={(e) => setPass(e.target.value)}
            />

            <button
              className="bg-orange-500 text-white py-2 rounded-lg hover:bg-green-700 transition"
              onClick={handlePassUpdate}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
