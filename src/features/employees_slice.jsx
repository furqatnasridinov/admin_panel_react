import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";
import { toast } from "react-toastify";

export const getListOfEmployees = createAsyncThunk(
  "employess/getListOfEmployees",
  async (gymId) => {
    console.log("getListOfEmployees called");
    try {
      const response = await axiosClient.get(`api/admin/gyms/${gymId}/workers`);
      return response.data["object"];
    } catch (error) {
      toast(`getListOfEmployees ${error}`);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employess/deleteEmployee",
  async ({ gymid, employeeId }) => {
    try {
      const response = await axiosClient.delete(
        `api/admin/gyms/${gymid}/workers/${employeeId}`
      );
    } catch (error) {
      toast(`deleteEmployee ${error}`);
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
        `api/admin/gyms/${gymId}/workers`,
        dataToSend
      );
    } catch (error) {
      toast(`editEmployee ${error}`);
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
        `api/admin/gyms/${gymId}/workers`,
        dataToSend
      );
      getListOfEmployees(gymId);
    } catch (error) {
      if (error["response"]["data"]["error"] === "Forbidden") {
        toast(`У вас нет доступа на добавление сотрудников`);
      } else {
        toast(`addEmployee ${error}`);
      }

    }
  }
);

const employeesSlice = createSlice({
  name: "employess",
  initialState: {
    isLoading: false,
    employees: [],
    isEmployeesLoadidng: false,
    deletedEmployess: [],
    selectedEmployee: null,
    selectedRoleName: null,
    selectedRoleId: 0,
    selectedRoleCode: null,
    selectedEmployeesPriveledges: [],
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
      if (state.deletedEmployess?.length > 0) {
        const lastElement = state.deletedEmployess.pop();
        // Добавь элемент обратно в массив employees
        state.employees.push(lastElement);
      }
    },

    removeEmployeeFromDeletedEmployeesList: (state, action) => {
      state.deletedEmployess = state.deletedEmployess.filter(
        (employee) => employee.id !== action.payload.id
      );
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

    selectAPriveledge: (state, action) => {
      state.selectedEmployeesPriveledges = action.payload;
    },

    resetChanges: (state) => {
      if (state.isChangesOccured) {
        state.isChangesOccured = false;
        if (state.selectedEmployee !== null) {
          state.selectedEmployee = null;
        }
      }
    },
  },

  extraReducers: (builder) => {
    // for getting employees
    builder.addCase(getListOfEmployees.pending, (state) => {
      state.isEmployeesLoadidng = true;
    });
    builder.addCase(getListOfEmployees.fulfilled, (state, action) => {
      state.isEmployeesLoadidng = false;
      state.employees = action.payload;
    });
    builder.addCase(getListOfEmployees.rejected, (state) => {
      state.isEmployeesLoadidng = false;
    });

    // for deleting employees
    builder.addCase(deleteEmployee.pending, (state) => {
      state.isEmployeesLoadidng = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state) => {
      state.isEmployeesLoadidng = false;
    });
    builder.addCase(deleteEmployee.rejected, (state) => {
      state.isEmployeesLoadidng = false;
    });
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
  selectAPriveledge,
  removeEmployeeFromDeletedEmployeesList,
} = employeesSlice.actions;

export default employeesSlice.reducer;
