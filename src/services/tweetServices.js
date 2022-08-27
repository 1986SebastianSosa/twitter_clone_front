import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const postTweet = async (user, tweetInput) => {
  console.log("user: ", user);
  const response = await axios({
    method: "post",
    url: apiUrl + "/tweet/",
    data: {
      author: user.user._id,
      content: tweetInput,
      createdOn: new Date(),
    },
  });
  return response;
};

export const getAllTweets = async () => {
  const response = await axios({
    method: "get",
    url: apiUrl + "/tweet/",
  });
  return response;
};
