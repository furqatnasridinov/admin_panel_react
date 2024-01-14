import React from "react";
import "./gym_detailes.css";
import { useState, useRef, useEffect } from "react";
import CustomDropdown from "../../../../components/dropdown/custom_dropdown";

export default function GymDetailesHeader() {
  const [isDropDownOpened, openDropDown] = useState(false);
  const [currentGym, setCurrentGym] = useState("И-Талия");

  function openCloseDropDown() {
    openDropDown(!isDropDownOpened);
  }
  function setCurrentGymAndPop(name) {
    if (currentGym != name) {
      setCurrentGym(name);
      openCloseDropDown();
    }
  }

  return (
    <div className="h-fit mb-[10px] pl-[35px] pr-[19px] py-[21px] bg-white flex flex-row items-center rounded-[16px] ">
      <div className="text-[14px] font-normal">Ваши заведения</div>

      <div className="slash"> / </div>
      <CustomDropdown
        currentGym={currentGym}
        isDropDownOpened={isDropDownOpened}
        openCloseDropDown={openCloseDropDown}
        ongymSelected={setCurrentGymAndPop}
      />
    </div>
  );
}
