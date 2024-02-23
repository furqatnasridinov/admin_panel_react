import React from "react";
import "./back_button.css";

export default function BackButton({
  title,
  onСlick,
  width,
  height,
  hideHover,
}) {
  return (
    <button
      onClick={onСlick}
      style={{
        width: width,
        height: height,
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
