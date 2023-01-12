import { createSlice } from "@reduxjs/toolkit";

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState: { tweetsToShow: [], hasMore: false },
  reducers: {
    setTweetsToShow: (state, action) => {
      const { tweetsToShow, hasMore } = action.payload;
      for (const tweet of tweetsToShow) {
        // console.log(tweet);
        if (!state.tweetsToShow.find((el) => el._id === tweet._id)) {
          state.tweetsToShow.push(...tweetsToShow);
        }
      }

      state.tweetsToShow = state.tweetsToShow.sort(
        (a, b) => Date.parse(b.createdOn) - Date.parse(b.createdOn)
      );
      state.hasMore = hasMore;
    },
  },
});

export const { setTweetsToShow } = tweetsSlice.actions;
export const selectTweetsToShow = (state) => state?.tweets?.tweetsToShow;
export const selectHasMore = (state) => state?.tweets?.hasMore;

export default tweetsSlice.reducer;
