import React from "react";
import "./gym_details_body_second.css";
import TextAndTextButton from "../../../components/text_and_textbutton";
import { useState, useRef, useEffect } from "react";
import { EditableTextfield } from "../first/gym_detailes_body_first";
import doneSvg from "../../../../../assets/svg/done.svg";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import removeActivitySvg from "../../../../../assets/svg/remove_activities.svg";
import editActivitySvg from "../../../../../assets/svg/edit_activities.svg";
import AddActivitySvg from "../../../../../assets/svg/add_activity.svg";
import addPhotoSvg from "../../../../../assets/svg/add_photo.svg";
import CustomButton from "../../../../../components/button/button";
import CustomDialog from "../../../../../components/dialog/dialog";

export default function GymDetailesBodySecondContainer({
  listOfActivities,
  setListOfactivities,
  selectedActivity,
  setselectedActivity,
  activityDescribtion,
  activityPeculiarities,
  setActivityDescribtion,
  setActivityPeculiarities,
  photosOfSelectedActivity,
  setPhotosOfSelectedActivity,
}) {
  // use states
  const [isDescribtionEdittingEnabled, setDescribtionEditting] =
    useState(false);
  const [isFeaturesEdittingEnabled, setFeaturesEditting] = useState(false);
  const [isEdittingPhotosEnabled, setPhotosEditting] = useState(false);
  const [isActivitiesModalOpened, openActivitiesModal] = useState(false);
  const [isPhotoShownInDialog, showPhotoInDialog] = useState(false);
  const [photoToShowInDialog, setPhotoToBeShownInDialog] = useState("");

  // use refs
  const hiddenFileInput = useRef(null);

  // functions
  const handleSaveDescribtion = (newDescribtion) => {
    setActivityDescribtion(newDescribtion);
    setDescribtionEditting(false);
  };
  const handleSaveFeatures = (newFeaturesArray) => {
    // Assuming newFeaturesArray is already an array of strings
    setActivityPeculiarities(newFeaturesArray); // Set new features array to state
    setFeaturesEditting(false); // Exit editing mode
  };
  const handleChange = (textValue) => {
    const newFeaturesArray = textValue
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim());
    handleSaveFeatures(newFeaturesArray);
  };

  function handleRemovingActivityPhotos(deletedItem) {
    const newList = photosOfSelectedActivity.filter(
      (item) => item !== deletedItem
    );
    setPhotosOfSelectedActivity(newList);
  }

  // Обработчик для добавления новой фотографии
  function handleNewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Создаём новый объект фото с уникальным  image URL
        const newPhoto = e.target.result;
        // Обновляем состояние со списком фотографий
        setPhotosOfSelectedActivity([...photosOfSelectedActivity, newPhoto]);
      };
      reader.readAsDataURL(file);
    }
  }

  // передаем это на кнопку добавления фото,(как бы через ref, нажимаем на саму input file которого скрыли)
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // drad & drop functions
  const draggedItemRef = useRef(null);
  const draggedOverRef = useRef(null);
  function handleSortingPhotos() {
    // creating duplicate of list
    const dublicatedList = [...photosOfSelectedActivity];
    //remove and save dragged item
    const draggedItemContent = dublicatedList.splice(
      draggedItemRef.current,
      1
    )[0];
    //switch the position
    dublicatedList.splice(draggedOverRef.current, 0, draggedItemContent);
    // reset the position ref
    draggedItemRef.current = null;
    draggedOverRef.current = null;
    // update the actual array
    setPhotosOfSelectedActivity(dublicatedList);
  }

  // drag & drop for activities
  const draggedActivityRef = useRef(null);
  const draggedOverActivityRef = useRef(null);
  function handleSortingActivities() {
    // creating duplicate of list
    const dublicatedList = [...listOfActivities];
    //remove and save dragged item
    const draggedItemContent = dublicatedList.splice(
      draggedActivityRef.current,
      1
    )[0];
    //switch the position
    dublicatedList.splice(
      draggedOverActivityRef.current,
      0,
      draggedItemContent
    );
    // reset the position ref
    draggedActivityRef.current = null;
    draggedOverActivityRef.current = null;
    // update the actual array
    setListOfactivities(dublicatedList);
  }

  return (
    <div className="flex flex-col bg-white h-fit rounded-[16px] p-[32px] gap-[32px]">
      <div className="activities">
        <TextAndTextButton
          text1={"Активности"}
          text2={"Редактировать список активностей"}
          onclick={() => {
            openActivitiesModal(true);
          }}
        />
        <div className="chips_row ">
          {listOfActivities.map((activity, index) => {
            return (
              <Chip
                key={index}
                name={activity}
                isActive={activity === selectedActivity}
                onclick={() => setselectedActivity(activity)}
              />
            );
          })}
        </div>
        <CustomDialog isOpened={isActivitiesModalOpened}>
          {/* Activities modal body */}
          <div className="main_container">
            <div className="flex flex-col gap-[5px]">
              <div className="text-[16px] font-semibold leading-[16px]">
                Редактирование активностей
              </div>
              <div className="text-[14px] font-normal leading-[16px]">
                Выберите активность, чтобы добавить в неё занятия.
                Дополнительные занятия - это не обязательная опция, вы можете
                использовать только основные активности.
              </div>
            </div>
            {/* activities and podactivities */}
            <div className="flex flex-row gap-[24px]">
              <div className="activities_col">
                <div className="text-[14px] font-bold">Ваши активности:</div>
                <div className="blue_bordered_container">
                  {listOfActivities.map((activity, index) => {
                    return (
                      <EachActivity
                        key={index}
                        title={activity}
                        onclick={() => {
                          setselectedActivity(activity);
                        }}
                        isActive={activity === selectedActivity}
                        onDragStart={() => (draggedActivityRef.current = index)}
                        onDragEnter={() =>
                          (draggedOverActivityRef.current = index)
                        }
                        onDragEnd={handleSortingActivities}
                        onDragOver={(e) => e.preventDefault()}
                      />
                    );
                  })}
                  <AddActivity />
                </div>
              </div>
              <div className="podactivities_col">
                <div className="text-[14px] font-bold">
                  Доп. занятия внутри активности:
                </div>
                <div className="blue_bordered_container"></div>
              </div>
            </div>
            <CustomButton
              height={"40px"}
              width={"100%"}
              title={"Закончить редактирование"}
              onСlick={() => openActivitiesModal(false)}
              fontSize={"14px"}
              showShadow={false}
            />
          </div>
        </CustomDialog>
      </div>
      <div className="flex flex-row gap-[50px]">
        <div className="describtion_and_features_column">
          {/* describtion */}
          <div className="describtion_to_activity">
            {!isDescribtionEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Описание"}
                  text2={"Изменить"}
                  onclick={() => setDescribtionEditting(true)}
                />
                <div className="text-[14px] font-normal leading-[14px]">
                  {activityDescribtion}
                </div>
              </>
            )}
            {isDescribtionEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Описание"}
                  text2={"Отменить"}
                  onclick={() => setDescribtionEditting(false)}
                  isRedText={isDescribtionEdittingEnabled}
                />
                <EditableTextfield
                  value={activityDescribtion}
                  handleChange={handleSaveDescribtion}
                  fontsize={"13px"}
                  lineheight={"14px"}
                  minHeight={"90px"}
                />
              </>
            )}
          </div>

          <div className="features">
            {!isFeaturesEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Особенности посещения"}
                  text2={"Изменить"}
                  isRedText={isFeaturesEdittingEnabled}
                  onclick={() => setFeaturesEditting(true)}
                />
                <ul className="marked_list">
                  <li>{activityPeculiarities} </li>
                  {/* {activityPeculiarities.map((item, index) => (
                    <li key={index}>{item} </li>
                  ))} */}
                </ul>
              </>
            )}
            {isFeaturesEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Особенности посещения"}
                  text2={"Отменить"}
                  isRedText={isFeaturesEdittingEnabled}
                  onclick={() => setFeaturesEditting(false)}
                />
                <EditableFeaturesTextfield
                  handleChange={handleSaveFeatures}
                  fontsize={"13px"}
                  lineheight={"14px"}
                  peculiarities={[]}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[10px] w-[609px] ">
          {!isEdittingPhotosEnabled && (
            <TextAndTextButton
              text1={"Фотографии"}
              text2={photosOfSelectedActivity.length > 0 ? "Удалить фото" : ""}
              isRedText={isEdittingPhotosEnabled}
              onclick={() =>
                photosOfSelectedActivity.length > 0
                  ? setPhotosEditting(true)
                  : {}
              }
            />
          )}
          {isEdittingPhotosEnabled && (
            <TextAndTextButton
              text1={"Фотографии"}
              text2={"Готово"}
              onclick={() => setPhotosEditting(false)}
            />
          )}
          <div className="recomendations_to_photo">
            <p>Рекомендуемые форматы для загрузки: jpeg, png</p>
            <p>Минимально допустимая сторона фотографии: 1080px</p>
          </div>

          {/* Container with photos */}
          <div className="activity_photos_container">
            {!isEdittingPhotosEnabled &&
              photosOfSelectedActivity.map((item, index) => (
                <img
                  className="activity_each_photo"
                  key={index}
                  src={item}
                  alt=""
                  onClick={() => {
                    showPhotoInDialog(true);
                    setPhotoToBeShownInDialog(item);
                  }}
                  draggable={true}
                  onDragStart={() => (draggedItemRef.current = index)}
                  onDragEnter={() => (draggedOverRef.current = index)}
                  onDragEnd={handleSortingPhotos}
                  onDragOver={(e) => e.preventDefault()}
                  //
                />
              ))}
            {showPhotoInDialog && (
              <CustomDialog
                isOpened={isPhotoShownInDialog}
                closeOnTapOutside={()=>showPhotoInDialog(false)}
              >
                <img src={photoToShowInDialog} alt="" />
              </CustomDialog>
            )}
            {isEdittingPhotosEnabled &&
              photosOfSelectedActivity.map((item, index) => (
                <button key={index} className="activity_each_photo_editting">
                  <img
                    src={item}
                    alt=""
                    className="rounded-[8px] h-full w-full object-cover"
                    draggable={false}
                  />
                  <img
                    className="delete-icon"
                    src={deleteSvg}
                    alt=""
                    onClick={() => {
                      handleRemovingActivityPhotos(item);
                    }}
                    draggable={false}
                  />
                </button>
              ))}
            {!isEdittingPhotosEnabled && (
              <>
                <img
                  src={addPhotoSvg}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={handleClick} // нажимаем как бы на input file
                />
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleNewPhoto}
                  style={{ display: "none" }} // Скрываем input
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ name, onclick, isActive }) {
  return (
    <button className={isActive ? "chip_active" : "chip"} onClick={onclick}>
      {name}
    </button>
  );
}

function EditableFeaturesTextfield({
  handleChange,
  fontsize,
  lineheight,
  peculiarities,
}) {
  // Join the array with newline and bullet point for display in textarea
  const initialFeaturesString = peculiarities.join("\n• ");

  // Set this string as the initial value for  textarea
  const [tempValue, setTempValue] = useState(`• ${initialFeaturesString}`);

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
    handleChange(tempValue); // Call handleChange with the current value of the textarea
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

function EachActivity({
  title,
  onclick,
  isActive,
  onRemoveClicked,
  onEditClicked,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
}) {
  return (
    <div
      className={isActive ? "isActive" : "each_activity"}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <img
        style={{ cursor: "pointer" }}
        src={removeActivitySvg}
        alt=""
        onClick={onRemoveClicked}
      />
      <p onClick={onclick}>{title}</p>
      <img
        style={{ cursor: "pointer" }}
        className="edit_icon"
        onClick={onEditClicked}
        src={editActivitySvg}
        alt=""
      />
    </div>
  );
}

function AddActivity({ onclick }) {
  return (
    <div className="add_activity">
      <img src={AddActivitySvg} alt="" />
      <button onClick={onclick}>Добавить</button>
    </div>
  );
}
