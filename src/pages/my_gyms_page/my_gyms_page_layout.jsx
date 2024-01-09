import React from "react";
import { Outlet } from "react-router-dom";

export default function MyGymsPageLayout() {
  return (
    <>
      <Outlet /> {/* Renders the nested routes */}
    </>
  );
}
