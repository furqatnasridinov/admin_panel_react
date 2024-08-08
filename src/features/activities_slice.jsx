import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";
import { toast } from "react-toastify";

export const getListOfActivities = createAsyncThunk(
  "activities/getListOfActivities",
  async (gymId) => {
    try {
      const response = await axiosClient.get(
        `api/admin/gyms/${gymId}/lessonTypes`
      );
      return response.data["object"];
    } catch (error) {
      toast(`activities/getListOfActivities ${error}`);
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
      toast(`activities/getInfoForType ${error}`);
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
      toast(`activities/getPhotos ${error}`);
    }
  }
);

export const addPhotoToSelectedActivity = createAsyncThunk(
  "activitiesSlice/addPhotoToSelectedActivity",
  async ({ id, files, type, isInherited, subCategoryId }) => {
    var formData = new FormData();
    for (let i = 0; i < files?.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("type", type);
    const endPoint = isInherited ? `api/admin/gyms/${id}/pictures` : 
    `api/admin/gyms/${id}/${subCategoryId}/pictures`;
    try {
      const response = await axiosClient.post(
        endPoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((response) => {
        //
      });
    } catch (error) {
      toast(`ощибка при добавлении фото: ${error}`);
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
        `api/admin/gyms/${id}`,
        dataToSend
      );
    } catch (error) {
      toast(`changeDescriptionOfSelectedActivity ${error["response"]["data"]["operationInfo"]}`);
    }
  }
);

export const patchPeculiaritiesOfSelectedActivity = createAsyncThunk(
  "activitiesSlice/changePeculiaritiesOfSelectedActivity",
  async ({ id, lessonType, peculiarities }) => {
    try {
      if (
        peculiarities === "1" ||
        peculiarities === "1." ||
        peculiarities === "1. "
      ) {
        peculiarities = "";
      }
      const dataToSend = {
        lessonType: lessonType,
        peculiarities: peculiarities,
      };
      const response = await axiosClient.patch(
        `api/admin/gyms/${id}`,
        dataToSend
      );
    } catch (error) {
      toast(`changePeculiaritiesOfSelectedActivity ${error}`);
    }
  }
);

export const deleteActivityPhoto = createAsyncThunk(
  "activitiesSlice/deleteActivityPhoto",
  async ({ id, url, isInherited, subId }) => {
    if (isInherited) {
      try {
        var formData = new FormData();
        formData.append("url", url);
        const response = await axiosClient.delete(
          `api/admin/gyms/${id}/pictures`,
          {
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        toast(`deleteActivityPhoto ${error}`);
      }
    }else{
      try {
        var formData = new FormData();
        formData.append("url", url?.pictureUrl);
        axiosClient.delete(`api/admin/gyms/${id}/subactive/${subId}/pictures`, {
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Фото успешно удалено");
        }
      })
      .catch((error) => {
        toast(`deleteActivityPhoto ${error}`);
      });
      } catch (error) {
        toast(`deleteActivityPhoto ${error}`);
      }
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activitiesSlice/deleteActivity",
  async ({ id, lessonType }) => {
    try {
      const response = await axiosClient.delete(
        `api/admin/gyms/${id}/lessonType/${lessonType}`
      );
      console.log(`addNewActivity response ${response.data}`)
    } catch (error) {
      toast(`deleteActivity ${error}`);
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
        `api/admin/gyms/${id}`,
        dataToSend
      );
      console.log(`addNewActivity response ${response.data}`)
    } catch (error) {
      toast(`addNewActivity ${error}`);
    }
  }
);

// все занятия которые есть в базе
export const getAllAvailableLessonTypes = createAsyncThunk(
  "activities/getAllAvailableLessonTypes",
  async () => {     
    try {
      const response = await axiosClient.get("api/main/lessonTypes");
      if (response.data["operationResult"] === "OK") {
        return response.data["object"];
      }
    } catch (error) {
      toast(`getAllAvailableLessonTypes ${error}`);
    }
  }
);

export const dragAndDropActivities = createAsyncThunk(
  "activities/dragAndDropActivities",
  async ({ gymId, lessonType, orderNumber }) => {
    try {
      const dataToSend = {
        lessonType: lessonType,
        orderNumber: orderNumber,
      };
      const response = await axiosClient.patch(
        `api/admin/gyms/${gymId}`,
        dataToSend
      );
    } catch (error) {
      toast(`dragAndDropActivities error ${error}`);
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: {
    isLoading: false,
    listOfActivities: [],
    jsonLessonTypeAndSubtypes: {}, // { "cardio" : [{jsonSubCategory}, {jsonSubCategory}]}
    subcategoriesOfSelectedActivity: [], // [{jsonSubCategory}, {jsonSubCategory}]
    selectedSubcategory: {}, // {jsonSubCategory}
    selectedSubcategories: [], // [{jsonSubCategory}, {jsonSubCategory}]
    isActivitiesLoding: false,
    isActivityPhotosLoading: false,
    deletedActivities: [],
    deletedSubcategories: [],
    allAvailableLessonTypes: [],
    makeFirstLessonTypeActive: true,
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

    makeFirstItemAsActive: (state) => {
      if (state.listOfActivities?.length > 0) {
        const firstItem = state.listOfActivities[0];
        if (state.makeFirstLessonTypeActive) {
          state.selectedActivity = firstItem;
        }
        const activity = state.selectedActivity || firstItem;
        const currentSubcategories = state.jsonLessonTypeAndSubtypes[activity];
          if (currentSubcategories) {
            const sorted = [...currentSubcategories].sort((a, b) => a.orderNumber - b.orderNumber);
            state.subcategoriesOfSelectedActivity = sorted;
            if (state.makeFirstLessonTypeActive) {
              state.selectedSubcategory = sorted[0];
            }
          }
      } else{
        //state.selectedActivity = null;
      }
    },

    unsetFirstItemAsActive: (state) => {
      state.makeFirstLessonTypeActive = false;
    },

    selectAnActivity: (state, action) => {
      state.selectedActivity = action.payload;
      const currentSubcategories = state.jsonLessonTypeAndSubtypes[action.payload];
      if (currentSubcategories) {
        const sorted = [...currentSubcategories].sort((a, b) => a.orderNumber - b.orderNumber);
        state.subcategoriesOfSelectedActivity = sorted;
        state.selectedSubcategory = sorted[0];
      }
    },

    changeNameOfSelectedSubcategory: (state, action) => {
      const jsonSubCategory = action.payload;
      const subcategoriesOfSelectedActivity = state.subcategoriesOfSelectedActivity;
      const index = subcategoriesOfSelectedActivity.findIndex(
        (subcategory) => subcategory.id === jsonSubCategory.id
      );
      if (index !== -1) {
        subcategoriesOfSelectedActivity[index].name = jsonSubCategory.name;
      }
    },

    addSubcategoryToList(state, action) {
      const alreadyExist = state.selectedSubcategories.find((sub)=> sub.id === action.payload.id);
      if (!alreadyExist) {
        state.selectedSubcategories.push(action.payload);
      }
    },

    removeSelectedSubcategoryFromList: (state, action) => {
      state.selectedSubcategories = state.selectedSubcategories.filter(
        (sub) => sub.id !== action.payload?.id
      );
    },

    selectSubcategory: (state, action) => {
      if (action.payload.id === state.selectedSubcategory?.id) {
        state.selectedSubcategory = null;
      }else{
        state.selectedSubcategory = action.payload;
      }
      
    },

    removePhotoFromSelectedActivityPhotos: (state, action) => {
      state.photosOfSelectedActivity = state.photosOfSelectedActivity.filter(
        (photo) => photo !== action.payload
      );
      state.deletedPhotos.push(action.payload);
    },

    returnDeletedPhoto: (state) => {
      if (state.deletedPhotos?.length > 0) {
        // remove last element from deletedPhotos and add it to photosOfSelectedActivity
        const lastElement = state.deletedPhotos.pop();
        state.photosOfSelectedActivity.push(lastElement);
      }
    },

    removeActivityFromListOfActivities: (state, action) => {
      state.listOfActivities = state.listOfActivities.filter(
        (activity) => activity !== action.payload
      );
      state.deletedActivities.push(action.payload);
    },

    returnDeletedActivity: (state) => {
      if (state.deletedActivities?.length > 0) {
        // remove last element from deletedActivities and add it to listOfActivities
        const lastElement = state.deletedActivities.pop();
        state.listOfActivities.push(lastElement);
      }
    },

    removeSubcategoryFromList: (state, action) => {
      state.subcategoriesOfSelectedActivity = state.subcategoriesOfSelectedActivity.filter(
        (sub) => sub.id !== action.payload.id
      );
      state.deletedSubcategories.push(action.payload);
    },

    removeSelectedSubcategory: (state, action) => {
      state.selectedSubcategories = state.selectedSubcategories
    },

    returnDeletedSubcategory: (state) => {
      if (state.deletedSubcategories?.length > 0) {
        // remove last element from deletedSubcategories and add it to subcategoriesOfSelectedActivity
        const lastElement = state.deletedSubcategories.pop();
        state.subcategoriesOfSelectedActivity.push(lastElement);
      }
    },

    setActivityDescribtion: (state) => {
      try {
        const selectedSubcategory = state.selectedSubcategory;
        if (selectedSubcategory) {
          if (selectedSubcategory?.inheritance) {
            // if inheritance is true, then we need to get the description from the parent (lessonType)
            const isArrayOfObjects = Array.isArray(state.infoForType[state.selectedActivity]);
            const desc = isArrayOfObjects ? state.infoForType[state.selectedActivity]?.[0]?.["typeDescription"] ?? "" : "";
            state.activityDescribtion = desc;
          }else{
            // if inheritance is false, then we need to get the description from the subcategory itself
            state.activityDescribtion = selectedSubcategory?.typeDescription ?? "";
          }          
        }else{
          const isArrayOfObjects = Array.isArray(state.infoForType[state.selectedActivity]);
          const desc = isArrayOfObjects ? state.infoForType[state.selectedActivity]?.[0]?.["typeDescription"] ?? "" : "";
          state.activityDescribtion = desc;
        }
      } catch (error) {
        throw new Error(`setActivityDescribtion ${error}`);
      }
    },

    setActivityPeculiarities: (state) => {
      try {
        const selectedSubcategory = state.selectedSubcategory;
        if (selectedSubcategory) {
          if (selectedSubcategory?.inheritance) {
            // if inheritance is true, then we need to get the peculiarities from the parent (lessonType)
            const isArrayOfObjects = Array.isArray(state.infoForType[state.selectedActivity]);
            const pec = isArrayOfObjects ? state.infoForType[state.selectedActivity]?.[0]?.["peculiarities"] ?? "" : "";
            state.activityPeculiarities = pec;
          }else{
            // if inheritance is false, then we need to get the peculiarities from the subcategory itself
            state.activityPeculiarities = selectedSubcategory?.peculiarities ?? "";
          }          
        }else{
          const isArrayOfObjects = Array.isArray(state.infoForType[state.selectedActivity]);
          const pec = isArrayOfObjects ? state.infoForType[state.selectedActivity]?.[0]?.["peculiarities"] ?? "" : "";
          state.activityPeculiarities = pec;
        }
      } catch (error) {
        throw new Error(`setActivityDescribtion ${error}`);
      }
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
      try {
        const selectedSubcategory = state.selectedSubcategory;
        if (selectedSubcategory) {
          if (selectedSubcategory?.inheritance) {
            if (state.photosOfAllActivities[state.selectedActivity]) {
              const notModifiedList = [...state.photosOfAllActivities[state.selectedActivity]];
              state.photosOfSelectedActivity = notModifiedList;
            } else {
              state.photosOfSelectedActivity = [];
            }
          }else{
            const photosJson = selectedSubcategory?.gymSubActivePictures ?? []; // [{id: 1, orderNumber : 0, pictureUrl: ""}]
            if (photosJson.length > 0) {
              //const photos = photosJson.map((photo) => photo["pictureUrl"]);
              state.photosOfSelectedActivity = photosJson;
            } else {
              state.photosOfSelectedActivity = [];
            }
          }
        }else{
          if (state.photosOfAllActivities[state.selectedActivity]) {
            const notModifiedList = [...state.photosOfAllActivities[state.selectedActivity]];
            state.photosOfSelectedActivity = notModifiedList;
          } else {
            state.photosOfSelectedActivity = [];
          }
        }
      } catch (error) {
        throw new Error(`setPhotosOfSelectedActivity ${error}`);
      }
    },
  },

  extraReducers: (builder) => {
    // for getListOfActivities
    builder.addCase(getListOfActivities.pending, (state) => {
      state.isActivitiesLoding = true;
    });
    builder.addCase(getListOfActivities.fulfilled, (state, action) => {
      state.isActivitiesLoding = false;
      const data = action.payload;
      state.jsonLessonTypeAndSubtypes = data;
      // {"cardio" : [1,2,3], "yoga" : [4,5,6]}
      const keys = Object.keys(data);
      state.listOfActivities = keys;
      if (state.selectedActivity && state.selectedSubcategory) {
        // if selectedActivity and selectedSubcategory are not null, then we need to update them
        const activity = state.selectedActivity;
        const subcategories = data[activity];
        const currentSubcategory = subcategories.find((sub) => sub.id === state.selectedSubcategory.id);
        if (currentSubcategory) {
          state.selectedSubcategory = currentSubcategory;
        }
      }
    });
    builder.addCase(getListOfActivities.rejected, (state) => {
      state.isActivitiesLoding = false;
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

    // for adding photo to selected activity
    builder.addCase(addPhotoToSelectedActivity.pending, (state) => {
      state.isActivityPhotosLoading = true;
    });
    builder.addCase(addPhotoToSelectedActivity.fulfilled, (state) => {
      state.isActivityPhotosLoading = false;
    });
    builder.addCase(addPhotoToSelectedActivity.rejected, (state) => {
      state.isActivityPhotosLoading = false;
      state.isError = true;
    });
  },
});

export const {
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
  returnDeletedPhoto,
  removeActivityFromListOfActivities,
  returnDeletedActivity,
  selectSubcategory,
  changeNameOfSelectedSubcategory,
  unsetFirstItemAsActive,
  addSubcategoryToList,
  removeSubcategoryFromList,
  removeSelectedSubcategoryFromList,
  returnDeletedSubcategory,
} = activitiesSlice.actions;
export default activitiesSlice.reducer;
