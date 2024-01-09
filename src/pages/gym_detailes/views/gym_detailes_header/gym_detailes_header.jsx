import React from "react";
import "./gym_detailes.css";
import { useState } from "react";
import arrowDownSvg from "../../../../assets/svg/arrow_down.svg"

export default function GymDetailesHeader() {
  const [isDropDownOpened, openDropDown] = useState(false)
  function openCloseDropDown(){
    if (isDropDownOpened) {
      openDropDown(false);
    }else{
      openDropDown(true);
    }
  }
  return (
    <div className="h-fit mb-[10px] pl-[35px] pr-[19px] py-[21px] bg-white flex flex-row items-center rounded-[16px] ">
      <div className="text-[14px] font-normal">Ваши заведения</div>

      <div className="slash"> / </div>

      <button className={isDropDownOpened ? "gym_name_container_opened" : "gym_name_container"} onClick={openCloseDropDown}>
        <div className="text-[14px] font-medium">И-Талия</div>
        <div  className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
            <img src={arrowDownSvg} alt="" />
        </div>
      </button>
    </div>
  );
}
