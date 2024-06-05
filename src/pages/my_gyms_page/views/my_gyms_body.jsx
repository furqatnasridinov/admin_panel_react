import React from "react";
import Gym from "../components/gym";
import { useSelector } from "react-redux";
import ArrowDownSvg from "../../../assets/svg/arrowDown.svg"
import { useState } from "react";
import "../index.css";

const MyGymsBody = () => {
  const gymState = useSelector((state) => state.currentGym);
  const [sortByName, setSortByName] = useState(true);
  const [sortByActivitiesForMonth, setSortByActivitiesForMonth] = useState(false);
  const [sortByActivitiesForWeek, setSortByActivitiesForWeek] = useState(false);
  const [sortByActivitiesForDay, setSortByActivitiesForDay] = useState(false);

  // functions
  function handleSortByName() {
    if (!sortByName) {
      setSortByName(true);
      setSortByActivitiesForMonth(false);
      setSortByActivitiesForWeek(false);
      setSortByActivitiesForDay(false);
    }else{
      setSortByName(false);
      setSortByActivitiesForMonth(false);
      setSortByActivitiesForWeek(false);
      setSortByActivitiesForDay(false);
    }
  } 

  function handleSortByActivitiesForMonth() {
    if (!sortByActivitiesForMonth) {
      setSortByActivitiesForMonth(true);
      setSortByName(false);
      setSortByActivitiesForWeek(false);
      setSortByActivitiesForDay(false);
    }else{
      setSortByActivitiesForMonth(false);
      setSortByName(true);
      setSortByActivitiesForWeek(false);
      setSortByActivitiesForDay(false);
    }
  }

  function handleSortByActivitiesForWeek() {
    if (!sortByActivitiesForWeek) {
      setSortByActivitiesForWeek(true);
      setSortByName(false);
      setSortByActivitiesForMonth(false);
      setSortByActivitiesForDay(false);
    }else{
      setSortByActivitiesForWeek(false);
      setSortByName(true);
      setSortByActivitiesForMonth(false);
      setSortByActivitiesForDay(false);
    }

  }

  function handleSortByActivitiesForDay() {
    if (!sortByActivitiesForDay) {
      setSortByActivitiesForDay(true);
      setSortByName(false);
      setSortByActivitiesForMonth(false);
      setSortByActivitiesForWeek(false);
    }else{
      setSortByActivitiesForDay(false);
      setSortByName(true);
      setSortByActivitiesForMonth(false);
      setSortByActivitiesForWeek(false);
    }
  }

  return (
    <div className="px-[30px] bg-white rounded-[16px] flex flex-col gap-3 h-[86vh]">
      {/* Top section */}

      {gymState.listOfGyms?.length > 0 &&
        <>
          <div className="flex flex-row  pt-[34px] h-[10%] w-full">

            <div className="flex flex-row items-center gap-[10px] w-[25%] ">
              <div onClick={handleSortByName} className="text-[14px] font-medium cursor-pointer">Название заведения</div>
              <img className={`arrow-icon ${sortByName ? "arrow-up" : ""}`}
                style={{cursor: "pointer"}} 
                onClick={handleSortByName}
                src={ArrowDownSvg} alt="ArrowDownSvg"/>
            </div>
            
            <div className="flex flex-row items-center gap-[10px] w-[25%] justify-center">
              <div onClick={handleSortByActivitiesForMonth} className="text-[14px] font-medium cursor-pointer">Записей за месяц</div>
              <img 
                className={`arrow-icon ${sortByActivitiesForMonth ? "arrow-up" : ""}`}
                style={{cursor: "pointer"}}
                onClick={handleSortByActivitiesForMonth}
              src={ArrowDownSvg} alt="ArrowDownSvg"/>
            </div>

            <div className="flex flex-row items-center gap-[10px] w-[25%] justify-center">
              <div onClick={handleSortByActivitiesForWeek} className="text-[14px] font-medium cursor-pointer">За неделю</div>
              <img 
                className={`arrow-icon ${sortByActivitiesForWeek ? "arrow-up" : ""}`}
                style={{cursor: "pointer"}}
                onClick={handleSortByActivitiesForWeek}
              src={ArrowDownSvg} alt="ArrowDownSvg"/>
            </div>

            <div className="flex flex-row items-center gap-[10px] w-[25%] justify-center">
              <div onClick={handleSortByActivitiesForDay} className="text-[14px] font-medium cursor-pointer">За день</div>
              <img 
                className={`arrow-icon ${sortByActivitiesForDay ? "arrow-up" : ""}`}
                style={{cursor: "pointer"}}
                onClick={handleSortByActivitiesForDay}
              src={ArrowDownSvg} alt="ArrowDownSvg"/>
            </div>

          </div>

          {/* LIST BUILDER */}

          <div className="overflow-y-auto pt-[20px]">
            {[...gymState.listOfGyms]
            .sort((a, b)=> (sortByName && (!sortByActivitiesForMonth && !sortByActivitiesForWeek && !sortByActivitiesForDay)) ? a.name.localeCompare(b.name) : 
            (!sortByName && (!sortByActivitiesForMonth && !sortByActivitiesForWeek && !sortByActivitiesForDay)) ? b.name.localeCompare(a.name) : 
            sortByActivitiesForMonth ? b.gymStatShortDto?.month - a.gymStatShortDto?.month : 
            sortByActivitiesForWeek ? b.gymStatShortDto?.week - a.gymStatShortDto?.week : 
            sortByActivitiesForDay ? b.gymStatShortDto?.day - a.gymStatShortDto?.day : 0)
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
