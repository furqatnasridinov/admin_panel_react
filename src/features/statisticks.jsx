import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";
import { toast } from "react-toastify";
import { Stat } from "../models/stats";
import { getAllKeysForDayPeriod, getAllKeysForMonthperiod, getAllKeysForWeekperiod, getAllKeysForYearperiod, 
    getDayAndMonth2, 
    reorderObjectByDate, 
    reorderObjectByDate2
} from "../config/apphelpers";

export const getStats = createAsyncThunk(
    "stats/getStats",
    async ({ gymId, period }) => {
        try {
            const response = await axiosClient.get(`api/stat/gyms/${gymId}/${period}`);
            return response.data;
        } catch (error) {
            toast(`getStats ${error}`);
        }
    }
);

const statsSlice = createSlice({
    name: "stats",
    initialState: {
        isLoading: false,
        periods : ["year", "month", "week", "day"],
        selectedPeriod : "year",
        stat: null,
    },
    reducers: {
        selectPeriod: (state, action) => {
            if (state.selectedPeriod !== action.payload) {
                state.selectedPeriod = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        //get stats
        builder.addCase(getStats.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStats.fulfilled, (state, action) => {
            const payload = action.payload;
            if (payload["operationResult"] === "OK") {
                const data = payload["object"];
                try {
                    if (data) {
                        const selectedPeriod = state.selectedPeriod;
                        if (selectedPeriod === "year") {
                            const allKeys = getAllKeysForYearperiod();
                            allKeys.forEach(key => {
                                if (!Object.keys(data.summaryVisitors).includes(key)) {
                                    data.summaryVisitors[key] = 0;
                                }
                            });
                             var newData = Object.keys(data.summaryVisitors).reduce((acc, key) => {
                                const [month, year] = key.split(".");
                                const date = new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                                acc[date] = data.summaryVisitors[key];
                                return acc;
                              }, {});
                              // сортировка по дате, по возрастанию
                             newData = reorderObjectByDate(newData);
                             data.summaryVisitors = newData;
                             state.isLoading = false;
                        }
                        if (selectedPeriod === "month") {
                            const allKeys = getAllKeysForMonthperiod();
                            allKeys.forEach(key => {
                                if (!Object.keys(data.summaryVisitors).includes(key)) {
                                    data.summaryVisitors[key] = 0;
                                }
                            });
                            var newData = Object.keys(data.summaryVisitors).reduce((acc, key) => {
                                const date = getDayAndMonth2(key);
                                acc[date] = data.summaryVisitors[key];
                                return acc;
                            }, {});
                            newData = reorderObjectByDate2(newData);
                            data.summaryVisitors = newData;
                            state.isLoading = false;
                        }
                        if (selectedPeriod === "week") {
                            const allKeys = getAllKeysForWeekperiod();
                            allKeys.forEach(key => {
                                if (!Object.keys(data.summaryVisitors).includes(key)) {
                                    data.summaryVisitors[key] = 0;
                                }
                            });
                            var newData = Object.keys(data.summaryVisitors).reduce((acc, key) => {
                                const date = getDayAndMonth2(key);
                                acc[date] = data.summaryVisitors[key];
                                return acc;
                            }, {});
                            newData = reorderObjectByDate2(newData);
                            data.summaryVisitors = newData;
                            state.isLoading = false;
                        }
                        if (selectedPeriod === "day") {
                            const allKeys = getAllKeysForDayPeriod();
                            const newData = {};
                            allKeys.forEach(key => {
                                const hour = key.split(':')[0];
                                newData[key] = data.summaryVisitors[hour] || 0;
                            });
                            data.summaryVisitors = newData;
                            state.isLoading = false;
                        }
                        let stat = new Stat({
                            countBid: data.countBid,
                            visitByType: data.visitByType,
                            allVisits: data.countVisitors,
                            firstVisited: data.firstVisit,
                            enrolledButNotVisited: data.noVisit,
                            visitingNow: data.visitNow,
                            regularVisitors: data.regularVisitors,
                            summaryVisitors: data.summaryVisitors,
                            adminSpeedReaction: data.speedReactAdmin,
                            adminRejectedVisits: data.countNoConfirm,
                        });
                        state.stat = stat;
                    }
                } catch (error) {
                    toast(`getStats fulfilled ${error}`);
                    state.isLoading = false;
                }
            }
        });
        builder.addCase(getStats.rejected, (state) => {
            state.isLoading = false;
        });
    },
})

export const { selectPeriod } = statsSlice.actions;
export default statsSlice.reducer;