import { apiSlice } from "../app/api/apiSlice";

export const tweetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTweets: builder.query({
      query: (page) => ({
        url: "/tweet",
        params: {
          page: page,
        },
        method: "GET",
      }),
      providesTags: ["Tweet"],

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.tweetsToShow.push(...newItems.tweetsToShow);
        currentCache.hasMore = newItems.hasMore;
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
    }),
    postTweet: builder.mutation({
      query: (body) => ({
        url: "/tweet",
        method: "POST",
        body,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
          return data;
        } catch (err) {
          console.log(err);
        }
      },
      invalidatesTags: ["Tweet"],
    }),
    deleteTweet: builder.mutation({
      query: (tweetId) => ({
        url: `/tweet/${tweetId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
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
