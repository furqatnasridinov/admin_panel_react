import React from "react";
import "./styles.css";
import { DUMMY_CLIENTS } from "../../dummy_data/dymmy_data";
import EachClient from "./each_client";

export default function BookingBody() {
  return (
    <div className="bookingBody">
      <div className="flex flex-col gap-1">
        <div className="text-[14px] font-bold leading-[16px]">
          Постарайтесь обрабатывать заявки из этого раздела как можно быстрее.
        </div>
        <div className="text-[14px] font-normal leading-[16px]">
          Когда пользователь приложения находит нужное ему занятие, он нажимает
          на кнопку “Записаться”, после чего вы должны свериться с графиком и
          подтвердить запись, либо отклонить её и указать причину отказа.
        </div>
      </div>

      {DUMMY_CLIENTS.map((client) => {
        return (
          <EachClient
            key={client.id}
            name={client.name}
            day={client.day}
            time={client.time}
            gym={client.gym}
            event={client.event}
          />
        );
      })}
    </div>
  );
}
