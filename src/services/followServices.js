import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const showFollowSuggestions = async (user) => {
  let response = axios({
    method: "get",
    baseURL: apiUrl + "/followers",
    headers: { userid: user._id },
  });
  return response;
};

export const followUser = async (loggedUser, user) => {
  const response = axios({
    method: "post",
    baseURL: apiUrl + "/followers/follow",
    headers: { loggeduser: loggedUser._id, user: user._id },
  });
  return response;
};

export const unfollowUser = async (loggedUser, user) => {
  const response = axios({
    method: "post",
    baseURL: apiUrl + "/followers/unfollow",
    headers: { loggeduser: loggedUser._id, user: user._id },
  });
  return response;
};
