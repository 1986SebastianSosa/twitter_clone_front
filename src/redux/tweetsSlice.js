import { createSlice } from "@reduxjs/toolkit";

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState: { tweetsToShow: [], allTweetsLength: 0, hasMore: false },
  reducers: {
    setTweets: (state, action) => {
      const { tweetsToShow, allTweetsLength } = action.payload;
      state.tweetsToShow = tweetsToShow;
      state.allTweetsLength = allTweetsLength;
      if (state.tweetsToShow.length === allTweetsLength) {
        state.hasMore = false;
      } else {
        state.hasMore = true;
      }
    },
  },
});

export const { setTweets } = tweetsSlice.actions;
export const selectAllTweets = (state) => state.tweetsToShow;
export const selectAllTweetsLength = (state) => state.allTweetsLength;
export const selectHasMore = (state) => state.hasMore;

export default tweetsSlice.reducer;
