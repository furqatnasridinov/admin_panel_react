import React from "react";

export default function TextAndTextButton({ text1, text2, onclick }) {
  return (
    <div className="flex flex-row gap-[10px]">
      <div className="text-[14px] font-bold ">{text1}:</div>
      <button className="text-[13px] font-medium text-blue-text" onClick={onclick}>
        {text2}
      </button>
    </div>
  );
}
