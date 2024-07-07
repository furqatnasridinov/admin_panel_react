import React from "react";
import "./CrmButton.css";

export default function CrmButton({
  title,
  onСlick,
  width,
  height,
  isDidsabled,
  ref,
  loading,
  backgroundColor = "rgba(94, 220, 145, 1)",
  borderColor = "rgba(58, 185, 109, 1)",
  textColor = "rgba(255, 255, 255, 1)",
}) {
  return (
    <button
      disabled = {isDidsabled}
      ref={ref}
      onClick={(isDidsabled || loading) ? null : onСlick}
        style={{
          width: width,
          height: height,
          paddingLeft : "16px",
          paddingRight : "16px",
          color : isDidsabled ? "rgba(176, 176, 176, 1)" : textColor,
          backgroundColor: isDidsabled ? "rgba(220, 220, 220, 1)" : backgroundColor,
          borderColor: isDidsabled ? "rgba(220, 220, 220, 1)" : borderColor,
        }}
        className="button outline-none"
    >
      {loading ? "Загрузка..." : title}
    </button>
  );
}
