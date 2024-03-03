import React from "react";
import CreateGymHeader from "./create_gym_header";
import CreateGymFirstContainer from "./create_gym_first_container";


export default function CreateGymPage() {
  return (
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <CreateGymHeader />
      <CreateGymFirstContainer />
    </div>
  );
}
