import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";

export const getListOfActivities = createAsyncThunk(
  "activities/getListOfActivities",
  async (gymId) => {
    try {
      const response = await axiosClient.get(
        `api/director/gyms/${gymId}/lessonTypes`
      );
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
      }
    } catch (error) {
      alert(`getPhotos ${error}`);
    }
  }
);

export const addPhotoToSelectedActivity = createAsyncThunk(
  "activitiesSlice/addPhotoToSelectedActivity",
  async ({ id, files, type }) => {
    var formData = new FormData();
    formData.append("files", files);
    formData.append("type", type);
    try {
      const response = await axiosClient.post(
        `api/director/gyms/${id}/pictures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      alert(`addPhotoToSelectedActivity ${error}`);
    }
  }
);

export const patchDescriptionOfSelectedActivity = createAsyncThunk(
  "activitiesSlice/changeDescriptionOfSelectedActivity",
  async ({ id, lessonType, typeDescription }) => {
    try {
      const dataToSend = {
        lessonType: lessonType,
        typeDescription: typeDescription,
      };
      const response = await axiosClient.patch(
        `api/director/gyms/${id}`,
        dataToSend
      );
    } catch (error) {
      alert(`changeDescriptionOfSelectedActivity ${error}`);
    }
  }
);

export const patchPeculiaritiesOfSelectedActivity = createAsyncThunk(
  "activitiesSlice/changePeculiaritiesOfSelectedActivity",
  async ({ id, lessonType, peculiarities }) => {
    try {
      const dataToSend = {
        lessonType: lessonType,
        peculiarities: peculiarities,
      };
      const response = await axiosClient.patch(
        `api/director/gyms/${id}`,
        dataToSend
      );
    } catch (error) {
      alert(`changeDescriptionOfSelectedActivity ${error}`);
    }
  }
);

export const deleteActivityPhoto = createAsyncThunk(
  "activitiesSlice/deleteActivityPhoto",
  async ({ id, url }) => {
    try {
      var formData = new FormData();
      formData.append("url", url);
      const response = await axiosClient.delete(
        `api/director/gyms/${id}/pictures`,
        {
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      alert(`changeDescriptionOfSelectedActivity ${error}`);
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activitiesSlice/deleteActivity",
  async ({ id, lessonType }) => {
    try {
      const response = await axiosClient.delete(
        `api/director/gyms/${id}/lessonType/${lessonType}`
      );
    } catch (error) {
      alert(`deleteActivity ${error}`);
    }
  }
);

export const addNewActivity = createAsyncThunk(
  "activitiesSlice/addNewActivity",
  async ({ id, lessonType }) => {
    try {
      const dataToSend = {
        lessonType: lessonType,
      };
      const response = await axiosClient.patch(
        `api/director/gyms/${id}`,
        dataToSend
      );
    } catch (error) {
      alert(`changeDescriptionOfSelectedActivity ${error}`);
    }
  }
);

export const getAllAvailableLessonTypes = createAsyncThunk(
  "activities/getAllAvailableLessonTypes",
  async () => {
    try {
      const response = await axiosClient.get("api/main/lessonTypes");
      if (response.data["operationResult"] === "OK") {
        return response.data["object"];
      }
    } catch (error) {
      alert(`getAllAvailableLessonTypes ${error}`);
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: {
    isLoading: false,
    listOfActivities: [],
    allAvailableLessonTypes: [],
    isError: false,
    selectedActivity: "",
    infoForType: {},
    activityDescribtion: "",
    activityPeculiarities: "", // maybe list in future
    photosOfAllActivities: [],
    photosOfSelectedActivity: [],
    deletedPhotos: [],
    isChangesOcurred: false,
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

    removeSelectedActivity: (state) => {
      state.selectedActivity = "";
    },

    removePhotoFromSelectedActivityPhotos: (state, action) => {
      state.photosOfSelectedActivity = state.photosOfSelectedActivity.filter(
        (photo) => photo !== action.payload
      );
      state.deletedPhotos.push(action.payload);
    },

    returnDeletedPhoto: (state) => {
      if (state.deletedPhotos.length > 0) {
        // remove last element from deletedPhotos and add it to photosOfSelectedActivity
        const lastElement = state.deletedPhotos.pop();
        state.photosOfSelectedActivity.push(lastElement);
      }
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

    changeActivityDescribtion: (state, action) => {
      state.activityDescribtion = action.payload;
      if (!state.isChangesOcurred) {
        state.isChangesOcurred = true;
      }
    },

    changeActivityPeculiarities: (state, action) => {
      state.activityPeculiarities = action.payload;
      if (!state.isChangesOcurred) {
        state.isChangesOcurred = true;
      }
    },

    resetChanges: (state) => {
      if (state.isChangesOcurred) {
        state.isChangesOcurred = false;
      }
    },

    setPhotosOfSelectedActivity: (state) => {
      if (state.photosOfAllActivities[state.selectedActivity]) {
        const notModifiedList = [
          ...state.photosOfAllActivities[state.selectedActivity],
        ];
        /* const modifiedList = notModifiedList.map((element) => {
          return `http://77.222.53.122/image/${element}`;
        }); */
        state.photosOfSelectedActivity = notModifiedList;
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

    // for getting all available lessontypes
    builder.addCase(getAllAvailableLessonTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAvailableLessonTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allAvailableLessonTypes = action.payload;
    });
    builder.addCase(getAllAvailableLessonTypes.rejected, (state) => {
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
  changeActivityDescribtion,
  changeActivityPeculiarities,
  resetChanges,
  removeSelectedActivity,
  removePhotoFromSelectedActivityPhotos,
  returnDeletedPhoto
} = activitiesSlice.actions;
export default activitiesSlice.reducer;
