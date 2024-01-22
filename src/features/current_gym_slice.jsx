import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";

export const getCurrentGym = createAsyncThunk(
  "currentGym/getCurrentGym",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/admin/gyms/${gymId}`);
      return response.data["object"];
    } catch (error) {
      alert(`getGymDetails ${error}`);
    }
  }
);

const currentGymSlice = createSlice({
  name: "currentGym",
  initialState: {
    isLoading: false,
    currentGym: null,
    isError: false,
  },

  reducers: {
    setCurrentGym: (state, action) => {
      state.currentGym = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCurrentGym.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentGym.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentGym = action.payload;
    });
    builder.addCase(getCurrentGym.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setCurrentGym } = currentGymSlice.actions;
export default currentGymSlice.reducer;
