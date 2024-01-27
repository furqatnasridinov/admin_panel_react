import { configureStore } from "@reduxjs/toolkit";
import listOfGymsSlice from "../features/list_of_gyms_slice";
import currentGymSlice from "../features/current_gym_slice";
import employeesSlice from "../features/employees_slice";
import activitiesSlice from "../features/activities_slice";

export const store = configureStore({
  reducer: {
    listOfGyms: listOfGymsSlice,
    currentGym: currentGymSlice,
    employees: employeesSlice,
    activities : activitiesSlice
  },
});
