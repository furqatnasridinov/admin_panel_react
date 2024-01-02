import React from "react";
import locationIcon from "../../../assets/svg/location.svg";
import threeDotsIcon from "../../../assets/svg/three_dots.svg";

function Gym(props) {
  return (
    <div className="h-[60px] w-[screen] bg-bg-color rounded-[16px] py-[16px] px-[32px] flex flex-row items-center  mb-[16px]">
      <div className="flex flex-row items-center  w-full">
        <div className=" flex flex-row items-center  w-[250px]">
          <div className="p-[5px] rounded-[6px] ">
            <img src={locationIcon} alt="" />
          </div>
          <div className="text-[14px] font-normal">{props.gymName}</div>
        </div>
        <div className="flex items-center justify-center  w-[130px] h-[30px] ml-[60px] text-[14px] font-normal">
          {props.activitiesForMonth}
        </div>
        <div className="flex items-center justify-center text-[14px] font-normal   w-[90px] ml-[190px]">
          {props.activitiesForWeek}
        </div>
        <div className="flex items-center justify-center text-[14px] font-normal  w-[60px] ml-[190px]">
          {props.activitiesForDay}
        </div>
      </div>

      <button className="w-[24px] h-[24px]">
        <img src={threeDotsIcon} alt="" />
      </button>
    </div>
  );
}

export default Gym;
