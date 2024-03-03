import React from "react";

export default function TitleText({
  firstText,
  secondText,
  isNotValidated,
  onClick,
  isEnabled,
  undoAction,
}) {
  return (
    <div className="flex flex-row gap-[10px]">
      <div
        className="text-[14px] font-bold leading-[16px] "
        style={{ color: isNotValidated ? "rgba(255, 136, 136, 1)" : "black" }}
      >
        {firstText}:
      </div>
      <div
        style={{
          color: isEnabled ? "rgba(255, 136, 136, 1)" : "rgba(62, 134, 245, 1)",
        }}
        className="text-[13px] font-medium leading-[16px]  cursor-pointer"
        onClick={isEnabled ? undoAction : onClick}
      >
        {isEnabled ? "Отменить" : secondText ?? "Добавить"}
      </div>
    </div>
  );
}
