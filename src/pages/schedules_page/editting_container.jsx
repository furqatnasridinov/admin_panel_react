import React from "react";
import "./styles.css";
import { useState, useRef , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEdittingContainer } from "../../features/schedule_slice";
import roundedGarbage from "../../assets/svg/rounded_garbage.svg";
import { TextAndTextfield } from "../gym_detailes/views/gym_detailes_body/employees/employees";
import {
  deleteSchedule,
  resetSelectedEvent,
  setStartTimeHours,
  setStartTimeMinutes,
  setEndTimeHours,
  setEndTimeMinutes,
  selectedEventSetTitle,
  enableScheduleEditting,
  disableScheduleEditting,
  updateSchedule,
  resetDatasAfterSubmitting,
  setEndTimeAutomatically,
} from "../../features/schedule_slice";
import { getSchedules } from "../../features/schedule_slice";
import CustomDialog from "../../components/dialog/dialog";
import BackButton from "../../components/button/back_button";
import CustomButton from "../../components/button/button";
import DropdownForHours from "./dropdowm_for_hours";
import checkboxEnabledSvg from "../../assets/svg/Check.svg";
import checkboxDisabledSvg from "../../assets/svg/checkbox_disabled.svg";
import backButton from "../../assets/svg/back_button.svg";
import psych from "../../assets/images/american_psycho.jpg";
import { WEEK_DAYS } from "../../dummy_data/dymmy_data";
import questionLogo from "../../assets/svg/questionModal.svg";
import ReactDOM from "react-dom";

const TooltipOverlay = ({ children, visible }) => {
  if (!visible) return null;

  // Элемент, куда будет рендериться оверлей.
  const overlayRoot = document.getElementById("overlay-root");
  return ReactDOM.createPortal(children, overlayRoot);
};

