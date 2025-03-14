import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.login = true;
    },
    logout: (state) => {
      state.login = null;
    }
  }
});

export const { login, logout } = userSlice.actions;