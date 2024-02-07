import React from "react";
import locationIcon from "../../../assets/svg/location.svg";
import threeDotsIcon from "../../../assets/svg/three_dots.svg";
import { Link } from "react-router-dom";

function Gym(props) {
  return (
    <Link to={`/myGymsPage/gymDetails/${props.id}`}>
      <div
        style={{
          height: "60px",
          width: "100%",
          backgroundColor: "rgba(252, 252, 252, 1)",
          borderRadius: "16px",
          paddingTop: "16px",
          paddingBottom: "16px",
          paddingLeft: "32px",
          paddingRight: "32px",
          display: "flex",
          flexDirection : "row",
          alignItems: "center",
          marginBottom: "16px",
          border : "1px solid rgba(244, 244, 244, 1)"
        }}
      >
        <div className="flex flex-row items-center  w-full">
          <div className=" flex flex-row gap-[10px] items-center  w-[250px]">
            <img src={locationIcon} alt="" />
            <p
              style={{
                color: "black",
                fontSize: "14px",
                fontWeight: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {props.gymName}
            </p>
          </div>
          <div className="flex items-center justify-center  w-[130px] h-[30px] ml-[60px] text-[14px] font-normal">
            {props.activitiesForMonth ?? "0"}
          </div>
          <div className="flex items-center justify-center text-[14px] font-normal   w-[90px] ml-[190px]">
            {props.activitiesForWeek ?? "0"}
          </div>
          <div className="flex items-center justify-center text-[14px] font-normal  w-[60px] ml-[190px]">
            {props.activitiesForDay ?? "0"}
          </div>
        </div>

        <button className="w-[24px] h-[24px]">
          <img src={threeDotsIcon} alt="" />
        </button>
      </div>
    </Link>
  );
}

export default Gym;