export default function EdittingContainer() {
  // redux
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const scheduleState = useSelector((state) => state.schedule);
  const [checkBoxEnabled, setCheckbox] = useState(false);
  const [checkboxForAutoApprove, setCheckboxEnabledState] = useState(false);

  // use ref
  const edittingButtonRef = useRef(null);

  // use state
  const [deleteModalShown, openDeleteModal] = useState(false);
  const [isStartTimeDropDownOpened, openStartTimeDropDown] = useState(false);
  const [isEndTimeDropDownOpened, openEndTimeDropDown] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTooltip2Visible, setIsTooltip2Visible] = useState(false);
  const [tooltip2Position, setTooltip2Position] = useState({ top: 0, left: 0 });


    // use effect 
    useEffect(() => { 
      dispatch(setEndTimeAutomatically());
    }, [scheduleState.startTimeHoursTmp, scheduleState.startTimeMinutesTmp]);
    
  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY + rect.height - 60, // Центрируем по вертикали относительно иконки
      left: rect.left + window.scrollX - 320, // Сдвигаем на 50px левее от иконки
    });
    setIsTooltipVisible(true);
  };

  const showConfirmationOverlay = () => {
    const ref = edittingButtonRef.current;
    const rect = ref.getBoundingClientRect();

    setTooltip2Position({
      top: rect.top + 60,
      left: rect.left + 10,
    });
    setIsTooltip2Visible(true);
  };

  return (
    console.log("scheduleState.selectedEvent", JSON.stringify(scheduleState.selectedEvent)),
    <div className={`edittingContainer h-[76vh]`}>
      {/*  */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[10px]">
          <img
            src={backButton}
            alt=""
            className="cursor-pointer"
            onClick={() => {
              if (scheduleState.isScheduleEdittingEnabled) {
                dispatch(disableScheduleEditting());
              }
              dispatch(hideEdittingContainer());
              dispatch(resetSelectedEvent());
            }}
          />
          <div className="text-[14px] font-bold">
            {`Детали занятия ${scheduleState.selectedEvent.start.toLocaleString(
              "ru-RU",
              { day: "numeric", month: "long" }
            )}`}
          </div>
        </div>

        <img
          src={roundedGarbage}
          alt="roundedGarbage"
          className="cursor-pointer"
          onClick={async () => {
            // if event is repeating show modal
            openDeleteModal(true);
          }}
        />
      </div>
      

      {deleteModalShown && <CustomDialog
        isOpened={deleteModalShown}
        closeOnTapOutside={() => openDeleteModal(false)}
      >
        <div className="deleteModalContainer">
          <div className="flex flex-col gap-[5px]">
          <div className="">{`userscount : ${scheduleState.selectedEvent.usersCount} repeat: ${scheduleState.selectedEvent.repeat.length}`}</div>
            {/* <div className="text-[16px] font-semibold">Удаление занятия</div> */}
            {scheduleState.selectedEvent?.repeat?.length > 0 && <div className="text-[14px] font-normal leading-[16px]">
              Это занятие было скопировано на несколько недель вперёд. Вы хотите
              удалить только это занятие, или так же все его копии?
            </div>}

            {scheduleState.selectedEvent?.repeat?.length == 0 && <div className="text-[14px] font-normal leading-[16px]">
              Это действие удалит занятие без возможности восстановления. 
            </div>}
          </div>

          {scheduleState.selectedEvent?.usersCount > 0 && <div className="blueContainer">
            <div className="text-[14px] font-medium leading-[16px]">
              Внимание: На это занятие записано:{" "}
              <strong>{scheduleState.selectedEvent.usersCount}</strong>{" "}
              пользователей!
            </div>
            <div className="text-[14px] font-normal leading-[16px]">
              Удаление приведёт к отмене всех записей. Если вы хотите перенести
              занятие на другое время или дату, то воспользуйтесь
              редактированием вместо удаления, это позволит сохранить часть
              записей и уведомит пользователей о переносе.
            </div>
          </div>}
          
          <div className="flex flex-row gap-[10px]">
            <BackButton
              height={"40px"}
              width={"15%"}
              title={"Назад"}
              onСlick={async () => {
                openDeleteModal(false);
              }}
            />
            
            {scheduleState.selectedEvent?.repeat?.length > 0 && <BackButton
              height={"40px"}
              width={"100%"}
              title={"Удалить только выбранное занятие"}
              onСlick={async () => {
                const { gymId, lessonId, all } = {
                  gymId: gymState.currentGym.id,
                  lessonId: scheduleState.selectedEvent.id,
                  all: false,
                };
                await dispatch(deleteSchedule({ gymId, lessonId, all }));
                dispatch(resetSelectedEvent());
                dispatch(hideEdittingContainer());
                dispatch(getSchedules(gymState.currentGym.id));
                openDeleteModal(false);
              }}
            />}

            <CustomButton
              height={"40px"}
              width={"100%"}
              title={scheduleState.selectedEvent?.repeat?.length > 1 ? "Удалить занятие и все его копии" : "Подтвердить удаление"}
              fontSize={"14px"}
              onСlick={async () => {
                const { gymId, lessonId, all } = {
                  gymId: gymState.currentGym.id,
                  lessonId: scheduleState.selectedEvent.id,
                  all: true,
                };
                await dispatch(deleteSchedule({ gymId, lessonId, all }));
                dispatch(resetSelectedEvent());
                dispatch(hideEdittingContainer());
                dispatch(getSchedules(gymState.currentGym.id));
                openDeleteModal(false);
              }}
            />
          </div>
        </div>
      </CustomDialog>}

      {/*  */}
      <div className="flex flex-col gap-[5px]">
        <div className="text-[14px] font-bold">Кем добавлено:</div>
        <div className="flex flex-row gap-[10px]">
          <div
            className="w-[32px] h-[32px] rounded-[50%] p-[2px]"
            style={{ backgroundColor: "rgba(119, 170, 249, 1)" }}
          >
            <img className="w-full h-full rounded-[50%] " src={psych} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="text-[13px] font-medium leading-[15px]">
              {`${scheduleState.selectedEvent.owner.firstName} ${scheduleState.selectedEvent.owner.lastName}`}
            </div>
            {/* <div className="text-[13px] font-medium leading-[15px]">
                      Директор
                    </div> */}
          </div>
        </div>
      </div>
      {/*  */}
      <div ref={edittingButtonRef} className="refSchedule">
        <div className="flex flex-col gap-[5p]">
          <div className="text-[14px] font-bold">Время проведения:</div>
          {!scheduleState.isScheduleEdittingEnabled && (
            <>
              <div className="text-[14px] font-medium">
                {scheduleState.selectedEvent.start.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                -
                {scheduleState.selectedEvent.end.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </>
          )}

          {scheduleState.isScheduleEdittingEnabled && (
            <div className="flex flex-row items-center gap-[5px]">
              <DropdownForHours
                text={`${scheduleState.startTimeHoursTmp}:${scheduleState.startTimeMinutesTmp}`}
                isDropDownOpened={isStartTimeDropDownOpened}
                openCloseDropDown={() => {openStartTimeDropDown(!isStartTimeDropDownOpened)}}
                setHours={(hours) => {dispatch(setStartTimeHours(hours))}}
                setMinutes={(minute) => dispatch(setStartTimeMinutes(minute))}
                selectedHour={scheduleState.startTimeHoursTmp}
                selectedMinute={scheduleState.startTimeMinutesTmp}
                closeOntapOutside={() => {openStartTimeDropDown(false)}}
              />

              <div className="">-</div>

              <DropdownForHours
                text={`${scheduleState.endTimeHoursTmp}:${scheduleState.endTimeMinutesTmp}`}
                isDropDownOpened={isEndTimeDropDownOpened}
                openCloseDropDown={() => {openEndTimeDropDown(!isEndTimeDropDownOpened)}}
                setHours={(hours) => {dispatch(setEndTimeHours(hours))}}
                setMinutes={(minute) => dispatch(setEndTimeMinutes(minute))}
                selectedHour={scheduleState.endTimeHoursTmp}
                selectedMinute={scheduleState.endTimeMinutesTmp}
                closeOntapOutside={() => {openEndTimeDropDown(false)}}
              />
            </div>
          )}
        </div>

        {!scheduleState.isScheduleEdittingEnabled && (
          <div className="text-[13px] font-medium leading-[15px]">
            {scheduleState.selectedEvent.title}
          </div>
        )}

        {scheduleState.isScheduleEdittingEnabled &&
          <TextAndTextfield
            textfieldHasFocus={true}
            value={scheduleState.selectedEvent.title}
            onChange={(e) => {
              if (e.target.value.length <= 250) {
                dispatch(selectedEventSetTitle(e.target.value));
              }
            }}
            showTextArea={true}
            fontSize={"13px"}
            fontWeight={"medium"}
            text={"Описание занятия:"}
            placeholder={"Напишите описание к занятию"}
            showLogo={false}
            lineheight={"16px"}
            showMaxLength={true}
            maxLength={"250"}
          />
        }

        {!scheduleState.isScheduleEdittingEnabled && (
          <BackButton
            title={"Редактировать"}
            height={"40px"}
            onСlick={() => {
              if (
                scheduleState.selectedEvent.usersCount &&
                scheduleState.selectedEvent.usersCount > 0
              ) {
                showConfirmationOverlay();
              } else {
                dispatch(enableScheduleEditting());
              }
            }}
            hideHover={true}
          />
        )}
        {isTooltip2Visible && (
          <div
            className="overlay"
            style={{
              top: tooltip2Position.top + "px",
              left: tooltip2Position.left + "px",
            }}
          >
            <div className="text-[16px] font-semibold">Внимание</div>
            <div className="text-[14px] font-normal">
              {`На это занятие записано ${scheduleState.selectedEvent.usersCount} человек. Если вы измените время или
              дату - то пользователям придётся перезаписаться заново и часть из
              них откажется от записи.`}
            </div>
            <div className="flex flex-row gap-2 mt-3">
              <BackButton
                height={"40px"}
                onСlick={() => {
                  setIsTooltip2Visible(false);
                }}
                title={"Назад"}
              />
              <CustomButton
                width={"100%"}
                height={"40px"}
                fontSize={"14px"}
                title="Редактировать"
                onСlick={() => {
                  dispatch(enableScheduleEditting());
                  setIsTooltip2Visible(false);
                }}
              />
            </div>
          </div>
        )}

        {scheduleState.isScheduleEdittingEnabled && (
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-[5px] items-center">
              <img
                className="cursor-pointer w-[24px] h-[24px]"
                src={
                  checkboxForAutoApprove
                    ? checkboxEnabledSvg
                    : checkboxDisabledSvg
                }
                alt="checkbox"
                onClick={() => {
                  setCheckboxEnabledState(!checkboxForAutoApprove);
                }}
              />
              <div className="text-[13px] font-medium">
                Автоматически одобрять бронирование пользователей на занятия
              </div>
            </div>
            <div className="relative ml-1">
              <img
                className="cursor-pointer max-w-7"
                src={questionLogo}
                alt=""
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsTooltipVisible(false)}
              />
              <TooltipOverlay visible={isTooltipVisible}>
                <div
                  className="overlay"
                  style={{
                    top: tooltipPosition.top + "px",
                    left: tooltipPosition.left + "px",
                  }}
                >
                  <div className="text-[16px] font-semibold">
                    Автоматическое бронирование
                  </div>
                  <div className="text-[14px] font-normal">
                    Когда вы создаёте активность, пользователь в приложении
                    может на неё записаться. В стандартном сценарии вам
                    необходимо будет свериться с расписанием и одобрить запись
                    клиента.
                  </div>
                  <div className="text-[14px] font-normal">
                    Если поставить галочку - одобрение бронирования для этой
                    активности будет происходить автоматически, без вашего
                    участия.
                  </div>
                </div>
              </TooltipOverlay>
            </div>
          </div>
        )}

        {scheduleState.isScheduleEdittingEnabled &&
          scheduleState.selectedEvent.repeat.length > 1 && (
            <div className="flex flex-row gap-[10px] ">
              <img
                src={checkBoxEnabled ? checkboxEnabledSvg : checkboxDisabledSvg}
                alt=""
                className="cursor-pointer w-[24px] h-[24px]"
                onClick={() => {
                  setCheckbox(!checkBoxEnabled);
                }}
              />
              <div className="text-[13px] font-medium leading-[15px]">
                Применить ко всем повторяющимся событиям
              </div>
            </div>
          )}

        <div className="flex flex-col gap-[16px]">
          {scheduleState.isScheduleEdittingEnabled && (
            <div className="flex flex-row gap-[10px] ">
              <BackButton
                width={"100%"}
                height={"40px"}
                title={"Отменить"}
                onСlick={() => {
                  dispatch(disableScheduleEditting());
                  dispatch(hideEdittingContainer());
                  dispatch(getSchedules(gymState.currentGym.id));
                  dispatch(resetDatasAfterSubmitting());
                }}
              />
              <CustomButton
                width={"100%"}
                height={"40px"}
                title={"Сохранить"}
                onСlick={async () => {
                  // send update request

                  if (!scheduleState.endTimeIsBeforeStartTime) {
                    const {
                      gymId,
                      lessonId,
                      date,
                      duration,
                      description,
                      autoAccept,
                      all,
                      canSignUp,
                    } = {
                      gymId: gymState.currentGym.id,
                      lessonId: scheduleState.selectedEvent.id,
                      date: scheduleState.lessonStartTimeSendToServer,
                      duration: scheduleState.lessonDurationSendToServer,
                      description: scheduleState.selectedEvent.title,
                      autoAccept: checkboxForAutoApprove,
                      all: checkBoxEnabled,
                      canSignUp: scheduleState.selectedEvent.canSignUp,
                    };
                    await dispatch(
                      updateSchedule({
                        gymId,
                        lessonId,
                        date,
                        duration,
                        description,
                        autoAccept,
                        all,
                        canSignUp,
                      })
                    );
                    dispatch(disableScheduleEditting());
                    dispatch(getSchedules(gymState.currentGym.id));
                    dispatch(resetDatasAfterSubmitting());
                  }
                }}
                fontSize={"14px"}
              />
            </div>
          )}
          {scheduleState.isScheduleEdittingEnabled &&
            scheduleState.endTimeIsBeforeStartTime && (
              <div className="text-[14px] text-red-400 ">
                Время начала должно быть раньше, чем время окончания активности
              </div>
            )}
        </div>
      </div>

      <div className="flex flex-col gap-[5px]">
        <div className="text-[14px] font-bold">В какие дни повторяется:</div>

        <div className="flex flex-row gap-[5px]">
          {WEEK_DAYS.map((weekday) => (
            <div
              key={weekday.id}
              className={
                scheduleState.selectedEvent.repeat.length > 1 &&
                  scheduleState.selectedEvent.repeat.includes(weekday.id)
                  ? "roundedWeekdaysSelected"
                  : "roundedWeekdays "
              }
              onClick={() => { }}
            >
              {weekday.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
