import React, { useState } from "react";
import Spinner from "react-spinners/ClipLoader";

interface FilterProps {
  onFilter: (filters: {
    id?: string;
    name?: string;
    email?: string;
    address?: string;
    role?: string;
  }) => void;
}

export const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const handleSearch = () => {
    setLoading(true);
    onFilter({ name, email, address, role });
    setTimeout(() => setLoading(false), 500);
  };

  const handleClear = () => {
    setLoading(true);
    setName("");
    setEmail("");
    setAddress("");
    setRole("");
    onFilter({});
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="p-2 my-5 bg-gray-100 rounded-t-sm  shadow-md w-[100%]  ">
      <h2 className="text-xl font-semibold mb-4">Filter Users</h2>
      <div className="flex  gap-2">
        <input
          type="text"
          placeholder="Search Name"
          className="border px-2 rounded h-10"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Email"
          className="border px-2 rounded h-10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Address"
          className="border px-2 rounded h-10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <select
          className="border px-2 rounded h-10"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="NORMAL">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="STORE_OWNER">STORE OWNER</option>
        </select>

        <div className="flex gap-4 ml-10 items-center">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>

          {isLoading && <Spinner size={20} className="bg-green-400" />}

          <button
            onClick={handleClear}
            disabled={isLoading}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
