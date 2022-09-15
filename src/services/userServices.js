import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getUser = async (userId) => {
  const response = axios.get(`${apiUrl}/user/${userId}`);
  return response;
};
