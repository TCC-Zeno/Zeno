import { combineReducers } from "redux";
import { userSlice } from "./User/slice";
import { rotaSlice } from "./Route/slice";
import { systemSlice } from "./System/slice";

export const rootReducer = combineReducers({
  systemReducer: systemSlice.reducer,
  userReducer: userSlice.reducer,
  rotaReducer: rotaSlice.reducer,
});