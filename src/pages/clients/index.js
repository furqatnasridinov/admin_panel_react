import React from "react";
import "./styles.css";
import BookingHeader from "../booking_page/booking_header";
import AlreadyCame from "./already_came";
import WillCome from "./will_come";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getListOfGyms,
  setCurrentGymFromFirstItem,
} from "../../features/current_gym_slice";
import {
  getAlreadyCameToday,
  getWillComeToday,
} from "../../features/clients_slice";

export default function ClientsPage() {
  // redux
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const clientsSlice = useSelector((state) => state.clients);

  // get initial data`s
  useEffect(() => {
    dispatch(getListOfGyms());
  }, []);

  useEffect(() => {
    if (gymState.listOfGyms.length === 1) {
      dispatch(setCurrentGymFromFirstItem());
    }
  }, [gymState.listOfGyms]);

  useEffect(() => {
    if (gymState.currentGym !== null) {
      //dispatch(getNewClients(gymState.currentGym.id));
      dispatch(getWillComeToday(gymState.currentGym.id));
      dispatch(getAlreadyCameToday(gymState.currentGym.id));
    }
  }, [gymState.currentGym]);

  return (
    <div className="waitingPage">
      {gymState.currentGym !== null && (
        <>
          <BookingHeader
            gym={gymState.currentGym}
            listOfGyms={gymState.listOfGyms}
            showDropDown={gymState.listOfGyms.length > 1}
          />

          <AlreadyCame
            doNotShowBlock={clientsSlice.alreadyCameToday.length === 0}
            clientsList={clientsSlice.alreadyCameToday}
          />

          <WillCome
            clientsList={clientsSlice.willComeToday}
            doNotShowBlock={clientsSlice.willComeToday.length === 0}
          />

          {clientsSlice.alreadyCameToday.length === 0 &&
            clientsSlice.willComeToday.length === 0 && (
              <div className="centeredGreyText">Сегодня у вас нет событий</div>
            )}
        </>
      )}
    </div>
  );
}
