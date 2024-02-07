import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    formattedDaysWeekly: "",
    selectedDay: "",
    startTime: "11:00",
    endTime: "13:00",
    description: "",
    selectedEvent: null,
    selectedWeekdays: [],
  },
  reducers: {
    getFormattedMonthFromSwitching: (state, action) => {},

    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },

    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },

    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },

    addDaysToSelectedWeekdays: (state, action) => {
      var list = state.selectedWeekdays;
      list.push(action.payload);
      state.selectedWeekdays = list;
    },

    selectADayFromCalendar: (state, action) => {
      let day = action.payload.getDate();
      let month = action.payload.getMonth() + 1; // Месяцы начинаются с 0
      let year = action.payload.getFullYear();

      // Добавляем ведущий ноль к дню и месяцу, если они меньше 10
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;
      var formatted = `${day}.${month}.${year}`;
      state.selectedDay = formatted;
    },

    removeDayFromSelectedWeekdays: (state, action) => {
      var list = state.selectedWeekdays;
      var index = list.indexOf(action.payload);
      if (index > -1) {
        list.splice(index, 1);
      }
      state.selectedWeekdays = list;
    },

    resetStateAfterSubmitting: (state) => {},
  },
});

export const {
  setStartTime,
  setEndTime,
  setDescription,
  addDaysToSelectedWeekdays,
  removeDayFromSelectedWeekdays,
  selectADayFromCalendar,
  setSelectedEvent
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
