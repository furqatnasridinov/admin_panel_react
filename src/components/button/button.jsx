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
      disabled = {isDidsabled}
      onClick={(isDidsabled || isLoading) ? null : onСlick}
      style={{
        width: width,
        height: height,
        zIndex: zIndex,
        opacity: isLoading ? 0.7 : 1,
        backgroundColor: isDidsabled ? "rgba(220, 220, 220, 1)" : "",
        borderColor: isDidsabled ? "rgba(220, 220, 220, 1)" : "",
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
