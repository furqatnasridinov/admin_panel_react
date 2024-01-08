import React from "react";
import Gym from "../components/gym";
import { gyms } from "../../../dummy_data/dymmy_data";

const MainBody = () => {
  return (
    <div className="px-[30px] pt-[34px] bg-white rounded-[16px] flex flex-col flex-1 h-full">
      {/* Top section */}

      <div className="flex flex-row pr-[203px] justify-between">
        <div className="text-[14px] font-medium">Название заведения</div>
        <div className="text-[14px] font-medium">Записей за месяц</div>
        <div className="text-[14px] font-medium">За неделю</div>
        <div className="text-[14px] font-medium">За день</div>
      </div>

      <div className="mt-[47px] "></div>

      {/* LIST BUILDER */}

      <div className="h-[490px] overflow-y-auto ">
        {gyms.map((gym) => (
          <Gym
            key={gym.id}
            id = {gym.id}
            gymName={gym.gymName}
            activitiesForMonth={gym.activitiesForMonth}
            activitiesForWeek={gym.activitiesForWeek}
            activitiesForDay={gym.activitiesForDay}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBody;
