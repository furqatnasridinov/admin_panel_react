import { addClientToList, replaceItemInAarray } from "./clients_slice";
import { BookingData } from "../models/booking_data";


export default function NewClientsWebSocket({ dispatch, waitingForAccept, gymId }) {
  const ws = new WebSocket(`ws://77.222.53.122:8080/adminPanel/${gymId}`);

  ws.onopen = () => {
    console.log("WebSocket Connected");
  };

  ws.onmessage = (event) => {
    console.log("WebSocket Message", event.data);

    try {
      function parseDuration(duration) {
        const [hours, minutes] = duration.split(":").map(Number);
        return (hours * 60 + minutes) * 60 * 1000; // Преобразование в миллисекунды
      }
      const data = JSON.parse(event.data);
      const startTime = new Date(data.date.replace("@", "T"));
      const endTime = new Date(
        startTime.getTime() + parseDuration(data.duration)
      );
      var booking = new BookingData(
        data.id,
        data.gymId,
        data.gymName,
        startTime,
        endTime,
        data.lessonType,
        data.lessonId,
        data.repeat,
        data.usersCount
      )
      if (waitingForAccept.some(element => element.id === booking.id)) {
        dispatch(replaceItemInAarray(booking));
      } else {
        dispatch(
          addClientToList(
            new BookingData(
              data.id,
              data.gymId,
              data.gymName,
              startTime,
              endTime,
              data.lessonType,
              data.lessonId,
              data.repeat,
              data.usersCount
            )
          )
        );
      }
    } catch (error) {
      console.error("onmessage Error ", error);
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket Error", error);
  };

  ws.onclose = () => {
    console.log("WebSocket Disconnected");
  };

  // Возвращаем WebSocket, чтобы его можно было закрыть в функции очистки
  return ws;
}
