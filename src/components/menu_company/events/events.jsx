import React from "react";
import "./events.css";

export default function Events({ icon, text, onclick }) {
  return (
    <button className="events" onClick={onclick}>
      <img src={icon} alt="employees_manage" />

      <div className="event_text">{text}</div>
    </button>
  );
}
