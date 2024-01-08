import React from "react";
import GymDetailesHeader from "./views/gym_detailes_header/gym_detailes_header";
import { useParams } from "react-router-dom";

export default function GymDetails() {
  let { gymId } = useParams(); // This hooks allows you to extract params from the URL

  // Logic to fetch gym details based on gymId
  // ...

  return (
    <div className="flex flex-col flex-1 ml-[10px] gap-[10px] h-[97vh] bg-red-300">
      <GymDetailesHeader />
      
    </div>
  );
}
