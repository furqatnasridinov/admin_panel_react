import React from "react";
import "./gym_details_body_first.css";
import TextAndTextButton from "../../../components/text_and_textbutton";
import SizeOfPicture from "../../../components/size_of_picture";
import topDogMainPic from "../../../../../assets/images/top_dog.png";
import gosling from "../../../../../assets/images/gosling.jpg";
import goggins from "../../../../../assets/images/goggins.jpg";
import topDogLogo from "../../../../../assets/images/top_dog_logo.jpeg";
import phoneSvg from "../../../../../assets/svg/phone.svg";
import tgSvg from "../../../../../assets/svg/tg.svg";
import vkSvg from "../../../../../assets/svg/vk.svg";
import doneSvg from "../../../../../assets/svg/done.svg";
import arrowDownSvg from "../../../../../assets/svg/arrow_down.svg";
import arrowLeftSvg from "../../../../../assets/svg/arrow_left.svg";
import CustomDialog from "../../../../../components/dialog/dialog";
import { useState, useRef, useEffect } from "react";

export default function GymDetailesBodyFirstContainer() {
  const [isNameEditingEnabled, setNameEditing] = useState(false);
  const [isDescribtionEdittingEnabled, setDescribtionEditing] = useState(false);
  const [isAddressEdittingEnabled, setAddressEditting] = useState(false);
  const [isContactsEdittingEnabled, setContactsEditting] = useState(false);
  const [isModalPhotoOpened, openModalPhoto] = useState(false);
  const [isModalLogoOpened, openModalLogo] = useState(false);
  const [gymName, changeGymName] = useState("Top DOG Fight Club");
  const [describtion, setDescribtion] = useState(
    "В июне 2021 года был открыт Top Dog Club — зал с фитнессом и единоборствами, просуществовавший более двух лет."
  );
  const [address, setAddress] = useState(
    "ул. Лёни Ленина, д. 12, БЦ “Big Мук”"
  );
  const handleSaveGymName = (newName) => {
    changeGymName(newName);
    setNameEditing(false);
  };
  const handleSaveDescribtion = (newDescribtion) => {
    setDescribtion(newDescribtion);
    setDescribtionEditing(false);
  };
  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress);
    setAddressEditting(false);
  };

  return (
    <div className=" bg-white h-fit p-[32px] flex flex-col rounded-[16px] gap-[32px] mb-[10px]">
      {/* Photos and Logos */}

      <div className="photos_row">
        {/* Main picture  */}
        <div className="gym_main_photo_column">
          <TextAndTextButton
            text1={"Фоновая фотография"}
            text2={"Изменить"}
            onclick={() => {
              openModalPhoto(true);
            }}
          />
          <button
            onClick={() => {
              openModalPhoto(true);
            }}
          >
            <img className="main_pic" src={topDogMainPic} alt="" />
          </button>
          <SizeOfPicture size={"375x210px"} />
          <CustomDialog isOpened={isModalPhotoOpened}>
            <ChangeMainPhotoModal
              onPop={() => openModalPhoto(false)}
              photo={topDogMainPic}
            />
          </CustomDialog>
        </div>
        {/* Big logo */}
        <div className="flex flex-col gap-[10px] mt-[30px] ml-[43px]">
          <TextAndTextButton
            text1={"Логотип"}
            text2={"Изменить"}
            onclick={() => {openModalLogo(true)}}
          />
          <button onClick={() => {openModalLogo(true)}} className="w-[180px] h-[180px]">
            <img className="logo_rounded" src={topDogLogo} alt="" />
          </button>
          <SizeOfPicture size={"180x180px"} />
        </div>
        {/* Medium logo */}
        <div className="flex flex-col gap-[10px] ml-[10px] justify-end">
          <button onClick={() => {openModalLogo(true)}} className="w-[90px] h-[90px]">
            <img className="logo_rounded" src={topDogLogo} alt="" />
          </button>
          <SizeOfPicture size={"90x90px"} />
        </div>
        {/* Small logo */}
        <div className="flex flex-col gap-[10px] ml-[10px] justify-end">
          <button onClick={() => {openModalLogo(true)}} className="w-[50px] h-[50px]">
            <img className="logo_rounded" src={topDogLogo} alt="" />
          </button>
          <SizeOfPicture size={"50x50px"} />
        </div>
        <CustomDialog isOpened={isModalLogoOpened}>
          <ChangeLogoModal onPop={()=>{openModalLogo(false)}} logo={topDogLogo} />
        </CustomDialog>
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
                <div className="text-[14px]">{gymName}</div>
              </>
            )}
            {isNameEditingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Название заведения"}
                  text2={"Отменить"}
                  isRedText={isNameEditingEnabled}
                  onclick={() => setNameEditing(false)}
                />
                <EditableTextfield
                  value={gymName}
                  handleChange={handleSaveGymName}
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
                <div className="leading-[14px] text-[13px]">{describtion}</div>
              </>
            )}
            {isDescribtionEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Описание"}
                  text2={"Отменить"}
                  isRedText={isDescribtionEdittingEnabled}
                  onclick={() => {
                    setDescribtionEditing(false);
                  }}
                />
                <EditableTextfield
                  value={describtion}
                  handleChange={handleSaveDescribtion}
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
                <div className="leading-[16px] text-[14px]">{address}</div>
              </>
            )}
            {isAddressEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Адрес"}
                  text2={"Отменить"}
                  isRedText={isAddressEdittingEnabled}
                  onclick={() => {
                    setAddressEditting(false);
                  }}
                />
                <EditableTextfield
                  value={address}
                  handleChange={handleSaveAddress}
                  fontsize={"14px"}
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
                  <div className="font-normal text-[14px]">
                    +7 (965) 029 25-55
                  </div>
                </div>
                {/* Tg */}
                <div className="icon_and_tag">
                  <img src={tgSvg} alt="" />
                  <div className="font-normal text-[14px]">TopDogFC</div>
                </div>
                {/* Vk */}
                <div className="icon_and_tag">
                  <img src={vkSvg} alt="" />
                  <div className="font-normal text-[14px]">TopDog_FC</div>
                </div>
              </div>
            </>
          )}
          {isContactsEdittingEnabled && (
            <>
              <TextAndTextButton
                text1={"Контакты"}
                text2={"Сохранить"}
                onclick={() => setContactsEditting(false)}
              />
              <div className="flex flex-col gap-[10px]">
                <EditableContacts
                  icon={phoneSvg}
                  text={"Телефон"}
                  info={"+7 (965) 029 25-55"}
                  isPhone={true}
                />
                <EditableContacts
                  icon={tgSvg}
                  text={"Telegram"}
                  info={"TopDogFC"}
                  isTg={true}
                />
                <EditableContacts
                  icon={vkSvg}
                  text={"VKontakte"}
                  info={"TopDog_FC"}
                  isVk={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function EditableTextfield({
  value,
  handleChange,
  fontsize,
  lineheight,
}) {
  const [tempValue, setTempValue] = useState(value);
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

  const handleTempChange = (event) => {
    setTempValue(event.target.value);
    const target = event.target;
    target.style.height = "inherit"; // Reset height to recalculate
    target.style.height = `${target.scrollHeight}px`; // Set new height based on scroll height
  };

  const handleSave = () => {
    handleChange(tempValue); // Обновляет gymName в родительском компоненте
  };

  return (
    <div className="flex flex-row justify-between gap-[10px] items-start">
      <textarea
        ref={inputRef}
        value={tempValue}
        //className="textarea-transition"
        onChange={handleTempChange}
        style={{
          width: "100%",
          padding: "10px 16px 10px 8px",
          border: "1px solid #77AAF9",
          borderRadius: "8px",
          outline: "none",
          maxHeight: "120px",
          resize: "none",
          fontSize: fontsize,
          lineHeight: lineheight,
        }}
      />
      <button onClick={handleSave}>
        <img src={doneSvg} alt="" />
      </button>
    </div>
  );
}

function EditableContacts({ text, info, icon, isPhone, isTg, isVk }) {
  const [infoValue, setInfoValue] = useState(
    isPhone ? info : isTg ? `t.me/${info}` : isVk ? `vk.com/${info}` : ""
  );
  const inputRef = useRef();
  const handleInfoChange = (event) => {
    const input = event.target; // Получаем текущий элемент input
    setInfoValue(input.value);
    // Обновляем ширину input в зависимости от содержимого
    input.style.width = "inherit"; // Сбрасываем ширину, чтобы пересчитать
    input.style.width = `${input.scrollWidth}px`; // Устанавливаем новую ширину на основе scrollWidth
  };

  /* const handleInfoChange = (event) => {
    // Удаляем префикс при обновлении текста
    const newValue = isTg
      ? event.target.value.replace("t.me/", "")
      : isVk
      ? event.target.value.replace("vk.com/", "")
      : event.target.value;
    setInfoValue(newValue);
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
      <input
        type="text"
        ref={inputRef}
        value={infoValue}
        onChange={handleInfoChange}
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
      />
    </div>
  );
}
function ChangeMainPhotoModal({ onPop, photo }) {
  return (
    <div className="photo_dialog_container">
      {/* photo */}
      <img className="w-[513px] h-[250px] rounded-t-[16px]" src={photo}></img>
      {/* white container */}
      <div className="bg-white p-[32px] flex flex-col justify-center items-center gap-[24px] rounded-b-[16px]">
        <div className="flex flex-col gap-[5-x]">
          <div className="font-semibold text-[16px] ">
            Изменение фоновой фотографии
          </div>
          <div className="font-normal text-[14px]">Что вы хотите сделать?</div>
        </div>
        {/* Row of buttons */}
        <div className="flex flex-row w-full h-[40px] gap-[10px] ">
          <button className="rounded_button" onClick={onPop}>
            <img style={{ color: "white" }} src={arrowLeftSvg} alt="" />
          </button>
          <button className="second_button">
            <p>Удалить фото</p>
          </button>
          <button className="third_button">
            <div className="text-[14px] font-medium text-white">
              {" "}
              Загрузить другое фото
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
function ChangeLogoModal({onPop, logo}) {
  return (
    <div className="logo_dialog_container">
      <div className="w-full flex justify-center">
        <img className="logo" src={logo}></img>
      </div>
      {/* white container */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[5-x] ml-[50px]">
          <div className="font-semibold text-[16px] ">Изменение логотипа</div>
          <div className="font-normal text-[14px]">Что вы хотите сделать?</div>
        </div>
        {/* Row of buttons */}
        <div className="flex flex-row w-full h-[40px] gap-[10px] ">
          <button className="rounded_button">
            <img src={arrowLeftSvg} alt="" onClick={onPop}/>
          </button>
          <button className="second_button">
            <p>Удалить логотип</p>
          </button>
          <button className="third_button">
            <div className="text-[14px] font-medium text-white">
              {" "}
              Загрузить другой логотип
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
