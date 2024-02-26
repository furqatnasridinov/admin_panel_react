import React, { Fragment } from "react";
import "./styles.css";
import checkboxEnabledSvg from "../../assets/svg/done.svg";
import checkboxDisabledSvg from "../../assets/svg/checkbox_disabled.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CustomDropdown from "../../components/dropdown/custom_dropdown";
import questionLogo from "../../assets/svg/questionModal.svg";
import BackButton from "../../components/button/back_button";
import CustomButton from "../../components/button/button";
import { rejectClient, getNewClients } from "../../features/clients_slice";
import { restrictLesson } from "../../features/schedule_slice";

export default function NoPlacesBlueContainer({ event, onPop }) {
  // redux
  const dispatch = useDispatch();

  // use states
  const [isCheckboxEnabled, setIsCheckboxEnabled] = useState(false);
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);
  const [limit, setLimit] = useState(20);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY + rect.height - 70, // Центрируем по вертикали относительно иконки
      left: rect.left + window.scrollX + 120, // Сдвигаем на 50px правее от иконки
    });
    setIsTooltipVisible(true);
  };

  let numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <Fragment>
      <div className="blueContainer">
        <div className="flex flex-col gap-[2px]">
          <div className="text-[14px] font-bold leading-[16px]">
            Включить ограничение на количество записей для этого занятия?
          </div>
          <div className="text-[13px] font-medium leading-[16px]">
            Если включить данный параметр, то для этого занятия и всех его
            повторений будет задано ограничение на количество записей в день.
          </div>
        </div>

        <div className="flex flex-row gap-[10px] items-center">
          <img
            className="w-[24px] h-[24px]"
            src={isCheckboxEnabled ? checkboxEnabledSvg : checkboxDisabledSvg}
            alt="checkbox"
            onClick={() => {
              setIsCheckboxEnabled(!isCheckboxEnabled);
            }}
          />
          <div className="flex flex-row gap-[4px]">
            <div className="text-[13px] font-medium leading-[15px]">
              Ограничение на количество записей в день.
            </div>
            {isCheckboxEnabled && (
              <div className="text-[13px] font-medium leading-[15px]">
                Не более
              </div>
            )}
          </div>

          {isCheckboxEnabled && (
            <div className="flex flex-row items-center gap-[33px] ">
              <CustomDropdown
                isDropDownOpened={isDropDownOpened}
                text={limit}
                maxHeight={200}
                maxWidth={"80px"}
                gap={"0px"}
                backgroundColor={"white"}
                padding={"10px"}
                openCloseDropDown={() => {
                  setIsDropDownOpened(!isDropDownOpened);
                }}
                map={numbers.map((number) => {
                  return (
                    <div
                      className="numbers"
                      onClick={() => {
                        setLimit(number);
                        setIsDropDownOpened(false);
                      }}
                    >
                      {number}
                    </div>
                  );
                })}
              />
              <div className="relative w-[24px] h-[24px] bg-white flex items-center justify-center rounded-[50%]">
                <img
                  className="cursor-pointer"
                  src={questionLogo}
                  alt=""
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={() => setIsTooltipVisible(false)}
                />
              </div>
              {isTooltipVisible && (
                <div
                  className="overlay"
                  style={{
                    top: tooltipPosition.top + "px",
                    left: tooltipPosition.left + "px",
                  }}
                >
                  <div className="text-[16px] font-semibold">
                    Ограничение записи в день
                  </div>
                  <div className="text-[14px] font-normal">
                    Если вы хотите ограничить количество потенциальных записей в
                    день - то выберите и настройте этот параметр.
                  </div>
                  <div className="text-[14px] font-normal">
                    Например, вы знаете, что ваш зал вмещает не больше 30
                    человек, при этом у вас есть 10 постоянных посетителей.
                    Тогда имеет смысл выбрать данный параметр и поставить
                    ограничение на 20 записей в день.Когда значение в 20 записей
                    будет достигнуто - занятие перестанет появляться у
                    пользователей именно в те дни, когда значение будет
                    достигать 20. Если кто то отменит занятие, или вы увеличите
                    ограничение - занятие снова отобразится.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "white" }} className="blueContainer">
          <div className="flexl flex-col gap-1">
            <div className="text-[14px] font-bold">
              Дата и время проведения:
            </div>

            {event.startTime && event.endTime && (
              <div className="flex flex-row gap-1 items-center">
                <div className="text-[13px] font-medium leading-[15px]">
                  {event.startTime.toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                  })}
                </div>
                <div className="text-[13px] font-medium leading-[15px]">
                  {event.startTime.toLocaleTimeString("ru-RU", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
                <div className="">-</div>
                <div className="text-[13px] font-medium leading-[15px]">
                  {event.endTime.toLocaleTimeString("ru-RU", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <div className="text-[14px] font-bold">Описание занятия:</div>

            <div className="text-[13px] font-medium leading-[15px]">
              {event.title ?? "Описание отсутствует"}
            </div>
          </div>
        </div>
      </div>

      {/* buttons  */}
      <div className="flex flex-row gap-[10px]">
        <BackButton
          width={"114px"}
          height={"40px"}
          title={"Отменить"}
          onСlick={onPop}
        />

        <CustomButton
          width={"100%"}
          height={"40px"}
          fontSize={"14px"}
          title="Отклонить запись клиента и уведомить его об отсутствии мест"
          onСlick={async () => {
            // отправляяем запрос на ограничение записи
            const requestForRestriction = {
              gymId: event.gymId,
              lessonId: event.lessonId,
            };
            dispatch(restrictLesson(requestForRestriction));

            // отклоняем запись клиента
            const request = {
              gymId: event.gymId,
              waitingId: event.id,
            };
            await dispatch(rejectClient(request));

            // getting new data (remove when websocket will be implemented)
            dispatch(getNewClients(event.gymId));
            onPop();
          }}
        />
      </div>
    </Fragment>
  );
}
