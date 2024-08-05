import React, { useEffect } from "react";
import "./gym_details_body_second.css";
import TextAndTextButton from "../../../components/text_and_textbutton";
import { useState, useRef } from "react";
import { EditableTextfield } from "../../../../../components/editable_textfield/EditableTextfield";
import deleteSvg from "../../../../../assets/svg/delete.svg";
import addPhotoSvg from "../../../../../assets/svg/add_photo.svg";
import CustomButton from "../../../../../components/button/button";
import CustomDialog from "../../../../../components/dialog/dialog";
import ProgressSnackbar from "../../../../../components/snackbar/progress_snackbar";
import { useDispatch, useSelector } from "react-redux";
import { FeaturesTextField } from "../features_textfield";
import { dragAndDropGymPictures } from "../../../../../features/current_gym_slice";
import closePng from "../../../../../assets/images/close.png"
import AppConstants from "../../../../../config/app_constants";
import {
  dragAndDropActivities,
  selectAnActivity,
  getPhotos,
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
  removeActivityFromListOfActivities,
  returnDeletedActivity,
  addPhotoToSelectedActivity,
  selectSubcategory,
  unsetFirstItemAsActive,
  setPhotosOfSelectedActivity,
  removeSubcategoryFromList, returnDeletedSubcategory
} from "../../../../../features/activities_slice";
import DropDownSmaller from "../../../../../components/dropdown/dropdown_smaller";
import CustomSnackbar from "../../../../../components/snackbar/custom_snackbar";
import { toast } from "react-toastify";
import axiosClient from "../../../../../config/axios_client";
import EachLessonTypeDraggable from "../../../components/EachLessonTypeDraggable";
import EachSubcategoryEditable from "../../../components/EachSubcategoryEditable";
import BackButton from "../../../../../components/button/back_button";
import AddSubcategoryButton from "../../../components/AddSubcategoryButton";

