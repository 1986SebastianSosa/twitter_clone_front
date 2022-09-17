import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchTweetLikes = async (tweetId, token) => {
  const response = axios({
    method: "get",
    url: apiUrl + `/tweetLike/${tweetId}`,
    headers: { authorization: token },
  });
  return response;
};

export const fetchCommentLikes = async (commentId, userId, token) => {
  try {
    const response = axios({
      method: "get",
      url: apiUrl + `/commentLike/${commentId}`,
      headers: { userId, authorization: token },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const likeTweet = async (tweetId, userId, token) => {
  const response = await axios({
    method: "post",
    url: apiUrl + `/tweetLike/${tweetId}`,
    headers: { userId, authorization: token },
  });
  return response;
};

export const likeComment = async (commentId, userId, token) => {
  try {
    const response = await axios({
      method: "post",
      url: apiUrl + `/commentLike/${commentId}`,
      headers: { userId, authorization: token },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
