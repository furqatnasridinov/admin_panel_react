import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  setCurrentGym,
} from "../../features/current_gym_slice";
import {
  getListOfActivities,
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
  showEdittingContainer,
  setNavigationFromBooking,
  disableScheduleEditting,
  getTimeDiffers
} from "../../features/schedule_slice";
import AppConstants from "../../config/app_constants";
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
import autoAcceptBlueIcon from "../../assets/svg/autoAcceptBlue.svg";
import autoAcceptBrownIcon from "../../assets/svg/autoAcceptBrown.svg";
import { getMaxLines } from "../../config/apphelpers";
import  group  from "../../assets/svg/group2.svg";
import group2Brown from "../../assets/svg/group2Brown.svg"

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
      usersCount: item.usersCount,
      lessonState: item.lessonState,
      canSignUp: item.canSignUp,
      deletedLesson: item.deletedLesson,
      autoAccept : item.autoAccept,
      limitCountUser : item.limitCountUser,
      maxCount : item.maxCount,
      durationInMinutes: item.durationInMinutes,
      canEdit: item.canEdit,
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
    if (scheduleState.isNavigationFromBooking && scheduleState.eventFromBooking !== null) {
      if (scheduleState.eventFromBooking.lessonType !== activitiesState.selectedActivity) {
        dispatch(selectAnActivity(scheduleState.eventFromBooking.lessonType));
      }
      if (gymState.currentGym.id !== scheduleState.eventFromBooking.gymId) {
        dispatch(setCurrentGym(scheduleState.eventFromBooking.gymName));
      }
      setCurrentDate(scheduleState.eventFromBooking.startTime);
    }
  }, []);

  // get new infos every time when currentGym changes
  useEffect(() => {
    if (gymState.currentGym !== null) {
      dispatch(getSchedules(gymState.currentGym?.id));
      dispatch(getListOfActivities(gymState.currentGym?.id));
    }

    /* if (sessionStorage.getItem("selectedActivity") !== null) {
      dispatch(selectAnActivity(sessionStorage.getItem("selectedActivity")));
    } */
   
  }, [gymState.currentGym]);

  useEffect(() => {
    if (activitiesState.listOfActivities?.length > 0 ) {
      if (activitiesState.listOfActivities?.length == 1) {
        dispatch(selectAnActivity(activitiesState.listOfActivities[0]));
      }else{
        dispatch(selectAnActivity(""));
      }
    }
    
    if (activitiesState.listOfActivities?.length == 0 && activitiesState.selectedActivity !== "") {
      dispatch(selectAnActivity(""));
    }
  }, [activitiesState.listOfActivities]);

  // styles to each events
  useEffect(() => {
    const calendarElement = document.querySelector(".my-calendar-container");
    if (calendarElement) {
      if (scheduleState.allSchedules?.length > 0) {
        const events = calendarElement.querySelectorAll(".rbc-event");
        if (events?.length > 0) {
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
    if (scheduleState.isScheduleEdittingEnabled) {
      dispatch(disableScheduleEditting());
    }
  }, [scheduleState.selectedEvent?.id]);

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
    dispatch(getStartTimeToSendToServer())

  }, [scheduleState.selectedEvent]);

  useEffect(() => {
    dispatch(resetScheduleOfSelectedActivity());
    dispatch(getSchedulesOfSelectedActivity(activitiesState.selectedActivity));
  }, [activitiesState.selectedActivity, scheduleState.allSchedules]);

  return (
    (
      <div ref={pageRef} className="schedule_page">
        {clientsSlice.waitingForAccept?.length > 0 && (
          <MessageLikeTopContainer hideOpenSchedule={true} />
        )}

        <ScheduleHeader />

        <div className="schedule_body">
          {gymState.currentGym === null && !gymState.isGymsLoading && (
            <div className="centeredGreyText">Выберите заведение</div>
          )}

          {gymState.currentGym !== null &&
            activitiesState.selectedActivity === "" &&  activitiesState.listOfActivities?.length > 0 &&(
              <div className="centeredGreyText">Выберите активность</div>
            )}
          
          {gymState.currentGym !== null &&
            activitiesState.listOfActivities?.length === 0 && (
              <div className="centeredGreyText">В данном заведении нет активностей,вы можете добавить 
              активности переходя в страницу данного заведения</div>
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
                  if (event.id !== scheduleState.selectedEvent?.id) {
                    dispatch(setSelectedEvent(event));
                    dispatch(showEdittingContainer());
                  }
                  if (scheduleState.isNavigationFromBooking) {
                    dispatch(setNavigationFromBooking(false));
                  }
                }}
                eventPropGetter={(event) => {
                  let newStyle = {};
                  let className = "";
                  if (scheduleState.isNavigationFromBooking &&
                    scheduleState.eventFromBooking !== null) {
                    if (event.id === scheduleState.eventFromBooking.lessonId) {
                      className = "eventFromBooking";
                    }
                    return { className, style: newStyle };
                  }
                  if (!event.canSignUp) {        
                      className = "canSignUpFalseEvents ";
                    return { className, style: newStyle };
                  }
                  /* if (event.id === scheduleState.selectedEvent?.id) {
                    className = "selectedEvent";
                  } */

                  return { className, style: newStyle };
                }}
                slotGroupPropGetter={(slot) => {
                  let newStyle = {
                    minHeight: minHeight,
                  };
                  return { style: newStyle };
                }}
                components={{
                  // добавляем иконки в нижную часть событий
                  event: ({ event }) => (
                  <div>
                    { event.durationInMinutes >= 50 &&
                         <div 
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: getMaxLines(event.durationInMinutes),
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }} 
                          className="rbc-event-content" >
                            {event.title}
                        </div>
                    }
                    
                    {
                      event.durationInMinutes >= 60 &&
                      <div className="event-footer">
                        {event.autoAccept && event.canSignUp && <img src={autoAcceptBrownIcon} alt="autoAcceptBrownIcon"></img>}
                        {event.autoAccept && !event.canSignUp && <img src={autoAcceptBlueIcon} alt="autoAcceptBlueIcon"></img>}
                        
                        {(event.limitCountUser || event.usersCount > 0) && event.canSignUp && 
                        <div style={{border: "1px solid rgba(241, 209, 156, 1)"}}>
                          <img src={group2Brown} alt="danger"></img>
                          {event.limitCountUser && 
                            <span className="text-[10px] font-medium">{event.usersCount + " / " + event.maxCount}</span>}
                          {!event.limitCountUser && event.usersCount > 0 && 
                            <span className="text-[10px] font-medium">{event.usersCount}</span>}
                        </div>}

                        {(event.limitCountUser || event.usersCount > 0) &&  !event.canSignUp && 
                        <div style={{border: "1px solid rgba(233, 230, 230, 1)"}}>
                          <img src={group} alt="danger"></img>
                          {event.limitCountUser && 
                            <span className="text-[10px] font-medium">{event.usersCount + " / " + event.maxCount}</span>}
                          {!event.limitCountUser && event.usersCount > 0 && 
                            <span className="text-[10px] font-medium">{event.usersCount}</span>}
                        </div>}
                      </div>
                    }
                  </div>
                  ),

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
            {gymState.currentGym !== null &&
          scheduleState.selectedEvent !== null &&
          scheduleState.isEdittingContainerShown && (
            // right container for editting events
            <EdittingContainer />
          )}
        </div>

        

        {gymState.currentGym !== null &&
          activitiesState.selectedActivity !== "" && (
            <div
              className={scheduleState.isEdittingContainerShown ? "zoomButtons right-[400px]" : "zoomButtons right-[1.5%]"}>
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
    <div className="flex flex-row justify-center items-center">
      <img
        onClick={onPreviousClick}
        src={previousSvg}
        className="cursor-pointer w-[33px] h-[33px]"
        alt=""
      ></img>
      <img
        onClick={onNextClick}
        src={nextSvg}
        className="cursor-pointer w-[33px] h-[33px]"
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
