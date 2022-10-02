import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setCredentials, logOut, updateToken, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
