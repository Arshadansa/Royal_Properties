import axios from "axios";
import Cookies from "js-cookie";
export const API = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "https://jmd-real-estate-server.vercel.app/",
});

const secureAPI = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "https://jmd-real-estate-server.vercel.app/",
});

secureAPI.interceptors.request.use((req) => {
  const token = Cookies.get("token");
  if (token) {
    req.headers.authorization = `Bearer ${Cookies.get("token")}`;
  }
  return req;
});

export const logIn = (authData) => API.post("/api/v1/login", authData);
export const glogIn = (authData) => API.post("/api/v1/glogin", authData);
export const signUp = (authData) => API.post("/api/v1/register", authData);
export const logOut = () => API.post("/api/v1/logout");
export const getAccountDetails = () => secureAPI.get("/api/v1/getUserDetails");
export const uploadproperty = (data) =>
  secureAPI.post("/api/v1/uploadproperty", data);
