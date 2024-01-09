import React from "react";
import "./gym_details_body_first.css";
import PhotoAndLogos from "./components/photo_and_logos/photo_and_logos";
import ContactInfos from "./components/smth/contact_infos";


export default function GymDetailesBodyFirstContainer() {
  return (
    <div className=" bg-white h-fit p-[32px] flex flex-col rounded-[16px] gap-[32px] mb-[10px]">
      <PhotoAndLogos />
      <ContactInfos />
    </div>
  );
}
