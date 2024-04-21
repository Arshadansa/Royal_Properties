import * as api from "../Axios/Axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";

export const getAccountDetails = () => async (dispatch) => {
  try {
    const res = await api.getAccountDetails();
    const data=res.data.user;
    dispatch({ type: "FETCHED", data});
  } catch (error) {
    toast.error(error);
    <ToastContainer />;
  }
};
