import axios from "axios";
import { useDispatch } from "react-redux";

const useRefresh = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefresh;
