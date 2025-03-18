import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    rota : null}

export const rotaSlice = createSlice({
    name: 'rota',
    initialState,
    reducers: {
        dashboard : (state)=>{
            state.dashboard = true
        },
        stock : (state)=>{
            state.stock = "stock"
        },
        finance : (state)=>{
            state.finance = "finance"
        },
        calendar : (state)=>{
            state.calendar = "calendar"
        },
        list : (state)=>{
            state.list = "list"
        },
        report : (state)=>{
            state.report = "report"
        },
        service : (state)=>{
            state.service = "service"
        },
        settings : (state)=>{
            state.settings = "settings"
        },
        support : (state)=>{
            state.support = "support"
        }}
    })
    export const {dashboard, stock, finance, calendar, list, report, service, settings, support} = rotaSlice.actions;

