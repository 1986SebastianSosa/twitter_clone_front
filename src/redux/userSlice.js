import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    loginUserReducer(state, action) {
      return { ...action.payload };
    },
    logoutUserReducer(state, action) {
      console.log("logout");
      return {};
    },
  },
});

export const { loginUserReducer, logoutUserReducer } = userSlice.actions;
export default userSlice.reducer;
