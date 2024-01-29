import React from "react";
import "./gym_detailes.css";
import { useState } from "react";
import CustomDropdown from "../../../../components/dropdown/custom_dropdown";

export default function GymDetailesHeader({
  gym,
  listOfGyms,
  showDropDown,
  selectAnotherGym,
}) {
  const [isDropDownOpened, openDropDown] = useState(false);

  function openCloseDropDown() {
    openDropDown(!isDropDownOpened);
  }

  function setCurrentGymAndPop(gym) {
    try {
      selectAnotherGym(gym);
      openCloseDropDown();
    } catch (error) {
      alert(`setCurrentGymAndPop ${error}`);
    }
  }

  return (
    <div className="h-fit mb-[10px] pl-[35px] pr-[19px] py-[21px] bg-white flex flex-row items-center rounded-[16px] ">
      <div className="text-[14px] font-normal">Ваши заведения</div>

      <div className="slash"> / </div>
      {showDropDown && (
        <CustomDropdown
          text={gym.name}
          isDropDownOpened={isDropDownOpened}
          openCloseDropDown={openCloseDropDown}
          map={listOfGyms.map((item, index) => (
            <button
              key={index}
              className="gym_names"
              onClick={() => setCurrentGymAndPop(item)}
            >
              {item.name}
            </button>
          ))}
        />
      )}
      {!showDropDown && (
        <div className="text-[14px font-normal]">{gym.name}</div>
      )}
    </div>
  );
}
