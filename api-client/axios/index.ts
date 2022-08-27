import { store } from "@/redux/store";
import axios from "axios";
// import Cookies from "js-cookie";
// axios.defaults.baseURL = import.meta.env.BE_URL;
// import { store } from "../../app/store";
const API = axios.create({
  baseURL: "http://157.245.49.136:8080",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    if (config.headers) {
      if (!config.headers.Authorization) {
        const token = store.getState().auth.token;

        if (token) {
          config.headers.Authorization = `${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { API };
