import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    windowWidth: window.innerWidth,
    page: "1",
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: "",
  },
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
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
});

export const {
  setWindowWidth,
  setPage,
  setIsLoading,
  setIsSuccess,
  setIsError,
  setError,
} = appSlice.actions;

export const selectWindowWidth = (state) => state?.app?.windowWidth;
export const selectPage = (state) => state?.app?.page;
export const selectIsLoading = (state) => state?.app?.isLoading;
export const selectIsSuccess = (state) => state?.app?.isSuccess;
export const selectIsError = (state) => state?.app?.isError;
export const selectError = (state) => state?.app?.error;

export default appSlice.reducer;
