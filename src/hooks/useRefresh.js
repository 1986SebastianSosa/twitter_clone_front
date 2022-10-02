import axios from "axios";
import { response } from "express";
import { useDispatch } from "react-redux";
import { updateToken } from "../redux/authSlice";

const useRefresh = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefresh;
