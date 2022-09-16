import axios from "axios";
// import useAxiosPrivate from "./../hooks/useAxiosPrivate";
// const axiosPrivate = useAxiosPrivate();

const apiUrl = process.env.REACT_APP_API_URL;

export const postComment = async (comment, userId, tweetId, token) => {
  const response = await axios({
    method: "post",
    url: apiUrl + "/comment/" + tweetId,
    data: { commentInput: comment, userId },
    headers: { authorization: token },
  });
  return response;
};

export const deleteComment = async (commentId, token, tweetId) => {
  try {
    const response = await axios({
      method: "delete",
      url: apiUrl + "/comment/" + commentId,
      headers: { authorization: token },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
