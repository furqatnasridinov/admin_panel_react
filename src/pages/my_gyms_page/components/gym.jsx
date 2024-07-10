import React from "react";
import locationIcon from "../../../assets/svg/location.svg";
import { Link } from "react-router-dom";
import AppConstants from "../../../config/app_constants";
import { setCurrentGym } from "../../../features/current_gym_slice";
import {useDispatch} from "react-redux";

function Gym(props) {
  const dispatch = useDispatch();
  const nextLink = `/myGymsPageMyfit/gymDetails/${props.id}`;
  return (
    <Link to={nextLink}>
      <div
        style={{
          height: "60px",
          width: "100%",
          backgroundColor: "rgba(252, 252, 252, 1)",
          borderRadius: "16px",
          paddingTop: "16px",
          paddingBottom: "16px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "16px",
          border: "1px solid rgba(244, 244, 244, 1)",
        }}
        onClick={() => {
          dispatch(setCurrentGym(props.gym))
          localStorage.setItem(AppConstants.keyGymId, props.id)
        }}
      >
        <div className="flex flex-row items-center  w-full">
          <div className="pl-[10px] flex flex-row gap-[10px] items-center w-[25%]">
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
          <div className="flex justify-center text-[14px] font-normal w-[25%] ">
            {props.activitiesForMonth ?? "0"}
          </div>
          <div className="flex justify-center text-[14px] font-normal w-[25%] ">
            {props.activitiesForWeek ?? "0"}
          </div>
          <div className="flex justify-center text-[14px] font-normal w-[25%] ">
            {props.activitiesForDay ?? "0"}
          </div>
        </div>

        {/* <button className="w-[24px] h-[24px]">
          <img src={threeDotsIcon} alt="" />
        </button> */}
      </div>
    </Link>
  );
}

export default Gym;
