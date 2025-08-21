import { combineReducers } from "redux";
import { userSlice } from "./User/slice";
import { rotaSlice } from "./Route/slice";
import { systemSlice } from "./System/slice";
import stockFilterSlice from "./StockFilter/slice";

export const rootReducer = combineReducers({
  systemReducer: systemSlice.reducer,
  userReducer: userSlice.reducer,
  rotaReducer: rotaSlice.reducer,
  stockFilterReducer: stockFilterSlice.reducer,
});
