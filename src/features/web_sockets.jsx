import { addClientToList } from "./clients_slice";
import { useDispatch } from "react-redux";
import { BookingData } from "../models/booking_data";

export default function NewClientsWebSocket(dispatch) {
  const ws = new WebSocket("ws://77.222.53.122:8080/adminPanel/3");

  ws.onopen = () => {
    console.log("WebSocket Connected");
    // Здесь можно отправить какие-либо сообщения серверу, если это необходимо
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
    } catch (error) {
      console.error("Error ", error);
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket Error", error);
  };

  ws.onclose = () => {
    console.log("WebSocket Disconnected");
  };
}
