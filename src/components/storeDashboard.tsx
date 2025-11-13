import { useAuth } from "../AuthContext/getUser";
import { StoreCards } from "./StoreCard";

export const StoreDashboard = () => {
  const { ratingInfo } = useAuth();
  return (
    <div className="store-dashboard  my-10">
      <div className="store-d-container w-[100%] bg-yellow-300 flex flex-1">
        <div className="ratedUsersList bg-white w-[60%] p-5 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2 underline underline-offset-2">
            Users Who Rated Your Store
          </h2>

          {ratingInfo && ratingInfo.length > 0 ? (
            ratingInfo.map((data) => (
              <div
                key={data.userId}
                className="info flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="user text-sm font-medium text-gray-800">
                  User ID: {data.userId}
                </div>

                <div className="value text-sm font-bold bg-blue-600 text-white px-3 py-1 rounded-md">
                  {data.value} ★
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No ratings yet.</p>
          )}
        </div>

        <div className="right w-[40%]">
          <StoreCards />
        </div>
      </div>
    </div>
  );
};
