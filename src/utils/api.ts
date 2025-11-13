import axios from "axios";

export const api = axios.create({
  baseURL:
    `${process.env.REACT_APP_API_URL}` ||
    "https://rate-my-store-backend.onrender.com/api",
  withCredentials: true,
});
