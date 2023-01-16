import { useDispatch } from "react-redux";
import axios from "../api/axiosPrivate";

const useRefresh = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefresh;
