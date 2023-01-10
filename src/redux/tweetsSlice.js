import { createSlice } from "@reduxjs/toolkit";

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState: { tweetsToShow: [], hasMore: false },
  reducers: {
    setTweetsToShow: (state, action) => {
      const { tweetsToShow, hasMore } = action.payload;
      state.tweetsToShow = tweetsToShow;
      state.hasMore = hasMore;
    },
  },
});

export const { setTweetsToShow } = tweetsSlice.actions;
export const selectTweetsToShow = (state) => state?.tweets?.tweetsToShow;
export const selectHasMore = (state) => state?.tweets?.hasMore;

export default tweetsSlice.reducer;
