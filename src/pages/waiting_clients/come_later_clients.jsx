import React from "react";
import "./styles.css";
import { COME_LATER } from "../../dummy_data/dymmy_data";
import EachClientWhoWillCome from "./each_client_who_will_come";

export default function ComeLaterClients() {
  return (
    <div className="comeLaterClients">
      <div className="flex flex-col gap-[5px]">
        <div className="text-[14px] font-bold leading-[16px]">
          Придут сегодня позднее
        </div>
        <div className="defaultText">
          Тут вы можете увидеть как скоро вас посетят люди, пришедшие от MyFit.
        </div>
      </div>

      {COME_LATER.map((client) => {
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
