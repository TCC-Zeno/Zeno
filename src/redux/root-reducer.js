import { combineReducers } from "redux";
import { userSlice } from "./User/slice";
import { rotaSlice } from "./Route/slice";

export const rootReducer = combineReducers({
  userReducer: userSlice.reducer,
  rotaReducer: rotaSlice.reducer,
});