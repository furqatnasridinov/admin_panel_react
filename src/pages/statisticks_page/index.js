import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import StatisticksHeader from "./statisticks_header";
import { getCurrentGym } from "../../features/current_gym_slice";
import Aims from "./aims";
import { selectPeriod } from "../../features/statisticks";
import Visitors from "./visitors";
import VisitsSummary from "./visits_summary";
import AdminsWorksStats from "./admins_works_stats";

export default function StatisticksPage() {
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const statsState = useSelector((state) => state.stats);

  // functions
  function selectAnotherGym(gym) {
    if (gym.id !== gymState.currentGym?.id) {
      dispatch(getCurrentGym(gym?.id));
      // do the rest of the actions to get new data based on new gym
    }
    
  }
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
                    {period}
                </span>
              );
            })}
          </div>

          <Visitors /> 
          <VisitsSummary /> 
          <AdminsWorksStats />         
       </div>
    </div>
  );
}
