import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import radioActivie from "../../assets/svg/radio_active.svg";
import radioNotActive from "../../assets/svg/radio_not_active.svg";
import { CANCELLATION_REASONS } from "../../dummy_data/dymmy_data";
import EventCancelledBlueContainer from "./event_cancelled_blue_container";
import BackButton from "../../components/button/back_button";
import CustomButton from "../../components/button/button";
import EventRescheduledBlueContainer from "./event_rescheduled_blue_container";
import NoPlacesBlueContainer from "./no_places_blue_container";
import { getSchedules } from "../../features/schedule_slice";

export default function RejectingDialog({ onPop }) {
  // redux
  const dispatch = useDispatch();
  const scheduleState = useSelector((state) => state.schedule);
  const clientsState = useSelector((state) => state.clients);

  // use states
  const [selectedReason, setSelectedReason] = useState(null);
  const [scheduleExists, setScheduleExists] = useState(false);

  useEffect(() => {
    // getting all schedules
    dispatch(getSchedules(clientsState.decliningEvent.gymId));
  }, []);

  useEffect(() => {
    // after we get schedules we need to check if the event is there
    if (scheduleState.allSchedules.length > 0) {
      const eventExists = scheduleState.allSchedules.some(
        (schedule) => schedule.id === clientsState.decliningEvent.lessonId
      );
      if (eventExists) {
        setScheduleExists(true);
      }
    }
  }, [scheduleState.allSchedules]);

  return (
    <div className="rejectingDialog">
      <div className="text-[16px] font-semibold leading-[16px]">
        Укажите причину отказа. Её увидит клиент, заявку которого вы отклоняете.
      </div>

      <div className="flex flex-col gap-4">
        {CANCELLATION_REASONS.map((reason) => {
          return (
            <div
              className="flex flex-row items-center gap-2 cursor-pointer"
              onClick={() => {
                setSelectedReason(reason);
              }}
            >
              <img
                className="w-[24px] h-[24px"
                src={
                  reason.name === selectedReason?.name
                    ? radioActivie
                    : radioNotActive
                }
                alt="radio"
              />
              <div className="text-[13px] font-medium leading-[15px]">
                {reason.name}
              </div>
            </div>
          );
        })}
      </div>

      {selectedReason?.id === 3 &&
        scheduleExists && ( // и если занятие еще не удалено из расписания
          <EventCancelledBlueContainer
            event={clientsState.decliningEvent}
            onPop={onPop}
            scheduleExists={scheduleExists}
          />
        )}

      {selectedReason?.id === 2 && (
        <>
          <EventRescheduledBlueContainer
            reScheduledEvent={clientsState.decliningEvent}
            onPop={onPop}
          />
        </>
      )}

      {selectedReason?.id === 1 && (
        <NoPlacesBlueContainer
          event={clientsState.decliningEvent}
          onPop={onPop}
        />
      )}

      {selectedReason === null && (
        <BackButton
          width={"100%"}
          height={"40px"}
          title={"Отменить"}
          onСlick={onPop}
        />
      )}
    </div>
  );
}
