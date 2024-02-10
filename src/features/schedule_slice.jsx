import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleEvent } from "../models/schedule";
import axiosClient from "../config/axios_client";

export const getSchedules = createAsyncThunk(
  "scheduleSlice/getSchedules",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/gym/${gymId}/schedule`);
      if (response.data["operationResult"] === "OK") {
        const listToCollect = [];
        function parseDuration(duration) {
          const [hours, minutes] = duration.split(":").map(Number);
          return (hours * 60 + minutes) * 60 * 1000; // Преобразование в миллисекунды
        }
        const data = response.data["object"];
        const keys = Object.keys(data);
        keys.forEach((date) => {
          data[date].forEach((item) => {
            const startTime = new Date(item.date.replace("@", "T"));
            const endTime = new Date(
              startTime.getTime() + parseDuration(item.duration)
            );
            listToCollect.push(
              new ScheduleEvent(
                item.id,
                startTime,
                endTime,
                item.description,
                "LESSONTYPE",
                ["DATES"]
              )
            );
          });
        });
        return listToCollect;
      }
    } catch (error) {
      console.log(`getSchedules ${error}`);
      alert(error);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    formattedDaysWeekly: "",
    selectedDay: "",
    startTimeHoursTmp: "11",
    startTimeMinutesTmp: "00",
    endTimeHoursTmp: "13",
    endTimeMinutesTmp: "00",
    description: "",
    selectedEvent: null,
    selectedWeekdays: [],
    allSchedules: [],
    schedulesOfSelectedActivity: [],
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

    setStartTimeHours: (state, action) => {
      state.startTimeHoursTmp = action.payload;
    },

    setStartTimeMinutes: (state, action) => {
      state.startTimeMinutesTmp = action.payload;
    },

    setEndTimeHours: (state, action) => {
      state.endTimeHoursTmp = action.payload;
    },

    setEndTimeMinutes: (state, action) => {
      state.endTimeMinutesTmp = action.payload;
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

    // getting schedules of selected activity
    getSchedulesOfSelectedActivity: (state, action) => {
      if (state.allSchedules.length > 0) {

      }
    },
  },

  extraReducers: (builder) => {
    // get schedules
    builder.addCase(getSchedules.pending, (state) => {
      // is schedules loading true
    });
    builder.addCase(getSchedules.fulfilled, (state, action) => {
      // is schedules loading false
      state.allSchedules = action.payload;
    });
    builder.addCase(getSchedules.rejected, (state) => {
      // state isError
    });
  },
});

export const {
  setStartTime,
  setEndTime,
  setDescription,
  addDaysToSelectedWeekdays,
  removeDayFromSelectedWeekdays,
  selectADayFromCalendar,
  setSelectedEvent,
  getFormattedMonthFromSwitching,
  resetStateAfterSubmitting,
  setEndTimeHours,
  setEndTimeMinutes,
  setStartTimeHours,
  setStartTimeMinutes,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
