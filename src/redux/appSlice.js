import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: { windowWidth: null, page: 1, isLoading: false },
  reducers: {
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setWindowWidth, setPage, setIsLoading } = appSlice.actions;

export const selectWindowWidth = (state) => state?.app?.windowWidth;
export const selectPage = (state) => state?.app?.page;
export const selectisLoading = (state) => state?.app?.isLoading;

export default appSlice.reducer;
