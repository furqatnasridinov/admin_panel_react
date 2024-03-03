import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppConstants from "../config/app_constants";
import axiosClient from "../config/axios_client";
import { toast } from "react-toastify";

export const getListOfGyms = createAsyncThunk(
  "listOfGyms/getListOfGyms",
  async () => {
    try {
      const response = await axiosClient.get(AppConstants.getGyms);
      return response.data["object"];
    } catch (error) {
      toast(`getListOfGyms ${error}`);
    }
  }
);

export const getCurrentGym = createAsyncThunk(
  "currentGym/getCurrentGym",
  async (gymId) => {
    try {
      const response = await axiosClient.get(`api/admin/gyms/${gymId}`);
      return response.data["object"];
    } catch (error) {
      toast(`getCurrentGym ${error}`);
    }
  }
);

export const addGymPicture = createAsyncThunk(
  "currentGym/addGymPictures",
  async ({ gymId, image }) => {
    try {
      var formData = new FormData();
      formData.append("file", image);
      formData.append("mainPicture", true);
      const response = await axiosClient.post(
        `api/admin/gyms/${gymId}/addGymPicture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      toast(`addGymPictures ${error}`);
    }
  }
);

export const removeGymMainPic = createAsyncThunk(
  "currentGymSlice/editGym",
  async ({ gymId }) => {
    try {
      const dataToSend = {
        id: gymId,
        mainPictureUrl: "",
      };
      const response = await axiosClient.patch("api/admin/gyms/", dataToSend);
    } catch (error) {
      toast(`editGym ${error}`);
      console.log(`${error.massage}`);
    }
  }
);

export const addGymLogo = createAsyncThunk(
  "currentGym/addGymLogo",
  async ({ gymId, image }) => {
    try {
      var formData = new FormData();
      formData.append("file", image);
      formData.append("mainPicture", false);
      const response = await axiosClient.post(
        `api/admin/gyms/${gymId}/addGymPicture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      toast(`addGymLogo ${error}`);
    }
  }
);

export const removeGymLogo = createAsyncThunk(
  "currentGymSlice/editGymLogo",
  async ({ gymId }) => {
    try {
      const dataToSend = {
        id: gymId,
        logoUrl: "",
      };
      const response = await axiosClient.patch("api/admin/gyms/", dataToSend);
    } catch (error) {
      toast(`editGymLogo ${error}`);
    }
  }
);

export const patchGymName = createAsyncThunk(
  "currentGymSlice/editGym",
  async ({ id, name }) => {
    try {
      const dataToSend = {
        id: id,
        name: name,
      };
      const response = await axiosClient.patch("api/admin/gyms/", dataToSend);
    } catch (error) {
      toast(`editGym ${error}`);
      console.log(`${error.massage}`);
    }
  }
);

export const patchGymDescription = createAsyncThunk(
  "currentGymSlice/editGym",
  async ({ id, description }) => {
    try {
      const dataToSend = {
        id: id,
        description: description,
      };
      const response = await axiosClient.patch("api/admin/gyms/", dataToSend);
    } catch (error) {
      toast(`editGym ${error}`);
    }
  }
);

export const patchGymAddress = createAsyncThunk(
  "currentGymSlice/editGym",
  async ({ id, address, latitude, longitude }) => {
    try {
      const dataToSend = {
        id: id,
        address: address,
        latitude: latitude,
        longitude: longitude,
      };
      const response = await axiosClient.patch("api/admin/gyms/", dataToSend);
    } catch (error) {
      toast(`editGym ${error}`);
    }
  }
);

export const patchGymContacts = createAsyncThunk(
  "currentGymSlice/editGym",
  async ({ id, phone, telegram, vk }) => {
    try {
      const dataToSend = {
        id: id,
        phone: phone,
        telegram: telegram,
        vk: vk,
      };
      const response = await axiosClient.patch("api/admin/gyms/", dataToSend);
    } catch (error) {
      toast(`editGym ${error}`);
    }
  }
);

export const dragAndDropGymPictures = createAsyncThunk(
  "currentGymSlice/dragAndDropGymPictures",
  async ({ gymId, url, orderNumber }) => {
    try {
      const formData = new FormData();
      formData.append("url", url);
      formData.append("orderNumber", orderNumber);

      const response = await axiosClient.patch(
        `api/admin/gyms/${gymId}/pictures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      toast(`Ошибка при изменении порядка фотографий ${error}`);
    }
  }
);

export const searchingForAddress = createAsyncThunk(
  "currentGymSlice/searchingForAddress",
  async (address) => {
    console.log("searchingForAddress called");
    try {
      const response = await axiosClient.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${AppConstants.yandexApiKey}&format=json&rspn=1&bbox=31.298086,51.490842~129.732582,62.026915&geocode=${address}`
      );
      if (response.status === 200) {
        const featureMember =
          response.data.response.GeoObjectCollection.featureMember;
        return featureMember;
      }
    } catch (error) {
      toast(`searchingForAddress ${error}`);
    }
  }
);

export const createGym = createAsyncThunk(
  "currentGymSlice/createGym",
  async ({
    name,
    description,
    address,
    latitude,
    longitude,
    //mainPictureUrl,
    //logo,
    phone
  }) => {
    try {
      const dataToSend = {
        name: name,
        description: description,
        address: address,
        latitude: latitude,
        longitude: longitude,
        //mainPictureUrl: mainPictureUrl,
        //logo: logo,
        phone: phone,
      };
      const response = await axiosClient.post("api/admin/gyms/", dataToSend);
      if (response.data["operationResult"] === "OK") {
        localStorage.setItem(AppConstants.keyGymId, response.data["object"].id);
        return response.data;
      }
    } catch (error) {
      toast(`createGym ${error}`);
    }
  }
);

const currentGymSlice = createSlice({
  name: "currentGym",
  initialState: {
    isLoading: false,
    listOfGyms: [],
    isGymsLoading: false,
    isMainPicLoading: false,
    isLogoLoading: false,
    currentGym: null,
    gymPictureCopy: "",
    logoCopy: "",
    isError: false,
    isChangesOccured: false,
    addressesFromSearch: [],
    isAddressessLoading: false,
    isNewGymCreated: false,
  },

  reducers: {
    setCurrentGym: (state, action) => {
      state.currentGym = action.payload;
    },

    setCurrentGymFromFirstItem: (state) => {
      if (state.listOfGyms?.length > 0) {
        state.currentGym = state.listOfGyms[0];
      }
    },

    changeCurrentGymsName: (state, action) => {
      state.currentGym.name = action.payload;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    changeCurrentGymsDescription: (state, action) => {
      state.currentGym.description = action.payload;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    changeCurrentGymsAddress: (state, action) => {
      state.currentGym.address = action.payload;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    changeCurrentGymsPhone: (state, action) => {
      // Удалить все нецифровые символы из строки
      const digitsOnly = action.payload.replace(/\D/g, "");
      // Добавить нужные символы для форматирования номера
      const formattedNumber = `+7${digitsOnly.slice(1, 11)}`;
      state.currentGym.phone = formattedNumber;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    changeCurrentGymsTelegram: (state, action) => {
      state.currentGym.telegram = action.payload;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    changeCurrentGymsVk: (state, action) => {
      state.currentGym.vk = action.payload;
      if (!state.isChangesOccured) {
        state.isChangesOccured = true;
      }
    },

    resetChanges: (state) => {
      state.isChangesOccured = false;
    },

    setEmptyStringToMainPic: (state) => {
      if (state.currentGym.mainPictureUrl !== "") {
        // удаляем саму mainpic и оставлям копию
        state.gymPictureCopy = state.currentGym.mainPictureUrl;
        state.currentGym.mainPictureUrl = "";
      }
    },

    cancelRemoveMainPic: (state) => {
      // при отмене удаления обратно с копии передаем оригиналу
      if (state.gymPictureCopy !== "") {
        state.currentGym.mainPictureUrl = state.gymPictureCopy;
        state.gymPictureCopy = "";
      }
    },

    removePhotoCopy: (state) => {
      if (state.gymPictureCopy !== "") {
        state.gymPictureCopy = "";
      }
    },

    setEmptyStringToLogo: (state) => {
      if (state.currentGym.logoUrl !== "") {
        // удаляем саму logo и оставлям копию
        state.logoCopy = state.currentGym.logoUrl;
        state.currentGym.logoUrl = "";
      }
    },

    cancelRemovingLogo: (state) => {
      // при отмене удаления обратно с копии передаем оригиналу
      if (state.logoCopy !== "") {
        state.currentGym.logoUrl = state.logoCopy;
        state.logoCopy = "";
      }
    },

    removeLogoCopy: (state) => {
      if (state.logoCopy !== "") {
        state.logoCopy = "";
      }
    },
  },

  extraReducers: (builder) => {
    // getCurrentGym
    builder.addCase(getCurrentGym.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentGym.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentGym = action.payload;
    });
    builder.addCase(getCurrentGym.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // getListOfGyms
    builder.addCase(getListOfGyms.pending, (state) => {
      state.isGymsLoading = true;
    });
    builder.addCase(getListOfGyms.fulfilled, (state, action) => {
      state.isGymsLoading = false;
      state.listOfGyms = action.payload;
    });
    builder.addCase(getListOfGyms.rejected, (state) => {
      state.isGymsLoading = false;
      state.isError = true;
    });

    // addGymLogo
    builder.addCase(addGymLogo.pending, (state) => {
      state.isLogoLoading = true;
    });
    builder.addCase(addGymLogo.fulfilled, (state) => {
      state.isLogoLoading = false;
    });
    builder.addCase(addGymLogo.rejected, (state) => {
      state.isLogoLoading = false;
    });

    // addGymPicture
    builder.addCase(addGymPicture.pending, (state) => {
      state.isMainPicLoading = true;
    });
    builder.addCase(addGymPicture.fulfilled, (state) => {
      state.isMainPicLoading = false;
    });
    builder.addCase(addGymPicture.rejected, (state) => {
      state.isMainPicLoading = false;
    });

    // searching addresses
    builder.addCase(searchingForAddress.pending, (state) => {
      state.isAddressessLoading = true;
    });
    builder.addCase(searchingForAddress.fulfilled, (state, action) => {
      state.isAddressessLoading = false;
      state.addressesFromSearch = action.payload;
    });
    builder.addCase(searchingForAddress.rejected, (state) => {
      state.isAddressessLoading = false;
      state.isError = true;
    });

    // createGym
    builder.addCase(createGym.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createGym.fulfilled, (state) => {
      state.isLoading = false;
      state.isNewGymCreated = true;
    });
    builder.addCase(createGym.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {
  setCurrentGym,
  changeCurrentGymsName,
  changeCurrentGymsDescription,
  changeCurrentGymsPhone,
  changeCurrentGymsAddress,
  changeCurrentGymsTelegram,
  changeCurrentGymsVk,
  resetChanges,
  setEmptyStringToMainPic,
  cancelRemoveMainPic,
  removePhotoCopy,
  setEmptyStringToLogo,
  cancelRemovingLogo,
  removeLogoCopy,
  setCurrentGymFromFirstItem,
} = currentGymSlice.actions;
export default currentGymSlice.reducer;
