import { apiSlice } from "../app/api/apiSlice";
import { setTweets } from "./tweetsSlice";

export const tweetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTweets: builder.query({
      providesTags: ["Tweets"],
      query: (page) => ({
        url: "/tweet",
        params: {
          page: page,
        },
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTweets(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    fetchOneTweet: builder.query({
      query: (tweetId) => ({
        url: `/tweet/${tweetId}`,
        method: "GET",
      }),
    }),
    postTweet: builder.mutation({
      invalidatesTags: ["Tweets"],
      query: (body) => ({
        url: "/tweet",
        method: "POST",
        body,
      }),
    }),
    deleteTweet: builder.mutation({
      invalidatesTags: ["Tweets"],
      query: (tweetId) => ({
        url: `/tweet/${tweetId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchTweetsQuery,
  useFetchOneTweetQuery,
  usePostTweetMutation,
  useDeleteTweetMutation,
} = tweetsApiSlice;
