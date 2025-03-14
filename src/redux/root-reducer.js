import { combineReducers } from "redux";
import { userSlice } from "./User/slice";

export const rootReducer = combineReducers({
  userReducer: userSlice.reducer,
});