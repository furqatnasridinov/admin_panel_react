import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    //currentDay: new Date(),
    formattedDaysWeekly: "",
  },
  reducers: {
    getFormattedMonthFromSwitching: (state, action) => {},
  },
});

export const {} = scheduleSlice.actions;

export default scheduleSlice.reducer;
