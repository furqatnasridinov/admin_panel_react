import React from "react";
import "./styles.css";
import TitleText from "./title_text";
import mainPicPlaceHolder from "../../assets/svg/main_photo_placeholder.svg";
import logoPlaceholder from "../../assets/svg/logo_placeholder.svg";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditableTextfield } from "../gym_detailes/views/gym_detailes_body/first/gym_detailes_body_first";
import { AddressSearching } from "../gym_detailes/views/gym_detailes_body/first/address_searching";
import { useDispatch, useSelector } from "react-redux";
import { searchingForAddress } from "../../features/current_gym_slice";
import ReactInputMask from "react-input-mask";
import phoneSvg from "../../assets/svg/phone.svg";
import BackButton from "../../components/button/back_button";
import CustomButton from "../../components/button/button";
import addPhotoSvg from "../../assets/svg/add_photo.svg";
import { createGym, addGymPicture, addGymLogo } from "../../features/current_gym_slice";
import { useNavigate } from "react-router-dom";
import AppConstants from "../../config/app_constants";

export default function CreateGymFirstContainer() {
  //redux
  const dispatch = useDispatch();
  const currentGymState = useSelector((state) => state.currentGym);

  // use states
  const [mainPhoto, setMainPhoto] = useState(null);
  const [mainPhotoUrl, setMainPhotoUrl] = useState(null); // new state for the URL
  const [isMainPhotoNotValidated, setMainPhotoNotValidated] = useState(false); // new state for the URL
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null); // new state for the URL
  const [isLogoNotValidated, setLogoNotValidated] = useState(false); // new state for the URL
  const [name, setName] = useState("");
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);
  const [isNameNotValidated, setIsNameNotValidated] = useState(false);
  const [description, setDescription] = useState("");
  const [isDescriptionConfirmed, setIsDescriptionConfirmed] = useState(false);
  const [isDescriptionNotValidated, setIsDescriptionNotValidated] =
    useState(false);
  const [address, setAddress] = useState("");
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const [isAddressNotValidated, setIsAddressNotValidated] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isNameEdittingEnabled, setIsNameEdittingEnabled] = useState(false);
  const [isDescriptionEdittingEnabled, setIsDescriptionEdittingEnabled] =
    useState(false);
  const [isAddressEdittingEnabled, setIsAddressEdittingEnabled] =
    useState(false);
  const [phone, setPhone] = useState("");
  const [isPhoneConfirmed, setIsPhoneConfirmed] = useState(false);
  const [isPhoneEdittingEnabled, setIsPhoneEdittingEnabled] = useState(false);
  const [isPhoneNotValidated, setIsPhoneNotValidated] = useState(false);
  const [isFirstStepCompleted, setIsFirstStepCompleted] = useState(false);
  const [activity, setActivity] = useState(false);
  const [isActivityEdittingEnabled, setIsActivityEdittingEnabled] =
    useState(false);
  const [isActivityNotValidated, setIsActivityNotValidated] = useState(false);
  const [activityDescription, setActivityDescription] = useState("");
  const [
    isActivityDescriptionEdittingEnabled,
    setIsActivityDescriptionEdittingEnabled,
  ] = useState(false);
  const [
    isActivityDescriptionNotValidated,
    setIsActivityDescriptionNotValidated,
  ] = useState(false);
  const [isActivityDescriptionConfirmed, setIsActivityDescriptionConfirmed] =
    useState(false);
  const [features, setFeatures] = useState("");
  const [isFeaturesEdittingEnabled, setIsFeaturesEdittingEnabled] =
    useState(false);
  const [isFeaturesNotValidated, setIsFeaturesNotValidated] = useState(false);
  const [isFeaturesConfirmed, setIsFeaturesConfirmed] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photosUrl, setPhotosUrl] = useState([]);

  // use refs
  const fileInputMainPhotoRef = useRef();
  const fileInputLogoRef = useRef();
  const hiddenFileInput = useRef(null);

  // use navigation
  const navigate = useNavigate();

  const uploadPhoto = async (event) => {
    let file = event.target.files[0];
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

    if (file.type === "image/jpeg") {
      // save
      setMainPhotoUrl(URL.createObjectURL(file)); // to show only
      setMainPhoto(file);
    } else {
      toast("Неподдерживаемый формат файла");
    }
  };

  const uploadLogo = async (event) => {
    let file = event.target.files[0];
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

    if (file.type === "image/jpeg") {
      // save
      setLogoUrl(URL.createObjectURL(file)); // to show only
      setLogo(file);
    } else {
      toast("Неподдерживаемый формат файла");
    }
  };

  const uploadActivityPhotos = async (event) => {
    let files = event.target.files;
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
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

      if (file.type === "image/jpeg") {
        // save
        urls.push(URL.createObjectURL(file)); // to show only
        setPhotos((prev) => [...prev, file]);
        setPhotosUrl((prev) => [...prev, URL.createObjectURL(file)]);
      } else {
        toast("Неподдерживаемый формат файла");
      }
    }
  };

  useEffect(() => {
    if (address.length > 2) {
      dispatch(searchingForAddress(address));
    }
  }, [address]);

  return (
    console.log(`phone length: ${phone.length}`),
    console.log(`phone: ${phone}`),
    (
      <>
        <div className="firstContainer">
          <div className="flex flex-row gap-[32px]">
            <div className="flex flex-col gap-[10px]">
              <TitleText
                firstText={"Фоновая фотография"}
                onClick={() => {
                  fileInputMainPhotoRef.current.click();
                }}
                isNotValidated={isMainPhotoNotValidated}
              />
              <>
                <img
                  className="main_pic"
                  src={mainPhoto === null ? mainPicPlaceHolder : mainPhotoUrl}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    fileInputMainPhotoRef.current.click();
                  }}
                  draggable={false}
                  alt=""
                />
                <input
                  ref={fileInputMainPhotoRef}
                  onChange={uploadPhoto}
                  type="file"
                  style={{ display: "none" }} //hiding input
                  accept="image/jpeg, image/png"
                />
              </>
            </div>
            <div className="flex flex-col gap-[10px] items-start justify-end">
              <TitleText
                firstText={"Логотип"}
                onClick={() => { }}
                isNotValidated={isLogoNotValidated}
              />
              <div className="flex flex-row gap-[32px]  ">
                <img
                  className="logo_rounded180"
                  src={logo === null ? logoPlaceholder : logoUrl}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    fileInputLogoRef.current.click();
                  }}
                  draggable={false}
                  alt=""
                />
                <input
                  ref={fileInputLogoRef}
                  onChange={uploadLogo}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/jpeg, image/png"
                />
              </div>
            </div>
            {logo !== null && (
              <div className="flex flex-col justify-end">
                <img
                  className="logo_rounded90 "
                  src={logo === null ? logoPlaceholder : logoUrl}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    fileInputLogoRef.current.click();
                  }}
                  draggable={false}
                  alt=""
                />
              </div>
            )}

            {logo !== null && (
              <div className="flex flex-col justify-end">
                <img
                  className="logo_rounded50 "
                  src={logo === null ? logoPlaceholder : logoUrl}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    fileInputLogoRef.current.click();
                  }}
                  draggable={false}
                  alt=""
                />
              </div>
            )}
          </div>

          <div className="flex flex-row gap-[32px]">
            {/* Название */}
            <div className="flex flex-col gap-[10px]">
              <TitleText
                firstText={"Название заведения"}
                onClick={() => {
                  setIsNameEdittingEnabled(true);
                }}
                undoAction={() => {
                  setIsNameEdittingEnabled(false);
                  if (!isNameConfirmed) {
                    setName("");
                  }
                }}
                isEnabled={isNameEdittingEnabled}
                isNotValidated={isNameNotValidated}
              />
              {isNameEdittingEnabled && (
                <EditableTextfield
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onButtonClicked={async () => {
                    setIsNameConfirmed(true);
                    setIsNameEdittingEnabled(false);
                  }}
                  lineheight={"16px"}
                />
              )}
              {!isNameEdittingEnabled && name !== "" && isNameConfirmed && (
                <div className="leading-[14px] text-[13px] font-normal font-inter">
                  {name}
                </div>
              )}
            </div>

            {/* Описание */}
            <div className="flex flex-col gap-[10px]">
              <TitleText
                firstText={"Описание"}
                onClick={() => {
                  setIsDescriptionEdittingEnabled(true);
                }}
                undoAction={() => {
                  setIsDescriptionEdittingEnabled(false);
                  if (!isDescriptionConfirmed) {
                    setDescription("");
                  }
                }}
                isEnabled={isDescriptionEdittingEnabled}
                isNotValidated={isDescriptionNotValidated}
              />
              {isDescriptionEdittingEnabled && (
                <EditableTextfield
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onButtonClicked={async () => {
                    setIsDescriptionConfirmed(true);
                    setIsDescriptionEdittingEnabled(false);
                  }}
                  lineheight={"16px"}
                />
              )}
              {!isDescriptionEdittingEnabled &&
                description !== "" &&
                isDescriptionConfirmed && (
                  <div className="leading-[14px] text-[13px] font-normal font-inter">
                    {description}
                  </div>
                )}
            </div>

            {/* Адрес */}
            <div className="flex flex-col gap-[10px] max-w-[400px]">
              <TitleText
                firstText={"Адрес"}
                onClick={() => {
                  setIsAddressEdittingEnabled(true);
                }}
                undoAction={() => {
                  setIsAddressEdittingEnabled(false);
                  setAddress("");
                }}
                isEnabled={isAddressEdittingEnabled}
                isNotValidated={isAddressNotValidated}
              />

              {isAddressEdittingEnabled && (
                <AddressSearching
                  value={address}
                  notFound={
                    currentGymState.addressesFromSearch &&
                    currentGymState.addressesFromSearch.length === 0
                  }
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  map={
                    currentGymState.addressesFromSearch &&
                    currentGymState.addressesFromSearch.length > 0 &&
                    currentGymState.addressesFromSearch.map((geocode) => {
                      return (
                        <div
                          className="gym_names"
                          key={geocode.GeoObject.Point}
                          onClick={async () => {
                            const position =
                              geocode.GeoObject.Point.pos.split(" ");
                            const lat = position[1];
                            const lon = position[0];
                            setLatitude(lat);
                            setLongitude(lon);
                            setAddress(
                              geocode.GeoObject.metaDataProperty
                                .GeocoderMetaData.text
                            );
                            setIsAddressEdittingEnabled(false);
                          }}
                        >
                          {
                            geocode.GeoObject.metaDataProperty.GeocoderMetaData
                              .text
                          }
                        </div>
                      );
                    })
                  }
                />
              )}

              {!isAddressEdittingEnabled && address !== "" && (
                <div className="leading-[14px] text-[13px] font-normal font-inter">
                  {address}
                </div>
              )}
            </div>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-[10px]">
            <TitleText
              firstText={"Контакты"}
              onClick={() => {
                setIsPhoneEdittingEnabled(true);
              }}
              undoAction={() => {
                setIsPhoneEdittingEnabled(false);
                if (!isPhoneConfirmed) {
                  setPhone("");
                }
              }}
              isEnabled={isPhoneEdittingEnabled}
              isNotValidated={isPhoneNotValidated}
            />
            {isPhoneEdittingEnabled && (
              <div className="flex flex-row gap-2">
                <img src={phoneSvg} alt="" />
                <ReactInputMask
                  type="text"
                  mask="+7 (999) 999 99-99"
                  placeholder="+7 (900) 855 45-58"
                  //ref={inputRef}
                  value={phone}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, "");
                    setPhone(onlyDigits);
                    if (onlyDigits.length === 11) {
                      setIsPhoneConfirmed(true);
                      setIsPhoneEdittingEnabled(false);
                    }
                  }}
                  style={{
                    width: "170px",
                    height: "30px",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid #77AAF9",
                    borderRadius: "8px",
                    outline: "none",
                    fontSize: "13px",
                    fontWeight: "400",
                    lineHeight: "16px",
                    fontFamily: "Inter, sans-serif",
                  }}
                ></ReactInputMask>
              </div>
            )}
            {!isPhoneEdittingEnabled && phone !== "" && isPhoneConfirmed && (
              <div className="leading-[14px] text-[13px] font-normal font-inter">
                <ReactInputMask
                  readOnly={true}
                  value={phone}
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
            )}
          </div>
        </div>

        {!isFirstStepCompleted && (
          <div className="buttonContainer">
            <div className="flex flex-row gap-[32px]">
              <BackButton
                width={"114px"}
                height={"40px"}
                title={"Отменить"}
                onСlick={() => { }}
              />

              <CustomButton
                width={"179px"}
                height={"40px"}
                fontSize={"14px"}
                title="Продолжить"
                isLoading={currentGymState.isLoading || currentGymState.isMainPicLoading || currentGymState.isLogoLoading}
                onСlick={async () => {
                  if (mainPhoto === null) {
                    setMainPhotoNotValidated(true);
                  } else {
                    setMainPhotoNotValidated(false);
                  }
                  if (logo === null) {
                    setLogoNotValidated(true);
                  } else {
                    setLogoNotValidated(false);
                  }
                  if (name === "") {
                    setIsNameNotValidated(true);
                  } else {
                    setIsNameNotValidated(false);
                  }
                  if (description === "") {
                    setIsDescriptionNotValidated(true);
                  } else {
                    setIsDescriptionNotValidated(false);
                  }
                  if (address === "") {
                    setIsAddressNotValidated(true);
                  } else {
                    setIsAddressNotValidated(false);
                  }
                  if (phone.length !== 11) {
                    setIsPhoneNotValidated(true);
                  } else {
                    setIsPhoneNotValidated(false);
                  }
                  if (
                    !isMainPhotoNotValidated &&
                    mainPhoto != null &&
                    !isLogoNotValidated &&
                    logo != null &&
                    !isNameNotValidated &&
                    name !== "" &&
                    !isDescriptionNotValidated &&
                    description !== "" &&
                    !isAddressNotValidated &&
                    address !== "" &&
                    !isPhoneNotValidated &&
                    phone.length === 11
                  ) {
                    const request = {
                      name: name,
                      description: description,
                      address: address,
                      latitude: latitude,
                      longitude: longitude,
                      //mainPictureUrl: mainPhoto.name,
                      //logo: logo.name,
                      phone: phone,
                    };
                    await dispatch(createGym(request));
                    // after creating gym sending request to add photos

                    if (mainPhoto !== null) {
                      const req = {
                        gymId: localStorage.getItem(AppConstants.keyGymId),
                        image: mainPhoto,
                      };
                      await dispatch(addGymPicture(req));
                    }
                    if (logo !== null) {
                      const req2 = {
                        gymId: localStorage.getItem(AppConstants.keyGymId),
                        image: logo,
                      };
                      await dispatch(addGymLogo(req2));
                    }

                    navigate(`/myGymsPage/gymDetails/${localStorage.getItem(AppConstants.keyGymId)}`);
                  }
                }}
              />
            </div>
            {(isMainPhotoNotValidated ||
              isLogoNotValidated ||
              isNameNotValidated ||
              isDescriptionNotValidated ||
              isAddressNotValidated ||
              isPhoneNotValidated) && (
                <div className="text-[14px] font-normal leading-[16px] text-red-text">
                  Чтобы продолжить - необходимо заполнить все обязательные поля,
                  выделенные красным
                </div>
              )}
          </div>
        )}

        {/* <div className="firstContainer">
          <div className="flex flex-col gap-[10px]">
            <TitleText
              firstText={"Активности"}
              onClick={() => {
                setIsActivityEdittingEnabled(true);
              }}
              undoAction={() => {
                setIsActivityEdittingEnabled(false);
              }}
              isEnabled={isActivityEdittingEnabled}
              isNotValidated={false}
            />

            {isActivityEdittingEnabled && (
              <EditableTextfield
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                onButtonClicked={async () => {}}
                lineheight={"16px"}
              />
            )}

            {!isActivityEdittingEnabled && activity !== "" && (
              <div className="leading-[14px] text-[13px] font-normal font-inter">
                {name}
              </div>
            )}
          </div>

          <div className="flex flex-row gap-[132px]">
            <div className="flex flex-col gap-[32px]">
              
              <div className="flex flex-col gap-[10px]">
                <TitleText
                  firstText={"Описание"}
                  onClick={() => {
                    setIsActivityDescriptionEdittingEnabled(true);
                  }}
                  undoAction={() => {
                    setIsActivityDescriptionEdittingEnabled(false);
                  }}
                  isEnabled={isActivityDescriptionEdittingEnabled}
                  isNotValidated={isActivityDescriptionNotValidated}
                />

                {isActivityDescriptionEdittingEnabled && (
                  <EditableTextfield
                    value={activityDescription}
                    onChange={(e) => setActivityDescription(e.target.value)}
                    onButtonClicked={async () => {
                      setIsActivityDescriptionConfirmed(true);
                      setIsActivityDescriptionEdittingEnabled(false);
                    }}
                    lineheight={"16px"}
                  />
                )}

                {!isActivityDescriptionEdittingEnabled &&
                  activityDescription !== "" &&
                  isActivityDescriptionConfirmed && (
                    <div className="leading-[14px] text-[13px] font-normal font-inter">
                      {activityDescription}
                    </div>
                  )}
              </div>

             
              <div className="flex flex-col gap-[10px]">
                <TitleText
                  firstText={"Особенности посещения"}
                  onClick={() => {
                    setIsFeaturesEdittingEnabled(true);
                  }}
                  undoAction={() => {
                    setIsFeaturesEdittingEnabled(false);
                    if (!isFeaturesConfirmed) {
                      setFeatures("");
                    }
                  }}
                  isEnabled={isFeaturesEdittingEnabled}
                  isNotValidated={isFeaturesNotValidated}
                />
                {isFeaturesEdittingEnabled && (
                  <EditableTextfield
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    onButtonClicked={async () => {
                      setIsFeaturesConfirmed(true);
                      setIsFeaturesEdittingEnabled(false);
                    }}
                    lineheight={"16px"}
                  />
                )}
                {!isFeaturesEdittingEnabled &&
                  features !== "" &&
                  isFeaturesConfirmed && (
                    <div className="leading-[14px] text-[13px] font-normal font-inter">
                      {features}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <TitleText firstText={"Фотографии"} />
              <div className="recomendations_to_photo">
                <p>Рекомендуемые форматы для загрузки: jpeg, png</p>
                <p>Минимально допустимая сторона фотографии: 1080px</p>
              </div>
              <div className="activity_photos_container">
                {photosUrl.map((photo, index) => {
                  return (
                    <img
                      key={index}
                      src={photo}
                      className="activity_each_photo"
                      alt=""
                    />
                  );
                })}
                <>
                  <img
                    src={addPhotoSvg}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => hiddenFileInput.current.click()} // нажимаем как бы на input file
                  />
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    multiple={true}
                    onChange={uploadActivityPhotos}
                    style={{ display: "none" }} // Скрываем input
                    accept="image/png, image/jpeg"
                  />
                </>
              </div>
            </div>
          </div>
        </div> */}
      </>
    )
  );
}
