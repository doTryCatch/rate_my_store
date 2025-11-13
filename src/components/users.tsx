import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/getUser";
import { Filter } from "../components/filter";
import { Rating } from "@mui/material";
import { FaEye } from "react-icons/fa/index";
interface filters {
  id?: string;
  name?: string;
  email?: string;
  address?: string;
  role?: string;
}
export const Users = () => {
  const { allUsers } = useAuth();
  const [filterData, setFilterData] = useState<filters[] | null>(null);
  useEffect(() => {
    setFilterData(allUsers);
  }, []);

  const handleFilter = ({ name, email, address, role }: filters) => {
    if (!allUsers) return;
    const filtered = allUsers.filter((data) => {
      if (email && !data.email.includes(email)) return false;
      if (name && !data.name.includes(name)) return false;
      if (address && !data.address.includes(address)) return false;
      if (role && !data.role.includes(role)) return false;
      return true;
    });
    setFilterData(filtered);
  };

  return (
    <div className="store">
      <Filter onFilter={handleFilter} />

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Details</th>
          </tr>
        </thead>

        <tbody className="text-gray-600 text-sm font-light">
          {filterData &&
            filterData.map((user, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="py-2 px-2 text-left">{user.id}</td>
                  <td className="py-2 px-2 text-left flex flex-col">
                    {user.name}
                  </td>
                  <td className="py-2 px-2 text-left">{user.email}</td>
                  <td className="py-2 px-2 text-left">{user.address}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-center">
                    {" "}
                    <button
                      className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                      aria-label="View Details"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
