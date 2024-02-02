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
import CustomButton from "../../components/button/button";
import "react-big-calendar/lib/css/react-big-calendar.css";
import previousSvg from "../../assets/svg/previous.svg";
import nextSvg from "../../assets/svg/next.svg";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ru";
import { DUMMY_LESSONS } from "../../dummy_data/dymmy_data";

const localizer = momentLocalizer(moment);
export default function SchedulesPage() {
  // usestates
  const [isGymsDropDownOpened, openGymsDropDown] = useState(false);
  const [isActivitiesDropDownOpened, openActivitiesDropDown] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null); // Ref для доступа к экземпляру календаря

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

  return (
    console.log(calendarRef.currenthandleNavigate),
    (
      <div className="schedule_page ">
        <div className="schedule_header">
          <div className="flex flow-row gap-[10px] items-center">
            <div className="">Расписание</div>
            <div className="slash"> / </div>

            <CustomDropdown
              isDropDownOpened={isGymsDropDownOpened}
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
                onСlick={() => {}}
              />
            )}
        </div>
        <div className="schedule_body">
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
            eventPropGetter={(event, start, end, isSelected) => {
              return {
                className: "",
                style: {
                  backgroundColor: "#FFEBCB",
                  color: "black",
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px solid #F1D19C",
                  boxShadow:
                    "0px 2px 5px 0px rgba(0, 0, 0, 0.15), 0px 15px 18px -15px #6D96D4",
                  textOverflow: "ellipsis",
                },
              };
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
        </div>
      </div>
    )
  );
}

function Navigation({ onPreviousClick, onNextClick }) {
  return (
    <div className="flex flex-row">
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
    <div className="each_days">
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
