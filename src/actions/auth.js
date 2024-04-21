import * as api from "../Axios/Axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";

export const glogin = (authData, navigate) => async (dispatch) => {
  console.log("glogin action called ---------------------" );
  try {
    const { data } = await api.glogIn(authData);
    Cookie.set("token", data.token);
    dispatch({ type: "LOGIN", data });
    toast.success("Logged in successfully");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    <ToastContainer />;
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  console.log("login action called ---------------------" + authData);
  try {
    const { data } = await api.logIn(authData);
    Cookie.set("token", data.token);
    dispatch({ type: "LOGIN", data });
    toast.success("Logged in successfully");
    navigate("/");
  } catch (error) {
    toast.error(error.response.data.error);
    <ToastContainer />;
  }
};

export const signup = (authData, navigate) => async (dispatch) => {
  console.log("signup action called ---------------------" + authData);
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "SIGNUP", data });
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    <ToastContainer />;
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    await api.logOut();
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    dispatch({ type: "LOGOUT" });
    window.location.reload();
    toast.success("Logged out successfully");
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error(error);
    <ToastContainer />;
  }
};
