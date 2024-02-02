import React from "react";
import Gym from "../components/gym";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListOfGyms } from "../../../features/current_gym_slice";

const MyGymsBody = () => {
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);

  useEffect(() => {
    dispatch(getListOfGyms());
  }, []);

  return (
    <div className="px-[30px] bg-white rounded-[16px] flex flex-col h-[86vh]">
      {/* Top section */}
      <div className="flex flex-row pr-[203px] pt-[34px] bg-white justify-between h-[10%]">
        <div className="text-[14px] font-medium">Название заведения</div>
        <div className="text-[14px] font-medium">Записей за месяц</div>
        <div className="text-[14px] font-medium">За неделю</div>
        <div className="text-[14px] font-medium">За день</div>
      </div>

      {/* LIST BUILDER */}

      <div className="overflow-y-auto pt-[20px]">
        {gymState.listOfGyms.map((gym) => (
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
