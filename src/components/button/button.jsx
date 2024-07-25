import React from "react";
import "./button.css";

export default function CustomButton({
  title,
  onСlick,
  width = "150px",
  height = "40px",
  showShadow,
  fontSize = "14px",
  isDidsabled,
  zIndex,
  isLoading,
  showPlus,
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
        transition: "all 0.3s",
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
      {showPlus && !isLoading && <svg width="35" height="35" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.38916 6C0.38916 2.68629 3.07545 0 6.38916 0H18.3892C21.7029 0 24.3892 2.68629 24.3892 6V18C24.3892 21.3137 21.7029 24 18.3892 24H6.38916C3.07545 24 0.38916 21.3137 0.38916 18V6Z" fill="" />
        <path d="M8.63916 12.5H12.3892M16.1392 12.5H12.3892M12.3892 12.5V8.75M12.3892 12.5V16.25" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" />
      </svg>}
    </button>
  );
}
