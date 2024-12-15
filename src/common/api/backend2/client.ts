import axios from "axios";

export const client2 = axios.create({
  baseURL: import.meta.env.VITE_API_URL_2,
  headers: {
    "Content-Type": "application/json",
  },
});
