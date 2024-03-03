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
  zIndex,
  isLoading,
}) {
  return (
    <button
      onClick={(isDidsabled || isLoading) ? null : onСlick}
      style={{
        width: width,
        height: height,
        zIndex: zIndex,
      }}
      className={showShadow ? "with_shadow" : "with_no_shadow"}
    >
      <p
        style={{
          fontSize: fontSize,
          cursor: isDidsabled ? "not-allowed" : "pointer",
        }}
      >
        { isLoading ? "Загрузка..." : title}
      </p>
    </button>
  );
}
