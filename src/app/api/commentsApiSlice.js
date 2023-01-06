import { apiSlice } from "./apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: (body) => ({
        url: `/comment/${body.tweetId}`,
        method: "POST",
        body,
      }),
      // invalidatesTags: (result, error, body) => {
      //   return [{ type: "Tweet", id: body.tweetId }];
      // },
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

const enhancedCommentsApiSlice = apiSlice.enhanceEndpoints({
  endpoints: {
    postComment: {
      invalidatesTags: (result, error, arg) => [
        { type: "Tweet", id: arg.tweetId },
      ],
    },
    deleteComment: {
      invalidatesTags: (result, error, arg) => [
        { type: ["Tweet"], id: arg.tweetId },
      ],
    },
  },
});

export const { usePostCommentMutation, useDeleteCommentMutation } =
  commentApiSlice;
