import React from "react";
import "./styles.css";
import TitleText from "../create_gym_page/title_text";
import { useState, useRef, useEffect, useCallback } from "react";
import { EditableTextfield } from "../gym_detailes/views/gym_detailes_body/first/gym_detailes_body_first";
import goggins from "../../assets/images/goggins.jpg";
import AppConstants from "../../config/app_constants";
import {
  patchUser,
  updateUserPhoto,
  getUser,
  deleteUserPhoto,
  setEmptyStringToAvatar,
  removeAvatarCopy,
  cancelRemovingPhoto
} from "../../features/register";
import { useDispatch, useSelector } from "react-redux";
import logoPlaceholder from "../../assets/svg/logo_placeholder.svg";
import CustomButton from "../../components/button/button";
import CustomDialog from "../../components/dialog/dialog";
import CustomSnackbar from "../../components/snackbar/custom_snackbar";
import { toast } from "react-toastify";


export default function PersonalInfos() {
  // use state
  const [isEnabled, setIsEnabled] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isLastnameEmpty, setIsLastnameEmpty] = useState(false);
  const [name, setName] = useState(localStorage.getItem(AppConstants.keyUserFirstname) ?? "Шероз");
  const [lastName, setLastname] = useState(localStorage.getItem(AppConstants.keyUserLastname) ?? "Сангинов");
  const [isModalOpened, openModal] = useState(false);
  const [cancelDeleteTimeoutPhoto, setCancelDeleteTimeoutPhoto] = useState();

  // redux
  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.login);

  // use refs
  const fileInputRef = useRef(null);
  const deletePhotoSnackbarRef = useRef(null);

  // getting init data
  /*   useEffect(() => {
      dispatch(getUser())
    }, []) */

  // Обработчик для добавления новой фотографии
  const handleNewPhoto = async (event) => {
    let file = event.target.files[0]; // image/jpeg && image/png
    if (file.type === "image/png") {
      // convert to jpeg
      const originalFileName = file.name.replace(".png", ".jpeg");
      const image = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(file);
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      const jpegURL = canvas.toDataURL("image/jpeg");
      file = await (await fetch(jpegURL)).blob();
      file = new File([file], originalFileName, { type: "image/jpeg" });
    }
    if (isModalOpened) {
      openModal(false);
    }


    if (file.type === "image/jpeg") {
      deletePhotoSnackbarRef.current.hideSnackbars();
      //progressSnackbarRef.current.show("Идет загрузка фото");
      await dispatch(updateUserPhoto({ file }));
      dispatch(getUser());
      //dispatch(getCurrentGym(currentGym.id));
    } else {
      toast("Неподдерживаемый формат файла");
    }
  };

  //  при отмене удалении фото
  const undoDeletePhoto = useCallback(() => {
    dispatch(cancelRemovingPhoto());
    if (cancelDeleteTimeoutPhoto) {
      cancelDeleteTimeoutPhoto();
    }
  }, [dispatch, cancelDeleteTimeoutPhoto]);

  return (
    console.log(`avatar ${registerState.avatar}`),
    <div className="personalInfos">
      <div className="flex flex-row gap-1">
        <div className="text-[16px] font-semibold leading-[16px]">
          Личные данные.
        </div>
        <div className="text-[14px] font-normal leading-[16px]">
          Тут можно изменить Имя или вашу фотографию
        </div>
      </div>
      <div className="flex flex-row gap-[90px]">
        <div className="flex flex-col gap-[10px]">
          <TitleText
            firstText={"Фамилия и Имя"}
            secondText={"Изменить"}
            isEnabled={isEnabled}
            onClick={() => setIsEnabled(true)}
            undoAction={() => {
              if (name !== localStorage.getItem(AppConstants.keyUserFirstname)) {
                setName(localStorage.getItem(AppConstants.keyUserFirstname))
              }
              if (lastName !== localStorage.getItem(AppConstants.keyUserLastname)) {
                setLastname(localStorage.getItem(AppConstants.keyUserLastname))
              }
              if (isNameEmpty) {
                setIsNameEmpty(false)
              }
              if (isLastnameEmpty) {
                setIsLastnameEmpty(false)
              }
              setIsEnabled(false)
            }}
          />
          {isEnabled && (
            <div className="flex flex-row gap-[10px]">
              <EditableTextfield
                hideButton={true}
                //height={"40px"}
                placeholder={"Имя"}
                showTextfield={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
                isNotValidated={isNameEmpty}
              />
              <EditableTextfield
                //height={"40px"}
                placeholder={"Фамилия"}
                showTextfield={true}
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
                isNotValidated={isLastnameEmpty}
                onButtonClicked={async () => {
                  if (name === "") {
                    setIsNameEmpty(true);
                  }
                  if (lastName === "") {
                    setIsLastnameEmpty(true);
                  }
                  if (name !== "" && lastName !== "" &&
                    (name !== localStorage.getItem(AppConstants.keyUserFirstname)
                      || lastName !== localStorage.getItem(AppConstants.keyUserLastname))) {
                    // patch user
                    await dispatch(patchUser({ firstName: name, lastName: lastName }));
                    await dispatch(getUser());
                    setIsEnabled(false);
                  }
                }}
              />
            </div>
          )}
          {!isEnabled &&

            <div className="flex flex-row gap-[4px]">

              <div className="leading-[14px] text-[13px] font-normal font-inter">
                {localStorage.getItem(AppConstants.keyUserFirstname) ?? name}
              </div>
              <div className="leading-[14px] text-[13px] font-normal font-inter">
                {localStorage.getItem(AppConstants.keyUserLastname) ?? lastName}
              </div>

            </div>

          }
        </div>

        {/* PHOTO */}

        <div className="flex flex-col gap-[10px]">
          <TitleText
            firstText={"Ваша фотография"}
            secondText={"Изменить"}
            onClick={() => {
              fileInputRef.current.click();
            }}
          />


          {registerState.avatar &&
            <div className="flex flex-row relative">
              <img
                src={`http://77.222.53.122/image/${registerState.avatar}`}
                alt=""
                className="logo_rounded90 cursor-pointer"
                onClick={() => {
                  // show modal 
                  openModal(true);
                }}
              />

              <img
                src={`http://77.222.53.122/image/${registerState.avatar}`}
                alt=""
                className="logo_rounded50 cursor-pointer absolute bottom-0 left-[100px]"
                onClick={() => {
                  // show modal
                  openModal(true);
                }}
              />

            </div>
          }

          {!registerState.avatar &&

            <>
              <img
                className="w-[90px] h-[90px]"
                src={logoPlaceholder}
                style={{ cursor: "pointer" }}
                onClick={() => fileInputRef.current.click()}
                draggable={false}
                alt=""
              />

              <input
                ref={fileInputRef}
                onChange={handleNewPhoto}
                type="file"
                style={{ display: "none" }}
                accept="image/jpeg, image/png"
              />
            </>

          }

          {isModalOpened && (
            <CustomDialog
              isOpened={isModalOpened}
              closeOnTapOutside={() => {
                openModal(false);
              }}
            >
              <ModalBody
                onPop={() => openModal(false)}
                onDeleteClicked={() => {
                  dispatch(setEmptyStringToAvatar());
                  openModal(false);
                  deletePhotoSnackbarRef.current.showSnackbars();
                  const cancelTimeout = deletePhotoSnackbarRef.current.show(
                    "Вы удалили фото",
                    () => {
                      // function when onTime Ended
                      dispatch(deleteUserPhoto());
                      dispatch(removeAvatarCopy());
                    }
                  );
                  setCancelDeleteTimeoutPhoto(() => cancelTimeout);
                }}
                openFilePicker={() => fileInputRef.current.click()}
                logo={localStorage.getItem(AppConstants.keyPhoto)}
                fileInputRef={fileInputRef}
                uploadNewLogo={handleNewPhoto}
              />
            </CustomDialog>
          )}
          <CustomSnackbar
            ref={deletePhotoSnackbarRef}
            undoAction={undoDeletePhoto}
          />

        </div>
      </div>
    </div>
  );
}

function ModalBody({
  onPop,
  logo,
  onDeleteClicked,
  openFilePicker,
  fileInputRef,
  uploadNewLogo,
}) {
  return (
    <div className="logo_dialog_container">
      <div className="w-full flex justify-center">
        <img
          className="logo"
          src={`http://77.222.53.122/image/${logo}`}
          alt=""
        ></img>
      </div>
      {/* white container */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[5-x] ml-[50px]">
          <div className="font-semibold text-[16px] ">Изменение логотипа</div>
          <div className="font-normal text-[14px]">Что вы хотите сделать?</div>
        </div>
        {/* Row of buttons */}
        <div className="flex flex-row w-full h-[40px] gap-[10px] ">
          <button className="rounded_button" onClick={onPop}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.875 4.875L7.125 8.625L10.875 12.375"
                stroke="var(--icon-color)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="second_button" onClick={onDeleteClicked}>
            <p>Удалить логотип</p>
          </button>
          <CustomButton
            width={"223px"}
            height={"40px"}
            title={"Загрузить другой логотип"}
            fontSize={"14px"}
            onСlick={openFilePicker}
          />
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={uploadNewLogo}
            accept="image/jpeg, image/png"
          />
        </div>
      </div>
    </div>
  );
}
