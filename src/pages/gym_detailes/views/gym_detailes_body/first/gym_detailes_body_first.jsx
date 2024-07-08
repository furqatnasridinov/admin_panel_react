import React from "react";
import "./gym_details_body_first.css";
import TextAndTextButton from "../../../components/text_and_textbutton";
import mainPicPlaceHolder from "../../../../../assets/svg/main_photo_placeholder.svg";
import logoPlaceholder from "../../../../../assets/svg/logo_placeholder.svg";
import phoneSvg from "../../../../../assets/svg/phone.svg";
import tgSvg from "../../../../../assets/svg/tg.svg";
import vkSvg from "../../../../../assets/svg/vk.svg";
import arrowDownSvg from "../../../../../assets/svg/arrow_down.svg";
import redBasketSvg from "../../../../../assets/svg/red_basket.svg";
import plusSvg from "../../../../../assets/svg/plus.svg";
import CustomDialog from "../../../../../components/dialog/dialog";
import { useState, useRef, useEffect, useCallback } from "react";
import CustomButton from "../../../../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackbar from "../../../../../components/snackbar/custom_snackbar";
import ProgressSnackbar from "../../../../../components/snackbar/progress_snackbar";
import { AddressSearching } from "./address_searching";
import { EditableTextfield } from "../../../../../components/editable_textfield/EditableTextfield";

import {
  addGymPicture,
  changeCurrentGymsName,
  changeCurrentGymsDescription,
  changeCurrentGymsAddress,
  changeCurrentGymsPhone,
  changeCurrentGymsTelegram,
  changeCurrentGymsVk,
  patchGymName,
  patchGymDescription,
  searchingForAddress,
  patchGymContacts,
  getCurrentGym,
  resetChanges,
  removeGymMainPic,
  addGymLogo,
  setEmptyStringToMainPic,
  cancelRemoveMainPic,
  removePhotoCopy,
  setEmptyStringToLogo,
  cancelRemovingLogo,
  removeLogoCopy,
  removeGymLogo,
  patchGymAddress,
} from "../../../../../features/current_gym_slice";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import AppConstants from "../../../../../config/app_constants";

