import React from "react";
import arrowDownSvg from "../../../assets/svg/arrow_down.svg";
import { HOURS, MINUTES } from "../../../dummy_data/dymmy_data";
import { useRef, useEffect } from "react";
import "./index.css";

export default function CrmDropdownHours({
  isDropDownOpened,
  text,
  openCloseDropDown,
  zIndex,
  setHours,
  setMinutes,
  selectedMinute,
  selectedHour,
  backgroundColor,
  closeOntapOutside,
}) {
  const hoursContainerRef = useRef(null);
  const minutesContainerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (isDropDownOpened) {
      setTimeout(() => {
        centerSelectedItem(hoursContainerRef.current, selectedHour);
      }, 200);
    }
  }, [isDropDownOpened, selectedHour]);

  // close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        if (
          hoursContainerRef.current &&
          !hoursContainerRef.current.contains(event.target) &&
          minutesContainerRef.current &&
          !minutesContainerRef.current.contains(event.target)
        ) {
          closeOntapOutside();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hoursContainerRef, minutesContainerRef]);

  // Функция для центрирования выбранного элемента
  function centerSelectedItem(container, selectedItem) {
    if (container && selectedItem != null) {
      const selectedElement = container.querySelector(`.eachNumberSelectedCrm`);
      if (selectedElement) {
        const selectedElementTop = selectedElement.offsetTop;
        const selectedElementHeight = selectedElement.offsetHeight;
        const containerHeight = container.offsetHeight;

        // Скроллим контейнер, чтобы выбранный элемент оказался по центру
        container.scrollTop =
          selectedElementTop - containerHeight / 2 + selectedElementHeight / 2;
      }
    }
  }

  return (
    <div className="column" style={{ zIndex: zIndex }}>
      <button
        ref={headerRef}
        style={{ backgroundColor: backgroundColor }}
        className={isDropDownOpened ? "dropdownHeaderOpenedForHoursCrm" : "dropdownHeaderForHoursCrm"}
        onClick={openCloseDropDown}
      >
        <div className="text-[14px] font-medium">{text}</div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>

      {isDropDownOpened && (
        <div className="dropDownForHoursBodyCrm">
          <div className="scrollableHours" ref={hoursContainerRef}>
            <div className="">
              {HOURS.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={selectedHour == item ? "eachNumberSelectedCrm" : "eachNumber"}
                    onClick={() => setHours(item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="flex justify-center w-[2px] h-[80%]  bg-gray-200 " />

          <div className="scrollableMinutes" ref={minutesContainerRef}>
            <div className="">
              {MINUTES.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={selectedMinute == item ? "eachNumberSelectedCrm" : "eachNumber"}
                    onClick={() => {
                      setMinutes(item);
                      openCloseDropDown();
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
