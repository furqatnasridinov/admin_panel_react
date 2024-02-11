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
import { useDispatch, useSelector } from "react-redux";
import {
  dragAndDropActivities,
  selectAnActivity,
  getPhotos,
  patchDescriptionOfSelectedActivity,
  patchPeculiaritiesOfSelectedActivity,
  deleteActivityPhoto,
  changeActivityPeculiarities,
  changeActivityDescribtion,
  getInfoForType,
  resetChanges,
  deleteActivity,
  getListOfActivities,
  addNewActivity,
  removePhotoFromSelectedActivityPhotos,
  returnDeletedPhoto,
} from "../../../../../features/activities_slice";
import { addPhotoToSelectedActivity } from "../../../../../features/activities_slice";
import DropDownSmaller from "../../../../../components/dropdown/dropdown_smaller";
import CustomSnackbar from "../../../../../components/snackbar/custom_snackbar";

export default function GymDetailesBodySecondContainer({
  gymId,
  listOfActivities,
  activityDescribtion,
  activityPeculiarities,
  photosOfSelectedActivity,
  setPhotosOfSelectedActivity,
  snackbarRef,
}) {
  const dispatch = useDispatch();
  const activitiesSlice = useSelector((state) => state.activities);

  // use states
  const [isDescribtionEdittingEnabled, setDescribtionEditting] =
    useState(false);
  const [isFeaturesEdittingEnabled, setFeaturesEditting] = useState(false);
  const [isEdittingPhotosEnabled, setPhotosEditting] = useState(false);
  const [isActivitiesModalOpened, openActivitiesModal] = useState(false);
  const [isPhotoShownInDialog, showPhotoInDialog] = useState(false);
  const [photoToShowInDialog, setPhotoToBeShownInDialog] = useState("");
  const [isDropDrownShown, showDropDown] = useState(false);
  const [isDropDownOpened, openDropDown] = useState(false);
  const [cancelDeleteTimeoutPhotos, setCancelDeleteTimeoutPhotos] = useState(
    []
  );

  function openCloseDropDown() {
    if (isDropDownOpened) {
      openDropDown(false);
    } else {
      openDropDown(!isDropDownOpened);
    }
  }

  // use refs
  const hiddenFileInput = useRef(null);
  const deletePhotosSnackRef = useRef();
  const blueBorderedContainerRef = useRef(null);

  // передаем это на кнопку добавления фото,(как бы через ref, нажимаем на саму input file которого скрыли)
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // drad & drop functions for photos
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
    dispatch(dragAndDropActivities(dublicatedList));
  }

  function scrollToOffset(offset) {
    var container = document.querySelector(".blue_bordered_container");
    var offset = 200;
    // Скролл на offset пикселей относительно текущего положения
    container.scrollBy({ top: offset, behavior: "smooth" });
    // Если вам нужно скроллить на абсолютное значение, используйте scrollTo
    //container.scrollTo({ top: offset, behavior: "smooth" });
  }

  return (
    console.log(`selected activity ${activitiesSlice.selectedActivity}`),
    console.log(`activity Describtion ${activityDescribtion}`),
    console.log(`activity pecu ${activityPeculiarities}`),
    (
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
                  isActive={activity === activitiesSlice.selectedActivity}
                  onclick={() => dispatch(selectAnActivity(activity))}
                />
              );
            })}
          </div>
          {isActivitiesModalOpened && (
            <CustomDialog
              isOpened={isActivitiesModalOpened}
              closeOnTapOutside={() => {
                openActivitiesModal(false);
              }}
            >
              {/* Activities modal body */}
              <div className="main_container">
                <div className="flex flex-col gap-[5px]">
                  <div className="text-[16px] font-semibold leading-[16px]">
                    Редактирование активностей
                  </div>
                  <div className="text-[14px] font-normal leading-[16px]">
                    Выберите активность, чтобы добавить в неё занятия.
                    Дополнительные занятия - это не обязательная опция, вы
                    можете использовать только основные активности.
                  </div>
                </div>
                {/* activities and podactivities */}
                <div className="flex flex-row gap-[24px]">
                  <div className="activities_col">
                    <div className="text-[14px] font-bold">
                      Ваши активности:
                    </div>
                    <div
                      className="blue_bordered_container"
                      //ref={blueBorderedContainerRef}
                    >
                      {listOfActivities.map((activity, index) => {
                        return (
                          <EachActivity
                            key={index}
                            title={activity}
                            onclick={() => {
                              dispatch(selectAnActivity(activity));
                            }}
                            onEditClicked={() => {}}
                            onRemoveClicked={async () => {
                              // function to delete activity
                              const { id, lessonType } = {
                                id: gymId,
                                lessonType: activitiesSlice.selectedActivity,
                              };
                              await dispatch(
                                deleteActivity({ id, lessonType })
                              );
                              dispatch(getListOfActivities(gymId));
                            }}
                            isActive={
                              activity === activitiesSlice.selectedActivity
                            }
                            onDragStart={() =>
                              (draggedActivityRef.current = index)
                            }
                            onDragEnter={() =>
                              (draggedOverActivityRef.current = index)
                            }
                            onDragEnd={handleSortingActivities}
                            onDragOver={(e) => e.preventDefault()}
                          />
                        );
                      })}
                      {/* Кнопка добавить */}
                      {!isDropDrownShown && (
                        <div className="add_activity">
                          <img src={AddActivitySvg} alt="" />
                          <button
                            onClick={() => {
                              showDropDown(true);
                            }}
                          >
                            Добавить
                          </button>
                        </div>
                      )}
                      {isDropDrownShown && (
                        <DropDownSmaller
                          text={"Добавить"}
                          isDropDownOpened={isDropDownOpened}
                          openCloseDropDown={() => {
                            if (isDropDownOpened) {
                              openDropDown(false);
                            } else {
                              scrollToOffset(200);
                              openDropDown(true);
                            }
                          }}
                          zIndex={"2"}
                          map={activitiesSlice.allAvailableLessonTypes.map(
                            (item, index) => (
                              <button
                                key={index}
                                className="gym_names"
                                onClick={async () => {
                                  const { id, lessonType } = {
                                    id: gymId,
                                    lessonType: item,
                                  };
                                  await dispatch(
                                    addNewActivity({ id, lessonType })
                                  );
                                  dispatch(getListOfActivities(gymId));
                                  showDropDown(false);
                                }}
                              >
                                {item}
                              </button>
                            )
                          )}
                        />
                      )}
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
          )}
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
                  <div className="text-[13px] font-normal font-inter leading-[14px]">
                    {activityDescribtion}
                  </div>
                </>
              )}
              {isDescribtionEdittingEnabled && (
                <>
                  <TextAndTextButton
                    text1={"Описание"}
                    text2={"Отменить"}
                    onclick={() => {
                      if (activitiesSlice.isChangesOcurred) {
                        dispatch(getInfoForType(gymId));
                      }
                      setDescribtionEditting(false);
                    }}
                    isRedText={isDescribtionEdittingEnabled}
                  />
                  <EditableTextfield
                    value={activityDescribtion}
                    onChange={(e) => {
                      dispatch(changeActivityDescribtion(e.target.value));
                    }}
                    onButtonClicked={async () => {
                      const { id, lessonType, typeDescription } = {
                        id: gymId,
                        lessonType: activitiesSlice.selectedActivity,
                        typeDescription: activityDescribtion,
                      };
                      await dispatch(
                        patchDescriptionOfSelectedActivity({
                          id,
                          lessonType,
                          typeDescription,
                        })
                      );
                      dispatch(getInfoForType(gymId));
                      setDescribtionEditting(false);
                      dispatch(resetChanges());
                    }}
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
                  {activityPeculiarities &&
                    activityPeculiarities.trim() !== "" && (
                      <ul className="marked_list ">
                        <li className="text-[13px] font-normal font-inter">
                          {activityPeculiarities}
                        </li>
                      </ul>
                    )}
                </>
              )}
              {isFeaturesEdittingEnabled && (
                <>
                  <TextAndTextButton
                    text1={"Особенности посещения"}
                    text2={"Отменить"}
                    isRedText={isFeaturesEdittingEnabled}
                    onclick={() => {
                      if (activitiesSlice.isChangesOcurred) {
                        dispatch(getInfoForType(gymId));
                      }
                      setFeaturesEditting(false);
                    }}
                  />
                  <EditableFeaturesTextfield
                    onButtonClicked={async() => {
                      const { id, lessonType, peculiarities } = {
                        id: gymId,
                        lessonType: activitiesSlice.selectedActivity,
                        peculiarities: activityPeculiarities,
                      };
                     await  dispatch(
                        patchPeculiaritiesOfSelectedActivity({
                          id,
                          lessonType,
                          peculiarities,
                        })
                      );
                        dispatch(getInfoForType(gymId));
                      setFeaturesEditting(false);
                      dispatch(resetChanges());
                    }}
                    onChanged={(e) => {
                      dispatch(changeActivityPeculiarities(e.target.value));
                    }}
                    peculiarities={activityPeculiarities}
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[10px] w-[609px] ">
            {!isEdittingPhotosEnabled && (
              <TextAndTextButton
                text1={"Фотографии"}
                text2={
                  photosOfSelectedActivity.length > 0 ? "Удалить фото" : ""
                }
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
            <CustomSnackbar
              ref={deletePhotosSnackRef}
              undoAction={() => {
                dispatch(returnDeletedPhoto());
                if (cancelDeleteTimeoutPhotos.length > 0) {
                  const lastCancelFunction =
                    cancelDeleteTimeoutPhotos[
                      cancelDeleteTimeoutPhotos.length - 1
                    ];
                  lastCancelFunction();
                  setCancelDeleteTimeoutPhotos((prevState) =>
                    prevState.slice(0, -1)
                  );
                }
              }}
            />

            {/* Container with photos */}
            <div className="activity_photos_container">
              {!isEdittingPhotosEnabled &&
                photosOfSelectedActivity
                  .filter((el) => !activitiesSlice.deletedPhotos.includes(el))
                  .map((item, index) => {
                    // Объявляем переменные в области видимости функции map
                    const lastDotIndex = item.lastIndexOf(".");
                    const nameWithoutExtension = item.substring(
                      0,
                      lastDotIndex
                    );
                    const extension = item.substring(lastDotIndex + 1);
                    const imageToCompressedFormat = `${nameWithoutExtension}_icon.${extension}`;

                    // Возвращаем JSX с использованием переменной внутри строки для атрибута src
                    return (
                      <img
                        className="activity_each_photo"
                        key={index}
                        src={`http://77.222.53.122/image/${imageToCompressedFormat}`}
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
                      />
                    );
                  })}
              {showPhotoInDialog && isPhotoShownInDialog && (
                <CustomDialog
                  isOpened={isPhotoShownInDialog}
                  closeOnTapOutside={() => showPhotoInDialog(false)}
                >
                  <img
                    src={`http://77.222.53.122/image/${photoToShowInDialog}`}
                    alt=""
                  />
                </CustomDialog>
              )}

              {isEdittingPhotosEnabled &&
                photosOfSelectedActivity
                  .filter((el) => !activitiesSlice.deletedPhotos.includes(el))
                  .map((item, index) => {
                    const lastDotIndex = item.lastIndexOf(".");
                    const nameWithoutExtension = item.substring(
                      0,
                      lastDotIndex
                    );
                    const extension = item.substring(lastDotIndex + 1);
                    const imageToCompressedFormat = `${nameWithoutExtension}_icon.${extension}`;
                    return (
                      <button
                        key={index}
                        className="activity_each_photo_editting"
                      >
                        <img
                          src={`http://77.222.53.122/image/${imageToCompressedFormat}`}
                          alt=""
                          className="rounded-[8px] h-full w-full object-cover"
                          draggable={false}
                        />
                        <img
                          className="delete-icon"
                          src={deleteSvg}
                          alt=""
                          onClick={async () => {
                            dispatch(
                              removePhotoFromSelectedActivityPhotos(item)
                            );
                            const cancelTimeOut =
                              deletePhotosSnackRef.current.show(
                                "Вы удалили фото",
                                // function when time ended
                                async () => {
                                  const { id, url } = { id: gymId, url: item };
                                  await dispatch(
                                    deleteActivityPhoto({ id, url })
                                  );
                                  dispatch(getPhotos(gymId));
                                }
                              );
                            setCancelDeleteTimeoutPhotos((prevState) => [
                              ...prevState,
                              cancelTimeOut,
                            ]);
                          }}
                          draggable={false}
                        />
                      </button>
                    );
                  })}
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
                    onChange={async (event) => {
                      // Обработчик для добавления новой фотографии
                      const file = event.target.files[0];
                      const { id, files, type } = {
                        id: gymId,
                        files: file,
                        type: activitiesSlice.selectedActivity,
                      };
                      await dispatch(
                        addPhotoToSelectedActivity({ id, files, type })
                      );
                      dispatch(getPhotos(gymId));
                    }}
                    style={{ display: "none" }} // Скрываем input
                  />
                </>
              )}

              {isEdittingPhotosEnabled &&
                photosOfSelectedActivity.length === 0 &&
                // Если режим редактирования включен и нет фотографий, то показываем кнопку добавления
                setPhotosEditting(false)}
            </div>
          </div>
        </div>
      </div>
    )
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
  onChanged,
  fontsize,
  lineheight,
  peculiarities,
  onButtonClicked,
}) {
  // Join the array with newline and bullet point for display in textarea

  // Set this string as the initial value for  textarea
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
        ref={inputRef}
        value={peculiarities}
        //className="textarea-transition"
        onChange={onChanged}
        style={{
          width: "100%",
          padding: "10px 16px 10px 8px",
          border: "1px solid #77AAF9",
          borderRadius: "8px",
          outline: "none",
          maxHeight: "120px",
          resize: "none",
          fontSize: "13px",
          lineHeight: "14px",
          fontFamily: "Inter, sans-serif",
        }}
      />
      <button onClick={onButtonClicked}>
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
