import { Rating } from "@mui/material";
import { useAuth } from "../AuthContext/getUser";
import { IoStorefrontOutline } from "react-icons/io5";
import { useState } from "react";
import { api } from "../utils/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
export const StoreCards = () => {
  const { stores, user } = useAuth();
  const [value, setValue] = useState<number>(0);
  const [isRatingBoxOpen, setRatingBox] = useState<boolean>(false);
  const [storeId, setStoreId] = useState<string>("");

  const handleRating = async () => {
    try {
      await api.post("/rating/add", {
        value,
        storeId,
        userId: user?.id,
      });
      setRatingBox(false);
      toast.success("Rated successfully!");
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err.response?.data || "Rating process failed");
    }
  };

  return (
    <div className="p-6 flex w-full  ">
      <div
        className={
          "grid gap-6 " +
          (user?.role === "USER"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "")
        }
      >
        {stores &&
          stores.map((store) => {
            return (
              <div
                key={store.id}
                className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center gap-3"
              >
                <div className="text-5xl text-blue-600">
                  <IoStorefrontOutline />
                </div>

                <h2 className="text-lg font-semibold">{store.name}</h2>

                <p className="text-sm text-gray-600">{store.email}</p>

                <p className="text-sm text-gray-700 text-center">
                  {store.address}
                </p>

                <Rating value={store.averageRating} precision={0.5} readOnly />

                {user?.role === "USER" && (
                  <button className="text-blue-600">
                    <span
                      onClick={() => {
                        setRatingBox(true);
                        setStoreId(store.id);
                      }}
                    >
                      Rate it
                    </span>
                  </button>
                )}
                {isRatingBoxOpen && store.id === storeId && (
                  <div className="input flex flex-col gap-y-2">
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="5"
                      placeholder="Rate out of 5"
                      className="w-24 h-6"
                      onChange={(e) => setValue(Number(e.target.value))}
                    />

                    <button
                      className="bg-orange-500 hover:bg-green-500 w-24 h-10 rounded-lg"
                      onClick={handleRating}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {/* your rating*/}
                {(() => {
                  const yourRating = store.ratings.find(
                    (data) => data.userId === user?.id
                  );
                  console.log(yourRating);

                  return (
                    <div className="text-black">
                      Your Rating:{" "}
                      {yourRating ? yourRating.value : "Not rated yet"}
                    </div>
                  );
                })()}
              </div>
            );
          })}
      </div>
    </div>
  );
};
