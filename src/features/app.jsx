import {createSlice } from "@reduxjs/toolkit";



const appSlice = createSlice({
  name: "app",
  initialState: {
    appType : "MYFIT",   // MYFIT OR CRM
  },


  reducers: {   

    setAppType(state, action) {
      state.appType = action.payload;
    },

  },

});

export const { setAppType, } = appSlice.actions;

export default appSlice.reducer;
