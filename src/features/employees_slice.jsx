import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";

export const getListOfEmployees = createAsyncThunk(
  "employess/getListOfEmployees",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/admin/gyms/${gymId}/workers`);
      return response.data["object"];
    } catch (error) {
      alert(`getListOfEmployees ${error}`);
    }
  }
);

const employeesSlice = createSlice({
  name: "employess",
  initialState: {
    isLoading: false,
    employees: [],
    selectedEmployee: null,
    selectedRoleName: null,
    selectedRoleId: 0,
    selectedRoleCode: null,
    isError: false,
  },

  reducers: {
    selectAnEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },

    changeSelectedEmployeesName: (state, action) => {
      state.selectedEmployee.firstName = action.payload;
    },

    selectARoleName: (state, action) => {
      state.selectedRoleName = action.payload;
    },

    selectARoleId: (state, action) => {
      state.selectedRoleId = action.payload;
    },

    selectARoleCode: (state, action) => {
      state.selectedRoleCode = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getListOfEmployees.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListOfEmployees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    });
    builder.addCase(getListOfEmployees.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const {
  selectAnEmployee,
  changeSelectedEmployeesName,
  selectARoleName,
  selectARoleId,
  selectARoleCode,
} = employeesSlice.actions;
export default employeesSlice.reducer;
