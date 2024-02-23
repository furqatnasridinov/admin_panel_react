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
}) {
  const hoursContainerRef = useRef(null);
  const minutesContainerRef = useRef(null);

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
      if (
        hoursContainerRef.current &&
        !hoursContainerRef.current.contains(event.target) &&
        minutesContainerRef.current &&
        !minutesContainerRef.current.contains(event.target)
      ) {
        openCloseDropDown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hoursContainerRef, minutesContainerRef, openCloseDropDown]);

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
        style={{ backgroundColor: backgroundColor }}
        className={
          isDropDownOpened
            ? "dropdownHeaderOpenedForHours"
            : "dropdownHeaderForHours"
        }
        onClick={openCloseDropDown}
      >
        <div className="text-[14px] font-medium">{text}</div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
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
                    className={
                      selectedHour == item ? "eachNumberSelected" : "eachNumber"
                    }
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
                    className={
                      selectedMinute == item
                        ? "eachNumberSelected"
                        : "eachNumber"
                    }
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
