import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";

export const getListOfEmployees = createAsyncThunk(
  "employess/getListOfEmployees",
  async (gymId) => {
    console.log("getListOfEmployees called");
    try {
      const response = await axiosClient.get(`api/admin/gyms/${gymId}/workers`);
      return response.data["object"];
    } catch (error) {
      alert(`getListOfEmployees ${error}`);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employess/deleteEmployee",
  async ({ employeeId }) => {
    try {
      const response = await axiosClient.delete(
        `api/admin/workers/${employeeId}`
      );
    } catch (error) {
      alert(`deleteEmployee ${error}`);
    }
  }
);

export const editEmployee = createAsyncThunk(
  "employess/editEmployee",
  async ({ gymId, id, roles, firstName, lastName, login }) => {
    console.log("editEmployee called");
    try {
      const dataToSend = {
        id: id,
        roles: roles,
        firstName: firstName,
        lastName: lastName,
        login: login,
      };
      const response = await axiosClient.patch(
        `api/director/gyms/${gymId}/workers`,
        dataToSend
      );
    } catch (error) {
      alert(`editEmployee error: ${error.message}`);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employess/addEmployee",
  async ({ gymId, firstName, lastName, login, roles }) => {
    try {
      const dataToSend = {
        firstName: firstName,
        lastName: lastName,
        login: login,
        roles: roles,
      };

      const response = await axiosClient.post(
        `api/director/gyms/${gymId}/workers`,
        dataToSend
      );
      getListOfEmployees(gymId);
    } catch (error) {
      alert(`addEmployee error: ${error.message}`);
    }
  }
);

const employeesSlice = createSlice({
  name: "employess",
  initialState: {
    isLoading: false,
    employees: [],
    deletedEmployess: [],
    selectedEmployee: null,
    selectedRoleName: null,
    selectedRoleId: 0,
    selectedRoleCode: null,
    isError: false,
    isChangesOccured: false,
  },

  reducers: {
    selectAnEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
      if (state.isChangesOccured) {
        state.isChangesOccured = false;
      }
    },

    changeSelectedEmployeesName: (state, action) => {
      state.selectedEmployee.firstName = action.payload;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    resetSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },

    changeSelectedEmployeesLastname: (state, action) => {
      state.selectedEmployee.lastName = action.payload;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    changeSelectedEmployeesPhone: (state, action) => {
      // Удалить все нецифровые символы из строки
      const digitsOnly = action.payload.replace(/\D/g, "");
      // Добавить нужные символы для форматирования номера
      const formattedNumber = `+7${digitsOnly.slice(1, 11)}`;
      state.selectedEmployee.login = formattedNumber;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    changeSelectedEmployeesRole: (state) => {
      state.selectedEmployee.roles = [
        {
          id: state.selectedRoleId,
          code: state.selectedRoleCode,
          name: state.selectedRoleName,
        },
      ];
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    removeEmployeeFromList: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload.id
      );
      state.deletedEmployess.push(action.payload);
    },

    returnDeletedEmployee: (state) => {
      if (state.deletedEmployess.length > 0) {
        // Используйте pop() для удаления и возврата последнего элемента массива
        const lastElement = state.deletedEmployess.pop();
        // Добавьте элемент обратно в массив employees
        state.employees.push(lastElement);
      }
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

    resetChanges: (state) => {
      if (state.isChangesOccured) {
        state.isChangesOccured = false;
      }
    },
  },

  extraReducers: (builder) => {
    // for getting employees
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

    // for deleting employees
    /*  builder.addCase(deleteEmployee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload
      );
      state.employees.splice(index, 1);
    });
    builder.addCase(deleteEmployee.rejected, (state) => {
      state.isError = true;
    }); */
  },
});

export const {
  selectAnEmployee,
  changeSelectedEmployeesName,
  changeSelectedEmployeesLastname,
  changeSelectedEmployeesPhone,
  changeSelectedEmployeesRole,
  selectARoleName,
  selectARoleId,
  selectARoleCode,
  resetChanges,
  removeEmployeeFromList,
  returnDeletedEmployee,
  resetSelectedEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;
