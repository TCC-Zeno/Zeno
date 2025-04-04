import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  theme: "blue",
  colorBlindness: "Padrão",
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
    },
    setColorBlindness: (state, action) => {
      state.colorBlindness = action.payload;
    }
  },
});

export const { login, logout, setTheme, setColorBlindness } = userSlice.actions;

export default userSlice.reducer;