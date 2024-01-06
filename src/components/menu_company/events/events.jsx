import React from "react";
import "./events.css"

export default function Events({icon, text, onclick}) {
  return (
    <button className="events" onClick={onclick}>
      <div className="icon_container">
        <img src={icon} alt="employees_manage" />
      </div>
      <div className="event_text">{text}</div>
    </button>
  );
}
