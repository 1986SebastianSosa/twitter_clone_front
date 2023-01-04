import { apiSlice } from "../app/api/apiSlice";

export const tweetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTweets: builder.query({
      query: (page) => ({
        url: "/tweet",
        method: "GET",
        params: {
          page: page,
        },
      }),
    }),
  }),
});

export const { useFetchTweetsQuery } = tweetsApiSlice;
