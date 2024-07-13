import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";

export const getClients = createAsyncThunk(
    "srmClients/getClients",
    async () => {
        try {
            const response = await axiosClient.get(`api/crm/client`);
            if (response.status === 200) {
                return response.data["object"];
            }
        } catch (error) {
            console.log(`srmClients/getClients ${error}`);
        }
    },
);

export const getClientById = createAsyncThunk(
    "srmClients/getClientById",
    async (id) => {
        try {
            const response = await axiosClient.get(`api/crm/client/${id}`);
            if (response.status === 200) {
                return response.data["object"];
            }
        } catch (error) {
            console.log(`srmClients/getClientById ${error}`);
        }
    },
);

export const addNewClient = createAsyncThunk(
    "srmClients/createClient",
    async (requestBody) => {
        try {
            const response = await axiosClient.post(`api/crm/client/add`, requestBody);
            if (response.status === 200) {
                return response.data["object"];
            }
        } catch (error) {
            console.log(`srmClients/createClient ${error}`);
        }
    },
);

const srmClientsSlice = createSlice({
  name: "srmClients",
  initialState: {
    listOfUsers : [],
    listOfUsersLoading: false,
    clientGotById: null,
  },

  reducers: {   
    setListOfUsers(state, action) {
      state.listOfUsers = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Get clients
    builder.addCase(getClients.pending, (state) => {
        state.listOfUsersLoading = true;
    });

    builder.addCase(getClients.fulfilled, (state, action) => {
        state.listOfUsers = action.payload;
        state.listOfUsersLoading = false;
    });

    builder.addCase(getClients.rejected, (state) => {
        state.listOfUsersLoading = false;
    });

    // Get client by id
    builder.addCase(getClientById.fulfilled, (state, action) => {
      state.listOfUsers = action.payload;
    });
  },

});

export const { setListOfUsers } = srmClientsSlice.actions;

export default srmClientsSlice.reducer;
