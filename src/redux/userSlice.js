import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    loginUserReducer(state, action) {
      console.log(action.payload);
      return { ...action.payload };
    },
  },
});

export const { loginUserReducer } = userSlice.actions;
export default userSlice.reducer;
