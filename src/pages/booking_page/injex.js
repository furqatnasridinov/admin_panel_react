import React from "react";
import "./styles.css";
import BookingHeader from "./booking_header";
import BookingBody from "./booking_body";
import { useSelector } from "react-redux";


export default function BookingPage() {
  // redux
  const gymState = useSelector((state) => state.currentGym);
  const clientsSlice = useSelector((state) => state.clients);

  return (
    <div className="bookingPage">
      {gymState.currentGym !== null && (
        <>
          <BookingHeader
            gym={gymState.currentGym}
            listOfGyms={gymState.listOfGyms}
            showDropDown={gymState.listOfGyms?.length > 1}
          />
          <BookingBody
            clientsList={clientsSlice.waitingForAccept}
            doNotShowBlock={clientsSlice.waitingForAccept?.length === 0}
          />

          {clientsSlice.waitingForAccept?.length === 0 && (
            <div className="centeredGreyText">
              В ближайшее время у вас нет заявок
            </div>
          )}
        </>
      )}
    </div>
  );
}
