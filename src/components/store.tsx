import { useAuth } from "../AuthContext/getUser";
import Rating from "@mui/material/Rating";

export const Store = () => {
  const { stores } = useAuth();

  return (
    <div className="store my-10 h-[58vh] overflow-y-scroll">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Rating</th>
          </tr>
        </thead>

        <tbody className="text-gray-600 text-sm font-light">
          {stores &&
            stores.map((store, index) => {
              return (
                <tr
                  key={index}
                  className="border-b font-bold text-slate-500 border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="py-2 px-2 text-left">{store.id}</td>
                  <td className="py-2 px-2 text-left ">{store.name}</td>
                  <td className="py-2 px-2 text-left">{store.email}</td>
                  <td className="py-2 px-2 text-left">{store.address}</td>
                  <td className="py-3 px-6 text-left">
                    <Rating
                      name="size-small"
                      value={store.averageRating}
                      size="small"
                      readOnly
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
