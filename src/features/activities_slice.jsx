import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";

export const getListOfActivities = createAsyncThunk(
  "activities/getListOfActivities",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/gym/${gymId}/types`);
      return response.data["object"];
    } catch (error) {
      alert(`getListOfActivities ${error}`);
    }
  }
);

export const getInfoForType = createAsyncThunk(
  "activities/getInfoForType",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/gym/${gymId}/infoForType`);
      if (response.data["operationResult"] === "OK") {
        return response.data["object"];
      } else {
        alert("operationResult is not OK");
      }
    } catch (error) {
      alert(`getActivities ${error}`);
    }
  }
);

export const getPhotos = createAsyncThunk(
  "activities/getPhotos",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/gym/${gymId}/photo`);
      if (response.data["operationResult"] === "OK") {
        return response.data["object"];
      } else {
        alert("operationResult is not OK");
      }
    } catch (error) {
      alert(`getPhotos ${error}`);
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: {
    isLoading: false,
    listOfActivities: [],
    isError: false,
    selectedActivity: "",
    infoForType: {},
    activityDescribtion: "",
    activityPeculiarities: "", // maybe list in future
    photosOfAllActivities: [],
    photosOfSelectedActivity: [],
  },
  reducers: {
    dragAndDropActivities: (state, action) => {
      state.listOfActivities = action.payload;
    },

    makeFirstItemAsActive: (state) => {
      if (state.listOfActivities.length > 0) {
        state.selectedActivity = state.listOfActivities[0];
      }
    },

    selectAnActivity: (state, action) => {
      state.selectedActivity = action.payload;
    },

    setActivityDescribtion: (state) => {
      state.activityDescribtion = Array.isArray(
        state.infoForType[state.selectedActivity]
      )
        ? state.infoForType[state.selectedActivity]?.[0]?.["typeDescription"]
        : undefined;
    },

    setActivityPeculiarities: (state) => {
      state.activityPeculiarities = Array.isArray(
        state.infoForType[state.selectedActivity]
      )
        ? state.infoForType[state.selectedActivity]?.[0]?.["peculiarities"]
        : undefined;
    },

    setPhotosOfSelectedActivity: (state) => {
      if (state.photosOfAllActivities[state.selectedActivity]) {
        const notModifiedList = [
          ...state.photosOfAllActivities[state.selectedActivity],
        ];
        const modifiedList = notModifiedList.map((element) => {
          return `http://77.222.53.122/image/${element}`;
        });
        state.photosOfSelectedActivity = modifiedList;
      } else {
        state.photosOfSelectedActivity = [];
      }
    },
  },

  extraReducers: (builder) => {
    // for getListOfActivities
    builder.addCase(getListOfActivities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListOfActivities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listOfActivities = action.payload;
    });
    builder.addCase(getListOfActivities.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // for getInfoForType
    builder.addCase(getInfoForType.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInfoForType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.infoForType = action.payload;
    });
    builder.addCase(getInfoForType.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // for getPhotos
    builder.addCase(getPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.photosOfAllActivities = action.payload;
    });
    builder.addCase(getPhotos.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {
  dragAndDropActivities,
  makeFirstItemAsActive,
  selectAnActivity,
  setActivityDescribtion,
  setActivityPeculiarities,
  setPhotosOfSelectedActivity,
} = activitiesSlice.actions;
export default activitiesSlice.reducer;
