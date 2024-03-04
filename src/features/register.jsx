import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios_client";
import { toast } from "react-toastify";
import AppConstants from "../config/app_constants";


export const sendPhoneNumber = createAsyncThunk(
    "login/sendPhoneNumber",
    async (phone) => {
        try {
            const data = {
                login: phone,
            }
            const response = await axiosClient.post(`api/user/loginCode`, data);
        } catch (error) {
            toast(`sendPhoneNumber ${error}`);
        }
    }
);

export const sendForConfirmation = createAsyncThunk(
    "login/sendForConfirmation",
    async ({ phone, otp }) => {
        try {
            const data = {
                login: phone,
                confirmToken: otp,
            }
            const response = await axiosClient.post(`api/user/loginCodeConfirmation`, data);
            if (response.data["operationResult"] === "OK") {
                localStorage.setItem(AppConstants.keyToken, response.data["object"]["jwtToken"]);
                localStorage.setItem(AppConstants.keyUserId, response.data["object"]["user"].id);
                localStorage.setItem(AppConstants.keyPhone, response.data["object"]["user"].login);
                localStorage.setItem(AppConstants.keyUserFirstname, response.data["object"]["user"].firstName);
                localStorage.setItem(AppConstants.keyUserLastname, response.data["object"]["user"].lastName);
                localStorage.setItem(AppConstants.keyPatronymic, response.data["object"]["user"].patronymic);
                localStorage.setItem(AppConstants.keyPhoto, response.data["object"]["user"].pictureUrl);
                return response.data;
            }
        } catch (error) {
            toast(`sendForConfirmation ${error}`);
        }
    }
);

export const patchUser = createAsyncThunk(
    "login/patchUser",
    async ({ firstName, lastName }) => {
        try {
            const dataToSend = {
                firstName: firstName,
                lastName: lastName,
            };
            const response = await axiosClient.patch(`api/user/false`, dataToSend);
            if (response.data["operationResult"] === "OK") {
                localStorage.setItem(AppConstants.keyUserFirstname, response.data["object"]["firstName"]);
                localStorage.setItem(AppConstants.keyUserLastname, response.data["object"]["lastName"]);
                return response.data;
            }
        } catch (error) {
            toast(`patchUser ${error}`);
        }
    }
);

export const deleteUserPhoto = createAsyncThunk(
    "login/deleteUserPhoto",
    async () => {
        try {
            const dataToSend = {
                pictureUrl: "",
            };
            const response = await axiosClient.patch(`api/user/false`, dataToSend);
            if (response.data["operationResult"] === "OK") {
                return response.data;
            }
        } catch (error) {
            toast(`patchUser ${error}`);
        }
    }
);

export const updateUserPhoto = createAsyncThunk(
    "login/updateUserPhoto",
    async ({ file }) => {
        try {
            var formData = new FormData();
            formData.append("file", file);
            formData.append("appPicture", false);
            const response = await axiosClient.post(`api/user/addPicture`,
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.data["operationResult"] === "OK") {
                //localStorage.setItem(AppConstants.keyPhoto, response.data["object"]["pictureUrl"]);
                return response.data;
            }
        } catch (error) {
            toast(`patchUserPhoto ${error}`);
        }
    }
);

export const getUser = createAsyncThunk(
    "login/getUser",
    async () => {
        try {
            const response = await axiosClient.get(`api/user/false`);
            if (response.data["operationResult"] === "OK") {

                // проверяем изменилось ли что-то в профиле
                if (response.data["object"].firstName !== localStorage.getItem(AppConstants.keyUserFirstname)) {
                    localStorage.setItem(AppConstants.keyUserFirstname, response.data["object"]["firstName"]);
                }
                if (response.data["object"].lastName !== localStorage.getItem(AppConstants.keyUserLastname)) {
                    localStorage.setItem(AppConstants.keyUserLastname, response.data["object"]["lastName"]);
                }
                if (response.data["object"].patronymic !== localStorage.getItem(AppConstants.keyPatronymic)) {
                    localStorage.setItem(AppConstants.keyPatronymic, response.data["object"]["patronymic"]);
                }
                if (response.data["object"].pictureUrl !== localStorage.getItem(AppConstants.keyPhoto)) {
                    localStorage.setItem(AppConstants.keyPhoto, response.data["object"]["pictureUrl"]);
                }
                if (response.data["object"].login !== localStorage.getItem(AppConstants.keyPhone)) {
                    localStorage.setItem(AppConstants.keyPhone, response.data["object"]["login"]);
                }

                return response.data["object"];
            }
        } catch (error) {
            toast(`getUser ${error}`);
        }
    }
);

