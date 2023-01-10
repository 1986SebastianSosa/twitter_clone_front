import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axiosPrivate";

const fetchRefreshToken = createAsyncThunk(
  "auth/fetchRefreshToken",
  async () => {
    const response = await axiosPrivate.get("/refresh");
    return response.data;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      return { token: action.payload.token, user: action.payload.user };
    },
    updateToken: (state, action) => {
      return { token: action.payload.accessToken, user: state.user };
    },
    updateUser: (state, action) => {
      return { token: state.token, user: action.payload };
    },
    logOut: (state, action) => {
      return { token: null, user: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRefreshToken.fulfilled, (state, action) => {
      state.auth.accessToken = action.payload.accessToken;
    });
  },
});

export const { setCredentials, logOut, updateToken, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
