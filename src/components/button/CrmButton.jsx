import React from "react";
import "./CrmButton.css";

export default function CrmButton({
  title,
  onСlick,
  width = "fit-content",
  height = "40px",
  isDidsabled = false,
  ref,
  loading,
  backgroundColor = "rgba(94, 220, 145, 1)",
  borderColor = "rgba(58, 185, 109, 1)",
  textColor = "rgba(255, 255, 255, 1)",
  paddingLeft = "16px",
  paddingRight = "16px",
}) {
  const _backgroundColor = isDidsabled ? "rgba(220, 220, 220, 1)" : backgroundColor;
  const _borderColor = isDidsabled ? "rgba(220, 220, 220, 1)" : borderColor;
  const _color = isDidsabled ? "rgba(176, 176, 176, 1)" : textColor;
  const hoverColor = isDidsabled ? "gray-indicator" : "crm-main";


  return (
    <button
      disabled = {isDidsabled}
      ref={ref}
      onClick={(isDidsabled || loading) ? null : onСlick}
        style={{
          width: width,
          height: height,
          paddingLeft : paddingLeft,
          paddingRight : paddingRight,
          color : _color,
          backgroundColor: _backgroundColor,
          borderColor: _borderColor,
        }}
        className={`button outline-none ${`hover:bg-${hoverColor}`}`}
    >
      {loading ? "Загрузка..." : title}
    </button>
  );
}
