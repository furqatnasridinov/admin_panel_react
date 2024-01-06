import React from "react";
import "./employees_tile.css";

export default function EmployeesTile({photo, name, job,isThatYou}) {
  return (
    <div className="container">
      <div className="photo_background">
        <img src={photo} alt="" />
      </div>
      <div className="name_and_job">
        <div className="name">
          <p className="name">{name}</p>
          {isThatYou ? <p className="you"> (Вы)</p> : <p ></p>}
          
        </div>

        <p className="job"> {job}</p>
      </div>
    </div>
  );
}
