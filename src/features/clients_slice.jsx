import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DUMMY_CLIENTS } from "../dummy_data/dymmy_data";
import { toast } from "react-toastify";
import axiosClient from "../config/axios_client";
import { BookingData } from "../models/booking_data";

export const getNewClients = createAsyncThunk(
  "clientsSlice/getNewClients",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/admin/gyms/${gymId}/waiting`);
      if (response.status === 200) {
        const listToCollect = [];
        function parseDuration(duration) {
          const [hours, minutes] = duration.split(":").map(Number);
          return (hours * 60 + minutes) * 60 * 1000; // Преобразование в миллисекунды
        }
        const data = response.data["object"];
        data.forEach((item) => {
          const startTime = new Date(item.date.replace("@", "T"));
          const endTime = new Date(
            startTime.getTime() + parseDuration(item.duration)
          );
          listToCollect.push(
            new BookingData(
              item.id,
              item.gymId,
              item.gymName,
              startTime,
              endTime,
              item.lessonType,
              item.lessonId,
              item.repeat,
              item.usersCount
            )
          );
        });
        return listToCollect;
      }
    } catch (error) {
      toast(`getNewClients ${error}`);
    }
  }
);

export const acceptClient = createAsyncThunk(
  "clientsSlice/acceptClient",
  async ({ gymId, waitingId }) => {
    try {
      const response = await axiosClient.patch(
        `api/admin/gyms/${gymId}/waiting/${waitingId}/true`
      );
    } catch (error) {
      toast(`acceptClient ${error}`);
    }
  }
);

export const rejectClient = createAsyncThunk(
  "clientsSlice/rejectClient",
  async ({ gymId, waitingId }) => {
    try {
      const response = await axiosClient.patch(
        `api/admin/gyms/${gymId}/waiting/${waitingId}/false`
      );
    } catch (error) {
      toast(`rejectClient ${error}`);
    }
  }
);

export const getWillComeToday = createAsyncThunk(
  "clientsSlice/getWillComeToday",
  async (gymId) => {
    try {
      const response = await axiosClient.get(
        `api/admin/gyms/${gymId}/willCome`
      );
      if (response.status === 200) {
        const listToCollect = [];
        function parseDuration(duration) {
          const [hours, minutes] = duration.split(":").map(Number);
          return (hours * 60 + minutes) * 60 * 1000; // Преобразование в миллисекунды
        }
        const data = response.data["object"];
        data.forEach((item) => {
          const startTime = new Date(item.date.replace("@", "T"));
          const endTime = new Date(
            startTime.getTime() + parseDuration(item.duration)
          );
          const today = new Date();
          // добавим только сегодняшние и те что еще не пришли
          if (
            startTime.getDate() === today.getDate() &&
            startTime.getMonth() === today.getMonth() &&
            startTime.getFullYear() === today.getFullYear() &&
            startTime > today
          ) {
            listToCollect.push(
              new BookingData(
                item.id,
                item.gymId,
                item.gymName,
                startTime,
                endTime,
                item.lessonType
              )
            );
          }
        });
        return listToCollect;
      }
    } catch (error) {
      toast(`getWillComeToday ${error}`);
    }
  }
);

export const getAlreadyCameToday = createAsyncThunk(
  "clientsSlice/getAlreadyCameToday",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/admin/gyms/${gymId}/come`);
      if (response.status === 200) {
        const listToCollect = [];
        function parseDuration(duration) {
          const [hours, minutes] = duration.split(":").map(Number);
          return (hours * 60 + minutes) * 60 * 1000; // Преобразование в миллисекунды
        }
        const data = response.data["object"];
        data.forEach((item) => {
          const startTime = new Date(item.date.replace("@", "T"));
          const endTime = new Date(
            startTime.getTime() + parseDuration(item.duration)
          );
          const today = new Date();
          // добавим только сегодняшние
          if (
            startTime.getDate() === today.getDate() &&
            startTime.getMonth() === today.getMonth() &&
            startTime.getFullYear() === today.getFullYear()
          ) {
            listToCollect.push(
              new BookingData(
                item.id,
                item.gymId,
                item.gymName,
                startTime,
                endTime,
                item.lessonType
              )
            );
          }
        });
        return listToCollect;
      }
    } catch (error) {
      toast(`getAlreadyCameToday ${error}`);
    }
  }
);

const clientsSlice = createSlice({
  name: "clientsSlice",
  initialState: {
    waitingForAccept: [],
    newClientsLoading: false,
    willComeToday: [],
    willComeTodayLoading: false,
    alreadyCameToday: [],
    alreadyCameTodayLoading: false,
    decliningEvent: null,
    loading: false,
    error: null,
  },
  reducers: {
    // remove client from waitingForAccept list
    removeClient(state, action) {
      state.waitingForAccept = state.waitingForAccept.filter(
        (client) => client.id !== action.payload
      );
    },

    setDecliningEvent(state, action) {
      state.decliningEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getNewClients
    builder.addCase(getNewClients.pending, (state) => {
      state.newClientsLoading = true;
    });
    builder.addCase(getNewClients.fulfilled, (state, action) => {
      state.waitingForAccept = action.payload;
      state.newClientsLoading = false;
    });
    builder.addCase(getNewClients.rejected, (state, action) => {
      state.error = action.error.message;
      state.newClientsLoading = false;
    });

    // will come today
    builder.addCase(getWillComeToday.pending, (state) => {
      state.willComeTodayLoading = true;
    });
    builder.addCase(getWillComeToday.fulfilled, (state, action) => {
      state.willComeToday = action.payload;
      state.willComeTodayLoading = false;
    });
    builder.addCase(getWillComeToday.rejected, (state, action) => {
      state.error = action.error.message;
      state.willComeTodayLoading = false;
    });

    // already came today
    builder.addCase(getAlreadyCameToday.pending, (state) => {
      state.alreadyCameTodayLoading = true;
    });
    builder.addCase(getAlreadyCameToday.fulfilled, (state, action) => {
      state.alreadyCameToday = action.payload;
      state.alreadyCameTodayLoading = false;
    });
    builder.addCase(getAlreadyCameToday.rejected, (state, action) => {
      state.error = action.error.message;
      state.alreadyCameTodayLoading = false;
    });
  },
});

export const { removeClient, setDecliningEvent } = clientsSlice.actions;
export default clientsSlice.reducer;
