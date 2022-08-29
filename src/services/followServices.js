import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const showFollowSuggestions = async (user) => {
  console.log("ejecutando showFollowSuggestions");
  let response = axios({
    method: "get",
    baseURL: apiUrl + "/follow",
    headers: { userid: user._id },
  });
  return response;
};

export const followUser = async (loggedUser, user) => {
  // console.log("loggedUser: ", loggedUser._id);
  // console.log("user: ", user._id);
  const response = axios({
    method: "post",
    baseURL: apiUrl + "/follow",
    headers: { loggeduser: loggedUser._id, user: user._id },
  });
  return response;
};
