import React from "react";
import Gym from "../components/gym";
import { useSelector } from "react-redux";
import ArrowDownSvg from "../../../assets/svg/arrowDown.svg"
import { useState } from "react";
import "../index.css";

const MyGymsBody = () => {
  const gymState = useSelector((state) => state.currentGym);
  const [sortByName, setSortByName] = useState("desc");
  const [sortByActivitiesForMonth, setSortByActivitiesForMonth] = useState(null);
  const [sortByActivitiesForWeek, setSortByActivitiesForWeek] = useState(null);
  const [sortByActivitiesForDay, setSortByActivitiesForDay] = useState(null);

  // functions
  function handleSortByName() {
    if (sortByName === null || sortByName === "asc") {
      setSortByName("desc");
    }else if (sortByName === "desc") {
      setSortByName("asc");
    }
    setSortByActivitiesForMonth(null);
    setSortByActivitiesForWeek(null);
    setSortByActivitiesForDay(null);
  }
  

  function handleSortByActivitiesForMonth() {
    if (sortByActivitiesForMonth === null || sortByActivitiesForMonth === "asc") {
      setSortByActivitiesForMonth("desc");
    }else{
      setSortByActivitiesForMonth("asc");
    }
    setSortByName(null);
    setSortByActivitiesForWeek(null);
    setSortByActivitiesForDay(null);
  }

  function handleSortByActivitiesForWeek() {
    if (sortByActivitiesForWeek === null || sortByActivitiesForWeek === "asc") {
      setSortByActivitiesForWeek("desc");
    }else{
      setSortByActivitiesForWeek("asc");
    }
    setSortByName(null);
    setSortByActivitiesForMonth(null);
    setSortByActivitiesForDay(null);
  }

  function handleSortByActivitiesForDay() {
    if (sortByActivitiesForDay === null || sortByActivitiesForDay === "asc") {
      setSortByActivitiesForDay("desc");
    }else{
      setSortByActivitiesForDay("asc");
    }
    setSortByName(null);
    setSortByActivitiesForMonth(null);
    setSortByActivitiesForWeek(null);
  }

  return (
    <div className="px-[30px] bg-white rounded-[16px] flex flex-col gap-3 h-[86vh]">
      {/* Top section */}

      {gymState.listOfGyms?.length > 0 &&
        <>
          <div className="flex flex-row  pt-[34px] h-[10%] w-full">

            <div className="flex flex-row items-center gap-[10px] w-[25%] ">
              <div onClick={handleSortByName} className="text-[14px] font-medium cursor-pointer">Название заведения</div>
              {(sortByName === "desc" || sortByName === "asc") && 
                <img className={`arrow-icon ${sortByName === "desc" ? "arrow-up" : ""}`}
                  style={{cursor: "pointer"}} 
                  onClick={handleSortByName}
                  src={ArrowDownSvg} alt="ArrowDownSvg"/>
              }
            </div>
            
            <div className="flex flex-row items-center gap-[10px] w-[25%] justify-center">
              <div onClick={handleSortByActivitiesForMonth} className="text-[14px] font-medium cursor-pointer">Записей за месяц</div>
              {(sortByActivitiesForMonth === "desc" || sortByActivitiesForMonth === "asc") &&
                <img 
                  className={`arrow-icon ${sortByActivitiesForMonth === "desc" ? "arrow-up" : ""}`}
                  style={{cursor: "pointer"}}
                  onClick={handleSortByActivitiesForMonth}
                  src={ArrowDownSvg} alt="ArrowDownSvg"/>
              }
            </div>

            <div className="flex flex-row items-center gap-[10px] w-[25%] justify-center">
              <div onClick={handleSortByActivitiesForWeek} className="text-[14px] font-medium cursor-pointer">За неделю</div>
              {(sortByActivitiesForWeek === "desc" || sortByActivitiesForWeek === "asc") &&
                <img 
                className={`arrow-icon ${sortByActivitiesForWeek === "desc" ? "arrow-up" : ""}`}
                style={{cursor: "pointer"}}
                onClick={handleSortByActivitiesForWeek}
                src={ArrowDownSvg} alt="ArrowDownSvg"/>
              }
            </div>

            <div className="flex flex-row items-center gap-[10px] w-[25%] justify-center">
              <div onClick={handleSortByActivitiesForDay} className="text-[14px] font-medium cursor-pointer">За день</div>
              {(sortByActivitiesForDay === "desc" || sortByActivitiesForDay === "asc") &&
                <img 
                className={`arrow-icon ${sortByActivitiesForDay === "desc" ? "arrow-up" : ""}`}
                style={{cursor: "pointer"}}
                onClick={handleSortByActivitiesForDay}
                src={ArrowDownSvg} alt="ArrowDownSvg"/>
              }
            </div>

          </div>

          {/* LIST BUILDER */}

          <div className="overflow-y-auto pt-[20px]">
            {[...gymState.listOfGyms]
            .sort((a, b)=> (sortByName === "desc" ? a.name.localeCompare(b.name) : 
            sortByName === "asc" ? b.name.localeCompare(a.name) : 
            sortByActivitiesForMonth === "desc" ? b.gymStatShortDto?.month - a.gymStatShortDto?.month :
            sortByActivitiesForMonth === "asc" ? a.gymStatShortDto?.month - b.gymStatShortDto?.month : 
            sortByActivitiesForWeek === "desc" ? b.gymStatShortDto?.week - a.gymStatShortDto?.week : 
            sortByActivitiesForWeek === "asc" ? a.gymStatShortDto?.week - b.gymStatShortDto?.week :
            sortByActivitiesForDay === "desc" ? b.gymStatShortDto?.day - a.gymStatShortDto?.day : 
            sortByActivitiesForDay === "asc" ? a.gymStatShortDto?.day - b.gymStatShortDto?.day : 0))
            .map((gym) => (
              <Gym
                key={gym.id}
                gym = {gym}
                id={gym.id}
                gymName={gym.name}
                activitiesForMonth={gym.gymStatShortDto?.month}
                activitiesForWeek={gym.gymStatShortDto?.week}
                activitiesForDay={gym.gymStatShortDto?.day}
              />
            ))}
          </div>
        </>
      }

      {(!gymState.listOfGyms || gymState.listOfGyms?.length == 0) &&
        <div className="centeredGreyText">У вас пока нет активных заведений</div>
      }

    </div>
  );
};

export default MyGymsBody;
