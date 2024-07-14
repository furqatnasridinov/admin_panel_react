import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../config/axios_client";

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
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
    note : "",
    birth : "",
    gender : "",
    // passport data
    serie : "",
    number : "",
    address : "",
    date : "",
    code : "",
    changesOccuredPersonalData: false,
    changesOccuredPassportData: false,
    missingFieldsPersonalData: [],
    missingFieldsPassportData: [],
  },

  reducers: {   
    setListOfUsers(state, action) {
      state.listOfUsers = action.payload;
    },

      setName(state, action) {
          state.name = action.payload;
          if (state.changesOccuredPersonalData === false) {
              state.changesOccuredPersonalData = true;
          }
      },

    setSurname(state, action) {
        state.surname = action.payload;
        if (state.changesOccuredPersonalData === false) {
            state.changesOccuredPersonalData = true;
        }
    },

    setPatronymic(state, action) {
        state.patronymic = action.payload;
        if (state.changesOccuredPersonalData === false) {
            state.changesOccuredPersonalData = true;
        }
    },

    setEmail(state, action) {
        state.email = action.payload;
    },

    setPhone(state, action) {
        state.phone = action.payload;
    },

    setNote(state, action) {
        state.note = action.payload;
        if (state.changesOccuredPersonalData === false) {
            state.changesOccuredPersonalData = true;
        }
    },

    setBirth(state, action) {
        state.birth = action.payload;
        if (state.changesOccuredPersonalData === false) {
            state.changesOccuredPersonalData = true;
        }
    },

    setGender(state, action) {
        state.gender = action.payload;
        if (state.changesOccuredPersonalData === false) {
            state.changesOccuredPersonalData = true;
        }
    },

    setSerie(state, action) {
        state.serie = action.payload;
        if (state.changesOccuredPassportData === false) {
            state.changesOccuredPassportData = true;
        }
    },

    setNumber(state, action) {
        state.number = action.payload;
        if (state.changesOccuredPassportData === false) {
            state.changesOccuredPassportData = true;
        }
    },

    setAddress(state, action) {
        state.address = action.payload;
        if (state.changesOccuredPassportData === false) {
            state.changesOccuredPassportData = true;
        }
    },

    setDate(state, action) {
        state.date = action.payload;
        if (state.changesOccuredPassportData === false) {
            state.changesOccuredPassportData = true;
        }
    },

    setCode(state, action) {
        state.code = action.payload;
        if (state.changesOccuredPassportData === false) {
            state.changesOccuredPassportData = true;
        }
    },

    checkMissingFieldsPersonalData(state) {
        const fieldsWithMinLength = {
            name: 2,
            surname: 2,
            patronymic: 2,
            gender: 1,
            birth: 10, // Пример для даты в формате YYYY-MM-DD
            phone: 11,
        };
        const missingFields = Object.entries(fieldsWithMinLength).filter(([field, minLength]) => {
            return !state[field] || state[field].length < minLength;
        }).map(([field]) => field);
        state.missingFieldsPersonalData = missingFields;
    },

    checkMissingFieldsPassportData(state) {
        const fieldsWithMinLength = {
            serie: 4,
            number: 6,
            address: 6,
            date: 10,
            code: 6,
        };
        const missingFields = Object.entries(fieldsWithMinLength).filter(([field, minLength]) => {
            return !state[field] || state[field].length < minLength;
        }).map(([field]) => field);
        state.missingFieldsPassportData = missingFields;
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

export const { 
    setListOfUsers,
    setName,
    setSurname,
    setPatronymic,
    setEmail,
    setPhone,
    setNote,
    setBirth,
    setGender,
    checkMissingFieldsPersonalData,
    setAddress,
    setSerie,
    setNumber,
    setDate,
    setCode,
    checkMissingFieldsPassportData,

} = srmClientsSlice.actions;

export default srmClientsSlice.reducer;
