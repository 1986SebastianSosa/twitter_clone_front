import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const registerUser = async (values) => {
  const body = values;
  try {
    const response = await axios.post(`${apiUrl}/user/register`, body);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const loginUser = async (values) => {
  const body = values;
  try {
    const response = await axios.post(`${apiUrl}/user/login`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
