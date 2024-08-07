import React from "react";
import "./styles.css";
import { COME_LATER } from "../../dummy_data/dymmy_data";
import EachClientWhoWillCome from "./each_client_who_will_come";

export default function WillCome({ clientsList, doNotShowBlock }) {
  if (doNotShowBlock) {
    return null;
  }
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

      {clientsList &&
        clientsList?.length > 0 &&
        [...clientsList] // Создаем копию массива перед сортировкой
          .sort((a, b) => a.startTime - b.startTime)
          .map((client) => {
            let day = client.startTime.getDate();
            let month = client.startTime.getMonth() + 1;
            let startHours = client.startTime.getHours();
            let startMinutes = client.startTime.getMinutes();
            let endHours = client.endTime.getHours();
            let endMinutes = client.endTime.getMinutes();

            // Добавляем ведущие нули, если необходимо
            day = day < 10 ? "0" + day : day;
            month = month < 10 ? "0" + month : month;
            startHours = startHours < 10 ? "0" + startHours : startHours;
            startMinutes = startMinutes < 10 ? "0" + startMinutes : startMinutes;
            endHours = endHours < 10 ? "0" + endHours : endHours;
            endMinutes = endMinutes < 10 ? "0" + endMinutes : endMinutes;
            return (
              <EachClientWhoWillCome
                key={client.id}
                startTime={`${startHours}:${startMinutes}`}
                endTime={`${endHours}:${endMinutes}`}
                event={client.lessonType}
                gym={client.gymName}
                userName={client.userName}
                picture={client.pictureUrl}
              />
            );
          })}
    </div>
  );
}
