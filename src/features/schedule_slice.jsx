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
                item.lessonType,
                item.owner,
                item.repeat
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

export const createSchedule = createAsyncThunk(
  "scheduleSlice/createSchedule",
  async ({ id, date, duration, description, lessonType, selectedWeekdays }) => {
    try {
      const dataToSend = {
        date: date,
        duration: duration,
        description: description,
        lessonTypeString: lessonType,
        repeat: selectedWeekdays,
      };
      const response = await axiosClient.post(
        `api/admin/gyms/${id}/lessons`,
        dataToSend
      );
    } catch (error) {
      alert(`scheduleSlice/createSchedule ${error}`);
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  "scheduleSlice/deleteSchedule",
  async ({ gymId, lessonId, all }) => {
    try {
      const response = await axiosClient.delete(
        `api/admin/gyms/${gymId}/lessons/${lessonId}/${all}`
      );
    } catch (error) {
      alert(`scheduleSlice/deleteSchedule ${error}`);
    }
  }
);

export const updateSchedule = createAsyncThunk(
  "scheduleSlice/updateSchedule",
  async ({ gymId, lessonId, duration, description, all }) => {
    try {
      const dataToSend = {
        id: lessonId,
        //duration: duration,
        description: description,
      };
      const response = await axiosClient.patch(
        `api/admin/gyms/${gymId}/lessons/${all}`,
        dataToSend
      );
    } catch (error) {
      alert(`scheduleSlice/updateSchedule ${error}`);
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
    deleteAll: false,
    lessonStartTimeSendToServer: "",
    lessonDurationSendToServer: "",
    selectedWeekdays: [],
    allSchedules: [],
    schedulesOfSelectedActivity: [],
    isCurrentEventHasRepeats: false,
  },
  reducers: {
    getFormattedMonthFromSwitching: (state, action) => {},

    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },

    resetSelectedEvent: (state) => {
      state.selectedEvent = null;
    },

    selectedEventSetTitle: (state, action) => {
      state.selectedEvent.title = action.payload;
    },

    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },

    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },

    setDeleteAll: (state) => {
      state.deleteAll = true;
    },

    reSetDeleteAll: (state) => {
      state.deleteAll = false;
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
      state.selectedWeekdays.push(action.payload);
    },

    removeDayFromSelectedWeekdays: (state, action) => {
      var list = state.selectedWeekdays;
      var index = list.indexOf(action.payload);
      if (index > -1) {
        list.splice(index, 1);
      }
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

    getStartTimeToSendToServer: (state) => {
      if (state.selectedDay !== "") {
        const date = state.selectedDay;
        const [day, month, year] = date.split(".");
        const newDate = `${year}-${month}-${day}`;
        const start = `${newDate}@${state.startTimeHoursTmp}:${state.startTimeMinutesTmp}`;
        state.lessonStartTimeSendToServer = start;
      }
    },

    getDuration: (state) => {
      const start = new Date(
        `1970-01-01T${state.startTimeHoursTmp}:${state.startTimeMinutesTmp}:00`
      );

      let end = new Date(
        `1970-01-01T${state.endTimeHoursTmp}:${state.endTimeMinutesTmp}:00`
      );

      // If end time is before start time, add one day to end time
      if (end < start) {
        end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
      }

      let diff = end - start;
      let hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      let minutes = Math.floor(diff / 1000 / 60);

      // Pad hours and minutes with zeros if needed
      hours = hours.toString().padStart(2, "0");
      minutes = minutes.toString().padStart(2, "0");
      const duration = `${hours}:${minutes}`;
      state.lessonDurationSendToServer = duration;
    },

    resetStateAfterSubmitting: (state) => {
      state.selectedDay = "";
      state.startTimeHoursTmp = "11";
      state.startTimeMinutesTmp = "00";
      state.endTimeHoursTmp = "13";
      state.endTimeMinutesTmp = "00";
      state.description = "";
      state.selectedWeekdays = [];
    },

    // getting schedules of selected activity
    getSchedulesOfSelectedActivity: (state, action) => {
      if (action.payload !== "") {
        if (state.allSchedules.length > 0) {
          state.allSchedules.forEach((item) => {
            if (item.lessonType === action.payload) {
              state.schedulesOfSelectedActivity.push(item);
            }
          });
        }
      }
    },

    resetScheduleOfSelectedActivity: (state) => {
      state.schedulesOfSelectedActivity = [];
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
  getDuration,
  getStartTimeToSendToServer,
  setDeleteAll,
  reSetDeleteAll,
  resetSelectedEvent,
  selectedEventSetTitle,
  getSchedulesOfSelectedActivity,
  resetScheduleOfSelectedActivity
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
