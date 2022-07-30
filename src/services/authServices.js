import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const registerUser = async (
  firstname,
  lastname,
  username,
  password,
  email
) => {
  const body = { firstname, lastname, username, password, email };
  try {
    const response = await axios.post(`${apiUrl}/user/register`, body);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const loginUser = async (email, password) => {
  const body = { email, password };
  try {
    const response = await axios.post(`${apiUrl}/user/login`, body);
    return response.data;
  } catch (e) {
    return e;
  }
};
