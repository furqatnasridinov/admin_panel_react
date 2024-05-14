import React from "react";

export default function TextAndTextButton({
  text1,
  text2,
  onclick,
  isRedText,
  showText2 = false,
}) {
  return (
    <div className="flex flex-row gap-[10px] items-center">
      <div className="text-[14px] font-bold ">{text1}:</div>
      <div
        className={isRedText ? "text-[13px] font-medium text-red-400 cursor-pointer" : "text-[13px] font-medium text-blue-text cursor-pointer"}
        onClick={showText2 ? onclick : null}
      >
        {showText2 ? text2 : ""}
      </div>
    </div>
  );
}
