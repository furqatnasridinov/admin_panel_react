import React from "react";
import "./back_button.css";

export default function BackButton({
  title,
  onСlick,
  width,
  height,
  hideHover,
  ref
}) {
  return (
    <button
    ref={ref}
      onClick={onСlick}
      style={{
        width: width,
        height: height,
        paddingLeft : "16px",
        paddingRight : "16px"
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
