import { Rating } from "@mui/material";
import { useAuth } from "../AuthContext/getUser";
import { IoStorefrontOutline } from "react-icons/io5";
import { useState } from "react";
import { api } from "../utils/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Spinner from "react-spinners/ClipLoader";

export const StoreCards = () => {
  const { stores, user } = useAuth();

  const [ratingValue, setRatingValue] = useState<number>(0);
  const [showRatingBox, setShowRatingBox] = useState<boolean>(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");

  const handleRatingSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/rating/add", {
        value: ratingValue,
        storeId: selectedStoreId,
        userId: user?.id,
      });
      setShowRatingBox(false);
      toast.success("Rated successfully!");
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err.response?.data || "Rating failed");
    } finally {
      setLoading(false);
    }
  };

  const filteredStores =
    stores?.filter((store) => {
      const text = searchText.toLowerCase();
      return (
        store.name.toLowerCase().includes(text) ||
        store.address.toLowerCase().includes(text)
      );
    }) ?? [];

  return (
    <div className="p-6 flex w-full flex-col gap-4">
      <input
        type="text"
        placeholder="Search store by name or address"
        className="border p-2 rounded-lg w-full max-w-md"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div
        className={
          "grid gap-6 " +
          (user?.role === "USER"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "")
        }
      >
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center gap-3"
          >
            <div className="text-5xl text-blue-600">
              <IoStorefrontOutline />
            </div>

            <h2 className="text-lg font-semibold">{store.name}</h2>

            <p className="text-sm text-gray-600">{store.email}</p>

            <p className="text-sm text-gray-700 text-center">{store.address}</p>

            <Rating value={store.averageRating} precision={0.5} readOnly />

            {user?.role === "USER" && (
              <button className="text-blue-600">
                <span
                  onClick={() => {
                    setShowRatingBox(true);
                    setSelectedStoreId(store.id);
                  }}
                >
                  Rate it
                </span>
              </button>
            )}

            {showRatingBox && store.id === selectedStoreId && (
              <div className="flex flex-col gap-y-2 items-center">
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rate 1–5"
                  className="w-24 h-6"
                  onChange={(e) => setRatingValue(Number(e.target.value))}
                />

                <div className="flex items-center gap-2">
                  <button
                    className="bg-orange-500 hover:bg-green-500 w-24 h-10 rounded-lg"
                    onClick={handleRatingSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}
                  </button>

                  {loading && <Spinner size={22} color="#ff6347" />}
                </div>
              </div>
            )}

            {user?.role !== "STORE_OWNER" &&
              (() => {
                const userRating = store.ratings.find(
                  (item) => item.userId === user?.id
                );

                return (
                  <div className="text-black">
                    Your Rating:{" "}
                    {userRating ? userRating.value : "Not rated yet"}
                  </div>
                );
              })()}
          </div>
        ))}
      </div>
    </div>
  );
};
