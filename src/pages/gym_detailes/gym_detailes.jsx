import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import GymDetailesHeader from "./views/gym_detailes_header/gym_detailes_header";
import GymDetailesBodyFirstContainer from "./views/gym_detailes_body/first/gym_detailes_body_first";
import GymDetailesBodySecondContainer from "./views/gym_detailes_body/second/gym_details_body_second";
import Employees from "./views/gym_detailes_body/employees/employees";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOfGyms } from "../../features/list_of_gyms_slice";
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
} from "../../features/activities_slice";
import CustomSnackbar from "../../components/snackbar/custom_snackbar";

export default function GymDetails() {
  let { gymId } = useParams(); // This hooks allows you to extract params from the URL

  const dispatch = useDispatch();
  const listOfGymsSlice = useSelector((state) => state.listOfGyms);
  const currentGymSlice = useSelector((state) => state.currentGym);
  const listOfEmployees = useSelector((state) => state.employees);
  const activitiesSlice = useSelector((state) => state.activities);

  // this useeffect will trigger only once at the beginning
  useEffect(() => {
    // function to get all gyms(to show on dropDown)
    dispatch(getListOfGyms());

    // function to get gymdetailes based on gymID
    dispatch(getCurrentGym(gymId));

    // function to get employees based on gymId
    dispatch(getListOfEmployees(gymId));

    // function to get activities based on gymId
    dispatch(getListOfActivities(gymId));

    // function to get infoFor type
    dispatch(getInfoForType(gymId));

    // function to get allPhotos(all activities)
    dispatch(getPhotos(gymId));
  }, []);

  // here will be functions to get new data`s after selecting another gym from dropdown
  function selectAnotherGym(gym) {
    if (gym.id !== currentGymSlice.currentGym.id) {
      // function to get gymdetailes based on gymnewSelected gymid
      dispatch(getCurrentGym(gym.id));

      // function to get List Of Employees based on gymnewSelected gymid
      dispatch(getListOfEmployees(gym.id));

      // function to get List Of Activities based on gymnewSelected gymid
      dispatch(getListOfActivities(gym.id));

      // function to get infoFor type
      dispatch(getInfoForType(gym.id));

      // function to get all photos(of all activities)
      dispatch(getPhotos(gym.id));
    }
  }

  // after getting list of activities making first of its item as active
  useEffect(() => {
    dispatch(makeFirstItemAsActive());
  }, [activitiesSlice.listOfActivities]); // This useEffect will only run when listOfActivities changes

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
      <div className=" ml-[10px] h-[97vh] overflow-y-auto">
        {currentGymSlice.currentGym != null && (
          <>
            <GymDetailesHeader
              gym={currentGymSlice.currentGym}
              listOfGyms={listOfGymsSlice.data}
              showDropDown={listOfGymsSlice.data.length > 1}
              selectAnotherGym={selectAnotherGym}
            />
            <Employees
              listOfEmployees={listOfEmployees.employees}
              gymId={currentGymSlice.currentGym.id}
              snackbarRef={snackBarRef}
            />
            <GymDetailesBodyFirstContainer
              currentGym={currentGymSlice.currentGym}
              snackbarRef={snackBarRef}
            />
            <GymDetailesBodySecondContainer
              gymId={gymId}
              listOfActivities={activitiesSlice.listOfActivities}
              activityPeculiarities={activitiesSlice.activityPeculiarities}
              activityDescribtion={activitiesSlice.activityDescribtion}
              photosOfSelectedActivity={
                activitiesSlice.photosOfSelectedActivity
              }
              setPhotosOfSelectedActivity={setPhotosOfSelectedActivity}
              snackbarRef={snackBarRef}
            />
            <CustomSnackbar ref={snackBarRef} />
          </>
        )}
      </div>
    )
  );
}
