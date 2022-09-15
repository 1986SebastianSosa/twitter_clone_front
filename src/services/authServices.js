import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const registerUser = async (values) => {
  const body = values;
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, body);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const loginUser = async (values) => {
  const body = values;
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, body);
    return response;
  } catch (err) {
    return err;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${apiUrl}/auth/logout`);
    return response;
  } catch (err) {
    return err;
  }
};
