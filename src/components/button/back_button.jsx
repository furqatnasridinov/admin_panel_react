import React from "react";
import "./back_button.css";

export default function BackButton({
  title,
  onСlick,
  width = "180px",
  height = "40px",
  isDidsabled,
  hideHover,
  ref,
  loading,
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
          color : isDidsabled ? "rgba(176, 176, 176, 1)" : "",
          backgroundColor: isDidsabled ? "rgba(220, 220, 220, 1)" : "",
          borderColor: isDidsabled ? "rgba(220, 220, 220, 1)" : "",
          opacity : loading ? 0.6 : 1,
        }}
        className={hideHover ? "white_button_with_no_hover outline-none" : "white_button outline-none"
        }
    >
      {loading ? "Загрузка..." : title}
    </button>
  );
}
