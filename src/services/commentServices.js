import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const postComment = async (comment, userId, tweetId) => {
  const response = await axios({
    method: "post",
    url: apiUrl + "/comment/" + tweetId,
    data: { commentInput: comment, userId },
  });
  return response;
};

export const deleteComment = async (commentId) => {
  const response = await axios({
    method: "delete",
    url: apiUrl + "/comment/" + commentId,
  });
  return response;
};
