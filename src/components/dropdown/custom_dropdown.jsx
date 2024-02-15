import React from "react";
import arrowDownSvg from "../../assets/svg/arrow_down.svg";

import "./custom_dropdown.css";

export default function CustomDropdown({
  isDropDownOpened,
  text,
  openCloseDropDown,
  map,
  maxHeight,
  zIndex,
  isLoading,
  loadingText,
  isError,
}) {
  return (
    <div className="column" style={{ zIndex: zIndex }}>
      <button
        style={{
          border: isError ? "1px solid rgba(255, 136, 136, 1)" : null,
        }}
        className={
          isDropDownOpened ? "dropdown_header_opened" : "dropdown_header"
        }
        onClick={openCloseDropDown}
      >
        <div className="text-[14px] font-medium">{text}</div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>
      {isDropDownOpened && (
        <div className="dropdownBody" style={{ maxHeight: maxHeight }}>
          {isLoading && <div className="loadingText">{loadingText}</div>}
          {!isLoading && map}
        </div>
      )}
    </div>
  );
}
