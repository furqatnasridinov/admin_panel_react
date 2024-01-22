import React from "react";
import { useParams } from "react-router-dom";
import GymDetailesHeader from "./views/gym_detailes_header/gym_detailes_header";
import GymDetailesBodyFirstContainer from "./views/gym_detailes_body/first/gym_detailes_body_first";
import GymDetailesBodySecondContainer from "./views/gym_detailes_body/second/gym_details_body_second";
import Employees from "./views/gym_detailes_body/employees/employees";
import { useEffect, useState } from "react";
import axiosClient from "../../config/axios_client";
import AppConstants from "../../config/app_constants";

export default function GymDetails() {
  let { gymId } = useParams(); // This hooks allows you to extract params from the URL
  const [currentGym, setCurrentGym] = useState(null);
  const [listOfGyms, setListOfGyms] = useState([]);
  const [listOfEmployees, setListOfEmployees] = useState([]);
  const [listOfActivities, setListOfActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [infoForType, setInfoForType] = useState([]);
  const [activityDescribtion, setActivityDescribtion] = useState("");
  const [activityPeculiarities, setActivityPeculiarities] = useState(""); // in future may be list
  const [allPhotos, setAllPhotos] = useState([]);
  const [photosOfSelectedActivity, setPhotosOfSelectedActivity] = useState([]);

  // this useeffect will trigger only once at the beginning
  useEffect(() => {
    // function to get all gyms(to show on dropDown)
    const getGyms = async () => {
      try {
        const response = await axiosClient.get(AppConstants.getGyms);
        if (response.data["operationResult"] === "OK") {
          setListOfGyms(response.data["object"]);
        }
      } catch (error) {
        alert(`getGyms ${error}`);
      }
    };

    // function to get gymdetailes based on gymID
    async function getGymDetails() {
      console.log(`getGymDetails 1 trigered >> gym id  ${gymId}`);
      try {
        const response = await axiosClient.get(`api/admin/gyms/${gymId}`);
        if (response.data["operationResult"] === "OK") {
          setCurrentGym(response.data["object"]);
        } else {
          alert("operationResult is not OK");
        }
      } catch (error) {
        alert(`getGymDetails ${error}`);
      }
    }

    // function to get employees based on gymId
    async function getListOfEmployees() {
      try {
        const response = await axiosClient.get(
          `api/admin/gyms/${gymId}/workers`
        );
        if (response.data["operationResult"] === "OK") {
          setListOfEmployees(response.data["object"]);
        } else {
          alert("operationResult is not OK");
        }
      } catch (error) {
        alert(`getListOfEmployees ${error}`);
      }
    }

    // function to get activities based on gymId
    async function getActivities() {
      try {
        const response = await axiosClient.get(`api/gym/${gymId}/types`);
        if (response.data["operationResult"] === "OK") {
          setListOfActivities(response.data["object"]);
        } else {
          alert("operationResult is not OK");
        }
      } catch (error) {
        alert(`getActivities ${error}`);
      }
    }

    // function to get infoFor type
    async function getInfoForType() {
      try {
        const response = await axiosClient.get(`api/gym/${gymId}/infoForType`);
        if (response.data["operationResult"] === "OK") {
          setInfoForType(response.data["object"]);
        } else {
          alert("operationResult is not OK");
        }
      } catch (error) {
        alert(`getInfoForType ${error}`);
      }
    }

    // function to get allPhotos(all activities)
    async function getAllPhotos() {
      try {
        const response = await axiosClient.get(`api/gym/${gymId}/photo`);
        if (response.data["operationResult"] === "OK") {
          setAllPhotos(response.data["object"]);
        } else {
          alert("operationResult is not OK");
        }
      } catch (error) {
        alert(`getAllPhotos ${error}`);
      }
    }

    getGyms();
    getGymDetails();
    getListOfEmployees();
    getActivities();
    getInfoForType();
    getAllPhotos();
  }, []);

  // here will be functions to get new data`s after selecting another gym from dropdown
  function selectAnotherGym(gym) {
    if (gym.id !== currentGym.id) {
      // function to get gymdetailes based on gymnewSelected gymid
      async function getGymDetails() {
        console.log(`getGymDetails 2 trigered >> selected id  ${gym.name}`);
        try {
          const response = await axiosClient.get(`api/admin/gyms/${gym.id}`);
          if (response.data["operationResult"] === "OK") {
            setCurrentGym(response.data["object"]);
          } else {
            alert("operationResult is not OK");
          }
        } catch (error) {
          alert(`getGymDetails ${error}`);
        }
      }

      // function to get List Of Employees based on gymnewSelected gymid
      async function getListOfEmployees() {
        try {
          const response = await axiosClient.get(
            `api/admin/gyms/${gym.id}/workers`
          );
          if (response.data["operationResult"] === "OK") {
            setListOfEmployees(response.data["object"]);
          } else {
            alert("operationResult is not OK");
          }
        } catch (error) {
          alert(`getListOfEmployees ${error}`);
        }
      }

      // function to get List Of Activities based on gymnewSelected gymid
      async function getActivities() {
        try {
          const response = await axiosClient.get(`api/gym/${gym.id}/types`);
          if (response.data["operationResult"] === "OK") {
            setListOfActivities(response.data["object"]);
          } else {
            alert("operationResult is not OK");
          }
        } catch (error) {
          alert(`getActivities ${error}`);
        }
      }

      // function to get infoFor type
      async function getInfoForType() {
        try {
          const response = await axiosClient.get(
            `api/gym/${gym.id}/infoForType`
          );
          if (response.data["operationResult"] === "OK") {
            setInfoForType(response.data["object"]);
          } else {
            alert("operationResult is not OK");
          }
        } catch (error) {
          alert(`getActivities ${error}`);
        }
      }

      // function to get all photos(of all activities)
      async function getAllPhotos() {
        try {
          const response = await axiosClient.get(`api/gym/${gym.id}/photo`);
          if (response.data["operationResult"] === "OK") {
            setAllPhotos(response.data["object"]);
            console.log("mana 2", allPhotos);
          } else {
            alert("operationResult is not OK");
          }
        } catch (error) {
          alert(`getAllPhotos ${error}`);
        }
      }

      getGymDetails();
      getInfoForType();
      getListOfEmployees();
      getActivities();
      getAllPhotos();
    }
  }

  // after getting list of activities making first of its item as active
  useEffect(() => {
    if (listOfActivities.length > 0) {
      setSelectedActivity(listOfActivities[0]);
    }
  }, [listOfActivities]); // This useEffect will only run when listOfActivities changes

  useEffect(() => {
    console.log("useEffect selectedActivity");
    if (selectedActivity !== "") {
      console.log("useEffect selectedActivity selectedActivity !==");
      try {
        setActivityDescribtion(
          Array.isArray(infoForType[selectedActivity])
            ? infoForType[selectedActivity]?.[0]?.["typeDescription"]
            : undefined
        );
        setActivityPeculiarities(
          Array.isArray(infoForType[selectedActivity])
            ? infoForType[selectedActivity]?.[0]?.["peculiarities"]
            : undefined
        );
      } catch (error) {
        alert(error);
      }

      // getting photos relatively to selected activity
      if (allPhotos[selectedActivity]) {
        console.log("allPhotos[selectedActivity] true");
        const notModifiedList = [...allPhotos[selectedActivity]];
        const modifiedList = notModifiedList.map((element) => {
          return `http://77.222.53.122/image/${element}`;
        });
        setPhotosOfSelectedActivity(modifiedList);
      } else {
        console.log("allPhotos[selectedActivity] false");
        console.log("allPhotos lenth", allPhotos.length);
        setPhotosOfSelectedActivity([]);
      }
    }
  }, [selectedActivity]); // calling this after everytime when selectedActivity changes

  return (
    console.log("phooto sel act ", photosOfSelectedActivity),
    (
      <div className=" ml-[10px] h-[97vh] overflow-y-auto">
        {currentGym != null && (
          <>
            <GymDetailesHeader
              gym={currentGym}
              listOfGyms={listOfGyms}
              showDropDown={listOfGyms.length > 1}
              selectAnotherGym={selectAnotherGym}
            />
            <Employees listOfEmployees={listOfEmployees} />
            <GymDetailesBodyFirstContainer
              currentGym={currentGym}
              setCurrentGym={setCurrentGym}
            />
            <GymDetailesBodySecondContainer
              listOfActivities={listOfActivities}
              setListOfactivities={setListOfActivities}
              selectedActivity={selectedActivity}
              setselectedActivity={setSelectedActivity}
              activityPeculiarities={activityPeculiarities}
              activityDescribtion={activityDescribtion}
              setActivityDescribtion={setActivityDescribtion}
              setActivityPeculiarities={setActivityPeculiarities}
              photosOfSelectedActivity={photosOfSelectedActivity}
              setPhotosOfSelectedActivity={setPhotosOfSelectedActivity}
            />
          </>
        )}
      </div>
    )
  );
}
