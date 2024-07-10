import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import "./gym_details.css";
import GymDetailesHeader from "./views/gym_detailes_header/gym_detailes_header";
import GymDetailesBodyFirstContainer from "./views/gym_detailes_body/first/gym_detailes_body_first";
import GymDetailesBodySecondContainer from "./views/gym_detailes_body/second/gym_details_body_second";
import Employees from "./views/gym_detailes_body/employees/employees";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOfGyms } from "../../features/current_gym_slice";
import { getCurrentGym } from "../../features/current_gym_slice";
import { getListOfEmployees } from "../../features/employees_slice";
import {
  getListOfActivities,
  makeFirstItemAsActive,
  getInfoForType,
  setActivityDescribtion,
  setActivityPeculiarities,
  getPhotos,
  setPhotosOfSelectedActivity,
  getAllAvailableLessonTypes,
} from "../../features/activities_slice";
import MessageLikeTopContainer from "../booking_page/message_like_top_container";
import AppConstants from "../../config/app_constants";

export default function GymDetails() {
  let { gymIdFromParams } = useParams(); // This hooks allows you to extract params from the URL
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const employeesSlice = useSelector((state) => state.employees);
  const activitiesSlice = useSelector((state) => state.activities);
  const clientsSlice = useSelector((state) => state.clients);
  const gymId = gymState.currentGym?.id || JSON.parse(sessionStorage.getItem("currentGym"))?.id || gymIdFromParams;

  // this useeffect will trigger only once at the beginning
  useEffect(() => {
    // function to get all gyms(to show on dropDown)
    dispatch(getListOfGyms());

    // function to get gymdetailes based on gymID
    dispatch(getCurrentGym(gymId));

    // function to get employees based on gymId
    if (localStorage.getItem(AppConstants.keyRoleId) === "1" || 
      localStorage.getItem(AppConstants.keyRoleId) === "3") {
      dispatch(getListOfEmployees(gymId));
    }

    // function to get activities based on gymId
    dispatch(getListOfActivities(gymId));

    // function to get infoFor type
    dispatch(getInfoForType(gymId));

    // function to get allPhotos(all activities)
    dispatch(getPhotos(gymId));

    // function to get all available lessontypes to show on dropdown
    dispatch(getAllAvailableLessonTypes());
  }, []);

  // here will be functions to get new data`s after selecting another gym from dropdown
  function selectAnotherGym(gym) {
    if (gym.id !== gymState.currentGym.id) {
      // save gymID to local storage 
      localStorage.setItem(AppConstants.keyGymId, gym.id);
      // function to get gymdetailes based on gymnewSelected gymid
      dispatch(getCurrentGym(gym.id));

      // function to get List Of Employees based on gymnewSelected gymid
      if (localStorage.getItem(AppConstants.keyRoleId) === "1" || 
      localStorage.getItem(AppConstants.keyRoleId) === "3") {
        dispatch(getListOfEmployees(gym.id));
      }

      // function to get List Of Activities based on gymnewSelected gymid
      dispatch(getListOfActivities(gym.id));

      // function to get infoFor type
      dispatch(getInfoForType(gym.id));

      // function to get all photos(of all activities)
      dispatch(getPhotos(gym.id));
    }
  }

  useEffect(() => {
    dispatch(makeFirstItemAsActive());
  }, [activitiesSlice.listOfActivities]);

  useEffect(() => {
    if (activitiesSlice.selectedActivity !== "") {
      // set describtion relatively to selected activity
      dispatch(setActivityDescribtion());

      // set peculiarities relatively to selected activity
      dispatch(setActivityPeculiarities());

      // getting photos relatively to selected activity
      dispatch(setPhotosOfSelectedActivity());
    }
  }, [
    activitiesSlice.selectedActivity,
    activitiesSlice.infoForType,
    activitiesSlice.photosOfAllActivities,
  ]); // calling this after everytime when selectedActivity changes

  // ref for snackbar
  const snackBarRef = useRef(null);

  return (
    console.log("selected act ", activitiesSlice.selectedActivity),
    (
      <div className="gym_details">
        {clientsSlice.waitingForAccept?.length > 0 && (
          <MessageLikeTopContainer />
        )}

        {gymState.currentGym != null && (
          <>
            <GymDetailesHeader
              gym={gymState.currentGym}
              listOfGyms={gymState.listOfGyms}
              showDropDown={gymState.listOfGyms?.length > 1 && !gymState.listOfGymsLoading}
              selectAnotherGym={selectAnotherGym}
            />

            {(localStorage.getItem(AppConstants.keyRoleId) === "1"
              || localStorage.getItem(AppConstants.keyRoleId) === "3") &&
              <Employees
                listOfEmployees={employeesSlice.employees}
                gymId={gymState.currentGym.id}
              />}

            <GymDetailesBodyFirstContainer currentGym={gymState.currentGym} />

            <GymDetailesBodySecondContainer
              listOfActivities={activitiesSlice.listOfActivities}
              activityPeculiarities={activitiesSlice.activityPeculiarities}
              activityDescribtion={activitiesSlice.activityDescribtion}
              setPhotosOfSelectedActivity={setPhotosOfSelectedActivity}
              snackbarRef={snackBarRef}
            />
          </>
        )}
      </div>
    )
  );
}
