import { createSlice } from "@reduxjs/toolkit";

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState: { tweetsToShow: [], hasMore: false },
  reducers: {
    setTweetsToShow: (state, action) => {
      for (const tweet of action.payload) {
        if (!state.tweetsToShow.find((el) => el._id === tweet._id)) {
          state.tweetsToShow.push(tweet);
        }
      }
      state.tweetsToShow = state.tweetsToShow.sort(
        (a, b) => Date.parse(b.createdOn) - Date.parse(b.createdOn)
      );
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    addTweet: (state, action) => {
      state.tweetsToShow.unshift(action.payload);
    },
    deleteTweet: (state, action) => {
      state.tweetsToShow = state.tweetsToShow.filter(
        (el) => el._id !== action.payload
      );
    },
    resetTweetsToShow: (state) => {
      state.tweetsToShow = [];
    },
  },
});

export const {
  setTweetsToShow,
  setHasMore,
  addTweet,
  deleteTweet,
  resetTweetsToShow,
} = tweetsSlice.actions;
export const selectTweetsToShow = (state) => state?.tweets?.tweetsToShow;
export const selectHasMore = (state) => state?.tweets?.hasMore;

export default tweetsSlice.reducer;
