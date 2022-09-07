import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const postTweet = async (user, tweetInput) => {
  console.log("user: ", user);
  const response = await axios({
    method: "post",
    url: apiUrl + "/tweet/",
    data: {
      author: user._id,
      content: tweetInput,
      createdOn: new Date(),
    },
  });
  return response;
};

export const getAllTweets = async (user) => {
  const response = await axios({
    method: "get",
    url: apiUrl + "/tweet/",
    headers: { userId: user._id },
  });
  return response;
};

export const getOneTweet = async (tweetId) => {
  const response = await axios({
    method: "get",
    url: apiUrl + `/tweet/${tweetId}`,
  });
  return response;
};

export const deleteTweet = async (tweetId) => {
  const response = await axios({
    method: "delete",
    url: apiUrl + `/tweet/${tweetId}`,
  });
  return response;
};
