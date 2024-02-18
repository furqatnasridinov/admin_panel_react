import React from "react";
import "./styles.css";
import { DUMMY_CLIENTS } from "../../dummy_data/dymmy_data";
import EachClient from "./each_client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeClient } from "../../features/clients_slice";

export default function MessageLikeTopContainer() {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const clientsSlice = useSelector((state) => state.clients);

  return (
    <div className="bookingBody mb-[10px]">
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

      {!showAll &&
        clientsSlice.waitingForAccept.slice(0, 1).map((client) => {
          return (
            <EachClient
              key={client.id}
              name={client.name}
              day={client.day}
              time={client.time}
              gym={client.gym}
              event={client.event}
              onAccept={() => {
                //dispatch(removeClient(client.id));
              }}
              onDecline={() => {}}
            />
          );
        })}

      {!showAll && (
        <>
          <div
            className="text-[10px] text-blue-text font-medium leading-[11px] cursor-pointer text-center"
            onClick={() => setShowAll(true)}
          >
            Показать еще {DUMMY_CLIENTS.length - 1}
          </div>
        </>
      )}

      {showAll &&
        clientsSlice.waitingForAccept.map((client) => {
          return (
            <EachClient
              key={client.id}
              name={client.name}
              day={client.day}
              time={client.time}
              gym={client.gym}
              event={client.event}
              onAccept={() => {}}
              onDecline={() => {}}
            />
          );
        })}

      {showAll && (
        <>
          <div
            className="text-[10px] text-blue-text font-medium leading-[11px] cursor-pointer text-center"
            onClick={() => setShowAll(false)}
          >
            Скрыть
          </div>
        </>
      )}
    </div>
  );
}
