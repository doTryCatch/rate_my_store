import { useAuth } from "../AuthContext/getUser";

export const AdminDashboard = () => {
  const { allUsers, stores } = useAuth();

  // total ratings count
  const totalRatings = stores?.reduce(
    (sum, data) => sum + (data.ratings?.length || 0),
    0
  );

  return (
    <div className="dashboard w-full flex justify-center mt-10 py-24">
      <div className="container grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* total user  */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-blue-600 text-white flex flex-col justify-center items-center shadow-xl">
            <div className="text-4xl font-bold">{allUsers?.length}</div>
            <div className="text-sm mt-1">Total Users</div>
          </div>
        </div>

        {/* total stores  */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-green-600 text-white flex flex-col justify-center items-center shadow-xl">
            <div className="text-4xl font-bold">{stores?.length}</div>
            <div className="text-sm mt-1">Total Stores</div>
          </div>
        </div>

        {/* total rating  */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-orange-500 text-white flex flex-col justify-center items-center shadow-xl">
            <div className="text-4xl font-bold">{totalRatings}</div>
            <div className="text-sm mt-1">Total Ratings</div>
          </div>
        </div>
      </div>
    </div>
  );
};
