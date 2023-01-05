import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      if (token) {
        state.token = token;
      }
      if (user) {
        state.user = user;
      }
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
export const selectCurrentUser = (state) => state.auth.user;
