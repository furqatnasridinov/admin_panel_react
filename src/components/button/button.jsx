import React from "react";
import "./button.css";

export default function CustomButton({
  title,
  onСlick,
  width,
  height,
  showShadow,
  fontSize,
  isDidsabled,
}) {
  return (
    <button
      onClick={isDidsabled ? null : onСlick}
      style={{
        width: width,
        height: height,
      }}
      className={showShadow ? "with_shadow" : "with_no_shadow"}
    >
      <p
        style={{
          fontSize: fontSize,
          cursor: isDidsabled ? "not-allowed" : "pointer",
        }}
      >
        {title}
      </p>
    </button>
  );
}
