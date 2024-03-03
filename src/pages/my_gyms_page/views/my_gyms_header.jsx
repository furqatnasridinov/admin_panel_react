import React from "react";
import CustomButton from "../../../components/button/button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyGymsHeader = () => {
  return (
    
    <div className="pl-[35px] pr-[19px] py-[18px] bg-white flex justify-between items-center rounded-[16px] ">
      <div className="text-[14px] font-normal">Ваши заведения</div>

      <Link to={"/myGymsPage/createGym"}>
        <CustomButton
          title="Добавить"
          width={"203px"}
          height={"46px"}
          showShadow={true}
          
        />
      </Link>
    </div>
  );
};

export default MyGymsHeader;
