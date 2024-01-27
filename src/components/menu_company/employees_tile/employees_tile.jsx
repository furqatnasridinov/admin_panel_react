import React from "react";
import "./employees_tile.css";

export default function EmployeesTile({ photo, name, job, isThatYou }) {
  return (
    <div className="container">
      <div className="photo_background">
        <img src={photo} alt="" />
      </div>
      <div className="name_and_job">
        <div className="flex flex-row gap-[3px]">
          <div className="text-[14px] font-bold leading-none">{name}</div>
          <div className="you leading-none">{isThatYou ? "(Вы)" : ""}</div>
        </div>
        <div className="text-[14px] font-normal leading-none">{job}</div>
      </div>
    </div>
  );
}
