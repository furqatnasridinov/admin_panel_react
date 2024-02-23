import React, { Fragment } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CustomDropdown from "../../components/dropdown/custom_dropdown";
import DropdownForHours from "../schedules_page/dropdowm_for_hours";
import {
  setStartTimeHours,
  setStartTimeMinutes,
  setEndTimeHours,
  setEndTimeMinutes,
  selectADayFromCalendar,
  createSchedule,
  getDuration,
  getStartTimeToSendToServer,
  deleteSchedule,
} from "../../features/schedule_slice";
import { rejectClient, getNewClients } from "../../features/clients_slice";
import DatePicker from "react-datepicker";
import previousMoth from "../../assets/svg/navigate_prev_month.svg";
import nextMoth from "../../assets/svg/navigate_next_month.svg";
import radioActivie from "../../assets/svg/radio_active.svg";
import radioNotActive from "../../assets/svg/radio_not_active.svg";
import BackButton from "../../components/button/back_button";
import CustomButton from "../../components/button/button";

export default function EventRescheduledBlueContainer({
  reScheduledEvent,
  onPop,
}) {
  // redux
  const dispatch = useDispatch();
  const scheduleState = useSelector((state) => state.schedule);
  // use states
  const [isStartTimeDropDownOpened, openStartTimeDropDown] = useState(false);
  const [isEndTimeDropDownOpened, openEndTimeDropDown] = useState(false);
  const [isDateNotSelected, setDateNotSelected] = useState(false);
  const [datePickerShown, setDatePickerShown] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newCreatedEventSelected, setNewCreatedEventSelected] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [tomorrow, setTomorrow] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });

  useEffect(() => {
    dispatch(getDuration());
    dispatch(getStartTimeToSendToServer(tomorrow.toLocaleDateString("ru")));
    const parts = scheduleState.selectedDay.split(".");
    // Проверяем, задан ли выбранный день, иначе используем завтрашний день
    var baseDate =
      scheduleState.selectedDay === ""
        ? new Date(tomorrow)
        : new Date(parts[2], parts[1] - 1, parts[0]);

    // Создаем объекты Date для начального и конечного времени
    const startDate = new Date(baseDate);
    startDate.setHours(
      scheduleState.startTimeHoursTmp,
      scheduleState.startTimeMinutesTmp,
      "00"
    );

    const endDate = new Date(baseDate);
    endDate.setHours(
      scheduleState.endTimeHoursTmp,
      scheduleState.endTimeMinutesTmp,
      "00"
    );
    if (scheduleState.allSchedules.length > 0) {
      var listToCollect = [];
      scheduleState.allSchedules.forEach((schedule) => {
        if (
          schedule.lessonType === reScheduledEvent.lessonType &&
          schedule.startTime >= startDate &&
          schedule.endTime <= endDate
        ) {
          listToCollect.push(schedule);
        }
      });
      setFilteredEvents(listToCollect);
    }
  }, [
    scheduleState.selectedDay,
    scheduleState.endTimeHoursTmp,
    scheduleState.endTimeMinutesTmp,
    scheduleState.startTimeHoursTmp,
    scheduleState.startTimeMinutesTmp,
  ]);

  return (
    console.log(`hamahe ${scheduleState.lessonDurationSendToServer}`),
    console.log(`hamahe start ${scheduleState.lessonStartTimeSendToServer}`),
    (
      <Fragment>
        <div className="blueContainer">
          <div className="text-[14px] font-bold">
            Укажите, на какую дату и время было перенесено занятие
          </div>

          <div className="flex flex-row gap-[32px]">
            <div className="flex flex-col gap-[5px]">
              <div
                className="text-[14px] font-normal leading-[16px]"
                style={{
                  color: isDateNotSelected ? "rgba(255, 136, 136, 1)" : null,
                }}
              >
                Дата проведения:
              </div>
              <CustomDropdown
                backgroundColor={"white"}
                text={
                  scheduleState.selectedDay === ""
                    ? tomorrow.toLocaleDateString("ru")
                    : scheduleState.selectedDay
                }
                isDropDownOpened={false}
                openCloseDropDown={() => {
                  setDatePickerShown(true);
                }}
                isError={isDateNotSelected}
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <div className="text-[14px] font-normal leading-[16px]">
                Время проведения:
              </div>
              <div className="flex flex-row gap-[10px] items-center">
                <DropdownForHours
                  backgroundColor={"white"}
                  text={`${scheduleState.startTimeHoursTmp}:${scheduleState.startTimeMinutesTmp}`}
                  isDropDownOpened={isStartTimeDropDownOpened}
                  openCloseDropDown={() => {
                    openStartTimeDropDown(!isStartTimeDropDownOpened);
                  }}
                  setHours={(hours) => {
                    dispatch(setStartTimeHours(hours));
                  }}
                  setMinutes={(minute) => dispatch(setStartTimeMinutes(minute))}
                  selectedHour={scheduleState.startTimeHoursTmp}
                  selectedMinute={scheduleState.startTimeMinutesTmp}
                />

                <div className="">-</div>

                <DropdownForHours
                  backgroundColor={"white"}
                  text={`${scheduleState.endTimeHoursTmp}:${scheduleState.endTimeMinutesTmp}`}
                  isDropDownOpened={isEndTimeDropDownOpened}
                  openCloseDropDown={() => {
                    openEndTimeDropDown(!isEndTimeDropDownOpened);
                  }}
                  setHours={(hours) => {
                    dispatch(setEndTimeHours(hours));
                  }}
                  setMinutes={(minute) => dispatch(setEndTimeMinutes(minute))}
                  selectedHour={scheduleState.endTimeHoursTmp}
                  selectedMinute={scheduleState.endTimeMinutesTmp}
                />
              </div>
            </div>
          </div>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            open={datePickerShown}
            shouldCloseOnSelect={true}
            onSelect={(date) => {
              dispatch(selectADayFromCalendar(date));
              setDatePickerShown(false);
            }}
            locale={"ru"}
            popperPlacement="top-start"
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className="h-[40px] w-full flex flex-row pl-[5px] pr-[10px] items-center justify-between">
                <div className="flex flex-row items-center gap-[4px]">
                  <img
                    className="cursor-pointer"
                    src={previousMoth}
                    alt="prev"
                    onClick={() => decreaseMonth()}
                  />

                  <div className="text-[14px] font-medium uppercase text-grey-text w-[65px]">
                    {date.toLocaleString("ru", { month: "long" })}
                  </div>

                  <img
                    className="cursor-pointer"
                    src={nextMoth}
                    alt="next"
                    onClick={() => increaseMonth()}
                  />

                  <div className="text-[14px] font-medium uppercase text-grey-text">
                    {date.getFullYear()}
                  </div>
                </div>

                <div
                  className="text-[14px] font-medium text-button-color cursor-pointer"
                  onClick={() => {
                    setDatePickerShown(false);
                  }}
                >
                  Закрыть
                </div>
              </div>
            )}
          />

          {filteredEvents.length > 0 && (
            <>
              <div className="flex flex-col gap-1">
                <div className="text-[14px] font-bold mt-2">
                  Выберите занятие из списка:
                </div>

                <div className="text-[14px] font-normal leading-[16px] mb-2">
                  Если вы уже создали новое занятие, в качестве перенесённого,
                  то попробуйте изменить дату или время выше, чтобы найти его.
                </div>
              </div>

              {filteredEvents.map((lesson) => {
                return (
                  <EachFoundEvent
                    key={lesson.id}
                    endTime={lesson.endTime}
                    startTime={lesson.startTime}
                    title={lesson.title}
                    onClick={() => {
                      if (newCreatedEventSelected) {
                        setNewCreatedEventSelected(false);
                      }
                      setSelectedEvent(lesson);
                    }}
                    isActive={selectedEvent && selectedEvent.id === lesson.id}
                  />
                );
              })}
            </>
          )}

          <>
            <div className="flex flex-col gap-1">
              <div className="text-[14px] font-bold mt-2">
                Создать новое занятие для переноса:
              </div>

              <div className="text-[14px] font-normal leading-[16px] mb-2">
                Можно перенести текущее занятие на другую дату или время. Для
                этого укажите необходимые значения в полях выше и выберите этот
                пункт.
              </div>
              <NewCreatingEvent
                startTime={`${scheduleState.startTimeHoursTmp}:${scheduleState.startTimeMinutesTmp}`}
                endTime={`${scheduleState.endTimeHoursTmp}:${scheduleState.endTimeMinutesTmp}`}
                title={reScheduledEvent.title ?? "Описание Undefined"}
                onClick={() => {
                  setSelectedEvent(null);
                  setNewCreatedEventSelected(true);
                }}
                isActive={newCreatedEventSelected}
              />
            </div>
          </>
        </div>

        <div className="">{`На это событие записано ${reScheduledEvent.usersCounts} пользователей.`}</div>

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
            title="Перенести занятие и оповестить пользователей об этом"
            onСlick={async () => {
              if (selectedEvent === null && newCreatedEventSelected) {
                // если выбран новый созданный event создадим новый event в базу, удалим старый, отклоняем запрос и оповещаем клиента
                const createEventRequest = {
                  id: reScheduledEvent.gymId,
                  date: scheduleState.lessonStartTimeSendToServer,
                  duration: scheduleState.lessonDurationSendToServer,
                  description: reScheduledEvent.title ?? "Описание Undefined",
                  lessonType: reScheduledEvent.lessonType,
                  selectedWeekdays: [],
                  autoAccept: false,
                };
                dispatch(createSchedule(createEventRequest));
                const rejectingRequest = {
                  gymId: reScheduledEvent.gymId,
                  waitingId: reScheduledEvent.id,
                };
                await dispatch(rejectClient(rejectingRequest));
                dispatch(getNewClients(reScheduledEvent.gymId));
                onPop();
              }
              if (selectedEvent !== null && !newCreatedEventSelected) {
                // если выбран существующий event отклоняем запрос  и оповещаем клиентов о переносе исходя из выбранного event
                const rejectingRequest = {
                  gymId: reScheduledEvent.gymId,
                  waitingId: reScheduledEvent.id,
                };
                await dispatch(rejectClient(rejectingRequest));
                dispatch(getNewClients(reScheduledEvent.gymId));
                onPop();
              }
              // в обоих случаях удаляем старое занятие
              const deleteEventRequest = {
                gymId: reScheduledEvent.gymId,
                lessonId: reScheduledEvent.lessonId,
                all: false,
              };
              dispatch(deleteSchedule(deleteEventRequest));
            }}
          />
        </div>
      </Fragment>
    )
  );
}

