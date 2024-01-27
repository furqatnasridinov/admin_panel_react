import React from "react";
import "./button.css";

export default function CustomButton({
  title,
  onСlick,
  width,
  height,
  showShadow,
  fontSize,
}) {
  return (
    <button
      onClick={onСlick}
      style={{
        width: width,
        height: height,
      }}
      className={showShadow ? "with_shadow" : "with_no_shadow"}
    >
      <p
        style={{
          fontSize: fontSize,
        }}
      >
        {title}
      </p>
    </button>
  );
}
