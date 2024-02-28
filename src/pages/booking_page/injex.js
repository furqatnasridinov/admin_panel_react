import React from "react";
import "./styles.css";
import BookingHeader from "./booking_header";
import BookingBody from "./booking_body";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getListOfGyms,
  setCurrentGymFromFirstItem,
} from "../../features/current_gym_slice";
import { getNewClients } from "../../features/clients_slice";

export default function BookingPage() {
  // redux
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const clientsSlice = useSelector((state) => state.clients);

  // get initial data`s
  useEffect(() => {
    dispatch(getListOfGyms());
  }, []);

  useEffect(() => {
    if (gymState.listOfGyms?.length === 1) {
      dispatch(setCurrentGymFromFirstItem());
    }
  }, [gymState.listOfGyms]);

  useEffect(() => {
    if (gymState.currentGym !== null) {
      dispatch(getNewClients(gymState.currentGym.id));
    }
  }, [gymState.currentGym]);

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
