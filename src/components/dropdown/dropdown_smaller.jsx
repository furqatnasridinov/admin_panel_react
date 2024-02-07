import React from "react";
import arrowDownSvg from "../../assets/svg/arrow_down.svg";

import "./dropdown_smaller.css";

export default function DropDownSmaller({
  isDropDownOpened,
  text,
  openCloseDropDown,
  map,
  zIndex
}) {
  return (
    <div className="column" style={{ zIndex: zIndex }}>
      <button
        className={
          isDropDownOpened ? "dropdown_smaller_header_opened" : "dropdown_smaller_header"
        }
        onClick={openCloseDropDown}
      >
        <div className="text-[14px] font-medium">{text}</div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>
      {isDropDownOpened && <div className="dropdown_body">{map}</div>}
    </div>
  );
}
