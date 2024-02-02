import { configureStore } from "@reduxjs/toolkit";
import currentGymSlice from "../features/current_gym_slice";
import employeesSlice from "../features/employees_slice";
import activitiesSlice from "../features/activities_slice";
import scheduleSlice from "../features/schedule_slice";

export const store = configureStore({
  reducer: {
    currentGym: currentGymSlice,
    employees: employeesSlice,
    activities: activitiesSlice,
    schedule: scheduleSlice,
  },
});


