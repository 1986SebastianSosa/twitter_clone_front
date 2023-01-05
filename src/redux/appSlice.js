import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: { windowWidth: window.innerWidth, page: 1 },
  reducers: {
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload.windowWidth;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
  },
});

export const { setWindowWidth, setPage } = appSlice.actions;

export const selectWindowWidth = (state) => state.app.windowWidth;
export const selectpage = (state) => state.app.page;

export default appSlice.reducer;
