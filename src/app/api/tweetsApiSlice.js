import { apiSlice } from "./apiSlice";

export const tweetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTweets: builder.query({
      query: (page) => ({
        url: "/tweet",
        params: {
          page,
        },
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        const tags = result.tweetsToShow.map((tweet) => {
          return { type: "Tweet", id: tweet._id };
        });
        return tags;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, args) => {
        console.log(args);
        if (args.arg > 1) {
          currentCache.tweetsToShow.push(...newItems.tweetsToShow);
          currentCache.hasMore = newItems.hasMore;
        }
      },
      forceRefetch({ currentArg, previousArg, endpointState, state }) {
        return currentArg !== previousArg;
      },
      onQueryStarted: (arg, { queryFulfilled }) => {
        if (queryFulfilled) {
          return queryFulfilled.data;
        }
      },
    }),
    fetchOneTweet: builder.query({
      query: (tweetId) => ({
        url: `/tweet/${tweetId}`,
        method: "GET",
      }),
      providesTags: (result, error, tweetId) => [
        { type: "Tweet", id: tweetId },
      ],
    }),
    postTweet: builder.mutation({
      query: (body) => ({
        url: "/tweet",
        method: "POST",
        body,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        dispatch(apiSlice.util.resetApiState());
      },
    }),
    deleteTweet: builder.mutation({
      query: (tweetId) => ({
        url: `/tweet/${tweetId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        dispatch(apiSlice.util.resetApiState());
      },
    }),
  }),
});

export const {
  useFetchTweetsQuery,
  useFetchOneTweetQuery,
  usePostTweetMutation,
  useDeleteTweetMutation,
  useLazyFetchTweetsQuery,
} = tweetsApiSlice;