export function EachFoundEvent({
  startTime,
  endTime,
  title,
  onClick,
  isActive,
}) {
  return (
    <div className="flex flex-row items-center gap-[32px]">
      <img src={isActive ? radioActivie : radioNotActive} alt="radio" />
      <div
        className={
          isActive
            ? "eventInBlueContainerActive"
            : "eventInBlueContainerNoneActive"
        }
        onClick={onClick}
      >
        <div className="flexl flex-col gap-1">
          <div className="text-[14px] font-bold leading-[16px]">
            Время проведения:
          </div>

          {startTime && endTime && (
            <div className="flex flex-row gap-1 items-center">
              <div className="text-[13px] font-medium leading-[15px]">
                {startTime.toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })}
              </div>
              <div className="text-[13px] font-medium leading-[15px]">
                {startTime.toLocaleTimeString("ru-RU", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              <div className="">-</div>
              <div className="text-[13px] font-medium leading-[15px]">
                {endTime.toLocaleTimeString("ru-RU", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[14px] font-bold leading-[16px] mt-2">
            Описание занятия:
          </div>

          <div className="text-[13px] font-medium">{title}</div>
        </div>
      </div>
    </div>
  );
}

export function NewCreatingEvent({
  startTime,
  endTime,
  title,
  onClick,
  isActive,
}) {
  return (
    <div className="flex flex-row items-center gap-[32px]">
      <img src={isActive ? radioActivie : radioNotActive} alt="radio" />
      <div
        className={
          isActive
            ? "eventInBlueContainerActive"
            : "eventInBlueContainerNoneActive"
        }
        onClick={onClick}
      >
        <div className="flex flex-col gap-1">
          <div className="text-[14px] font-bold leading-[16px]">
            Время проведения:
          </div>

          {startTime && endTime && (
            <div className="flex flex-row gap-1 items-center">
              <div className="text-[13px] font-medium leading-[15px]">
                {startTime}
              </div>
              <div className="">-</div>
              <div className="text-[13px] font-medium leading-[15px]">
                {endTime}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[14px] font-bold leading-[16px] mt-2">
            Описание занятия:
          </div>

          <div className="text-[13px] font-medium">{title}</div>
        </div>
      </div>
    </div>
  );
}
