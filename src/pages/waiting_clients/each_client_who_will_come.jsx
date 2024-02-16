import React from "react";
import "./styles.css";
import goggins from "../../assets/images/goggins.jpg";

export default function EachClientWhoWillCome({ name, time, event, gym }) {
  return (
    <div className="eachClientWhoWillCome">
      <div className="flex flex-row items-center  h-full w-[65%] ">
        <div className="flex flex-row items-center gap-[10px] ">
          <img className="image28" src={goggins} alt="" />
          <div className="defaultText w-[240px]">{name}</div>
        </div>

        <div className="flex items-center justify-center bg-grey-container w-[155px] h-full ml-[50px]">
          <div className="defaultText">{time}</div>
        </div>
        <div className="defaultText  w-fit ml-[40px] ">{event}</div>
      </div>
      <div className="flex flex-row items-center  h-full w-[35%] gap-[32px] justify-end">
        <div className="defaultText">{gym}</div>
      </div>
    </div>
  );
}
