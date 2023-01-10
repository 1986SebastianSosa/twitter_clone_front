import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux/authSlice";
import { axiosPrivate } from "../api/axiosPrivate";
import useRefresh from "./useRefresh";

const useAxiosPrivate = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const refresh = useRefresh();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
