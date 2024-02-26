import React from "react";
import { useState } from "react";
import "./styles.css";
import { setCurrentGym } from "../../features/current_gym_slice";
import { selectAnActivity } from "../../features/activities_slice";
import {
  resetSelectedEvent,
  setStartTimeHours,
  setStartTimeMinutes,
  setEndTimeHours,
  setEndTimeMinutes,
  selectADayFromCalendar,
  setDescription,
  removeDayFromSelectedWeekdays,
  addDaysToSelectedWeekdays,
  createSchedule,
  getSchedules,
  resetDatasAfterSubmitting,
  disableScheduleEditting,
  hideEdittingContainer,
  setNavigationFromBooking,
} from "../../features/schedule_slice";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../../components/dropdown/custom_dropdown";
import CustomButton from "../../components/button/button";
import CustomDialog from "../../components/dialog/dialog";
import BackButton from "../../components/button/back_button";
import DropdownForHours from "./dropdowm_for_hours";
import DatePicker from "react-datepicker";
import { TextAndTextfield } from "../gym_detailes/views/gym_detailes_body/employees/employees";
import { WEEK_DAYS } from "../../dummy_data/dymmy_data";
import nextMoth from "../../assets/svg/navigate_next_month.svg";
import previousMoth from "../../assets/svg/navigate_prev_month.svg";
import checkboxEnabled from "../../assets/svg/done.svg";
import checkboxDisabled from "../../assets/svg/checkbox_disabled.svg";
import questionLogo from "../../assets/svg/questionModal.svg";

