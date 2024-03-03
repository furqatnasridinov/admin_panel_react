import React from "react";
import AppConstants from "../../config/app_constants";

export default function SettingsHeader() {
  return (
    <div className="pl-[35px] pr-[19px] py-[32px] bg-white flex flex-col gap-1 rounded-[16px] ">
      <div className="text-[14px] font-medium leading-[16px]" 
      onClick={()=>{localStorage.removeItem(AppConstants.keyToken)}}>
        {/* {localStorage.getItem(AppConstants.keyToken)} */}
        Настойки
      </div>
    </div>
  );
}
