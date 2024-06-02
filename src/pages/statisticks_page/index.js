import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import StatisticksHeader from "./statisticks_header";
import { setCurrentGym } from "../../features/current_gym_slice";
import Aims from "./aims";
import { selectPeriod } from "../../features/statisticks";
import Visitors from "./visitors";
import VisitsSummary from "./visits_summary";
import AdminsWorksStats from "./admins_works_stats";
import { useEffect, useState } from "react";
import { getStats } from "../../features/statisticks";

export default function StatisticksPage() {
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const statsState = useSelector((state) => state.stats);

  // functions
  function selectAnotherGym(gym) {
    if (gym.id !== gymState.currentGym?.id) {
      dispatch(setCurrentGym(gym));
    }
  }

  useEffect(() => {
    if (gymState.currentGym && statsState.selectedPeriod) {
      const body = {
        gymId: gymState.currentGym?.id,
        period: statsState.selectedPeriod,
      };
      dispatch(getStats(body));
    } 
  },[statsState.selectedPeriod, gymState.currentGym]);


  return (
    <div className="statistickPage">

      <StatisticksHeader 
        gym={gymState.currentGym}
        listOfGyms={gymState.listOfGyms}
        showDropDown={gymState.listOfGyms?.length > 1}
        selectAnotherGym={selectAnotherGym}
       />

       <Aims />

       <div  className="mt-[10px] card">
          {/* Select Period */}
          <div className="flex flex-row gap-[32px] items-center">
            <span className="text-[14px] font-bold">{`Статистика заведения ${gymState.currentGym?.name}:`}</span>
            {statsState.periods?.map((period, index) => {
              const style = statsState.selectedPeriod === period ? "selectedPeriod" : "periodText";
              return (
                <span 
                  key={index} 
                  className={style}
                  onClick={() => dispatch(selectPeriod(period))}
                  >
                    {getTranslatedPeriod({ period })}
                </span>
              );
            })}
          </div>

          <Visitors stat={statsState.stat} /> 
          <VisitsSummary selectedPeriod={statsState.selectedPeriod} /> 
          <AdminsWorksStats stat={statsState.stat} />         
       </div>
    </div>
  );
}

function getTranslatedPeriod({period}) {
  switch (period) {
    case "year":
      return "Год";
    case "month":
      return "Месяц";
    case "week":
      return "Неделя";
    case "day":
      return "День";
    default:
      return "";
  }
}