export const sendPhoneStage1 = createAsyncThunk(
    "login/sendPhoneStage1",
    async (login) => {
        try {
            const data = {
                login: login,
            }
            const response = await axiosClient.post(`api/user/changePhone/1`, data);
            if (response.data["operationResult"] === "OK") {
                return response.data;
            }
        } catch (error) {
            toast(`sendPhoneStage1 ${error}`);
        }
    }
);

export const sendPhoneCodeConfirmation1 = createAsyncThunk(
    "login/sendPhoneStage1",
    async ({ login, confirmToken }) => {
        try {
            const data = {
                login: login,
                confirmToken: confirmToken
            }
            const response = await axiosClient.post(`api/user/changePhoneCodeConfirmation/1`, data);
            if (response.data["operationResult"] === "OK") {
                return response.data;
            }
        } catch (error) {
            toast(`sendPhoneStage1 ${error}`);
        }
    }
);

export const sendPhoneStage2 = createAsyncThunk(
    "login/sendPhoneStage2",
    async ({ login, newNumber }) => {
        try {
            const data = {
                login: login,
                newNumber: newNumber
            }
            const response = await axiosClient.post(`api/user/changePhone/2`, data);
            if (response.data["operationResult"] === "OK") {
                return response.data;
            }
        } catch (error) {
            toast(`sendPhoneStage1 ${error}`);
        }
    }
);

export const sendPhoneCodeConfirmation2 = createAsyncThunk(
    "login/sendPhoneStage1",
    async ({ login, confirmToken, newNumber }) => {
        try {
            const data = {
                login: login,
                confirmToken: confirmToken,
                newNumber: newNumber
            }
            const response = await axiosClient.post(`api/user/changePhoneCodeConfirmation/2`, data);
            if (response.data["operationResult"] === "OK") {
                // this request returns only new token
                return response.data["object"].jwtToken;
            }
        } catch (error) {
            toast(`sendPhoneStage1 ${error}`);
        }
    }
);


const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoading: false,
        isSuccessfullyLogined: false,
        avatar: "",
        avatarCopy: "",
        newAddedPhoto: "",
        isNewPhotoAdded: false,
    },
    reducers: {
        setEmptyStringToAvatar: (state) => {
            if (state.avatar !== "") {
                // удаляем саму logo и оставлям копию
                state.avatarCopy = state.avatar;
                state.avatar = "";
            }
        },

        removeAvatarCopy: (state) => {
            if (state.logoCopy !== "") {
                state.logoCopy = "";
            }
        },

        cancelRemovingPhoto: (state) => {
            // при отмене удаления обратно с копии передаем оригиналу
            if (state.avatarCopy !== "") {
                state.avatar = state.avatarCopy;
                state.avatarCopy = "";
            }
        },
    },
    extraReducers: (builder) => {
        // for sendForConfirmation
        builder.addCase(sendForConfirmation.pending, (state) => {
            //
        });
        builder.addCase(sendForConfirmation.fulfilled, (state) => {
            state.isSuccessfullyLogined = true;
        });
        builder.addCase(sendForConfirmation.rejected, (state) => {
            //
        });

        // for updating user photo
        builder.addCase(updateUserPhoto.pending, (state) => {
            //
        });
        builder.addCase(updateUserPhoto.fulfilled, (state, action) => {
            //state.newAddedPhoto = action.payload.object.pictureUrl;
            state.isNewPhotoAdded = true;
        });
        builder.addCase(updateUserPhoto.rejected, (state) => {
            //
        });

        // for delete user photo
        builder.addCase(deleteUserPhoto.pending, (state) => {
            //
        });
        builder.addCase(deleteUserPhoto.fulfilled, (state, action) => {
            //state.newAddedPhoto = action.payload.object.pictureUrl;
            state.isNewPhotoAdded = true;
        });
        builder.addCase(deleteUserPhoto.rejected, (state) => {
            //
        });

        // for getting user
        builder.addCase(getUser.pending, (state) => {
            //
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.avatar = action.payload?.pictureUrl;

        });
        builder.addCase(getUser.rejected, (state) => {
            //
        });

        // for sending phone confirmation 2
        builder.addCase(sendPhoneCodeConfirmation2.pending, (state) => {
            //
        });

        builder.addCase(sendPhoneCodeConfirmation2.fulfilled, (state, action) => {
            localStorage.setItem(AppConstants.keyToken, action.payload);
        });

        builder.addCase(sendPhoneCodeConfirmation2.rejected, (state) => {
            //
        });
    },
})

export const { setEmptyStringToAvatar, removeAvatarCopy, cancelRemovingPhoto } = loginSlice.actions;
export default loginSlice.reducer;