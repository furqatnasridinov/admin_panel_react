import React from "react";
import "./schedule_page.css";
import CustomDropdown from "../../components/dropdown/custom_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  getListOfGyms,
  setCurrentGym,
  setCurrentGymFromFirstItem,
} from "../../features/current_gym_slice";
import {
  getListOfActivities,
  selectAnActivity,
  removeSelectedActivity,
} from "../../features/activities_slice";
import {
  setStartTime,
  setEndTime,
  setDescription,
  addDaysToSelectedWeekdays,
  removeDayFromSelectedWeekdays,
  selectADayFromCalendar,
  setSelectedEvent,
} from "../../features/schedule_slice";
import { getListOfEmployees } from "../../features/employees_slice";
import CustomButton from "../../components/button/button";
import previousSvg from "../../assets/svg/previous.svg";
import nextSvg from "../../assets/svg/next.svg";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { times } from "../../dummy_data/dymmy_data";
import "moment/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ZoomINSvg from "../../assets/svg/zoomIn.svg";
import ZoomOutSvg from "../../assets/svg/zoomOut.svg";
import backButton from "../../assets/svg/back_button.svg";
import roundedGarbage from "../../assets/svg/rounded_garbage.svg";
import nextMoth from "../../assets/svg/navigate_next_month.svg";
import checkboxEnabledSvg from "../../assets/svg/done.svg";
import checkboxDisabledSvg from "../../assets/svg/checkbox_disabled.svg";
import previousMoth from "../../assets/svg/navigate_prev_month.svg";
import psych from "../../assets/images/american_psycho.jpg";
import { DUMMY_LESSONS, WEEK_DAYS } from "../../dummy_data/dymmy_data";
import CustomDialog from "../../components/dialog/dialog";
import { TextAndTextfield } from "../gym_detailes/views/gym_detailes_body/employees/employees";
import BackButton from "../../components/button/back_button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);
const localizer = momentLocalizer(moment);
export default function SchedulesPage() {
  // usestates
  const [isGymsDropDownOpened, openGymsDropDown] = useState(false);
  const [isActivitiesDropDownOpened, openActivitiesDropDown] = useState(false);
  const [isMoldaOpened, openModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null); // Ref для доступа к экземпляру календаря
  const [isDropDownOpened, openDropDown] = useState(false);
  const [isStartTimeDropDownOpened, openStartTimeDropDown] = useState(false);
  const [isEndTimeDropDownOpened, openEndTimeDropDown] = useState(false);
  const [hasFocus, setFocus] = useState(false);
  const [isFormNotValidated, setFormNotValidated] = useState(false);
  const [minHeight, setMinHeight] = useState(80);
  const [startDate, setStartDate] = useState(new Date());
  const [datePickerShown, setDatePickerShown] = useState(false);
  const [isEdittingContainerShown, setEdittingContainer] = useState(false);
  const [isScheduleEdittingEnabled, setScheduleEdittingEnabled] =
    useState(false);
  const [checkBoxEnabled, setCheckbox] = useState(false);
  const [deleteModalShown, openDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const activitiesState = useSelector((state) => state.activities);
  const scheduleState = useSelector((state) => state.schedule);

  // get initial data`s
  useEffect(() => {
    dispatch(getListOfGyms());
    if (gymState.currentGym == null) {
      dispatch(setCurrentGymFromFirstItem());
    }

    if (gymState.currentGym !== null) {
      dispatch(getListOfActivities(gymState.currentGym.id));
    }
  }, []);

  // get new infos every time when currentGym changes
  useEffect(() => {
    if (gymState.currentGym !== null) {
      dispatch(getListOfActivities(gymState.currentGym.id));
    }
    if (activitiesState.selectedActivity !== "") {
      dispatch(removeSelectedActivity());
    }
  }, [gymState.currentGym]);

  const events = DUMMY_LESSONS.map((item) => {
    return {
      id: item.id,
      title: item.title,
      start: new Date(item.start),
      end: new Date(item.end),
    };
  });

  moment.locale("ru");
  const localizer = momentLocalizer(moment);

  const formats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, "HH:mm", culture), // 24-часовой формат
  };

  const handleNavigate = (action) => {
    setCurrentDate((prevDate) => {
      let newDate = new Date(prevDate);
      if (action === "PREV") {
        newDate.setDate(newDate.getDate() - 7);
      } else if (action === "NEXT") {
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };

  function handleZoomIn() {
    if (minHeight === 80) {
      return;
    } else {
      setMinHeight(minHeight + 20);
    }
  }

  function handleZoomOut() {
    if (minHeight === 20) {
      return;
    } else {
      setMinHeight(minHeight - 20);
    }
  }

  useEffect(() => {
    dispatch(selectADayFromCalendar(new Date()));
  }, []);

  useEffect(() => {
    if (gymState.currentGym !== null) {
      dispatch(getListOfEmployees(gymState.currentGym.id));
    }
  }, [gymState.currentGym]);

  return (
    console.log(
      `selected event ${JSON.stringify(scheduleState.selectedEvent)}`
    ),
    (
      <div className="schedule_page">
        <div className="schedule_header">
          <div className="flex flow-row gap-[10px] items-center">
            <div className="">Расписание</div>
            <div className="slash"> / </div>

            <CustomDropdown
              isDropDownOpened={isGymsDropDownOpened}
              zIndex={"2"}
              openCloseDropDown={() => {
                openGymsDropDown(!isGymsDropDownOpened);
              }}
              text={
                gymState.currentGym === null
                  ? "Выберите заведение"
                  : gymState.currentGym.name
              }
              map={gymState.listOfGyms.map((item, index) => (
                <button
                  key={index}
                  className="gym_names"
                  onClick={() => {
                    dispatch(setCurrentGym(item));
                    openGymsDropDown(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
            />
          </div>
          {gymState.currentGym !== null && (
            <CustomDropdown
              isDropDownOpened={isActivitiesDropDownOpened}
              zIndex={"2"}
              openCloseDropDown={() => {
                openActivitiesDropDown(!isActivitiesDropDownOpened);
              }}
              map={activitiesState.listOfActivities.map((item, index) => (
                <button
                  key={index}
                  className="gym_names"
                  onClick={() => {
                    dispatch(selectAnActivity(item));
                    openActivitiesDropDown(false);
                  }}
                >
                  {item}
                </button>
              ))}
              text={
                activitiesState.selectedActivity == ""
                  ? "Выберите активность"
                  : activitiesState.selectedActivity
              }
            />
          )}

          {gymState.currentGym !== null &&
            activitiesState.selectedActivity !== "" && (
              <CustomButton
                title={"Добавить занятие в расписание"}
                height={"40px"}
                width={"294px"}
                fontSize={"14px"}
                onСlick={() => {
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
                    В этом окне вам нужно указать время и описание для занятия.
                    Так же тут можно выбрать, будет-ли ваше занятие одноразовым,
                    или повторяющимся в определённые дни недели.
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
                    <div className="text-[16px] font-semibold leading-[16px]">
                      Дата проведения:
                    </div>
                    <CustomDropdown
                      text={scheduleState.selectedDay}
                      isDropDownOpened={false}
                      openCloseDropDown={() => {
                        setDatePickerShown(true);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-[5px]">
                    <div className="text-[16px] font-semibold leading-[16px]">
                      Время проведения:
                    </div>
                    <div className="flex flex-row gap-[10px] items-center">
                      <CustomDropdown
                        text={scheduleState.startTime}
                        isDropDownOpened={isStartTimeDropDownOpened}
                        openCloseDropDown={() => {
                          openStartTimeDropDown(!isStartTimeDropDownOpened);
                        }}
                        map={times.map((item, index) => (
                          <button
                            key={index}
                            className="gym_names"
                            onClick={() => {
                              dispatch(setStartTime(item));
                              openStartTimeDropDown(false);
                            }}
                          >
                            {item}
                          </button>
                        ))}
                        maxHeight={"200px"}
                      />

                      <div className="">-</div>

                      <CustomDropdown
                        text={scheduleState.endTime}
                        isDropDownOpened={isEndTimeDropDownOpened}
                        openCloseDropDown={() => {
                          openEndTimeDropDown(!isEndTimeDropDownOpened);
                        }}
                        map={times.map((item, index) => (
                          <button
                            key={index}
                            className="gym_names"
                            onClick={() => {
                              dispatch(setEndTime(item));
                              openEndTimeDropDown(false);
                            }}
                          >
                            {item}
                          </button>
                        ))}
                        maxHeight={"200px"}
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
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
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

                <div className="flex flex-col gap-[5px]">
                  <div className="text-[16px] font-semibold leading-[16px]">
                    В какие дни повторять событие:
                  </div>
                  <div className="flex flex-row gap-[5px]">
                    {WEEK_DAYS.map((weekday) => (
                      <div
                        key={weekday.id}
                        className={
                          scheduleState.selectedWeekdays.includes(weekday.name)
                            ? "roundedWeekdaysSelected"
                            : "roundedWeekdays"
                        }
                        onClick={() => {
                          if (
                            scheduleState.selectedWeekdays.includes(
                              weekday.name
                            )
                          ) {
                            dispatch(
                              removeDayFromSelectedWeekdays(weekday.name)
                            );
                          } else {
                            dispatch(addDaysToSelectedWeekdays(weekday.name));
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
                      onСlick={() => {
                        if (scheduleState.description === "") {
                          setFormNotValidated(true);
                        } else {
                          // add new schedule
                          openModal(false);
                        }
                      }}
                    />
                  </div>
                  {isFormNotValidated && (
                    <div className="text-[14px] text-red-400 ">
                      Чтобы продолжить - необходимо заполнить все обязательные
                      поля, выделенные красным
                    </div>
                  )}
                </div>
              </div>
            </CustomDialog>
          )}
        </div>
        <div className="schedule_body">
          {gymState.currentGym === null && (
            <div className="centeredGreyText">Выберите заведение</div>
          )}

          {gymState.currentGym !== null &&
            activitiesState.selectedActivity === "" && (
              <div className="centeredGreyText">Выберите активность</div>
            )}

          {gymState.currentGym !== null &&
            activitiesState.selectedActivity !== "" && (
              <Calendar
                date={currentDate}
                ref={calendarRef}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                formats={formats}
                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 23, 59, 59)}
                views={["week"]}
                defaultView="week"
                onSelectEvent={(event) => {
                  try {
                    dispatch(setSelectedEvent(event));
                    setEdittingContainer(true);
                  } catch (error) {
                    alert(error);
                  }
                }}
                eventPropGetter={(event) => {
                  let newStyle = {
                    backgroundColor: "#FFEBCB",
                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    border: "1px solid #F1D19C",
                    boxShadow:
                      "0px 2px 5px 0px rgba(0, 0, 0, 0.15), 0px 15px 18px -15px rgba(109, 150, 212, 1)",
                  };
                  return { style: newStyle };
                }}
                slotGroupPropGetter={(slot) => {
                  let newStyle = {
                    minHeight: minHeight,
                  };
                  return { style: newStyle };
                }}
                components={{
                  timeGutterHeader: () => (
                    <Navigation
                      onPreviousClick={() => handleNavigate("PREV")}
                      onNextClick={() => handleNavigate("NEXT")}
                    />
                  ),
                  dateCellWrapper: (props) => <Header date={props.value} />,
                }}
              />
            )}
        </div>

        {gymState.currentGym !== null &&
          scheduleState.selectedEvent !== null &&
          isEdittingContainerShown && (
            <div className={`edittingContainer h-[76vh]`}>
              {/*  */}
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-[10px]">
                  <img
                    src={backButton}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setEdittingContainer(false)}
                  />
                  <div className="text-[14px] font-bold">
                    Детали занятия 27 сентября
                  </div>
                </div>

                <img
                  src={roundedGarbage}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => openDeleteModal(true)}
                />
              </div>

              <CustomDialog
                isOpened={deleteModalShown}
                closeOnTapOutside={() => openDeleteModal(false)}
              >
                <div className="deleteModalContainer">
                  <div className="flex flex-col gap-[5px]">
                    <div className="text-[16px] font-semibold">
                      Удаление занятия
                    </div>
                    <div className="text-[14px] font-normal leading-[16px]">
                      Это занятие было скопировано на несколько недель вперёд.
                      Вы хотите удалить только это занятие, или так же все его
                      копии?
                    </div>
                  </div>

                  <div className="flex flex-row gap-[10px]">
                    <BackButton
                      height={"40px"}
                      width={"40%"}
                      title={"Удалить только его"}
                      onСlick={() => openDeleteModal(false)}
                    />
                    <CustomButton
                      height={"40px"}
                      width={"60%"}
                      title={"Удалить занятие и все его копии"}
                      fontSize={"14px"}
                    />
                  </div>
                </div>
              </CustomDialog>

              {/*  */}
              <div className="flex flex-col gap-[5px]">
                <div className="text-[14px] font-bold">Кем добавлено:</div>
                <div className="flex flex-row gap-[10px]">
                  <div
                    className="w-[32px] h-[32px] rounded-[50%] p-[2px]"
                    style={{ backgroundColor: "rgba(119, 170, 249, 1)" }}
                  >
                    <img
                      className="w-full h-full rounded-[50%] "
                      src={psych}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[13px] font-medium leading-[15px]">
                      Владислав Туйнов
                    </div>
                    <div className="text-[13px] font-medium leading-[15px]">
                      Директор
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="refSchedule">
                <div className="flex flex-col gap-[5p]">
                  <div className="text-[14px] font-bold">Время проведения:</div>
                  {!isScheduleEdittingEnabled && (
                    <>
                      <div className="text-[14px] font-medium">
                        11:00 - 13:00
                      </div>
                    </>
                  )}

                  {isScheduleEdittingEnabled && (
                    <div className="flex flex-row items-center gap-[5px]">
                      <CustomDropdown
                        text={scheduleState.startTime}
                        isDropDownOpened={isStartTimeDropDownOpened}
                        openCloseDropDown={() => {
                          if (isEndTimeDropDownOpened) {
                            openEndTimeDropDown(false);
                          }
                          openStartTimeDropDown(!isStartTimeDropDownOpened);
                        }}
                        map={times.map((item, index) => (
                          <button
                            key={index}
                            className="gym_names"
                            onClick={() => {
                              if (isEndTimeDropDownOpened) {
                                openEndTimeDropDown(false);
                              }
                              dispatch(setStartTime(item));
                              openStartTimeDropDown(false);
                            }}
                          >
                            {item}
                          </button>
                        ))}
                        maxHeight={"200px"}
                      />

                      <div className="">-</div>

                      <CustomDropdown
                        text={scheduleState.endTime}
                        isDropDownOpened={isEndTimeDropDownOpened}
                        openCloseDropDown={() => {
                          if (isStartTimeDropDownOpened) {
                            openStartTimeDropDown(false);
                          }
                          openEndTimeDropDown(!isEndTimeDropDownOpened);
                        }}
                        map={times.map((item, index) => (
                          <button
                            key={index}
                            className="gym_names"
                            onClick={() => {
                              if (isStartTimeDropDownOpened) {
                                openStartTimeDropDown(false);
                              }
                              dispatch(setEndTime(item));
                              openEndTimeDropDown(false);
                            }}
                          >
                            {item}
                          </button>
                        ))}
                        maxHeight={"200px"}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-[5px]">
                  <div className="text-[14px] font-bold">Описание занятия:</div>
                  {!isScheduleEdittingEnabled && (
                    <div className="text-[13px] font-medium leading-[15px]">
                      {scheduleState.selectedEvent.title}
                    </div>
                  )}

                  {isScheduleEdittingEnabled && (
                    <div className="">
                      <textarea
                        className="textArea text-[13px] font-normal font-inter"
                        //ref={inputRef}
                        value={scheduleState.selectedEvent.title}
                        onChange={() => {}}
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                        }}
                      />
                    </div>
                  )}
                </div>

                {!isScheduleEdittingEnabled && (
                  <BackButton
                    title={"Редактировать"}
                    height={"40px"}
                    onСlick={() => {
                      setScheduleEdittingEnabled(true);
                    }}
                    hideHover={true}
                  />
                )}

                {isScheduleEdittingEnabled && (
                  <div className="flex flex-row gap-[10px] ">
                    <img
                      src={
                        checkBoxEnabled
                          ? checkboxEnabledSvg
                          : checkboxDisabledSvg
                      }
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

                {isScheduleEdittingEnabled && (
                  <div className="flex flex-row gap-[10px] ">
                    <BackButton
                      width={"100%"}
                      height={"40px"}
                      title={"Отменить"}
                      onСlick={() => {
                        setScheduleEdittingEnabled(false);
                      }}
                    />
                    <CustomButton
                      width={"100%"}
                      height={"40px"}
                      title={"Сохранить"}
                      onСlick={() => {}}
                      fontSize={"14px"}
                    />
                  </div>
                )}
              </div>

              <div className="text-[14px] font-bold">
                В какие дни повторяется:
              </div>

              <div className="flex flex-row gap-[5px]">
                {WEEK_DAYS.map((weekday) => (
                  <div
                    key={weekday.id}
                    className={
                      scheduleState.selectedWeekdays.includes(weekday.name)
                        ? "roundedWeekdaysSelected"
                        : "roundedWeekdays"
                    }
                    onClick={() => {}}
                  >
                    {weekday.name}
                  </div>
                ))}
              </div>
            </div>
          )}

        {gymState.currentGym !== null &&
          activitiesState.selectedActivity !== "" && (
            <div
              className={
                isEdittingContainerShown
                  ? "zoomButtons right-[26%]"
                  : "zoomButtons right-[2%]"
              }
            >
              <img
                src={ZoomINSvg}
                alt="zoomIn"
                className="cursor-pointer"
                onClick={() => handleZoomIn()}
              />
              <img
                src={ZoomOutSvg}
                alt="zoomOut"
                className="cursor-pointer"
                onClick={() => handleZoomOut()}
              />
            </div>
          )}
      </div>
    )
  );
}

function Navigation({ onPreviousClick, onNextClick }) {
  return (
    <div className="flex flex-row ">
      <img
        onClick={onPreviousClick}
        src={previousSvg}
        className="cursor-pointer"
        alt=""
      ></img>
      <img
        onClick={onNextClick}
        src={nextSvg}
        className="cursor-pointer"
        alt=""
      ></img>
    </div>
  );
}

function Header({ date }) {
  const dayOfWeek = moment(date).format("ddd"); // 'вт'
  let calendarDays = moment(date).format("D MMM"); // '2 февр.'
  const list = calendarDays.split(" "); // ['2', 'февр.']
  const day = list[0];
  var month = list[1];
  switch (month) {
    case "янв.":
      month = "Янв";
      break;
    case "февр.":
      month = "Фев";
      break;
    case "мар.":
      month = "Мар";
      break;
    case "апр.":
      month = "Апр";
      break;
    case "мая":
      month = "Мая";
      break;
    case "июня":
      month = "Июня";
      break;
    case "июля.":
      month = "Июля";
      break;
    case "авг.":
      month = "Авг";
      break;
    case "сент.":
      month = "Сен";
      break;
    case "окт.":
      month = "Окт";
      break;
    case "нояб.":
      month = "Ноя";
      break;
    case "дек.":
      month = "Дек";
      break;
  }
  const formattedDate = `${day} ${month}`;

  return (
    <div className="each_days" style={{ height: "" }}>
      <div className="text-[13px] font-medium">{formattedDate}</div>

      {(dayOfWeek === "сб" || dayOfWeek === "вс") && (
        <div className="text-[14px] font-bold text-red-500 uppercase">
          {dayOfWeek}
        </div>
      )}
      {dayOfWeek !== "сб" && dayOfWeek !== "вс" && (
        <div className="text-[14px] font-bold uppercase">{dayOfWeek}</div>
      )}
    </div>
  );
}
