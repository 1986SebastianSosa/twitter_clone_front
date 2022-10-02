import axios from "axios";
import { useSelector } from "react-redux";

const apiUrl = process.env.REACT_APP_API_URL;

export const postTweet = async (token, tweetInput) => {
  try {
    const response = await axios({
      method: "post",
      url: apiUrl + "/tweet/",
      data: {
        content: tweetInput,
        createdOn: new Date(),
      },
      headers: { Authorization: token },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTweets = async (user, token, page) => {
  try {
    const response = await axios({
      method: "get",
      url: apiUrl + "/tweet/",
      params: { page: page },
      headers: { userId: user._id, Authorization: token },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getOneTweet = async (tweetId, token) => {
  const response = await axios({
    method: "get",
    url: apiUrl + `/tweet/${tweetId}`,
    headers: { authorization: token },
  });
  return response;
};

export const deleteTweet = async (tweetId, token) => {
  const response = await axios({
    method: "delete",
    url: apiUrl + `/tweet/${tweetId}`,
    headers: { authorization: token },
  });
  return response;
};
