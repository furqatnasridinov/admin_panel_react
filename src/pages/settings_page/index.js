import React from "react";
import SettingsHeader from "./settings_header";
import PersonalInfos from "./personal_infos";
import Security from "./security";
import Notification from "./notification";

function SettingsPage() {
  return (
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <SettingsHeader />
      <PersonalInfos />
      <Security />
      <Notification />
    </div>
  );
}

export default SettingsPage;
