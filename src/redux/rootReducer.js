import user from "./userSlice";
import auth from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  user,
  auth,
});
