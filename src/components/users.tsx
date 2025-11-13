import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/getUser";
import { Filter } from "../components/filter";
import { FaEye } from "react-icons/fa";
import { Rating } from "@mui/material";

interface RatingType {
  id?: string;
  value: number;
  userId: string | null;
  storeId: string;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  address: string;
  role: "ADMIN" | "USER" | "STORE_OWNER";
  ratings?: RatingType[];
}

interface Filters {
  id?: string;
  name?: string;
  email?: string;
  address?: string;
  role?: string;
}

export const Users = () => {
  const { allUsers, stores } = useAuth();
  const [filterData, setFilterData] = useState<UserType[] | null>(null);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setFilterData(allUsers || []);
  }, [allUsers]);

  const handleFilter = ({ name, email, address, role }: Filters) => {
    if (!allUsers) return;

    const filtered = allUsers.filter((data: UserType) => {
      const nameFilter = name?.toLowerCase().trim();
      const emailFilter = email?.toLowerCase().trim();
      const addressFilter = address?.toLowerCase().trim();
      const roleFilter = role?.toLowerCase().trim();
      const dataName = data.name.toLowerCase();
      const dataEmail = data.email.toLowerCase();
      const dataAddress = data.address.toLowerCase();
      const dataRole = data.role.toLowerCase();
      if (nameFilter && !dataName.includes(nameFilter)) return false;
      if (emailFilter && !dataEmail.includes(emailFilter)) return false;
      if (addressFilter && !dataAddress.includes(addressFilter)) return false;
      if (roleFilter && !dataRole.includes(roleFilter)) return false;
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
            filterData.map((user: UserType) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="py-2 px-2">{user.id}</td>
                <td className="py-2 px-2">{user.name}</td>
                <td className="py-2 px-2">{user.email}</td>
                <td className="py-2 px-2">{user.address}</td>
                <td className="py-2 px-2">{user.role}</td>

                <td className="py-2 px-2 text-center">
                  <button
                    className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                    aria-label="View Details"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* detail popup */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-5 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">User Details</h2>

            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Address:</strong> {selectedUser.address}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>

            {selectedUser.role === "STORE_OWNER" &&
              (() => {
                const yourRating = stores?.find(
                  (data) => data.email === selectedUser.email
                )?.averageRating;

                return (
                  <div className="text-black flex ">
                    <strong>Average rating:</strong>
                    {yourRating ? (
                      <Rating value={yourRating} readOnly className="top-y-2" />
                    ) : (
                      "Not rated yet"
                    )}
                  </div>
                );
              })()}
          </div>
        </div>
      )}
    </div>
  );
};