export default function ScheduleHeader() {
  // redux
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const activitiesState = useSelector((state) => state.activities);
  const scheduleState = useSelector((state) => state.schedule);

  // use state
  const [isGymsDropDownOpened, openGymsDropDown] = useState(false);
  const [isActivitiesDropDownOpened, openActivitiesDropDown] = useState(false);
  const [isMoldaOpened, openModal] = useState(false);
  const [isDropDownOpened, openDropDown] = useState(false);
  const [isDateNotSelected, setDateNotSelected] = useState(false);
  const [datePickerShown, setDatePickerShown] = useState(false);
  const [isStartTimeDropDownOpened, openStartTimeDropDown] = useState(false);
  const [isEndTimeDropDownOpened, openEndTimeDropDown] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [hasFocus, setFocus] = useState(false);
  const [isFormNotValidated, setFormNotValidated] = useState(false);
  const [checkboxAutoAcceptEnabled, setCheckboxAutoAccept] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [checkboxLimitEnabled, setIsCheckboxLimitEnabled] = useState(false);
  const [limit, setLimit] = useState(20);
  const [isLimitDropDownOpened, setIsLimitDropDownOpened] = useState(false);
  const [isTooltip2Visible, setIsTooltip2Visible] = useState(false);
  const [tooltip2Position, setTooltip2Position] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY + rect.height - 70, // Центрируем по вертикали относительно иконки
      left: rect.left + window.scrollX + 70, // Сдвигаем на 50px правее от иконки
    });
    setIsTooltipVisible(true);
  };

  const handleMouseEnter2 = (event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip2Position({
      top: rect.top + window.scrollY + rect.height - 130,
      left: rect.left + window.scrollX + 70,
    });
    setIsTooltip2Visible(true);
  };

  let numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="schedule_header">
      <div className="flex flow-row gap-[10px] items-center">
        <div className="">Расписание</div>
        <div className="slash"> / </div>

        {gymState.listOfGyms.length === 1 && gymState.currentGym !== null && (
          <div className=""> {gymState.currentGym.name} </div>
        )}
        {gymState.listOfGyms.length > 1 && (
          <CustomDropdown
            isDropDownOpened={isGymsDropDownOpened}
            zIndex={"5"}
            openCloseDropDown={() => {
              openGymsDropDown(!isGymsDropDownOpened);
            }}
            text={
              gymState.currentGym === null
                ? "Выберите заведение"
                : gymState.currentGym.name
            }
            map={gymState.listOfGyms.map((item, index) => (
              <div
                key={index}
                className="gymNames"
                onClick={() => {
                  dispatch(setCurrentGym(item));
                  openGymsDropDown(false);
                }}
              >
                {item.name}
              </div>
            ))}
            isLoading={scheduleState.isGymsLoading}
            loadingText={"Загружаем список заведений..."}
          />
        )}
      </div>
      {gymState.currentGym !== null && (
        <CustomDropdown
          isDropDownOpened={isActivitiesDropDownOpened}
          zIndex={"5"}
          openCloseDropDown={() => {
            openActivitiesDropDown(!isActivitiesDropDownOpened);
          }}
          map={
            activitiesState.listOfActivities &&
            activitiesState.listOfActivities.map((item, index) => (
              <div
                key={index}
                className="gymNames"
                onClick={() => {
                  dispatch(setNavigationFromBooking(false)); // to make select acvity work
                  dispatch(selectAnActivity(item));
                  sessionStorage.setItem("selectedActivity", item);
                  openActivitiesDropDown(false);
                }}
              >
                {item}
              </div>
            ))
          }
          text={
            activitiesState.selectedActivity == ""
              ? "Выберите активность"
              : activitiesState.selectedActivity
          }
          isLoading={activitiesState.isActivitiesLoading}
          loadingText={"Загружаем список активностей..."}
        />
      )}

      {gymState.currentGym !== null &&
        activitiesState.selectedActivity !== "" && (
          <CustomButton
            zIndex={"2"}
            title={"Добавить занятие в расписание"}
            height={"40px"}
            width={"294px"}
            fontSize={"14px"}
            onСlick={() => {
              if (scheduleState.isEdittingContainerShown) {
                dispatch(hideEdittingContainer());
              }
              if (scheduleState.isScheduleEdittingEnabled) {
                dispatch(disableScheduleEditting());
              }
              dispatch(resetSelectedEvent());
              openModal(true);
            }}
          />
        )}

      {isMoldaOpened && (
        <CustomDialog
          isOpened={isMoldaOpened}
          closeOnTapOutside={() => openModal(false)}
        >
          <div className="addScheduleModal">
            <div className="flex flex-col gap-[5px]">
              <div className="text-[16px] font-semibold leading-[16px]">
                Добавить новое занятие
              </div>
              <div className="text-[14px] font-normal leading-[16px]">
                В этом окне вам нужно указать время и описание для занятия. Так
                же тут можно выбрать, будет-ли ваше занятие одноразовым, или
                повторяющимся в определённые дни недели.
              </div>
            </div>

            <div className="flex flex-col gap-[5px]">
              <div className="text-[16px] font-semibold leading-[16px]">
                Активность:
              </div>
              <CustomDropdown
                text={activitiesState.selectedActivity}
                isDropDownOpened={isDropDownOpened}
                zIndex={"1"}
                openCloseDropDown={() => {
                  openDropDown(!isDropDownOpened);
                }}
                map={activitiesState.listOfActivities.map((item, index) => (
                  <button
                    key={index}
                    className="gym_names"
                    onClick={() => {
                      dispatch(selectAnActivity(item));
                      openDropDown(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              />
            </div>

            <div className="flex flex-row gap-[32px]">
              <div className="flex flex-col gap-[5px]">
                <div
                  className="text-[16px] font-semibold leading-[16px]"
                  style={{
                    color: isDateNotSelected ? "rgba(255, 136, 136, 1)" : null,
                  }}
                >
                  Дата проведения:
                </div>
                <CustomDropdown
                  text={
                    scheduleState.selectedDay === ""
                      ? "Выберите дату"
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
                <div className="text-[16px] font-semibold leading-[16px]">
                  Время проведения:
                </div>
                <div className="flex flex-row gap-[10px] items-center">
                  <DropdownForHours
                    text={`${scheduleState.startTimeHoursTmp}:${scheduleState.startTimeMinutesTmp}`}
                    isDropDownOpened={isStartTimeDropDownOpened}
                    openCloseDropDown={() => {
                      openStartTimeDropDown(!isStartTimeDropDownOpened);
                    }}
                    setHours={(hours) => {
                      dispatch(setStartTimeHours(hours));
                    }}
                    setMinutes={(minute) =>
                      dispatch(setStartTimeMinutes(minute))
                    }
                    selectedHour={scheduleState.startTimeHoursTmp}
                    selectedMinute={scheduleState.startTimeMinutesTmp}
                  />

                  <div className="">-</div>

                  <DropdownForHours
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
            {/* calendar */}
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

            <TextAndTextfield
              value={scheduleState.description}
              onChange={(event) => {
                dispatch(setDescription(event.target.value));
              }}
              textfieldHasFocus={hasFocus}
              requestFocus={() => setFocus(true)}
              removeFocus={() => setFocus(false)}
              text={"Описание занятия:"}
              placeholder={"Напишите описание к занятию"}
              showLogo={false}
              isError={isFormNotValidated}
            />

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-[5px] items-center">
                <img
                  className="cursor-pointer w-[24px] h-[24px]"
                  src={
                    checkboxAutoAcceptEnabled
                      ? checkboxEnabled
                      : checkboxDisabled
                  }
                  alt="checkbox"
                  onClick={() => {
                    setCheckboxAutoAccept(!checkboxAutoAcceptEnabled);
                  }}
                />
                <div className="text-[13px] font-medium">
                  Автоматически одобрять бронирование пользователей на занятия
                </div>
              </div>
              <div className="relative w-[24px] h-[24px] bg-white flex items-center justify-center rounded-[50%]">
                <img
                  className="cursor-pointer"
                  src={questionLogo}
                  alt=""
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={() => setIsTooltipVisible(false)}
                />
              </div>
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
                  Автоматическое бронирование
                </div>
                <div className="text-[14px] font-normal">
                  Когда вы создаёте активность, пользователь в приложении может
                  на неё записаться. В стандартном сценарии вам необходимо будет
                  свериться с расписанием и одобрить запись клиента.
                </div>
                <div className="text-[14px] font-normal">
                  Если поставить галочку - одобрение бронирования для этой
                  активности будет происходить автоматически, без вашего
                  участия.
                </div>
              </div>
            )}

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[10px] items-center">
                <img
                  className="w-[24px] h-[24px]"
                  src={
                    checkboxLimitEnabled ? checkboxEnabled : checkboxDisabled
                  }
                  alt="checkbox"
                  onClick={() => {
                    setIsCheckboxLimitEnabled(!checkboxLimitEnabled);
                  }}
                />
                <div className="flex flex-row gap-[4px]">
                  <div className="text-[13px] font-medium leading-[15px]">
                    Ограничение на количество записей в день.
                  </div>
                  {checkboxLimitEnabled && (
                    <div className="text-[13px] font-medium leading-[15px]">
                      Не более
                    </div>
                  )}
                </div>

                {checkboxLimitEnabled && (
                  <div className="flex flex-row items-center gap-[33px] ">
                    <CustomDropdown
                      isDropDownOpened={isLimitDropDownOpened}
                      text={limit}
                      maxHeight={150}
                      maxWidth={"80px"}
                      gap={"0px"}
                      backgroundColor={"white"}
                      padding={"10px"}
                      openCloseDropDown={() => {
                        setIsLimitDropDownOpened(!isLimitDropDownOpened);
                      }}
                      map={numbers.map((number) => {
                        return (
                          <div
                            className="numbers"
                            onClick={() => {
                              setLimit(number);
                              setIsLimitDropDownOpened(false);
                            }}
                          >
                            {number}
                          </div>
                        );
                      })}
                    />
                  </div>
                )}
              </div>

              {checkboxLimitEnabled && (
                <>
                  <div className="relative w-[24px] h-[24px] bg-white flex items-center justify-center rounded-[50%]">
                    <img
                      className="cursor-pointer"
                      src={questionLogo}
                      alt=""
                      onMouseEnter={handleMouseEnter2}
                      onMouseLeave={() => setIsTooltip2Visible(false)}
                    />
                  </div>
                  {isTooltip2Visible && (
                    <div
                      className="overlay"
                      style={{
                        top: tooltip2Position.top + "px",
                        left: tooltip2Position.left + "px",
                      }}
                    >
                      <div className="text-[16px] font-semibold">
                        Ограничение записи в день
                      </div>
                      <div className="text-[14px] font-normal">
                        Если вы хотите ограничить количество потенциальных
                        записей в день - то выберите и настройте этот параметр.
                      </div>
                      <div className="text-[14px] font-normal">
                        Например, вы знаете, что ваш зал вмещает не больше 30
                        человек, при этом у вас есть 10 постоянных посетителей.
                        Тогда имеет смысл выбрать данный параметр и поставить
                        ограничение на 20 записей в день.Когда значение в 20
                        записей будет достигнуто - занятие перестанет появляться
                        у пользователей именно в те дни, когда значение будет
                        достигать 20. Если кто то отменит занятие, или вы
                        увеличите ограничение - занятие снова отобразится.
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col gap-[5px]">
              <div className="text-[16px] font-semibold leading-[16px]">
                В какие дни повторять событие:
              </div>
              <div className="flex flex-row gap-[5px]">
                {WEEK_DAYS.map((weekday) => (
                  <div
                    key={weekday.id}
                    className={
                      scheduleState.selectedWeekdays.includes(weekday.id)
                        ? "roundedWeekdaysSelected cursor-pointer"
                        : "roundedWeekdays cursor-pointer"
                    }
                    onClick={() => {
                      if (scheduleState.selectedWeekdays.includes(weekday.id)) {
                        dispatch(removeDayFromSelectedWeekdays(weekday.id));
                      } else {
                        dispatch(addDaysToSelectedWeekdays(weekday.id));
                      }
                    }}
                  >
                    {weekday.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-row gap-[10px]">
                <BackButton
                  width={"114px"}
                  height={"40px"}
                  title={"Отменить"}
                  onСlick={() => {
                    openModal(false);
                  }}
                />

                <CustomButton
                  width={"100%"}
                  height={"40px"}
                  title={"Добавить Занятие"}
                  onСlick={async () => {
                    if (scheduleState.description === "") {
                      setFormNotValidated(true);
                    }
                    if (scheduleState.selectedDay === "") {
                      setDateNotSelected(true);
                    }
                    if (
                      scheduleState.description !== "" &&
                      scheduleState.selectedDay !== "" &&
                      !scheduleState.endTimeIsBeforeStartTime
                    ) {
                      // post lesson
                      const request = {
                        id: gymState.currentGym.id,
                        date: scheduleState.lessonStartTimeSendToServer,
                        duration: scheduleState.lessonDurationSendToServer,
                        description: scheduleState.description,
                        lessonType: activitiesState.selectedActivity,
                        selectedWeekdays: scheduleState.selectedWeekdays,
                        autoAccept: checkboxAutoAcceptEnabled,
                        limitCountUser: checkboxLimitEnabled,
                        maxCount: checkboxLimitEnabled ? limit : null,
                      };
                      await dispatch(createSchedule(request));
                      //resetdatas
                      await dispatch(getSchedules(gymState.currentGym.id));
                      dispatch(resetDatasAfterSubmitting());
                      openModal(false);
                    }
                  }}
                />
              </div>
              {isFormNotValidated && (
                <div className="text-[14px] text-red-400 ">
                  Чтобы продолжить - необходимо заполнить все обязательные поля,
                  выделенные красным
                </div>
              )}
              {scheduleState.endTimeIsBeforeStartTime && (
                <div className="text-[14px] text-red-400 ">
                  Время начала должно быть раньше, чем время окончания
                  активности
                </div>
              )}
            </div>
          </div>
        </CustomDialog>
      )}
    </div>
  );
}
