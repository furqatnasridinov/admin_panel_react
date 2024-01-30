import React from "react";
import "./gym_details_body_first.css";
import TextAndTextButton from "../../../components/text_and_textbutton";
import SizeOfPicture from "../../../components/size_of_picture";
import mainPicPlaceHolder from "../../../../../assets/svg/main_photo_placeholder.svg";
import logoPlaceholder from "../../../../../assets/svg/logo_placeholder.svg";
import phoneSvg from "../../../../../assets/svg/phone.svg";
import tgSvg from "../../../../../assets/svg/tg.svg";
import vkSvg from "../../../../../assets/svg/vk.svg";
import doneSvg from "../../../../../assets/svg/done.svg";
import arrowDownSvg from "../../../../../assets/svg/arrow_down.svg";
import plusSvg from "../../../../../assets/svg/plus.svg";
import CustomDialog from "../../../../../components/dialog/dialog";
import { useState, useRef, useEffect, useCallback } from "react";
import CustomButton from "../../../../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackbar from "../../../../../components/snackbar/custom_snackbar";
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
  patchGymAddress,
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
} from "../../../../../features/current_gym_slice";
import ReactInputMask from "react-input-mask";

export default function GymDetailesBodyFirstContainer({ currentGym }) {
  const dispatch = useDispatch();
  const currentGymState = useSelector((state) => state.currentGym);

  // refs of snackbars
  const deleteMainPicSnackbarRef = useRef(null);
  const deleteLogoSnackbarRef = useRef(null);

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
  const [hideAdding, setAdding] = useState(false);

  // use refs
  const fileInputMainPhotoRef = useRef();
  const fileInputLogoRef = useRef();

  // functions
  const openFilePickerForMainPhoto = () => {
    try {
      fileInputMainPhotoRef.current.click();
    } catch (error) {
      alert(error);
    }
  };
  const openFilePickerForLogo = () => {
    try {
      fileInputLogoRef.current.click();
    } catch (error) {
      alert(error);
    }
  };

  // Обработчик для добавления новой фотографии
  const handleNewPhoto = (event) => {
    const file = event.target.files[0];
    const { gymId, image } = { gymId: currentGym.id, image: file };
    dispatch(addGymPicture({ gymId, image }));
    setTimeout(() => {
      dispatch(getCurrentGym(currentGym.id));
    }, 2500);
    if (isModalPhotoOpened) {
      openModalPhoto(false);
    }
  };

  // Обработчик для добавления нового логотипа
  const handleNewLogo = (event) => {
    const file = event.target.files[0];
    const { gymId, image } = { gymId: currentGym.id, image: file };
    dispatch(addGymLogo({ gymId, image }));
    setTimeout(() => {
      dispatch(getCurrentGym(currentGym.id));
    }, 1000);
    if (isModalLogoOpened) {
      openModalLogo(false);
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

  return (
   
    (
      <div className=" bg-white h-fit p-[32px] flex flex-col rounded-[16px] gap-[32px] mb-[10px]">
        {/* Photos and Logos */}

        <div className="photos_row">
          {/* Main picture  */}
          <div className="gym_main_photo_column">
            <TextAndTextButton
              text1={"Фоновая фотография"}
              text2={
                currentGym.mainPictureUrl === "" ||
                currentGym.mainPictureUrl === null
                  ? ""
                  : "Изменить фотографию"
              }
              onclick={() =>
                currentGym.mainPictureUrl !== "" &&
                currentGym.mainPictureUrl !== null
                  ? openModalPhoto(true)
                  : {
                      openFilePickerForMainPhoto,
                    }
              }
            />

            {currentGym.mainPictureUrl !== null &&
              currentGym.mainPictureUrl !== "" && (
                <img
                  className="main_pic"
                  src={`http://77.222.53.122/image/${currentGym.mainPictureUrl}`}
                  onClick={() => openModalPhoto(true)}
                  style={{ cursor: "pointer" }}
                  draggable={false}
                  alt=""
                />
              )}
            {(currentGym.mainPictureUrl === "" ||
              currentGym.mainPictureUrl === null) && (
              <>
                <img
                  src={mainPicPlaceHolder}
                  style={{ cursor: "pointer" }}
                  onClick={openFilePickerForMainPhoto}
                  draggable={false}
                  alt=""
                />
                <input
                  ref={fileInputMainPhotoRef}
                  onChange={handleNewPhoto}
                  type="file"
                  style={{ display: "none" }} //hiding input
                />
              </>
            )}

            <SizeOfPicture size={"375x210px"} />
            {isModalPhotoOpened && (
              <CustomDialog
                isOpened={isModalPhotoOpened}
                closeOnTapOutside={() => {
                  openModalPhoto(false);
                }}
              >
                <ChangeMainPhotoModal
                  onPop={() => openModalPhoto(false)}
                  onDeleteClicked={() => {
                    dispatch(setEmptyStringToMainPic());
                    openModalPhoto(false);
                    const cancelTimeout = deleteMainPicSnackbarRef.current.show(
                      "Вы удалили фото",
                      () => {
                        // function when onTime Ended
                        const { gymId } = { gymId: currentGym.id };
                        dispatch(removeGymMainPic({ gymId }));
                        dispatch(removePhotoCopy());
                      }
                    );
                    setCancelDeleteTimeoutPhoto(() => cancelTimeout);
                  }}
                  openFilePicker={openFilePickerForMainPhoto}
                  photo={
                    currentGym.mainPictureUrl === "" ||
                    currentGym.mainPictureUrl === null
                      ? ""
                      : currentGym.mainPictureUrl
                  }
                  fileInputRef={fileInputMainPhotoRef}
                  uploadNewPhoto={handleNewPhoto}
                />
              </CustomDialog>
            )}

            <CustomSnackbar
              ref={deleteMainPicSnackbarRef}
              undoAction={undoDeletePhoto}
            />
          </div>
          {/*  Logos Column */}
          <div className="flex flex-col gap-[10px] mt-[30px] ml-[43px]">
            <TextAndTextButton
              text1={"Логотип"}
              text2={
                currentGym.logoUrl === "" || currentGym.logoUrl === null
                  ? ""
                  : "Изменить"
              }
              onclick={() =>
                currentGym.logoUrl !== "" && currentGym.logoUrl !== null
                  ? openModalLogo(true)
                  : {}
              }
            />
            {/* Big logo */}
            {currentGym.logoUrl !== "" && currentGym.logoUrl !== null && (
              <img
                className="logo_rounded180"
                src={`http://77.222.53.122/image/${currentGym.logoUrl}`}
                onClick={() => openModalLogo(true)}
                style={{ cursor: "pointer" }}
                draggable={false}
                alt=""
              />
            )}
            {(currentGym.logoUrl === "" || currentGym.logoUrl === null) && (
              <>
                <img
                  src={logoPlaceholder}
                  style={{ cursor: "pointer" }}
                  onClick={openFilePickerForLogo}
                  draggable={false}
                  alt=""
                />
                <input
                  ref={fileInputLogoRef}
                  onChange={handleNewLogo}
                  type="file"
                  style={{ display: "none" }}
                />
              </>
            )}

            <SizeOfPicture size={"180x180px"} />
          </div>
          {/* Medium logo */}
          {currentGym.logoUrl !== "" && currentGym.logoUrl !== null && (
            <div className="flex flex-col gap-[10px] ml-[10px] justify-end">
              <img
                onClick={() => {
                  openModalLogo(true);
                }}
                className="logo_rounded90"
                style={{ cursor: "pointer" }}
                src={`http://77.222.53.122/image/${currentGym.logoUrl}`}
                alt=""
              />
              <SizeOfPicture size={"90x90px"} />
            </div>
          )}

          {/* Small logo */}
          {currentGym.logoUrl !== "" && currentGym.logoUrl !== null && (
            <div className="flex flex-col gap-[10px] ml-[10px] justify-end">
              <img
                className="logo_rounded50"
                style={{ cursor: "pointer" }}
                src={`http://77.222.53.122/image/${currentGym.logoUrl}`}
                onClick={() => {
                  openModalLogo(true);
                }}
                alt=""
              />

              <SizeOfPicture size={"50x50px"} />
            </div>
          )}
          {isModalLogoOpened && (
            <CustomDialog
              isOpened={isModalLogoOpened}
              closeOnTapOutside={() => {
                openModalLogo(false);
              }}
            >
              <ChangeLogoModal
                onPop={() => openModalLogo(false)}
                onDeleteClicked={() => {
                  dispatch(setEmptyStringToLogo());
                  openModalLogo(false);
                  const cancelTimeout = deleteLogoSnackbarRef.current.show(
                    "Вы удалили логотип",
                    () => {
                      // function when onTime Ended
                      const { gymId } = { gymId: currentGym.id };
                      dispatch(removeGymLogo({ gymId }));
                      dispatch(removeLogoCopy());
                    }
                  );
                  setCancelDeleteTimeoutLogo(() => cancelTimeout);
                }}
                openFilePicker={openFilePickerForLogo}
                logo={currentGym.logoUrl}
                fileInputRef={fileInputLogoRef}
                uploadNewLogo={handleNewLogo}
              />
            </CustomDialog>
          )}
          <CustomSnackbar
            ref={deleteLogoSnackbarRef}
            undoAction={undoDeleteLogo}
          />
        </div>

        {/* ContactInfos */}

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-row  gap-[32px]">
            {/* Name  */}
            <div className="name">
              {!isNameEditingEnabled && (
                <>
                  <TextAndTextButton
                    text1={"Название заведения"}
                    text2={"Изменить"}
                    isRedText={isNameEditingEnabled}
                    onclick={() => setNameEditing(true)}
                  />
                  <div className="text-[14px]">{currentGym.name}</div>
                </>
              )}
              {isNameEditingEnabled && (
                <>
                  <TextAndTextButton
                    text1={"Название заведения"}
                    text2={"Отменить"}
                    isRedText={isNameEditingEnabled}
                    onclick={() => {
                      if (currentGymState.isChangesOccured) {
                        dispatch(getCurrentGym(currentGym.id));
                      }
                      setNameEditing(false);
                    }}
                  />
                  <EditableTextfield
                    value={currentGym.name}
                    onChange={(e) => {
                      dispatch(changeCurrentGymsName(e.target.value));
                    }}
                    onButtonClicked={() => {
                      const { id, name } = {
                        id: currentGym.id,
                        name: currentGym.name,
                      };
                      dispatch(patchGymName({ id, name }));
                      setTimeout(() => {
                        dispatch(getCurrentGym(currentGym.id));
                      }, 700);
                      setNameEditing(false);
                      dispatch(resetChanges());
                    }}
                    lineheight={"16px"}
                    fontsize={"14px"}
                  />
                </>
              )}
            </div>
            {/* Describtion  */}
            <div className="describtion">
              {!isDescribtionEdittingEnabled && (
                <>
                  <TextAndTextButton
                    text1={"Описание"}
                    text2={"Изменить"}
                    isRedText={isDescribtionEdittingEnabled}
                    onclick={() => {
                      setDescribtionEditing(true);
                    }}
                  />
                  <div className="leading-[14px] text-[13px]">
                    {currentGym.description}
                  </div>
                </>
              )}
              {isDescribtionEdittingEnabled && (
                <>
                  <TextAndTextButton
                    text1={"Описание"}
                    text2={"Отменить"}
                    isRedText={isDescribtionEdittingEnabled}
                    onclick={() => {
                      if (currentGymState.isChangesOccured) {
                        dispatch(getCurrentGym(currentGym.id));
                      }
                      setDescribtionEditing(false);
                    }}
                  />
                  <EditableTextfield
                    value={currentGym.description}
                    onChange={(e) => {
                      dispatch(changeCurrentGymsDescription(e.target.value));
                    }}
                    onButtonClicked={() => {
                      const { id, description } = {
                        id: currentGym.id,
                        description: currentGym.description,
                      };
                      dispatch(patchGymDescription({ id, description }));
                      setTimeout(() => {
                        dispatch(getCurrentGym(currentGym.id));
                      }, 700);
                      setDescribtionEditing(false);
                      dispatch(resetChanges());
                    }}
                    fontsize={"13px"}
                    lineheight={"14px"}
                  />
                </>
              )}
            </div>
            {/* Address  */}
            <div className="address">
              {!isAddressEdittingEnabled && (
                <>
                  <TextAndTextButton
                    text1={"Адрес"}
                    text2={"Изменить"}
                    isRedText={isAddressEdittingEnabled}
                    onclick={() => {
                      setAddressEditting(true);
                    }}
                  />
                  <div className="leading-[16px] text-[14px]">
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
                    onclick={() => {
                      if (currentGymState.isChangesOccured) {
                        dispatch(getCurrentGym(currentGym.id));
                      }
                      setAddressEditting(false);
                    }}
                  />
                  <EditableTextfield
                    value={currentGym.address}
                    onChange={(e) => {
                      dispatch(changeCurrentGymsAddress(e.target.value));
                    }}
                    fontsize={"14px"}
                    onButtonClicked={() => {
                      const { id, address } = {
                        id: currentGym.id,
                        address: currentGym.address,
                      };
                      dispatch(patchGymAddress({ id, address }));
                      setTimeout(() => {
                        dispatch(getCurrentGym(currentGym.id));
                      }, 700);
                      setAddressEditting(false);
                      dispatch(resetChanges());
                    }}
                  />
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
                />
                <div className="flex flex-row gap-[24px]">
                  {/* Phone */}
                  <div className="icon_and_tag">
                    <img src={phoneSvg} alt="" />
                    <ReactInputMask
                      readOnly={true}
                      value={currentGym.phone}
                      mask="+7 (999) 999 99-99"
                      placeholder="+7 (900) 855 45-58"
                      style={{ outline: "none" }}
                    />
                  </div>
                  {/* Tg */}
                  {currentGym.telegram !== null &&
                    currentGym.telegram !== "" && (
                      <div className="icon_and_tag">
                        <img src={tgSvg} alt="" />
                        <div className="font-normal text-[14px]">
                          {currentGym.telegram}
                        </div>
                      </div>
                    )}
                  {/* Vk */}
                  {currentGym.vk !== null && currentGym.vk !== "" && (
                    <div className="icon_and_tag">
                      <img src={vkSvg} alt="" />
                      <div className="font-normal text-[14px]">
                        {currentGym.vk}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {isContactsEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Контакты"}
                  text2={"Сохранить"}
                  onclick={() => {
                    if (addingTelegram) {
                      setAddingTelegram(false);
                    }
                    if (addingVk) {
                      setAddingVk(false);
                    }
                    if (hideAdding) {
                      setAdding(false);
                    }
                    const { id, phone, telegram, vk } = {
                      id: currentGym.id,
                      phone: currentGym.phone,
                      telegram: currentGym.telegram,
                      vk: currentGym.vk,
                    };
                    if (currentGymState.isChangesOccured) {
                      dispatch(patchGymContacts({ id, phone, telegram, vk }));
                      setTimeout(() => {
                        dispatch(getCurrentGym(currentGym.id));
                      }, 700);
                    }
                    setContactsEditting(false);
                    dispatch(resetChanges());
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
                      onChange={(e) => {
                        dispatch(changeCurrentGymsPhone(e.target.value));
                      }}
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
                        onChange={(e) => {
                          dispatch(changeCurrentGymsTelegram(e.target.value));
                        }}
                      />
                    )}

                  {/* vk */}
                  {currentGym.vk !== null &&
                    currentGym.vk !== "" &&
                    !addingVk && (
                      <EditableContacts
                        icon={vkSvg}
                        text={"VKontakte"}
                        value={
                          currentGym.vk === null || currentGym.vk === ""
                            ? ""
                            : `${currentGym.vk}`
                        }
                        isVk={true}
                        onChange={(e) => {
                          dispatch(changeCurrentGymsVk(e.target.value));
                        }}
                      />
                    )}

                  {/* when select adding */}
                  {addingTelegram && (
                    <EditableContacts
                      icon={tgSvg}
                      text={"Telegram"}
                      value={currentGym.telegram}
                      isTg={true}
                      onChange={(e) => {
                        dispatch(changeCurrentGymsTelegram(e.target.value));
                      }}
                    />
                  )}

                  {addingVk && (
                    <EditableContacts
                      icon={vkSvg}
                      text={"VKontakte"}
                      value={
                        currentGym.vk === null || currentGym.vk === ""
                          ? ""
                          : `${currentGym.vk}`
                      }
                      isVk={true}
                      onChange={(e) => {
                        dispatch(changeCurrentGymsVk(e.target.value));
                      }}
                    />
                  )}

                  {(currentGym.phone == null ||
                    currentGym.phone === "" ||
                    currentGym.telegram == null ||
                    currentGym.telegram === "" ||
                    currentGym.vk == null ||
                    currentGym.vk === "") &&
                    !hideAdding && (
                      <AddContacts
                        text={"Добавить новый контакт"}
                        currentGym={currentGym}
                        setAddingVk={() => {
                          setAddingVk(true);
                          setAdding(true);
                        }}
                        setAddingTelegram={() => {
                          setAddingTelegram(true);
                          setAdding(true);
                        }}
                      />
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export function EditableTextfield({
  value,
  onChange,
  fontsize,
  lineheight,
  onButtonClicked,
}) {
  const inputRef = useRef(null);
  // for autofocus calls when component first renders
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
      // Set the cursor to the end of the text
      const length = input.value.length;
      input.setSelectionRange(length, length);
      // set the height relatively textfields content
      input.style.height = "inherit"; // Reset height to recalculate
      input.style.height = `${input.scrollHeight}px`; // Set new height based on scroll height
    }
  }, []);

  return (
    <div className="flex flex-row justify-between gap-[10px] items-start">
      <textarea
        className="textArea"
        ref={inputRef}
        value={value}
        onChange={onChange}
        style={{
          fontSize: fontsize,
          lineHeight: lineheight,
        }}
      />
      <button onClick={onButtonClicked}>
        <img src={doneSvg} alt="" />
      </button>
    </div>
  );
}

function EditableContacts({
  text,
  value,
  icon,
  onChange,
  isPhone,
  isTg,
  isVk,
}) {
  /* const inputRef = useRef();
  const handleInfoChange = (event) => {
    const input = event.target; // Получаем текущий элемент input
    setInfoValue(input.value);
    // Обновляем ширину input в зависимости от содержимого
    input.style.width = "inherit"; // Сбрасываем ширину, чтобы пересчитать
    input.style.width = `${input.scrollWidth}px`; // Устанавливаем новую ширину на основе scrollWidth
  }; */

  return (
    <div className="flex flex-row gap-[10px] w-fit">
      <img src={icon} alt="" />
      {/* first textfield readOnly */}
      <div className="relative">
        <input
          type="text"
          value={text}
          readOnly={true}
          style={{
            width: "115px",
            height: "30px",
            padding: "10px 6px 10px 16px",
            border: "1px solid #77AAF9",
            borderRadius: "8px",
            outline: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />
        <img
          src={arrowDownSvg}
          alt=""
          className="absolute right-2 top-1/2 transform -translate-y-1/2" // Выравнивание иконки
        />
      </div>

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
            border: "1px solid #77AAF9",
            //color : "red",
            borderRadius: "8px",
            outline: "none",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "16px",
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
          }}
        >
          {isTg && (
            <div className="text-[14px] text-grey-text font-normal">t.me/</div>
          )}

          {isVk && (
            <div className="text-[14px] text-grey-text font-normal">
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
            }}
          />
        </div>

        /* { }*/
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
          src={`http://77.222.53.122/image/${photo}`}
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
          />
        </div>
      </div>
    </div>
  );
}

function AddContacts({ text, currentGym, setAddingTelegram, setAddingVk }) {
  return (
    <div className="flex flex-row gap-[10px] w-fit">
      <img src={plusSvg} alt="" />
      {/* first textfield tappable */}
      <div className="relative">
        <select
          defaultValue=""
          name=""
          id="sec"
          onChange={(e) => {
            if (e.target.value == "vk") {
              setAddingVk();
            }
            if (e.target.value == "telegram") {
              setAddingTelegram();
            }
          }}
          style={{
            width: "220px",
            height: "30px",
            padding: "0 6px 0 16px",
            border: "1px solid #77AAF9",
            borderRadius: "8px",
            outline: "none",
            fontSize: "14px",
            fontWeight: "500",
            color: "#B0B0B0",
          }}
        >
          <option value="" disabled hidden>
            {text}
          </option>
          {/* phone */}
          {(currentGym.phone === null || currentGym.phone === "") && (
            <option value="phone">phone</option>
          )}
          {/* telegram */}
          {(currentGym.telegram === null || currentGym.telegram === "") && (
            <option value="telegram">telegram</option>
          )}
          {/* vk */}
          {(currentGym.vk === null || currentGym.vk === "") && (
            <option value="vk">vk</option>
          )}
        </select>

        <img
          src={arrowDownSvg}
          alt=""
          className="absolute right-2 top-1/2 transform -translate-y-1/2" // Выравнивание иконки
        />
      </div>
    </div>
  );
}
