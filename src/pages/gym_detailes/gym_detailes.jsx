import React from "react";
import { useParams } from "react-router-dom";
import GymDetailesHeader from "./views/gym_detailes_header/gym_detailes_header";
import GymDetailesBodyFirstContainer from "./views/gym_detailes_body/first/gym_detailes_body_first";
import GymDetailesBodySecondContainer from "./views/gym_detailes_body/second/gym_details_body_second";


export default function GymDetails() {
  let { gymId } = useParams(); // This hooks allows you to extract params from the URL

  // Logic to fetch gym details based on gymId
  // ...

  return (
    <div className=" ml-[10px] h-[97vh] overflow-y-auto">
      <GymDetailesHeader />
      <GymDetailesBodyFirstContainer />
      <GymDetailesBodySecondContainer />

    </div>
  );
}
