import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      return { token: action.payload.token, user: action.payload.user };
    },
    updateToken: (state, action) => {
      return { token: action.payload.accessToken };
    },
    logOut: (state, action) => {
      return { token: null, user: null };
    },
  },
});

export const { setCredentials, logOut, updateToken } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
