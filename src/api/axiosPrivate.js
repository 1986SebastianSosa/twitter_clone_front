import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});
