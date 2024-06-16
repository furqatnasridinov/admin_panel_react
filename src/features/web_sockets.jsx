import { addOrRemoveClient } from "./clients_slice";
import { BookingData } from "../models/booking_data";
import AppConstants from "../config/app_constants";
import { toast } from "react-toastify";


export default function NewClientsWebSocket({ dispatch, gymId }) {
  const ws = new WebSocket(`wss://77.222.53.122:8080/adminPanel/${gymId}?token=${localStorage.getItem(AppConstants.keyToken)}`);

  ws.onopen = () => {
    console.log("WebSocket Connected");
    //toast.success("WebSocket Connected");
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
        data.usersCount,
        data.description
      );
      dispatch(
        addOrRemoveClient(booking));

    } catch (error) {
      console.error("onmessage Error ", error);
      //toast.error("Ошибка при обработке данных с сервера");
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket Error", error);
    toast.error("ws.onerror");
  };

  ws.onclose = () => {
    console.log("WebSocket Disconnected");
  };

  // Возвращаем WebSocket, чтобы его можно было закрыть в функции очистки
  return ws;
}
