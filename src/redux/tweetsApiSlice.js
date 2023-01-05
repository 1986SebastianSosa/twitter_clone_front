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
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.tweetsToShow.push(...newItems.tweetsToShow);
        currentCache.hasMore = newItems.hasMore;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useFetchTweetsQuery } = tweetsApiSlice;
