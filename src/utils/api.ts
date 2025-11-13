import axios from "axios";

export const api = axios.create({
  baseURL: "https://rate-my-store-backend.onrender.com/api",
  withCredentials: true,
});
