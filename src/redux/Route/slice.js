import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rota: null,
};

export const rotaSlice = createSlice({
  name: "rota",
  initialState,
  reducers: {
    dashboard: (state) => {
      state.rota = "dashboard"; 
    },
    stock: (state) => {
      state.rota = "stock";
    },
    finance: (state) => {
      state.rota = "finance";
    },
    calendar: (state) => {
      state.rota = "calendar";
    },
    organizer: (state) => {
      state.rota = "organizer";
    },
    report: (state) => {
      state.rota = "report";
    },
    service: (state) => {
      state.rota = "service";
    },
    settings: (state) => {
      state.rota = "settings";
    },
    support: (state) => {
      state.rota = "support";
    },
  },
});

export const {
  dashboard,
  stock,
  finance,
  calendar,
  organizer,
  report,
  service,
  settings,
  support,
} = rotaSlice.actions;

