import React from "react";
import "./gym_detailes.css";
import { useState, useRef, useEffect } from "react";
import { gyms } from "../../../../dummy_data/dymmy_data";
import arrowDownSvg from "../../../../assets/svg/arrow_down.svg";

export default function GymDetailesHeader() {
  const [isDropDownOpened, openDropDown] = useState(false);
  const [currentGym, setCurrentGym] = useState("И-Талия");
  const gymNameContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (
      isDropDownOpened &&
      gymNameContainerRef.current &&
      dropdownRef.current
    ) {
      const gymNameContainerWidth = gymNameContainerRef.current.offsetWidth;
      dropdownRef.current.style.width = `${gymNameContainerWidth}px`;
    }
  }, [isDropDownOpened]); // Запускать эффект при изменении состояния выпадающего списка

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

      <button
        ref={gymNameContainerRef}
        className={
          isDropDownOpened ? "gym_name_container_opened" : "gym_name_container"
        }
        onClick={openCloseDropDown}
      >
        <div className="text-[14px] font-medium">{currentGym}</div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>
      {isDropDownOpened && (
        <div ref={dropdownRef} className="dropdown">
          {gyms.map((item, index) => (
            <button
              key={index}
              className="gym_names"
              onClick={() => setCurrentGymAndPop(item.gymName)}
            >
              {item.gymName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
