import React from "react";

export default function TextAndTextButton({
  text1,
  text2,
  onclick,
  isRedText,
}) {
  return (
    <div className="flex flex-row gap-[10px]">
      <div className="text-[14px] font-bold ">{text1}:</div>
      <div
        className={
          isRedText
            ? "text-[13px] font-medium text-red-400 cursor-pointer"
            : "text-[13px] font-medium text-blue-text cursor-pointer"
        }
        onClick={onclick}
      >
        {text2}
      </div>
    </div>
  );
}
