import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  getListOfGyms,
  setCurrentGym,
  setCurrentGymFromFirstItem,
} from "../../features/current_gym_slice";
import {
  getListOfActivities,
  removeSelectedActivity,
  selectAnActivity,
} from "../../features/activities_slice";
import {
  setSelectedEvent,
  setStartTimeHours,
  setStartTimeMinutes,
  setEndTimeHours,
  setEndTimeMinutes,
  getSchedules,
  getDuration,
  getStartTimeToSendToServer,
  getSchedulesOfSelectedActivity,
  resetScheduleOfSelectedActivity,
  setSchedulesLoading,
  showEdittingContainer,
  setIsloading,
  removeLoading,
  setNavigationFromBooking,
} from "../../features/schedule_slice";
import { toast } from "react-toastify";
import { getListOfEmployees } from "../../features/employees_slice";
import previousSvg from "../../assets/svg/previous.svg";
import nextSvg from "../../assets/svg/next.svg";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ZoomINSvg from "../../assets/svg/zoomIn.svg";
import ZoomOutSvg from "../../assets/svg/zoomOut.svg";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import MessageLikeTopContainer from "../booking_page/message_like_top_container";
import ScheduleHeader from "./schedule_header";
import EdittingContainer from "./editting_container";

registerLocale("ru", ru);
export default function SchedulesPage() {
  // redux
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const activitiesState = useSelector((state) => state.activities);
  const scheduleState = useSelector((state) => state.schedule);
  const clientsSlice = useSelector((state) => state.clients);

  // usestates
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(); // Ref для доступа к экземпляру календаря
  const pageRef = useRef();
  const [minHeight, setMinHeight] = useState(80);
  const [isNavigationtriggered, setNavigation] = useState(false);

  const events = scheduleState.schedulesOfSelectedActivity.map((item) => {
    return {
      id: item.id,
      start: item.startTime,
      end: item.endTime,
      title: item.title,
      owner: item.owner,
      lessonType: item.lessonType,
      repeat: item.repeat,
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

  // get initial data`s
  useEffect(() => {
    dispatch(getListOfGyms());
    if (
      scheduleState.isNavigationFromBooking &&
      scheduleState.eventFromBooking !== null
    ) {
      if (
        scheduleState.eventFromBooking.lessonType !==
        activitiesState.selectedActivity
      ) {
        dispatch(selectAnActivity(scheduleState.eventFromBooking.lessonType));
        sessionStorage.setItem(
          "selectedActivity",
          scheduleState.eventFromBooking.lessonType
        );
      }
      if (gymState.currentGym.id !== scheduleState.eventFromBooking.gymId) {
        dispatch(setCurrentGym(scheduleState.eventFromBooking.gymName));
        sessionStorage.setItem(
          "currentGym",
          scheduleState.eventFromBooking.gymName
        );
      }
      setCurrentDate(scheduleState.eventFromBooking.startTime);
    }
  }, []);

  useEffect(() => {
    if (gymState.listOfGyms.length === 1) {
      dispatch(setCurrentGymFromFirstItem());
    }
  }, [gymState.listOfGyms]);

  // get new infos every time when currentGym changes
  useEffect(() => {
    if (gymState.currentGym !== null) {
      dispatch(getSchedules(gymState.currentGym.id));
      dispatch(getListOfEmployees(gymState.currentGym.id)); // to show in sidebar top
      dispatch(getListOfActivities(gymState.currentGym.id));
    }

    if (activitiesState.selectedActivity !== "") {
      dispatch(removeSelectedActivity());
    }

    if (sessionStorage.getItem("selectedActivity") !== null) {
      dispatch(selectAnActivity(sessionStorage.getItem("selectedActivity")));
    }
  }, [gymState.currentGym]);

  // styles to each events
  useEffect(() => {
    const calendarElement = document.querySelector(".my-calendar-container");
    if (calendarElement) {
      if (scheduleState.allSchedules.length > 0) {
        const events = calendarElement.querySelectorAll(".rbc-event");
        if (events.length > 0) {
          events.forEach((event) => {
            const eventWidth = event.offsetWidth;
            const containerWidth = event.offsetParent.offsetWidth;
            if (eventWidth < containerWidth - 5) {
              if (event.classList.contains("notOverLappingEvents")) {
                event.classList.remove("notOverLappingEvents");
              }
              if (!event.classList.contains("overLappingEvents")) {
                event.classList.add("overLappingEvents");
              }
            } else {
              if (event.classList.contains("overLappingEvents")) {
                event.classList.remove("overLappingEvents");
              }
              if (!event.classList.contains("notOverLappingEvents")) {
                event.classList.add("notOverLappingEvents");
              }
            }
          });
        }
      }
    }
  }, [
    activitiesState.selectedActivity,
    scheduleState.selectedEvent,
    scheduleState.schedulesOfSelectedActivity,
    scheduleState.allSchedules,
    isNavigationtriggered,
    scheduleState.isNavigationFromBooking,
  ]);

  useEffect(() => {
    if (scheduleState.selectedEvent !== null) {
      const selectedActivityStartTimeHour =
        scheduleState.selectedEvent.start.toLocaleString("ru-RU", {
          hour: "2-digit",
        });
      const selectedActivityStartTimeMinutes =
        scheduleState.selectedEvent.start.toLocaleString("ru-RU", {
          minute: "2-digit",
        });
      const selectedActivityEndTimeHour =
        scheduleState.selectedEvent.end.toLocaleString("ru-RU", {
          hour: "2-digit",
        });
      const selectedActivityEndTimeMinutes =
        scheduleState.selectedEvent.end.toLocaleString("ru-RU", {
          minute: "2-digit",
        });
      dispatch(setStartTimeHours(selectedActivityStartTimeHour));
      dispatch(
        setStartTimeMinutes(
          selectedActivityStartTimeMinutes === "0"
            ? "00"
            : selectedActivityStartTimeMinutes
        )
      );
      dispatch(setEndTimeHours(selectedActivityEndTimeHour));
      dispatch(
        setEndTimeMinutes(
          selectedActivityEndTimeMinutes === "0"
            ? "00"
            : selectedActivityEndTimeMinutes
        )
      );
    }
  }, [scheduleState.selectedEvent]);

  useEffect(() => {
    dispatch(getDuration());
    dispatch(getStartTimeToSendToServer());
  }, [
    scheduleState.startTimeHoursTmp,
    scheduleState.startTimeMinutesTmp,
    scheduleState.endTimeHoursTmp,
    scheduleState.endTimeMinutesTmp,
    scheduleState.selectedDay,
  ]);

  useEffect(() => {
    if (scheduleState.selectedEvent && pageRef.current) {
      // Прокрутка до нижней части контейнера
      const container = pageRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [scheduleState.selectedEvent]);

  useEffect(() => {
    dispatch(resetScheduleOfSelectedActivity());
    dispatch(getSchedulesOfSelectedActivity(activitiesState.selectedActivity));
  }, [activitiesState.selectedActivity, scheduleState.allSchedules]);

  return (
    console.log("isFromBooking", scheduleState.isNavigationFromBooking),
    (
      <div ref={pageRef} className="schedule_page">
        {clientsSlice.waitingForAccept.length > 0 && (
          <MessageLikeTopContainer hideOpenSchedule={true} />
        )}
        <ScheduleHeader />
        <div className="schedule_body">
          {gymState.currentGym === null && !gymState.isGymsLoading && (
            <div className="centeredGreyText">Выберите заведение</div>
          )}

          {gymState.currentGym !== null &&
            activitiesState.selectedActivity === "" && (
              <div className="centeredGreyText">Выберите активность</div>
            )}

          {(gymState.isGymsLoading ||
            scheduleState.isSchedulesLoading ||
            scheduleState.isloading) && <div> </div>}

          {gymState.currentGym !== null &&
            activitiesState.selectedActivity !== "" &&
            !scheduleState.isloading && (
              <Calendar
                className="my-calendar-container"
                dayLayoutAlgorithm={"no-overlap"}
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
                    dispatch(showEdittingContainer());
                  } catch (error) {
                    toast(error);
                  }
                  if (scheduleState.isNavigationFromBooking) {
                    dispatch(setNavigationFromBooking(false));
                  }
                }}
                eventPropGetter={(event) => {
                  if (
                    scheduleState.isNavigationFromBooking &&
                    scheduleState.eventFromBooking !== null
                  ) {
                    let newStyle = {};
                    let className = "";
                    if (
                      // event.id === scheduleState.eventFromBooking.lessonId
                      event.start.getFullYear() ===
                        scheduleState.eventFromBooking.startTime.getFullYear() &&
                      event.start.getMonth() ===
                        scheduleState.eventFromBooking.startTime.getMonth() &&
                      event.start.getDate() ===
                        scheduleState.eventFromBooking.startTime.getDate() &&
                      event.start.getHours() ===
                        scheduleState.eventFromBooking.startTime.getHours() &&
                      event.start.getMinutes() ===
                        scheduleState.eventFromBooking.startTime.getMinutes()
                    ) {
                      className = "eventFromBooking";
                    }
                    return { className, style: newStyle };
                  }
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
                      onPreviousClick={() => {
                        handleNavigate("PREV");
                        setNavigation(!isNavigationtriggered); //to apply events style from useEffect
                      }}
                      onNextClick={() => {
                        handleNavigate("NEXT");
                        setNavigation(!isNavigationtriggered); //to apply events style from useEffect
                      }}
                    />
                  ),
                  dateCellWrapper: (props) => <Header date={props.value} />,
                }}
              />
            )}
        </div>

        {gymState.currentGym !== null &&
          scheduleState.selectedEvent !== null &&
          scheduleState.isEdittingContainerShown && (
            // right container for editting events
            <EdittingContainer />
          )}

        {gymState.currentGym !== null &&
          activitiesState.selectedActivity !== "" && (
            <div
              className={
                scheduleState.isEdittingContainerShown
                  ? "zoomButtons right-[400px]"
                  : "zoomButtons right-[1.5%]"
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
