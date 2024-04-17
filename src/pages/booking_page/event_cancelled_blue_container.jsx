import React, { Fragment } from "react";
import "./styles.css";
import BackButton from "../../components/button/back_button";
import CustomButton from "../../components/button/button";
import { rejectClient, getNewClients } from "../../features/clients_slice";
import { deleteSchedule ,getSchedules} from "../../features/schedule_slice";
import { useDispatch } from "react-redux";


export default function EventCancelledBlueContainer({
  event,
  onPop,
  scheduleExists,
  reScheduledEvent,
}) {
  // redux
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="blueContainer">
        <div className="flex flex-col gap-1">
          <div className="text-[14px] font-bold">
            Это действие удалит из расписания следующее занятие:
          </div>

          <div className="text-[13px] font-medium leading-[15px]">
            {event.title ?? "Описание отсутствует"}
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <div className="text-[14px] font-bold">Дата и время проведения:</div>

          {event.startTime && event.endTime && (
            <div className="flex flex-row gap-1 items-center">
              <div className="text-[13px] font-medium leading-[15px]">
                {event.startTime.toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })}
              </div>
              <div className="text-[13px] font-medium leading-[15px]">
                {event.startTime.toLocaleTimeString("ru-RU", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              <div className="">-</div>
              <div className="text-[13px] font-medium leading-[15px]">
                {event.endTime.toLocaleTimeString("ru-RU", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {reScheduledEvent.usersCounts > 0 &&
          <div className="">{`На это событие записано ${reScheduledEvent.usersCounts} пользователей.`}</div>}

      {/* buttons  */}
      <div className="flex flex-row gap-[10px]">
        <BackButton
          width={"114px"}
          height={"40px"}
          title={"Отменить"}
          onСlick={onPop}
        />

        <CustomButton
          width={"100%"}
          height={"40px"}
          fontSize={"14px"}
          title="Отклонить заявку и удалить занятие из расписания"
          onСlick={async () => {
            // reject clients request
            const request = {
              gymId: event.gymId,
              waitingId: event.id,
            };
            await dispatch(rejectClient(request));

            // delete event from schedule if is exists
            if (scheduleExists) {
             await dispatch(
                deleteSchedule({
                  gymId: event.gymId,
                  lessonId: event.lessonId,
                  all: false,
                })
              );
            }
            dispatch(getSchedules(event.gymId));
            dispatch(getNewClients(event.gymId));

            onPop();
          }}
        />
      </div>
    </Fragment>
  );
}
