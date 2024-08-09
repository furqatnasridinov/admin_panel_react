import React from "react";
import arrowDownSvg from "../../assets/svg/arrow_down.svg";
import { HOURS, MINUTES } from "../../dummy_data/dymmy_data";
import { useRef, useEffect } from "react";
import "./styles.css";

export default function DropdownForHours({
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
  isDisabled = false,
}) {
  const hoursContainerRef = useRef(null);
  const minutesContainerRef = useRef(null);
  const headerRef = useRef(null);
  const border = isDisabled ? "1px solid rgba(226, 226, 226, 1)" : "1px solid #77aaf9";
  const textColor = isDisabled ? "rgba(176, 176, 176, 1)" : "black";

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
      const selectedElement = container.querySelector(`.eachNumberSelected`);
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
        style={{ backgroundColor: backgroundColor, border : border }}
        className={isDropDownOpened ? "dropdownHeaderOpenedForHours" : "dropdownHeaderForHours"}
        onClick={isDisabled ? null : openCloseDropDown}
      >
        <div style={{color :textColor}} className="text-[14px] font-medium">{text}</div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9L12 14L17 9" stroke={textColor} stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </button>

      {isDropDownOpened && (
        <div className="dropDownForHoursBody">
          <div className="scrollableHours" ref={hoursContainerRef}>
            <div className="">
              {HOURS.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={selectedHour == item ? "eachNumberSelected" : "eachNumber"}
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
                    className={selectedMinute == item ? "eachNumberSelected" : "eachNumber"}
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
