import React from "react";
import { RECENTLY_ATTENDENT } from "../../dummy_data/dymmy_data";
import "./styles.css";
import EachClientWhoWillCome from "./each_client_who_will_come";

export default function RecentlyAttended() {
  return (
    <div className="recentlyAttended">
      <div className="flex flex-col gap-[5px]">
        <div className="text-[14px] font-bold leading-[16px]">
          Пришли недавно
        </div>
        <div className="defaultText">
          Клиенты, которые сегодня вас посетили.
        </div>
      </div>

      {RECENTLY_ATTENDENT.map((client) => {
        return (
          <EachClientWhoWillCome
            key={client.id}
            name={client.name}
            time={client.time}
            event={client.event}
            gym={client.gym}
          />
        );
      })}
    </div>
  );
}
