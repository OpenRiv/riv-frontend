import axios from "axios";

export const client2 = axios.create({
  baseURL: import.meta.env.VITE_API_URL2,
  headers: {
    "Content-Type": "application/json",
  },
});
