import { apiSlice } from "./apiSlice";

export const tweetLikesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postTweetLike: builder.mutation({
      query: (tweetId) => ({
        url: `/tweetlike/${tweetId}`,
        method: "POST",
      }),
    }),
  }),
});

const enhancedTweetLikesApiSlice = apiSlice.enhanceEndpoints({
  endpoints: {
    postTweetLike: {
      invalidatesTags: (result, error, tweetId) => {
        return [{ type: "Tweet", id: tweetId }];
      },
    },
  },
});

export const { usePostTweetLikeMutation } = tweetLikesApiSlice;
