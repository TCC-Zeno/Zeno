import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: null,
};

export const stockFilterSlice = createSlice({
  name: "stockFilter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = null;
    },
  },
});

export const { setFilter, clearFilter } = stockFilterSlice.actions;

export default stockFilterSlice;
