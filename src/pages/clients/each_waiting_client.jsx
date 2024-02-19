import React from "react";
import done from "../../assets/svg/done_white.svg";
import "./styles.css";
import goggins from "../../assets/images/goggins.jpg";

export default function EachWaitingClient({ name, time, event, gym, onClick }) {
  return (
    <div className="eachWaitingClient">
      <div className="flex flex-row items-center  h-full w-[65%]">
        <div className="flex flex-row items-center gap-[10px] ">
          <div className="defaultText w-[240px]">Посетитель</div>
        </div>
        <div className="flex items-center justify-center bg-grey-container w-[155px] h-full ml-[50px]">
          <div className="defaultText">{time}</div>
        </div>
        <div className="defaultText  w-fit ml-[40px]">{event}</div>
      </div>
      <div className="flex flex-row items-center  h-full w-[35%] gap-[32px] justify-end">
        <div className="defaultText">{gym}</div>
        <div className="acceptButton" onClick={onClick}>
          <div className="defaultText text-white">Пропустить</div>
          <img className="w-[15px] h-[15px]" src={done} alt="" />
        </div>
      </div>
    </div>
  );
}
