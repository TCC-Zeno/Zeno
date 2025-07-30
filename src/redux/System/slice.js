import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: null,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  }
})

export const { startLoading, stopLoading } = systemSlice.actions;

export default systemSlice.reducer;