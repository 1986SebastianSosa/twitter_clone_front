import { apiSlice } from "./apiSlice";

export const tweetLikesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postTweetLike: builder.mutation({
      query: (tweetId) => ({
        url: `/tweetlike/${tweetId}`,
        method: "POST",
      }),
      invalidatesTags: (tweetId, api, extraOptions) => [
        { type: "TweetLike", id: tweetId },
      ],
    }),
    fetchTweetLike: builder.query({
      query: (tweetId) => ({
        url: `/tweetlike/${tweetId}`,
        method: "GET",
      }),
      queryFn: (result, api, extraOptions) => {
        // console.log("result: ", result);
        for (const tweetLike of result) {
          console.log(tweetLike._id);
        }
      },
      providesTags: (result, error, tweetId) => {
        console.log("result: ", result);
        const tags = result.map((tweetLike) => {
          return { type: "TweetLike", id: tweetLike._id };
        });
        return tags;
      },
    }),
  }),
});

export const { usePostTweetLikeMutation, useFetchTweetLikeQuery } =
  tweetLikesApiSlice;
