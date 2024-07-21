import {createSlice } from "@reduxjs/toolkit";
import AppConstants from "../config/app_constants";



const appSlice = createSlice({
  name: "app",
  initialState: {
    appType : sessionStorage.getItem(AppConstants.keyAppState) || "MYFIT",   // MYFIT OR CRM
  },


  reducers: {   

    setAppType(state, action) {
      state.appType = action.payload;
    },

  },

});

export const { setAppType, } = appSlice.actions;

export default appSlice.reducer;
