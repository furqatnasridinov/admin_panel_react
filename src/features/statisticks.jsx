import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";
import { toast } from "react-toastify";
import { Stat } from "../models/stats";

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