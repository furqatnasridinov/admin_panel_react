import React from "react";
import { Outlet } from "react-router-dom";

export default function ClientPageLayoutCrm() {
  return (
    <>
      <Outlet /> {/* Renders the nested routes */}
    </>
  );
}
