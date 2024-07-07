import React from "react";
import "./events.css";

export default function Events({ isMyfit, text, onClick }) {
  return (
    <button className="events" onClick={onClick}>
      <LeaveSvg isMyfit={isMyfit} />

      <div className="event_text">{text}</div>
    </button>
  );
}



const LeaveSvg = ({isMyfit}) => {
  const bgColor = isMyfit ? "#F5F9FF" : "#F2FFF7";
  const baseColor = isMyfit ? "#3E86F5" : "#00B67A";
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z" fill={bgColor} />
    <path d="M12 12.5H16.375M16.375 12.5L14.5 14.375M16.375 12.5L14.5 10.625" stroke={baseColor} stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16.375 8.75V8.75C16.375 7.71447 15.5355 6.875 14.5 6.875H9.625C8.52043 6.875 7.625 7.77043 7.625 8.875V16.125C7.625 17.2296 8.52043 18.125 9.625 18.125H14.5C15.5355 18.125 16.375 17.2855 16.375 16.25V16.25" stroke={baseColor}  stroke-linecap="round" stroke-linejoin="round" />
  </svg>
};
