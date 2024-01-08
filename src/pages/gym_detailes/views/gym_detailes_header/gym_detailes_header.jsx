import React from "react";
import "./gym_detailes.css";
import arrowDownSvg from "../../../../assets/svg/arrow_down.svg"
import arrowUpSvg from "../../../../assets/svg/arrow_up.svg"

export default function GymDetailesHeader() {
  return (
    <div className="pl-[35px] pr-[19px] py-[21px] bg-white flex flex-row items-center rounded-[16px] h-fit">
      <div className="text-[14px] font-normal">Ваши заведения</div>

      <div className="slash"> / </div>

      <div className="gym_name_container">
        <div className="text-[14px] font-medium">И-Талия</div>
        <div className="">
            <img src={arrowDownSvg} alt="" />
        </div>
      </div>
    </div>
  );
}
