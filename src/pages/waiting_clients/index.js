import React from "react";
import BookingHeader from "../booking_page/booking_header";
import RecentlyAttended from "./waiting_clients";
import ComeLaterClients from "./come_later_clients";
import "./styles.css";

export default function WaitingClientsPage() {
  return (
    <div className="waitingPage">
      <BookingHeader />

      <RecentlyAttended />
      <ComeLaterClients />
    </div>
  );
}
