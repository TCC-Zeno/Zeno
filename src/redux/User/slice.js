import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  theme: "blue",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.login = true;
    },
    logout: (state) => {
      state.login = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
  },
});

export const { login, logout, setTheme } = userSlice.actions;

export default userSlice.reducer;