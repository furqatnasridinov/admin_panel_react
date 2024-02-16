import React from "react";
import "./styles.css";
import BookingHeader from "./booking_header";
import BookingBody from "./booking_body";

export default function BookingPage() {
  return (
    <div className="bookingPage">
      <BookingHeader />
      <BookingBody />
    </div>
  );
}
