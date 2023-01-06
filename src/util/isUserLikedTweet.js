export const isUserLiked = (tweet, user) => {
  return tweet.likes.includes(user._id);
};