export default function GymDetailesBodyFirstContainer({ currentGym }) {
  const dispatch = useDispatch();
  const currentGymState = useSelector((state) => state.currentGym);
  const canEdit = localStorage.getItem(AppConstants.keyRoleId) === "1" || localStorage.getItem(AppConstants.keyRoleId) === "3";

  // use states
  const [isNameEditingEnabled, setNameEditing] = useState(false);
  const [isDescribtionEdittingEnabled, setDescribtionEditing] = useState(false);
  const [isAddressEdittingEnabled, setAddressEditting] = useState(false);
  const [isContactsEdittingEnabled, setContactsEditting] = useState(false);
  const [isModalPhotoOpened, openModalPhoto] = useState(false);
  const [isModalLogoOpened, openModalLogo] = useState(false);
  const [cancelDeleteTimeoutPhoto, setCancelDeleteTimeoutPhoto] = useState();
  const [cancelDeleteTimeoutLogo, setCancelDeleteTimeoutLogo] = useState();
  const [addingTelegram, setAddingTelegram] = useState(false);
  const [addingVk, setAddingVk] = useState(false);
  const [hideAdding, setHideAdding] = useState(false);
  const [isDropDownOpened, openDropDown] = useState(false);
  const [nameIsNotValidated, setNameIsNotValidated] = useState(false);
  const [describtionIsNotValidated, setDescribtionIsNotValidated] = useState(false);

  // use refs
  const deleteMainPicSnackbarRef = useRef(null);
  const deleteLogoSnackbarRef = useRef(null);
  const progressSnackbarRef = useRef(null);
  const progressSnackForLogo = useRef(null);
  const fileInputMainPhotoRef = useRef();
  const fileInputLogoRef = useRef();

  // functions
  const openFilePickerForMainPhoto = () => {
    try {
      fileInputMainPhotoRef.current.click();
    } catch (error) {
      toast(`openFilePickerForMainPhoto ${error}`);
    }
  };

  const openFilePickerForLogo = () => {
    try {
      fileInputLogoRef.current.click();
    } catch (error) {
      toast(`openFilePickerForLogo ${error}`);
    }
  };

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
    if (isModalPhotoOpened) {
      openModalPhoto(false);
    }

    const { gymId, image } = { gymId: currentGym.id, image: file };
    if (image.type === "image/jpeg") {
      deleteMainPicSnackbarRef.current.hideSnackbars();
      progressSnackbarRef.current.show("Идет загрузка фото");
      await dispatch(addGymPicture({ gymId, image }));
      dispatch(getCurrentGym(currentGym.id));
    } else {
      toast("Неподдерживаемый формат файла");
    }
  };

  // Обработчик для добавления нового логотипа
  const handleNewLogo = async (event) => {
    let file = event.target.files[0];
    if (file) {
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
    }

    openModalLogo(false);

    const { gymId, image } = { gymId: currentGym.id, image: file };
    if (image.type === "image/jpeg") {
      deleteLogoSnackbarRef.current.hideSnackbars();
      progressSnackForLogo.current.show("Идет загрузка логотипа");
      await dispatch(addGymLogo({ gymId, image }));
      dispatch(getCurrentGym(currentGym.id));
    } else {
      toast("Неподдерживаемый формат файла");
    }
  };

  //  при отмене удалении фото
  const undoDeletePhoto = useCallback(() => {
    dispatch(cancelRemoveMainPic());
    if (cancelDeleteTimeoutPhoto) {
      cancelDeleteTimeoutPhoto();
    }
  }, [dispatch, cancelDeleteTimeoutPhoto]);

  //  при отмене удалении фото
  const undoDeleteLogo = useCallback(() => {
    dispatch(cancelRemovingLogo());
    if (cancelDeleteTimeoutLogo) {
      cancelDeleteTimeoutLogo();
    }
  }, [dispatch, cancelDeleteTimeoutLogo]);

  useEffect(() => {
    if (
      (addingTelegram && addingVk) ||
      (addingTelegram && currentGym.vk !== null && currentGym.vk !== "") ||
      (addingVk && currentGym.telegram !== null && currentGym.telegram !== "")
    ) {
      setHideAdding(true);
    }
  }, [addingTelegram, addingVk]);

  useEffect(() => {
    if (currentGym.address.length > 2) {
      dispatch(searchingForAddress(currentGym.address));
    }
  }, [currentGym.address]);

  return (
    <div className=" bg-white h-fit p-[32px] flex flex-col rounded-[16px] gap-[32px] mb-[10px]">
      {/* Photos and Logos */}

      <div className="photos_row">
        {/* Main picture  */}
        <ProgressSnackbar
          isLoading={currentGymState.isMainPicLoading}
          ref={progressSnackbarRef} />
        <ProgressSnackbar
          isLoading={currentGymState.isLogoLoading}
          ref={progressSnackForLogo} />
        <div className="gym_main_photo_column">
          <TextAndTextButton
            text1={"Фоновая фотография"}
            text2={currentGym.mainPictureUrl === "" || currentGym.mainPictureUrl === null ? "Добавить фото" : "Изменить фотографию"}
            onclick={() => (currentGym.mainPictureUrl !== "" && currentGym.mainPictureUrl !== null) ? openModalPhoto(true) : openFilePickerForMainPhoto()}
            showText2 = {canEdit} />
          <img
            className="main_pic"
            src={(currentGym.mainPictureUrl === "" || currentGym.mainPictureUrl === null) ? mainPicPlaceHolder : `${AppConstants.baseUrl}image/${currentGym.mainPictureUrl}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (canEdit) {
                if (currentGym.mainPictureUrl === "" || currentGym.mainPictureUrl === null) {
                  openFilePickerForMainPhoto();
                } else {openModalPhoto(true)}
              }
            }}
            draggable={false}
            alt="mainPic" />
          <input
            ref={fileInputMainPhotoRef}
            onChange={handleNewPhoto}
            type="file"
            style={{ display: "none" }} //hiding input
            accept="image/jpeg, image/png" />
          {/* <SizeOfPicture size={"375x210px"} /> */}

          {isModalPhotoOpened && (
            <CustomDialog
              isOpened={isModalPhotoOpened}
              closeOnTapOutside={() => { openModalPhoto(false) }}>
              <ChangeMainPhotoModal
                onPop={() => openModalPhoto(false)}
                onDeleteClicked={() => {
                  dispatch(setEmptyStringToMainPic());
                  openModalPhoto(false);
                  deleteMainPicSnackbarRef.current.showSnackbars();
                  const cancelTimeout = deleteMainPicSnackbarRef.current.show(
                    "Вы удалили фото",
                    () => {
                      // function when onTime Ended
                      const { gymId } = { gymId: currentGym.id };
                      dispatch(removeGymMainPic({ gymId }));
                      dispatch(removePhotoCopy());
                    });
                  setCancelDeleteTimeoutPhoto(() => cancelTimeout)}}
                openFilePicker={openFilePickerForMainPhoto}
                photo={currentGym.mainPictureUrl === "" || currentGym.mainPictureUrl === null ? "" : currentGym.mainPictureUrl}
                fileInputRef={fileInputMainPhotoRef}
                uploadNewPhoto={handleNewPhoto} />
            </CustomDialog>)}
        </div>
        <CustomSnackbar
          ref={deleteMainPicSnackbarRef}
          undoAction={undoDeletePhoto} />
        {/*  Logos Column */}
        <div className="flex flex-col gap-[10px] mt-[30px] ml-[43px] justify-end ">
          <TextAndTextButton
            text1={"Логотип"}
            text2={(currentGym.logoUrl === "" || currentGym.logoUrl === null) ? "Добавить логотип" : "Изменить"}
            onclick={() => (currentGym.logoUrl !== "" && currentGym.logoUrl !== null) ? openModalLogo(true) : openFilePickerForLogo()} 
            showText2 = {canEdit} />

          {/* Big logo */}
          <img
            className="logo_rounded180"
            src={(currentGym.logoUrl === "" || currentGym.logoUrl === null) ? logoPlaceholder : `${AppConstants.baseUrl}image/${currentGym.logoUrl}`}
            style={{ cursor: "pointer" }}
            onClick={()=>{
              if (canEdit) {
                if (currentGym.logoUrl === "" || currentGym.logoUrl === null) {
                  openFilePickerForLogo();
                } else {openModalLogo(true)}
              }
            }}
            draggable={false}
            alt="logo180"/>
          <input
            ref={fileInputLogoRef}
            onChange={handleNewLogo}
            type="file"
            style={{ display: "none" }}
            accept="image/jpeg, image/png"/>
          {/* <SizeOfPicture size={"180x180px"} /> */}
        </div>

        {currentGym.logoUrl !== "" &&
          currentGym.logoUrl !== null &&
          (() => {
            const lastDotIndex = currentGym.logoUrl.lastIndexOf(".");
            const nameWithoutExtension = currentGym.logoUrl.substring(0,lastDotIndex);
            const extension = currentGym.logoUrl.substring(lastDotIndex + 1);
            const imageToCompressedFormatM = `${nameWithoutExtension}_M.${extension}`;
            const imageToCompressedFormatS = `${nameWithoutExtension}_S.${extension}`;
            return <>
            {/* Medium logo */}
            <div className="flex flex-col gap-[10px] ml-[10px] justify-end">
              <img
                onClick={() => {
                  if (canEdit) {
                    openModalLogo(true)
                  }
                }}
                className="logo_rounded90"
                style={{ cursor: "pointer" }}
                src={`${AppConstants.baseUrl}image/${imageToCompressedFormatM}`}
                alt=""/>
              {/* <SizeOfPicture size="90x90px" /> */}
            </div>
            <div className="flex flex-col gap-[10px] ml-[10px] justify-end">
              <img
                onClick={() => {
                  if (canEdit) {
                    openModalLogo(true)
                  }
                }}
                className="logo_rounded50"
                style={{ cursor: "pointer" }}
                src={`${AppConstants.baseUrl}image/${imageToCompressedFormatS}`}
                alt=""/>
              {/*  <SizeOfPicture size="50x50px" /> */}
            </div>
            </>
          })()}
        {isModalLogoOpened && (
          <CustomDialog
            isOpened={isModalLogoOpened}
            closeOnTapOutside={() => {openModalLogo(false)}}>
            <ChangeLogoModal
              onPop={() => openModalLogo(false)}
              onDeleteClicked={() => {
                dispatch(setEmptyStringToLogo());
                openModalLogo(false);
                deleteLogoSnackbarRef.current.showSnackbars();
                const cancelTimeout = deleteLogoSnackbarRef.current.show(
                  "Вы удалили логотип",
                  () => {
                    // function when onTime Ended
                    const { gymId } = { gymId: currentGym.id };
                    dispatch(removeGymLogo({ gymId }));
                    dispatch(removeLogoCopy());
                  });
                setCancelDeleteTimeoutLogo(() => cancelTimeout);
              }}
              openFilePicker={openFilePickerForLogo}
              logo={currentGym.logoUrl}
              fileInputRef={fileInputLogoRef}
              uploadNewLogo={handleNewLogo}/>
          </CustomDialog>
        )}
        <CustomSnackbar
          ref={deleteLogoSnackbarRef}
          undoAction={undoDeleteLogo}/>
      </div>

      {/* ContactInfos */}

      <div className="flex flex-col gap-[32px] ">
        <div className="flex flex-row  gap-[32px]">
          {/* Name  */}
          <div className="name ">
                <TextAndTextButton
                  text1={"Название заведения"}
                  text2={isNameEditingEnabled ? "Отменить" : "Изменить"}
                  isRedText={isNameEditingEnabled}
                  showText2 = {canEdit} 
                  onclick={() => {
                    if (isNameEditingEnabled) {
                      if (currentGymState.isChangesOccured) {
                        dispatch(getCurrentGym(currentGym.id));
                      }
                      setNameEditing(false)
                    }else{
                      setNameEditing(true)}}}/>
                <EditableTextfield
                  textFieldsMinWidth={"250px"}
                  value={currentGym.name}
                  maxLength={70}
                  isNotValidated={nameIsNotValidated}
                  isActive={isNameEditingEnabled}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    if (inputValue.length > 70) {
                      inputValue = inputValue.substring(0, 70);
                    }
                    dispatch(changeCurrentGymsName(inputValue));
                  }}
                  onButtonClicked={async () => {
                    if (currentGym.name === "") {
                      setNameIsNotValidated(true);
                    } else {
                      const { id, name } = {
                        id: currentGym.id,
                        name: currentGym.name,
                      };
                      await dispatch(patchGymName({ id, name }));
                      dispatch(getCurrentGym(currentGym.id));
                      setNameEditing(false);
                      dispatch(resetChanges());
                      setNameIsNotValidated(false);
                    }}}
                  lineheight={"16px"}
                />
          </div>
          {/* Describtion  */}
          <div className="describtion">
                <TextAndTextButton
                  text1={"Описание"}
                  text2={isDescribtionEdittingEnabled ? "Отменить" : "Изменить"}
                  isRedText={isDescribtionEdittingEnabled}
                  showText2 = {canEdit} 
                  onclick={() => {
                    if (isDescribtionEdittingEnabled) {
                      if (currentGymState.isChangesOccured) {
                        dispatch(getCurrentGym(currentGym.id));
                      }
                      setDescribtionEditing(false)
                    }else{
                      setDescribtionEditing(true)
                    }
                    }}/>
                <EditableTextfield
                  maxLength={250}
                  value={currentGym.description}
                  isNotValidated={describtionIsNotValidated}
                  isActive={isDescribtionEdittingEnabled}
                  textFieldsMinWidth={"300px"}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    if (inputValue.length > 250) {
                      inputValue = inputValue.substring(0, 250);
                    }
                    dispatch(changeCurrentGymsDescription(inputValue));
                  }}
                  onButtonClicked={async () => {
                    if (currentGym.description === "") {
                      setDescribtionIsNotValidated(true);
                    } else {
                      const { id, description } = {
                        id: currentGym.id,
                        description: currentGym.description,
                      };
                      await dispatch(patchGymDescription({ id, description }));
                      dispatch(getCurrentGym(currentGym.id));
                      setDescribtionEditing(false);
                      dispatch(resetChanges());
                      setDescribtionIsNotValidated(false);
                    }}}
                  lineheight={"16px"}
                />            
          </div>
          {/* Address  */}
          <div className="address">
            {!isAddressEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Адрес"}
                  text2={"Изменить"}
                  isRedText={isAddressEdittingEnabled}
                  onclick={() => {setAddressEditting(true)}} 
                  showText2 = {canEdit} />
                <div className="leading-[16px] text-[13px] font-normal font-inter">
                  {currentGym.address}
                </div>
              </>
            )}
            {isAddressEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Адрес"}
                  text2={"Отменить"}
                  isRedText={isAddressEdittingEnabled}
                  showText2 = {canEdit} 
                  onclick={() => {
                    if (currentGymState.isChangesOccured) {
                      dispatch(getCurrentGym(currentGym.id));
                    }
                    setAddressEditting(false)}}/>

                {/* address searching dropdown */}
                <AddressSearching
                  value={currentGym.address}
                  notFound={currentGymState.addressesFromSearch && currentGymState.addressesFromSearch.length === 0 && currentGym.address.length > 1}
                  onChange={(e) => {dispatch(changeCurrentGymsAddress(e.target.value))}}
                  showDropDown={currentGym.address.length > 1}
                  map={
                    currentGymState.addressesFromSearch &&
                    currentGymState.addressesFromSearch.length > 0 &&
                    currentGymState.addressesFromSearch
                      .filter(geocode => geocode.GeoObject.metaDataProperty.GeocoderMetaData.Address.country_code === 'RU')
                      .map((geocode) => {
                        return (
                          <div
                            className="gym_names"
                            key={geocode.GeoObject.Point}
                            onClick={async () => {
                              const position = geocode.GeoObject.Point.pos.split(" ");
                              const lat = position[1];
                              const lon = position[0];
                              const { id, address, latitude, longitude } = {
                                id: currentGym.id,
                                address:geocode.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
                                latitude: lat,
                                longitude: lon,
                              };
                              await dispatch(patchGymAddress({id,address,latitude,longitude}));
                              dispatch(getCurrentGym(currentGym.id));
                              setAddressEditting(false);
                              dispatch(resetChanges())}}>
                            {geocode.GeoObject.metaDataProperty.GeocoderMetaData.text}
                          </div>
                        )})}/>
              </>
            )}
          </div>
        </div>

        {/* Contacts */}
        <div className="flex flex-col gap-[5px] ">
          {!isContactsEdittingEnabled && (
            <>
              <TextAndTextButton
                text1={"Контакты"}
                text2={"Изменить"}
                onclick={() => setContactsEditting(true)}
                showText2 = {canEdit} />
              <div className="flex flex-row gap-[24px]">
                {/* Phone */}
                <div className="icon_and_tag">
                  <img src={phoneSvg} alt="" />
                  <ReactInputMask
                    readOnly={true}
                    value={currentGym.phone}
                    mask="+7 (999) 999 99-99"
                    placeholder="+7 (900) 855 45-58"
                    style={{
                      height: "30px",
                      width: "fit-content",
                      outline: "none",
                      fontSize: "13px",
                      fontWeight: "400",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                {/* Tg */}
                {currentGym.telegram !== null && currentGym.telegram !== "" && (
                  <div className="icon_and_tag mr-[20px] ">
                    <img src={tgSvg} alt="" />
                    <div className=" text-[13px] font-normal font-inter">
                      {currentGym.telegram}
                    </div>
                  </div>
                )}
                {/* Vk */}
                {currentGym.vk !== null && currentGym.vk !== "" && (
                  <div className="icon_and_tag">
                    <img src={vkSvg} alt="" />
                    <div className=" text-[13px] font-normal font-inter">
                      {currentGym.vk}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {isContactsEdittingEnabled && (
            <>
              <TextAndTextButtonContacts
                text1={"Контакты"}
                text2={"Сохранить"}
                isDisabled={currentGym.phone?.length !== 12}
                onclick={async () => {
                  if (currentGym.phone?.length == 12) {
                    if (addingTelegram){setAddingTelegram(false)}
                    if (addingVk){setAddingVk(false)}
                    if (hideAdding){setHideAdding(false)}
                    if (isDropDownOpened){openDropDown(false)}
                    const { id, phone, telegram, vk } = {
                      id: currentGym.id,
                      phone: currentGym.phone,
                      telegram: currentGym.telegram,
                      vk: currentGym.vk,
                    };
                    if (currentGymState.isChangesOccured) {
                      await dispatch(patchGymContacts({ id, phone, telegram, vk }));
                      dispatch(getCurrentGym(currentGym.id));
                    }
                    setContactsEditting(false);
                    dispatch(resetChanges());
                  }
                }}
              />
              <div className="flex flex-col gap-[10px]">
                {/* phone */}
                {currentGym.phone !== null && currentGym.phone !== "" && (
                  <EditableContacts
                    icon={phoneSvg}
                    text={"Телефон"}
                    value={currentGym.phone}
                    isPhone={true}
                    onChange={(e) => {dispatch(changeCurrentGymsPhone(e.target.value))}}
                    onDeleteClicked={() =>{dispatch(changeCurrentGymsPhone(""))}}
                    showDeleting={true}
                    isPhoneEmpty={currentGym.phone.length !== 12}
                  />
                )}

                {/* telegram */}
                {currentGym.telegram !== null &&
                  currentGym.telegram !== "" &&
                  !addingTelegram && (
                    <EditableContacts
                      icon={tgSvg}
                      text={"Telegram"}
                      value={currentGym.telegram}
                      isTg={true}
                      onChange={(e) => {dispatch(changeCurrentGymsTelegram(e.target.value))}}
                      onDeleteClicked={() => {dispatch(changeCurrentGymsTelegram(""))}}
                      showDeleting={true}
                    />
                  )}

                {/* vk */}
                {currentGym.vk !== null &&
                  currentGym.vk !== "" &&
                  !addingVk && (
                    <EditableContacts
                      icon={vkSvg}
                      text={"VKontakte"}
                      value={currentGym.vk === null || currentGym.vk === "" ? "" : `${currentGym.vk}`}
                      isVk={true}
                      onChange={(e) => {dispatch(changeCurrentGymsVk(e.target.value))}}
                      onDeleteClicked={() => {dispatch(changeCurrentGymsVk(""))}}
                      showDeleting={true}
                    />
                  )}

                {/* when select adding */}
                {addingTelegram && (
                  <EditableContacts
                    icon={tgSvg}
                    text={"Telegram"}
                    value={currentGym.telegram}
                    isTg={true}
                    onChange={(e) => {dispatch(changeCurrentGymsTelegram(e.target.value))}}
                  />
                )}

                {addingVk && (
                  <EditableContacts
                    icon={vkSvg}
                    text={"VKontakte"}
                    value={currentGym.vk === null || currentGym.vk === "" ? "" : `${currentGym.vk}`}
                    isVk={true}
                    onChange={(e) => {dispatch(changeCurrentGymsVk(e.target.value))}}
                  />
                )}

                {(currentGym.phone == null ||
                  currentGym.phone === "" ||
                  currentGym.telegram == null ||
                  currentGym.telegram === "" ||
                  currentGym.vk == null ||
                  currentGym.vk === "") &&
                  !hideAdding && (
                    <div className="flex flex-row gap-[10px]">
                      <img src={plusSvg} alt="" />
                      <DropDownForAddingContacts
                        isDropDownOpened={isDropDownOpened}
                        openCloseDropDown={() => {openDropDown(!isDropDownOpened)}}
                        text={"Добавить контакт"}
                        phone={(currentGym.phone === null || currentGym.phone === "") && "Телефон"}
                        tg={(currentGym.telegram === null || currentGym.telegram === "") && !addingTelegram &&"Telegram"}
                        vk={(currentGym.vk === null || currentGym.vk === "") && !addingVk && "VKontakte"}
                        ontapTg={() => {
                          setAddingTelegram(true);
                          openDropDown(false);
                        }}
                        ontapVk={() => {
                          setAddingVk(true);
                          openDropDown(false);
                        }}
                        ontapPhone={() => {}}
                      />
                    </div>
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}



export function EditableContacts({
  text,
  value,
  icon,
  onChange,
  isPhone,
  isTg,
  isVk,
  onDeleteClicked,
  showDeleting,
  isPhoneEmpty,
}) {
  return (
    <div className="flex flex-row gap-[10px] w-fit ">
      <img src={icon} alt="" />
      {/* first textfield readOnly */}

      <input
        type="text"
        value={text}
        readOnly={true}
        style={{
          width: "100px",
          height: "30px",
          textAlign: "center",
          //padding: "10px 6px 10px 16px",
          border: "1px solid #77AAF9",
          borderRadius: "8px",
          outline: "none",
          fontSize: "13px",
          fontWeight: "300",
          fontFamily: "Inter, sans-serif",
        }}
      />

      {/* second textfield (editable) */}
      {isPhone && (
        <ReactInputMask
          type="text"
          mask="+7 (999) 999 99-99"
          placeholder="+7 (900) 855 45-58"
          //ref={inputRef}
          value={value}
          onChange={onChange}
          style={{
            height: "30px",
            padding: "10px 16px 10px 16px",
            border: isPhoneEmpty ? "1px solid #FF0000" : "1px solid #77AAF9",
            //color : "red",
            borderRadius: "8px",
            outline: "none",
            fontSize: "13px",
            fontWeight: "400",
            lineHeight: "16px",
            fontFamily: "Inter, sans-serif",
          }}
        ></ReactInputMask>
      )}
      {!isPhone && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "30px",
            padding: "10px 16px 10px 16px",
            border: "1px solid #77AAF9",
            alignItems: "center",
            borderRadius: "8px",
            //backgroundColor : "red",
            width: "180px",
          }}
        >
          {isTg && (
            <div className="text-[13px] text-grey-text font-inter font-normal">
              t.me/
            </div>
          )}

          {isVk && (
            <div className="text-[13px] text-grey-text font-inter font-normal">
              vk.com/
            </div>
          )}
          <input
            type="text"
            //ref={inputRef}
            value={value}
            onChange={onChange}
            style={{
              outline: "none",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "16px",
              width: "100%",
            }}
          />
        </div>
      )}
      {showDeleting && (
        <img
          src={redBasketSvg}
          className="cursor-pointer"
          onClick={onDeleteClicked}
          alt=""
        />
      )}
    </div>
  );
}

function ChangeMainPhotoModal({
  onPop,
  photo,
  onDeleteClicked,
  openFilePicker,
  fileInputRef,
  uploadNewPhoto,
}) {
  return (
    <div className="photo_dialog_container">
      {/* photo */}
      {photo !== "" && (
        <img
          className=" h-[250px] rounded-t-[16px] object-cover"
          src={`${AppConstants.baseUrl}image/${photo}`}
          alt=""
        ></img>
      )}
      {photo === "" && (
        <div className="w-[513px] h-[250px] rounded-t-[16px] bg-white flex justify-center">
          <img src={mainPicPlaceHolder} alt=""></img>
        </div>
      )}

      {/* white container */}
      <div className="bg-white p-[32px] flex flex-col justify-center  gap-[24px] rounded-b-[16px]">
        <div className="flex flex-col gap-[5-x] pl-[50px]">
          <div className="font-semibold text-[16px] ">
            Изменение фоновой фотографии
          </div>
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
          <button onClick={onDeleteClicked} className="second_button">
            <p>Удалить фото</p>
          </button>
          <CustomButton
            width={"202px"}
            height={"40px"}
            title={"Загрузить другое фото"}
            fontSize={"14px"}
            onСlick={openFilePicker}
          />
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={uploadNewPhoto}
            accept="image/jpeg, image/png"
          />
        </div>
      </div>
    </div>
  );
}

function ChangeLogoModal({
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
          src={`${AppConstants.baseUrl}image/${logo}`}
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

function DropDownForAddingContacts({
  isDropDownOpened,
  openCloseDropDown,
  phone,
  tg,
  vk,
  text,
  ontapPhone,
  ontapTg,
  ontapVk,
}) {
  return (
    <div className="columnForContact">
      <button
        className={
          isDropDownOpened
            ? "dropdown_header_opened_contacts"
            : "dropdown_header_contacts"
        }
        onClick={openCloseDropDown}
      >
        <div className="text-[13px] text-grey-text font-normal font-inter">
          {text}
        </div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>
      {isDropDownOpened && (
        <div className="dropdown_body2">
          <div className="gym_names" onClick={() => ontapPhone()}>
            {phone}
          </div>
          <div className="gym_names" onClick={() => ontapTg()}>
            {tg}
          </div>
          <div className="gym_names" onClick={() => ontapVk()}>
            {vk}
          </div>
        </div>
      )}
    </div>
  );
}

function TextAndTextButtonContacts({ text1, text2, onclick, isDisabled }) {
  return (
    <div className="flex flex-row gap-[10px]">
      <div className="text-[14px] font-bold ">{text1}:</div>
      <div
        className={
          isDisabled
            ? "text-[13px] font-medium text-grey-text cursor-not-allowed"
            : "text-[13px] font-medium text-blue-text cursor-pointer"
        }
        onClick={onclick}
      >
        {text2}
      </div>
    </div>
  );
}
