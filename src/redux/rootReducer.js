import auth from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import tweets from "./tweetsSlice";
import app from "./appSlice";

export const rootReducer = combineReducers({
  auth,
  tweets,
  app,
});
