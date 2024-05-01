import React from "react";
import SettingsHeader from "./settings_header";
import PersonalInfos from "./personal_infos";
import Security from "./security";
import NotificationBlock from "./notification";
import { useSelector } from "react-redux";
import MessageLikeTopContainer from "../booking_page/message_like_top_container";

function SettingsPage() {
  const clientsSlice = useSelector((state) => state.clients);
  return (
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      {clientsSlice.waitingForAccept.length > 0 && (
        <MessageLikeTopContainer hideOpenSchedule={true} />
      )}
      <SettingsHeader />
      <PersonalInfos />
      <Security />
      <NotificationBlock />
    </div>
  );
}

export default SettingsPage;
