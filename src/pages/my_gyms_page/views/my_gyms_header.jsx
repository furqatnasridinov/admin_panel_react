import React from "react";
import CustomButton from "../../../components/button/button";

const MyGymsHeader = () => {
  return (
    <div className="pl-[35px] pr-[19px] py-[18px] bg-white flex justify-between items-center rounded-[16px] ">
      <div className="text-[14px] font-normal">Ваши заведения</div>

      <CustomButton
        title="Добавить"
        onclick={() => {}}
        width={"203px"}
        height={"46px"}
        showShadow={true}
      />
    </div>
  );
};

export default MyGymsHeader;
