import React from "react";
import { gyms } from "../../dummy_data/dymmy_data";
import arrowDownSvg from "../../assets/svg/arrow_down.svg";

import "./custom_dropdown.css";

export default function CustomDropdown({
  isDropDownOpened,
  currentGym,
  openCloseDropDown,
  ongymSelected,
}) {
  return (
    <div className="column">
      <button
        className={
          isDropDownOpened ? "dropdown_header_opened" : "dropdown_header"
        }
        onClick={openCloseDropDown}
      >
        <div className="text-[14px] font-medium">{currentGym}</div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>
      {isDropDownOpened && (
        <div className="dropdown_body">
          {gyms.map((item, index) => (
            <button
              key={index}
              className="gym_names"
              onClick={() => ongymSelected(item.gymName)}
            >
              {item.gymName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
