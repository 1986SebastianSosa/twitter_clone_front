import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchTweetLikes = async (tweetId, userId) => {
  const response = axios({
    method: "get",
    url: apiUrl + `/tweetLike/${tweetId}`,
    headers: { userId },
  });
  return response;
};

export const fetchCommentLikes = async (tweetId, userId) => {
  const response = axios({
    method: "get",
    url: apiUrl + `/commentLike/${tweetId}`,
    headers: { userId },
  });
  return response;
};

export const likeTweet = async (tweetId, userId) => {
  const response = await axios({
    method: "post",
    url: apiUrl + `/tweetLike/${tweetId}`,
    headers: { userId },
  });
  return response;
};

export const likeComment = async (commentId, userId) => {
  const response = await axios({
    method: "post",
    url: apiUrl + `/commentLike/${commentId}`,
    headers: { userId },
  });
  return response;
};
