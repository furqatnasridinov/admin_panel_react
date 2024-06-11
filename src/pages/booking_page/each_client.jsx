import React from "react";
import cancelSvg from "../../assets/svg/cancel.svg";
import done from "../../assets/svg/done_white.svg";
import goggins from "../../assets/images/goggins.jpg";
import "./styles.css";
import { NavLink } from "react-router-dom";

export default function EachClient({
  day,
  weekDay,
  startTime,
  endTIme,
  gym,
  event,
  onAccept,
  onDecline,
  onNavigation,
  hideOpenSchedule,
  loading,
}) {
  return (
    <div className="eachClient">
      <div className="flex flex-row items-center w-[70%] h-full">
        <div className="flex flex-row items-center gap-[10px] ">
          {/* <img className="image28" src={goggins} alt="" /> */}
          <div className="defaultText w-[240px]">Посетитель</div>
        </div>
        <div className="flex flex-col items-center justify-center bg-grey-container w-[135px] h-full ml-[32px]">
          <div className="defaultText">{`${day} (${weekDay})`}</div>
          <div className="defaultText">
            {startTime}-{endTIme}
          </div>
        </div>
        <div className="flex flex-col gap-[5px] ml-[60px]">
          <div className="flex flex-row gap-[5px]">
            <div className="defaultText">{gym}</div>
            <div className="text-[14px] font-medium leading-[16px]">
              {event}
            </div>
          </div>
          {!hideOpenSchedule && (
            <NavLink
              to={{
                pathname: "/schedulePage",
              }}
              onClick={onNavigation}
              className="defaultText text-blue-text cursor-pointer"
            >
              Открыть расписание
            </NavLink>
          )}
        </div>
      </div>
      <div className="w-[260px] h-full gap-[5px] flex flex-row items-center">
        <div className="declineButton" onClick={onDecline}>
          <div className="defaultText">Отклонить</div>
          <img className="w-[15px] h-[15px]" src={cancelSvg} alt="" />
        </div>
        <div style={{opacity : loading ? "0.7" : "1"}} className="acceptButton" onClick={loading ? null : onAccept }>
          {loading && <span className="defaultText text-white">Одобрение... </span>}
          {!loading && <>
            <div className="defaultText text-white">Одобрить</div>
            <img className="w-[15px] h-[15px]" src={done} alt="" />
          </>}
        </div>
      </div>
    </div>
  );
}
