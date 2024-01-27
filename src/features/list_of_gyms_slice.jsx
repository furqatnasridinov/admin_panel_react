import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppConstants from "../config/app_constants";
import axiosClient from "../config/axios_client";

export const getListOfGyms = createAsyncThunk(
  "listOfGyms/getListOfGyms",
  async () => {
    try {
      const response = await axiosClient.get(AppConstants.getGyms);
      return response.data["object"];
    } catch (error) {
      alert(`getListOfGyms ${error}`);
    }
  }
);

const listOfGymsSlice = createSlice({
  name: "listOfGyms",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfGyms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListOfGyms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getListOfGyms.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default listOfGymsSlice.reducer;
