import React from "react";
import Gym from "../components/gym";
import { useSelector } from "react-redux";

const MyGymsBody = () => {
  const gymState = useSelector((state) => state.currentGym);

  return (
    
    <div className="px-[30px] bg-white rounded-[16px] flex flex-col gap-3 h-[86vh]">
      {/* Top section */}
      <div className="flex flex-row  pt-[34px] h-[10%] w-full">
        <div className="text-[14px] font-medium w-[25%]">Название заведения</div>
        <div className="flex justify-center text-[14px] font-medium w-[25%]">Записей за месяц</div>
        <div className="flex justify-center text-[14px] font-medium w-[25%]">За неделю</div>
        <div className="flex justify-center text-[14px] font-medium w-[25%]">За день</div>
      </div>

      {/* LIST BUILDER */}

      <div className="overflow-y-auto pt-[20px]">
        {gymState.listOfGyms?.map((gym) => (
          <Gym
            key={gym.id}
            id={gym.id}
            gymName={gym.name}
            activitiesForMonth={gym.activitiesForMonth}
            activitiesForWeek={gym.activitiesForWeek}
            activitiesForDay={gym.activitiesForDay}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGymsBody;
