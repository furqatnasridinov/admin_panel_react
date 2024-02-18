import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_CLIENTS } from "../dummy_data/dymmy_data";

const clientsSlice = createSlice({
  name: "clientsSlice",
  initialState: {
    waitingForAccept: DUMMY_CLIENTS,
    loading: false,
    error: null,
  },
  reducers: {
    // remove client from waitingForAccept list
    removeClient(state, action) {
      state.waitingForAccept = state.waitingForAccept.filter(
        (client) => client.id !== action.payload
      );
    },
  },
});


export const { removeClient } = clientsSlice.actions;
export default clientsSlice.reducer;
