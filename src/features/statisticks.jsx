import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";
import { toast } from "react-toastify";
import { Stat } from "../models/stats";
import { getDayAndMonth, getMonthMaxDays, getMonthName, reOrderObject } from "../config/apphelpers";

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
            state.isLoading = false;
            const payload = action.payload;
            if (payload["operationResult"] === "OK") {
                const data = payload["object"];
                try {
                    if (data) {
                        const selectedPeriod = state.selectedPeriod;
                        if (selectedPeriod === "year") {
                            const allKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                            allKeys.forEach(key => {
                                if (!Object.keys(data.summaryVisitors).includes(String(key))) {
                                    data.summaryVisitors[key] = 0;
                                }
                            });
                            // заменить на цифры на названия месяцев
                            data.summaryVisitors = Object.keys(data.summaryVisitors).reduce((acc, key) => {
                                acc[getMonthName(Number(key))] = data.summaryVisitors[key];
                                return acc;
                            }, {});
                        }
                        if (selectedPeriod === "month") {
                            const allKeys = Array.from({ length: getMonthMaxDays() }, (_, i) => i + 1);
                            allKeys.forEach(key => {
                                if (!Object.keys(data.summaryVisitors).includes(String(key))) {
                                    data.summaryVisitors[key] = 0;
                                }
                            });
                            
                            // заменить на цифры на дни 25 мая
                            data.summaryVisitors = Object.keys(data.summaryVisitors).reduce((acc, key) => {
                                acc[getDayAndMonth(key)] = data.summaryVisitors[key];
                                return acc;
                            }, {});
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