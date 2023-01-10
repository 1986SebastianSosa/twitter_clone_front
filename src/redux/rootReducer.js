import auth from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  auth,
});
