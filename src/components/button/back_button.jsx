import React from "react";
import "./back_button.css";

export default function BackButton({
  title,
  onСlick,
  width,
  height,
  isDidsabled,
  hideHover,
  ref
}) {
  return (
    <button
    disabled = {isDidsabled}
    ref={ref}
    onClick={(isDidsabled) ? null : onСlick}
      style={{
        width: width,
        height: height,
        paddingLeft : "16px",
        paddingRight : "16px",
        color : isDidsabled ? "rgba(176, 176, 176, 1)" : "",
        backgroundColor: isDidsabled ? "rgba(220, 220, 220, 1)" : "",
        borderColor: isDidsabled ? "rgba(220, 220, 220, 1)" : "",
      }}
      className={
        hideHover
          ? "white_button_with_no_hover outline-none"
          : "white_button outline-none"
      }
    >
      {title}
    </button>
  );
}
