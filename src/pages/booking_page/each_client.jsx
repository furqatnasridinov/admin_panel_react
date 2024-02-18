import React from "react";
import cancelSvg from "../../assets/svg/cancel.svg";
import done from "../../assets/svg/done_white.svg";
import goggins from "../../assets/images/goggins.jpg";
import "./styles.css";

export default function EachClient({
  name,
  day,
  time,
  gym,
  event,
  onAccept,
  onDecline,
}) {
  return (
    <div className="eachClient">
      <div className="flex flex-row items-center w-[70%] h-full">
        <div className="flex flex-row items-center gap-[10px] ">
          <img className="image28" src={goggins} alt="" />
          <div className="defaultText w-[240px]">{name}</div>
        </div>
        <div className="flex flex-col items-center justify-center bg-grey-container w-[135px] h-full ml-[32px]">
          <div className="defaultText">{day}</div>
          <div className="defaultText">{time}</div>
        </div>
        <div className="flex flex-col gap-[5px] ml-[60px]">
          <div className="flex flex-row gap-[5px]">
            <div className="defaultText">{gym}</div>
            <div className="text-[14px] font-medium leading-[16px]">
              {event}
            </div>
          </div>
          <div className="defaultText text-blue-text cursor-pointer">
            Открыть расписание
          </div>
        </div>
      </div>
      <div className="w-[260px] h-full gap-[5px] flex flex-row items-center">
        <div className="acceptButton" onClick={onAccept}>
          <div className="defaultText text-white">Одобрить</div>
          <img className="w-[15px] h-[15px]" src={done} alt="" />
        </div>
        <div className="declineButton" onClick={onAccept}>
          <div className="defaultText">Отклонить</div>
          <img className="w-[15px] h-[15px]" src={cancelSvg} alt="" />
        </div>
      </div>
    </div>
  );
}
