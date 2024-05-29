import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
    name: "login",
    initialState: {
        isLoading: false,
        periods : ["Год", "Месяц", "Неделя", "День"],
        selectedPeriod : "Год",
    },
    reducers: {
        selectPeriod: (state, action) => {
            if (state.selectedPeriod !== action.payload) {
                state.selectedPeriod = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        //
    },
})

export const { selectPeriod } = statsSlice.actions;
export default statsSlice.reducer;