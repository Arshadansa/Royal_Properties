import * as api from "../Axios/Axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const uploadproperty = (data) => async () => {
  console.log(data);
  try {
    const res = await api.uploadproperty(data);
    if (res.status === 200) {
      toast.success("Property Uploaded Successfully");
    }
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error);
    <ToastContainer />;
  }
};