export default function GymDetailesBodySecondContainer({
  listOfActivities,
  activityDescribtion,
  activityPeculiarities,
  gymId,
}) {
  const dispatch = useDispatch();
  const activitiesSlice = useSelector((state) => state.activities);
  const canEdit = useSelector((state) => state.login.canEdit);
  const subcategories = activitiesSlice.subcategoriesOfSelectedActivity || [];
  const selectedSubcategory = activitiesSlice.selectedSubcategory; // {}
  const selectedActivity = activitiesSlice.selectedActivity;
  const photosToShow = activitiesSlice.photosOfSelectedActivity;

  // use states
  const [isDescribtionEdittingEnabled, setDescribtionEditting] = useState(false);
  const [isFeaturesEdittingEnabled, setFeaturesEditting] = useState(false);
  const [isEdittingPhotosEnabled, setPhotosEditting] = useState(false);
  const [isActivitiesModalOpened, openActivitiesModal] = useState(false);
  const [isPhotoShownInDialog, showPhotoInDialog] = useState(false);
  const [photoToShowInDialog, setPhotoToBeShownInDialog] = useState("");
  const [isDropDrownShown, showDropDown] = useState(false);
  const [isDropDownOpened, openDropDown] = useState(false);
  const [cancelDeleteTimeouSub, setCancelDeleteTimeoutSub] = useState([]);
  const [cancelDeleteTimeoutPhotos, setCancelDeleteTimeoutPhotos] = useState([]);
  const [cancelDeleteTimeoutActivities, setCancelDeleteTimeoutActivities] = useState([]);
  const [activityDescribtionNotValidated, setActivityDescribtionNotValidated] = useState(false);
  const [positionOfPhoto, setPositionOfPhoto] = useState(0);
  const [positionOfActivity, setPositionOfActivity] = useState(0);
  const [addLessonTypeClicked, setAddLessonTypeClicked] = useState(false);
  const [addSubcategoryClicked, setAddSubcategoryClicked] = useState(false);
  const [inheritance, setInheritance] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [updatedSubcategories, setUpdatedSubcategories] = useState(subcategories);
  const [updatedPhotos, setUpdatePhotos] = useState(photosToShow);
  const [draggedPhotoIndex, setDraggedPhotoIndex] = useState(null);
  // use refs
  const hiddenFileInput = useRef(null);
  const deletePhotosSnackRef = useRef();
  const deleteActivitiesSnackRef = useRef();
  const blueBorderedContainerRef = useRef(null);
  const progressSnackbarRef = useRef(null);
  const deleteSubRef = useRef(null);
  const draggedItemRef = useRef(null);
  const draggedActivityRef = useRef(null);

  // передаем это на кнопку добавления фото,(как бы через ref, нажимаем на саму input file которого скрыли)
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  async function handleSortingPhotos() {
    const dublicatedList = [...photosToShow];
    //remove and save dragged item
    const draggedItemContent = dublicatedList.splice(
      draggedItemRef.current,
      1
    )[0];
    const request = {
      gymId: gymId,
      url: draggedItemContent,
      orderNumber: positionOfPhoto,
    };
    await dispatch(dragAndDropGymPictures(request));
    dispatch(getPhotos(gymId));
    // reset the position ref
    draggedItemRef.current = null;
  }

  async function handleSortingActivities() {
    // creating duplicate of list
    const dublicatedList = [...listOfActivities];
    // get dragged activty
    const draggedItemContent = dublicatedList.splice(
      draggedActivityRef.current,
      1
    )[0];
    // dispatch
    const request = {
      gymId: gymId,
      lessonType: draggedItemContent,
      orderNumber: positionOfActivity,
    };
    await dispatch(dragAndDropActivities(request));
    dispatch(getListOfActivities(gymId));
    // reset the position ref
    draggedActivityRef.current = null;
  }

  function scrollToBottom() {
    const container = blueBorderedContainerRef.current;
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 0);
  }

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (index) => {
   // const draggedOverItem = updatedSubcategories[index];

    if (draggedItemIndex === index) {
      return;
    }

    let newSubcategories = updatedSubcategories.filter((_, idx) => idx !== draggedItemIndex);
    newSubcategories.splice(index, 0, updatedSubcategories[draggedItemIndex]);

    setDraggedItemIndex(index);
    setUpdatedSubcategories(newSubcategories);
  };

  const handleDragEnd = () => {
    // Update orderNumber based on new position
    const reorderedSubcategories = updatedSubcategories.map((subcategory, index) => ({
      ...subcategory,
      orderNumber: index + 1,
    }));

    setUpdatedSubcategories(reorderedSubcategories);
    // Dispatch an action or update state with the new order
    dndSubcategoriesRequest(reorderedSubcategories);
  };

  function handleDragStartPhoto(index) {
    setDraggedPhotoIndex(index);
  }

  function handleDragOverPhoto(index) {
    if (draggedPhotoIndex === index) {
      return;
    } else {
      let newPhotos = updatedPhotos.filter((_, idx) => idx !== draggedPhotoIndex);
      newPhotos.splice(index, 0, updatedPhotos[draggedPhotoIndex]);
      setDraggedPhotoIndex(index);
      setUpdatePhotos(newPhotos);
    }
  }

  function handleDragEndPhoto() {
    const reorderedPhotos = updatedPhotos.map((photo, index) => ({
      ...photo,
      orderNumber: index + 1,
    }));
    setUpdatePhotos(reorderedPhotos);
    const updatedSubcategory = {
      ...selectedSubcategory,
      gymSubActivePictures: reorderedPhotos,
    };
    const oldSubcategories = subcategories;
    // Create a new array for the updated subcategories list
    const updatedSubcategories = subcategories.map(subcategory =>
      subcategory.id === selectedSubcategory.id ? updatedSubcategory : subcategory
    );
    setUpdatedSubcategories(updatedSubcategories);
    dndSubcategoriesRequest(reorderedPhotos);
  }

  function patchDescribtion(){
    const newJson = {
      id: selectedSubcategory?.id,
      inheritance: selectedSubcategory?.inheritance,
      name: selectedSubcategory?.name,
      orderNumber: selectedSubcategory?.orderNumber,
      peculiarities: selectedSubcategory?.peculiarities,
      typeDescription: selectedSubcategory?.inheritance ? selectedSubcategory?.typeDescription : activityDescribtion,
    };
    // remove old subcategory from the list and add new one
    const newList = subcategories.map((item) =>
      item.id === newJson?.id ? newJson : item
    );
    const data = {
      gymSubActiveInfo: newList,
      lessonType: selectedActivity,
    };
    if (selectedSubcategory?.inheritance) {
      data.typeDescription = activityDescribtion;
    }
    console.log(JSON.stringify(data));
    axiosClient.patch(`api/admin/gyms/${gymId}`, data)
    .then((response) => {
      if (response.status === 200) {
        toast.success("Описание успешно изменено");
        if (selectedSubcategory?.inheritance) {
          dispatch(getInfoForType(gymId));
        }else{
          dispatch(unsetFirstItemAsActive());
          dispatch(getListOfActivities(gymId));
        }
        setDescribtionEditting(false);
        dispatch(resetChanges());
        setActivityDescribtionNotValidated(false);
      }
    })
    .catch((error) => {
      toast.error("Ошибка при изменении описания" + error);
    });
    
  }

  function pathcPeculiarities(){
    if (
      activityPeculiarities === "1" ||
      activityPeculiarities === "1." ||
      activityPeculiarities === "1. "
    ) {
      activityPeculiarities = "";
    }
    const newJson = {
      id: selectedSubcategory?.id,
      inheritance: selectedSubcategory?.inheritance,
      name: selectedSubcategory?.name,
      orderNumber: selectedSubcategory?.orderNumber,
      peculiarities: selectedSubcategory?.inheritance ? selectedSubcategory?.peculiarities : activityPeculiarities,
      typeDescription: selectedSubcategory?.typeDescription,
    };
    // remove old subcategory from the list and add new one
    const newList = subcategories.map((item) =>
      item.id === newJson?.id ? newJson : item
    );
    const data = {
      gymSubActiveInfo: newList,
      lessonType: selectedActivity,
    };
    if (selectedSubcategory?.inheritance) {
      data.peculiarities = activityPeculiarities;
    };
    console.log(JSON.stringify(data));
    axiosClient.patch(`api/admin/gyms/${gymId}`, data)
    .then((response) => {
      if (response.status === 200) {
        toast.success("Описание успешно изменено");
        if (selectedSubcategory?.inheritance) {
          dispatch(getInfoForType(gymId));
        }else{
          dispatch(unsetFirstItemAsActive());
          dispatch(getListOfActivities(gymId));
        }
        setFeaturesEditting(false);
        dispatch(resetChanges());
      }
    })
    .catch((error) => {
      toast.error("Ошибка при изменении описания" + error);
    });
  }

  async function addPhoto({files}){
    const isInherited = selectedSubcategory && selectedSubcategory?.inheritance;
    const body = {
      id: gymId,
      files: files,
      type: selectedActivity,
      isInherited : isInherited,
      subCategoryId: selectedSubcategory?.id
    };
    await dispatch(addPhotoToSelectedActivity(body));
    if (isInherited) {
      dispatch(getPhotos(gymId));
    }
    dispatch(unsetFirstItemAsActive());
    await dispatch(getListOfActivities(gymId));
    dispatch(setPhotosOfSelectedActivity());
  }

  function deleteSubcategoryRequest(id) {
    const newList = subcategories.filter((item) => item.id !== id);
    const data = {
      gymSubActiveInfo: newList,
      lessonType: selectedActivity,
    };
    console.log(JSON.stringify(data));
    axiosClient.patch(`api/admin/gyms/${gymId}`, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Подгруппа успешно удалена");
          dispatch(unsetFirstItemAsActive());
          dispatch(getListOfActivities(gymId));
        }
      })
      .catch((error) => {
        toast.error("Error while deleting subcategory" + error);
      });
  }

  function dndSubcategoriesRequest(newList) {
    const data = {
      gymSubActiveInfo: newList,
      lessonType: selectedActivity,
    };
    console.log(JSON.stringify(data));
    axiosClient.patch(`api/admin/gyms/${gymId}`, data)
      .then((response) => {
        if (response.status === 200) {
          //toast.success("Сортировка успешно завершена");
          //dispatch(unsetFirstItemAsActive());
          //dispatch(getListOfActivities(gymId));
        }
      })
      .catch((error) => {
        toast.error("Error while sorting subcategories" + error);
      });
  }

  useEffect(() => {
    if (subcategories !== updatedSubcategories && subcategories.length > 0) {
      setUpdatedSubcategories(subcategories);
    }
    if (subcategories.length === 0 && updatedSubcategories.length > 0) {
      setUpdatedSubcategories([]);
    }
  }, [subcategories]);

  useEffect(() => {
    if (photosToShow !== updatedPhotos && photosToShow.length > 0) {
      setUpdatePhotos(photosToShow);
    }
    if (photosToShow.length === 0 && updatedPhotos.length > 0) {
      setUpdatePhotos([]);
    }
  }, [photosToShow])
  

  return (
    <div className="flex flex-col bg-white h-fit rounded-[16px] p-[32px] gap-[32px]">
      <div className="activities">
        <TextAndTextButton
          text1={"Активности"}
          text2={selectedActivity === null ? "Добавить активности" : "Редактировать список активностей и подгрупп"}
          onclick={() => {openActivitiesModal(true)}}
          showText2 = {canEdit}
        />
        <div className="chips_row ">
          {listOfActivities?.filter((el) => !activitiesSlice.deletedActivities.includes(el))
            .map((activity, index) => {
              return (
                <Chip
                  key={index}
                  name={activity}
                  isActive={activity === selectedActivity}
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
              setAddLessonTypeClicked(false);
              setAddSubcategoryClicked(false);
              setInheritance(null);
            }}
          >
            {/* Activities modal body */}
            <div className="mainContainerActivitiesModal">
              <div className="flex flex-col gap-[5px]">
                <span className="headerH2">
                  Редактирование активностей и подгрупп внутри них
                </span>
                <span className="label2">
                  Выберите активность, чтобы добавить в неё занятия. Подгруппы - это не обязательная опция, вы можете использовать только основные активности.
                  Для изменения порядка используйте перетаскивание мышью. Для переименования кликните два раза по названию.
                </span>
              </div>
              {/* activities and podactivities */}
              <div className="flex flex-row gap-[24px]">
                <div className="colGap10 w-full">
                  <span className="label2bPlus">Ваши активности:</span>
                  <div
                    className="blue_bordered_container"
                    ref={blueBorderedContainerRef}>
                    {listOfActivities.filter((el) => !activitiesSlice.deletedActivities.includes(el))
                      .map((activity, index) => {
                        return (
                          <EachLessonTypeDraggable
                            key={index}
                            title={activity}
                            onclick={() => {dispatch(selectAnActivity(activity))}}
                            onEditClicked={() => { }}
                            onRemoveClicked={async () => {
                              dispatch(removeActivityFromListOfActivities(activity));
                              const cancelTimeOut =
                                deleteActivitiesSnackRef.current.show(
                                  "Вы удалили активность",
                                  // function when time ended
                                  async () => {
                                    const { id, lessonType } = {
                                      id: gymId,
                                      lessonType: activity,
                                    };
                                    await dispatch(deleteActivity({ id, lessonType }));
                                    dispatch(getListOfActivities(gymId));
                                  }
                                );
                              setCancelDeleteTimeoutActivities((prevState) => [
                                ...prevState,
                                cancelTimeOut,
                              ]);
                            }}
                            isActive={activity === selectedActivity}
                            onDragStart={() =>(draggedActivityRef.current = index)}
                            onDragEnter={() => setPositionOfActivity(index + 1)}
                            onDragEnd={handleSortingActivities}
                            onDragOver={(e) => e.preventDefault()}
                          />
                        );
                      })}
                    {/* Кнопка добавить */}
                    {!addLessonTypeClicked &&
                      <div className="rowGap10 ml-[10px] cursor-pointer" onClick={() => {setAddLessonTypeClicked(true); scrollToBottom()}}>
                        <PlusSvg />
                        <span className="label2 text-blue-text">Добавить</span>
                      </div>
                    }
                    {addLessonTypeClicked && 
                      <DropDownSmaller
                        text={"Добавить"}
                        isDropDownOpened={isDropDownOpened || addLessonTypeClicked}
                        openCloseDropDown={() => {
                          if (isDropDownOpened || addLessonTypeClicked) {
                            setAddLessonTypeClicked(false);
                            openDropDown(false);
                          } else {
                            openDropDown(true);
                            scrollToBottom();
                          }
                        }}
                        map={activitiesSlice.allAvailableLessonTypes
                          .filter((el) => !activitiesSlice.listOfActivities.includes(el))
                          .map((item, index) => (
                            <button
                              key={index}
                              className="gym_names"
                              onClick={async () => {
                                const { id, lessonType } = {
                                  id: gymId,
                                  lessonType: item,
                                };
                                await dispatch(
                                  addNewActivity({ id, lessonType }),
                                  openDropDown(false),
                                );
                                dispatch(getListOfActivities(gymId));
                                showDropDown(false);
                                setAddLessonTypeClicked(false);
                              }}
                            >
                              {item}
                            </button>
                          ))}
                      />
                    }
                  </div>
                </div>

                 <div className="colGap10 w-full">
                  <span className="label2bPlus">
                    Подгруппы внутри активности:
                  </span>
                  <div className="blue_bordered_container">
                    {updatedSubcategories && updatedSubcategories.length > 0 &&
                      updatedSubcategories
                        .filter((el) => !activitiesSlice.deletedSubcategories.includes(el))
                        .sort((a, b) => a?.orderNumber - b?.orderNumber)
                        .map((subcategory, index) => (
                          <div
                            key={subcategory.id}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(event) => {
                              handleDragOver(index);
                              event.preventDefault();
                            }}
                            onDragEnd={handleDragEnd}
                            style={{ cursor: 'move' }}
                          >
                            <EachSubcategoryEditable
                              subcategory={subcategory}
                              currentLessonType={selectedActivity}
                              gymId={gymId}
                              nextOrderNumber={subcategories.length + 1}
                              onDeletedSubcategory={() => {
                                dispatch(removeSubcategoryFromList(subcategory));
                                const cancelTimeOut = deleteSubRef.current.show(
                                  "Вы удалили подгруппу",
                                  () => {
                                    deleteSubcategoryRequest(subcategory.id);
                                  }
                                );
                                setCancelDeleteTimeoutSub((prevState) => [
                                  ...prevState,
                                  cancelTimeOut,
                                ]);
                              }}
                            />
                          </div>
                        ))}
                    {/* Кнопка добавить */}
                    <AddSubcategoryButton 
                      onClick={() => {
                        setAddSubcategoryClicked(true);
                        openActivitiesModal(false);
                      }}
                      currentLessonType={selectedActivity}
                      gymId={gymId}
                      showField={inheritance !== null}
                      onDelete={() => {
                        setInheritance(null);
                      }}
                      inheritance={inheritance}
                      nextOrderNumber={subcategories.length + 1}
                    />
                  </div>
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

      {addSubcategoryClicked &&
        <CustomDialog isOpened={addSubcategoryClicked} closeOnTapOutside={() => setAddSubcategoryClicked(false)}>
          <div className="mainContainerActivitiesModal w-[530px]">
            <div className="colGap10">
              <span className="headerH2">Перенести информацию из основной активности?</span>
              <span className="label2">{`Вы добавляете новую подгруппу в активность: “${selectedActivity}”. Хотите перенести из неё Описание, Особенности посещения и Фотографии?`}</span>
            </div>
            <div className="rowGap10">
              <BackButton 
                title={"Нет, заполню позже"} 
                onСlick={()=>{
                  setInheritance(false);
                  setAddSubcategoryClicked(false);
                  openActivitiesModal(true);
                }} 
              />
              
              <CustomButton 
                title={"Да, перенести"} 
                onСlick={()=>{
                  setInheritance(true);
                  setAddSubcategoryClicked(false);
                  openActivitiesModal(true);
                }} 
              />
            </div>
          </div>
        </CustomDialog>
      }

      {updatedSubcategories && updatedSubcategories.length > 0 &&
        <div className="colGap10">
          <span className="label2bPlus">Подгруппы внутри выбранной активности:</span>
          <div className="chips_row ">
            {[...updatedSubcategories]
              .filter((el) => !activitiesSlice.deletedSubcategories.includes(el))
              .sort((a, b) => a?.orderNumber - b?.orderNumber)
              .map((activity) => {
                return (
                  <Chip
                    key={activity?.id}
                    name={activity?.name}
                    isActive={selectedSubcategory?.id === activity?.id}
                    onclick={() => dispatch(selectSubcategory(activity))}
                  />
                );
              })}
          </div>
        </div>
      }


      

      {selectedActivity !== null &&
        <div className="blueBigCard">
            <div className="describtion_and_features_column">
              <span className="headerH1">{selectedSubcategory ? selectedSubcategory?.name : selectedActivity}</span>

              {/* describtion */}
              <div className="describtion_to_activity">
                <TextAndTextButton
                  text1={"Описание"}
                  text2={isDescribtionEdittingEnabled ? "Отменить" : "Изменить"}
                  isRedText={isDescribtionEdittingEnabled}
                  showText2 = {canEdit}
                  onclick={() => {
                    if (!isDescribtionEdittingEnabled) {
                      setDescribtionEditting(true);
                    }else{
                      if (activitiesSlice.isChangesOcurred) {
                      dispatch(getInfoForType(gymId))}
                      setDescribtionEditting(false)}
                  }}/>
               
                  <EditableTextfield
                    value={activityDescribtion}
                    isNotValidated={activityDescribtionNotValidated}
                    isActive={isDescribtionEdittingEnabled}
                    onChange={(e) => {
                      let inputValue = e.target.value;
                      if (inputValue.length > 250) {
                        inputValue = inputValue.substring(0, 250);
                      }
                      dispatch(changeActivityDescribtion(inputValue));
                    }}
                      onButtonClicked={async () => {
                        if (activityDescribtion === "") {
                          setActivityDescribtionNotValidated(true);
                        } else {
                          patchDescribtion();
                        }}}
                      fontsize={"13px"}
                      lineheight={"16px"}
                      maxLength={250}
                      textFieldsMinWidth={"300px"}
                    />
              </div>

              {/* features */}
              <div className="features">
                <TextAndTextButton
                  text1={"Особенности посещения"}
                  text2={isFeaturesEdittingEnabled ? "Отменить" : "Изменить"}
                  isRedText={isFeaturesEdittingEnabled}
                  showText2 = {canEdit}
                  onclick={() =>{
                    if (isFeaturesEdittingEnabled) {
                      if (activitiesSlice.isChangesOcurred) {
                        dispatch(getInfoForType(gymId))}
                        setFeaturesEditting(false);
                      }else{
                        setFeaturesEditting(true)
                      }
                  }}/>  

                  <FeaturesTextField
                    onButtonClicked={()=>pathcPeculiarities()}
                    onChanged={(e) => {dispatch(changeActivityPeculiarities(e.target.value))}}
                    peculiarities={activityPeculiarities}
                    isActive={isFeaturesEdittingEnabled}
                    />
              </div>
            </div>

            <div className="flex flex-col gap-[10px] w-[609px] ">
              <TextAndTextButton
                text1={"Фотографии"}
                text2={isEdittingPhotosEnabled ? "Готово" : photosToShow.length > 0 ? "Удалить фото и редактировать порядок" : ""}
                showText2 = {canEdit}
                onclick={() =>{
                  if (isEdittingPhotosEnabled) {
                    setPhotosEditting(false)
                  }else{
                    if (photosToShow.length) {
                      setPhotosEditting(true)
                    }}}}
              />
              <div className="recomendations_to_photo">
                <p>Рекомендуемые форматы для загрузки: jpeg, png</p>
                <p>Минимально допустимая сторона фотографии: 1080px</p>
              </div>

              {/* Snackbar for deleting photos */}
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

              {/* Snackbar for deleting activities */}
              <CustomSnackbar
                ref={deleteActivitiesSnackRef}
                undoAction={() => {
                  dispatch(returnDeletedActivity());
                  if (cancelDeleteTimeoutActivities.length > 0) {
                    const lastCancelFunction =
                      cancelDeleteTimeoutActivities[
                      cancelDeleteTimeoutActivities.length - 1
                      ];
                    lastCancelFunction();
                    setCancelDeleteTimeoutActivities((prevState) =>
                      prevState.slice(0, -1)
                    );
                  }
                }}
              />

            <CustomSnackbar
              ref={deleteSubRef}
              undoAction={() => {
                dispatch(returnDeletedSubcategory());
                if (cancelDeleteTimeouSub.length > 0) {
                  const lastCancelFunction = cancelDeleteTimeouSub[cancelDeleteTimeouSub.length - 1];
                  lastCancelFunction();
                  setCancelDeleteTimeoutSub((prevState) => prevState.slice(0, -1));
                }
              }}
            />

              {/* Progress snackbar */}
              <ProgressSnackbar
                isLoading={activitiesSlice.isActivityPhotosLoading}
                ref={progressSnackbarRef}
              />

              {/* Container with photos */}
              <div className="activity_photos_container">
                {updatedPhotos && updatedPhotos?.length > 0 && updatedPhotos
                    .filter((el) => !activitiesSlice.deletedPhotos.includes(el))
                    .sort((a, b) => selectedSubcategory?.inheritance ? a?.orderNumber - b?.orderNumber : 0)
                    .map((item, index) => {
                      // Объявляем переменные в области видимости функции map
                      const itemTypeOfIsString = typeof item === "string";
                      const lastDotIndex = (selectedSubcategory?.inheritance === false || !itemTypeOfIsString) ? item?.pictureUrl?.lastIndexOf(".") : item?.lastIndexOf(".");
                      const nameWithoutExtension = (selectedSubcategory?.inheritance === false || !itemTypeOfIsString)  ? item?.pictureUrl?.substring(0, lastDotIndex) : item?.substring(0, lastDotIndex);
                      const extension = (selectedSubcategory?.inheritance === false || !itemTypeOfIsString)  ? item?.pictureUrl?.substring(lastDotIndex + 1) : item?.substring(lastDotIndex + 1);
                      const imageToCompressedFormat = `${nameWithoutExtension}_icon.${extension}`;
                        return (
                          <div style={{cursor : isEdittingPhotosEnabled ? "grab" : "default"}} key={index} className="activity_each_photo_editting">
                            <img
                              src={`${AppConstants.baseUrl}image/${imageToCompressedFormat}`}
                              alt=""
                              className="rounded-[8px] h-full w-full object-cover"
                              draggable={isEdittingPhotosEnabled}
                              onDragStart={() => {
                                if (isEdittingPhotosEnabled) {
                                  if (selectedSubcategory && selectedSubcategory?.inheritance) {
                                    (draggedItemRef.current = index);
                                  }else{
                                    handleDragStartPhoto(index)
                                  }
                                }
                              }}
                              onDragEnter={() => {
                                if (isEdittingPhotosEnabled) {
                                  if (selectedSubcategory && selectedSubcategory?.inheritance) {
                                    setPositionOfPhoto(index + 1);
                                  }
                                }
                              }}
                              onDragEnd={()=>{
                                if (isEdittingPhotosEnabled) {
                                  if (selectedSubcategory && selectedSubcategory?.inheritance) {
                                    handleSortingPhotos();
                                  }else{
                                    handleDragEndPhoto();
                                  }
                                }
                              }}
                              onDragOver={(e) => {
                                if (isEdittingPhotosEnabled) {
                                  if (!selectedSubcategory?.inheritance) {
                                    handleDragOverPhoto(index);
                                  }
                                  e.preventDefault();
                                }
                              }}/>
                            {isEdittingPhotosEnabled &&
                              <img
                                className="delete-icon"
                                src={deleteSvg}
                                alt="deleteSvg"
                                onClick={async () => {
                                  dispatch(removePhotoFromSelectedActivityPhotos(item));
                                  deletePhotosSnackRef.current.showSnackbars();
                                  const isInherited = !selectedSubcategory ? false : selectedSubcategory?.inheritance;
                                  const cancelTimeOut =
                                    deletePhotosSnackRef.current.show(
                                      "Вы удалили фото",
                                      // function when time ended
                                      async () => {
                                        const data = {
                                          id: gymId,
                                          url: item,
                                          isInherited: isInherited,
                                          subId : selectedSubcategory?.id
                                        };
                                        console.log(JSON.stringify(data));
                                        await dispatch(deleteActivityPhoto(data));
                                        dispatch(getPhotos(gymId));
                                      });
                                  setCancelDeleteTimeoutPhotos((prevState) => [
                                    ...prevState,
                                    cancelTimeOut,
                                  ]);
                                }}
                                draggable={false}
                              />
                            }
                          </div>
                        );
                      }
                    )}
                    {/* plus image (to upload photo) */}
                      {canEdit &&  !isEdittingPhotosEnabled && 
                        <>
                            <img
                              src={addPhotoSvg}
                              alt=""
                              style={{ cursor: "pointer" }}
                              onClick={handleClick}/> 
                            <input
                              type="file"
                              ref={hiddenFileInput}
                              multiple={true}
                              onChange={async (event) => {
                              var files = event.target.files;
                              var convertedFiles = [];
                              if (files.length > 0) {
                                for (let i = 0; i < files.length; i++) {
                                var file = files[i];
                                if (file.type === "image/png") {
                                // convert to jpeg
                                const originalFileName = file.name.replace(".png",".jpeg");
                                const image = await new Promise((resolve) => {
                                  const img = new Image();
                                  img.onload = () => resolve(img);
                                  img.src = URL.createObjectURL(file);
                                });
                                const canvas = document.createElement("canvas");
                                canvas.width = image.width;
                                canvas.height = image.height;
                                const context = canvas.getContext("2d");
                                context.drawImage(image,0,0,image.width,image.height);
                                const jpegURL = canvas.toDataURL("image/jpeg");
                                file = await (await fetch(jpegURL)).blob();
                                file = new File([file], originalFileName, {type: "image/jpeg"});}
                                if (file.type === "image/jpeg") {convertedFiles.push(file)}
                                if (file.type !== "image/jpeg") {toast("Неподдерживаемый формат файла")}}
                                // if convertedFiles includes only jpeg files
                                if (convertedFiles.length > 0) {
                                  deletePhotosSnackRef.current.hideSnackbars();
                                  progressSnackbarRef.current.show("Идет загрузка фото");
                                  addPhoto({files: convertedFiles});
                                }
                              }
                              event.target.value = null}} // Очистить значение элемента ввода файла
                              style={{ display: "none" }} // Скрываем input
                              accept="image/png, image/jpeg"/>
                        </>
                      } 

                {/* Dialog when click photo */}
                {isPhotoShownInDialog && (
                  <CustomDialog
                    isOpened={isPhotoShownInDialog}
                    closeOnTapOutside={() => showPhotoInDialog(false)}>
                    <div className="relative min-h-[600px] min-w-[600px]">
                      <img
                        className="outline-none border-none w-full h-full object-cover"
                        src={`${AppConstants.baseUrl}image/${photoToShowInDialog}`}
                        alt=""/>
                      <div
                        className="closeButton"
                        onClick={() => showPhotoInDialog(false)}>
                        <img src={closePng} alt="" />
                      </div>
                    </div>
                  </CustomDialog>
                )}

                {isEdittingPhotosEnabled &&
                  photosToShow.length === 0 &&
                  // Если режим редактирования включен и нет фотографий, то показываем кнопку добавления
                  setPhotosEditting(false)}
              </div>
            </div>
        </div>
      }

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

function PlusSvg(){
  return <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.38916 6C0.38916 2.68629 3.07545 0 6.38916 0H22.3892C25.7029 0 28.3892 2.68629 28.3892 6V22C28.3892 25.3137 25.7029 28 22.3892 28H6.38916C3.07545 28 0.38916 25.3137 0.38916 22V6Z" fill="#F5F9FF"/>
  <path d="M10.6392 14.5H14.3892M18.1392 14.5H14.3892M14.3892 14.5V10.75M14.3892 14.5V18.25" stroke="#599AFE" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
}