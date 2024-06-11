import React from "react";
import "./styles.css";
import EachClient from "./each_client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getNewClients,
  acceptClient,
  setDecliningEvent,
} from "../../features/clients_slice";
import CustomDialog from "../../components/dialog/dialog";
import RejectingDialog from "./rejecting_dialog";
import { getSchedules } from "../../features/schedule_slice";

export default function MessageLikeTopContainer({ hideOpenSchedule }) {
  // redux
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const clientsSlice = useSelector((state) => state.clients);
  const gymState = useSelector((state) => state.currentGym);
  // use states
  const [dialogOpened, openDialog] = useState(false);
  const [acceptingWaingId, setAcceptingWaitingId] = useState(null);

  const createClientCard = (client) => {
    let day = client.startTime.getDate();
    let month = client.startTime.getMonth() + 1;
    let startHours = client.startTime.getHours();
    let startMinutes = client.startTime.getMinutes();
    let endHours = client.endTime.getHours();
    let endMinutes = client.endTime.getMinutes();
    let options = { weekday: "short" };
    let weekday = client.startTime.toLocaleString("ru-RU", options);
    const today = new Date();
    // Если день совпадает с сегодняшним, то выводим "Сегодня", если с завтрашним, то "Завтра"
    if (
      today.getDate() === day &&
      today.getMonth() === client.startTime.getMonth()
    ) {
      weekday = "Сегодня";
    }
    if (
      today.getDate() + 1 === day &&
      today.getMonth() === client.startTime.getMonth()
    ) {
      weekday = "Завтра";
    }
    // Добавляем ведущие нули, если необходимо
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    startHours = startHours < 10 ? "0" + startHours : startHours;
    startMinutes =
      startMinutes < 10 ? "0" + startMinutes : startMinutes;
    endHours = endHours < 10 ? "0" + endHours : endHours;
    endMinutes = endMinutes < 10 ? "0" + endMinutes : endMinutes;

    return (
      <EachClient
        key={client.id}
        day={`${day}.${month}`}
        weekDay={weekday}
        startTime={`${startHours}:${startMinutes}`}
        endTIme={`${endHours}:${endMinutes}`}
        gym={client.gymName}
        event={client.lessonType}
        loading={acceptingWaingId === client.id}
        onAccept={async () => {
          const request = {
            gymId: client.gymId,
            waitingId: client.id,
          };
          setAcceptingWaitingId(client.id);
          await dispatch(acceptClient(request));
          dispatch(getNewClients(gymState.currentGym.id));
          setAcceptingWaitingId(null);
          dispatch(getSchedules(client.gymId));
        }}
        onDecline={async () => {
          openDialog(true);
          dispatch(setDecliningEvent(client));
        }}
        hideOpenSchedule={hideOpenSchedule}
      />
    );
  };

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
        clientsSlice.waitingForAccept &&
        clientsSlice.waitingForAccept?.length > 0 &&
        [...clientsSlice.waitingForAccept]
          .sort((a, b) => a.id - b.id)
          .slice(0, 1)
          .map(createClientCard)}

      {showAll &&
        clientsSlice.waitingForAccept &&
        clientsSlice.waitingForAccept?.length > 0 &&
        [...clientsSlice.waitingForAccept]
          .sort((a, b) => a.id - b.id)
          .map(createClientCard)}

      {clientsSlice.waitingForAccept?.length > 1 && (
        <>
          <div
            className="text-[10px] text-blue-text font-medium leading-[11px] cursor-pointer text-center"
            onClick={() => setShowAll(!showAll)}>
            {!showAll ? `Показать еще ${clientsSlice.waitingForAccept?.length - 1}` : "Скрыть"}
          </div>
        </>
      )}

      {dialogOpened && (
        <CustomDialog
          isOpened={dialogOpened}
          closeOnTapOutside={() => {
            openDialog(false);
          }}
        >
          <RejectingDialog onPop={() => openDialog(false)} />
        </CustomDialog>
      )}
    </div>
  );
}



