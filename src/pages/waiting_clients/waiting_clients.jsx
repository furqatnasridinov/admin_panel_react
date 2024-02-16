import React from "react";
import { WAITING_TO_ENTER } from "../../dummy_data/dymmy_data";
import EachWaitingClient from "./each_waiting_client";

export default function WaitingClients() {
  return (
    <div className="waitingClients">
      <div className="flex flex-col gap-[5px]">
        <div className="text-[14px] font-bold leading-[16px]">
          Ожидают у входа прямо сейчас
        </div>
        <div className="defaultText">
          В этом разделе вы видите людей, которые уже пришли на занятие и ждут
          от вас подтверждения чтобы пройти. Когда человек подойдёт к вам -
          узнайте его имя и сверьтесь с фото, после чего нажмите зелёную кнопку
          “Впустить”.
        </div>
      </div>

      {WAITING_TO_ENTER.map((client) => {
        return (
          <EachWaitingClient
            key={client.id}
            name={client.name}
            time={client.time}
            event={client.event}
            gym={client.gym}
            onClick={() => {}}
          />
        );
      })}
    </div>
  );
}
