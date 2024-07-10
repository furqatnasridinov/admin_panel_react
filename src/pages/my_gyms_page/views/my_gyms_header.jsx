import React from "react";
import CustomButton from "../../../components/button/button";
import { Link } from "react-router-dom";
import AppConstants from "../../../config/app_constants";

const MyGymsHeader = () => {

  return (
    <div className="pl-[35px] pr-[19px] py-[18px] bg-white flex justify-between items-center rounded-[16px] ">
      <div className="text-[14px] font-normal">Ваши заведения
      </div>
      {(localStorage.getItem(AppConstants.keyRoleId) === "1" || localStorage.getItem(AppConstants.keyRoleId) === "3") &&
        <Link to={"/myGymsPageMyfit/createGym"}>
        <CustomButton
          title="Добавить"
          width={"203px"}
          height={"46px"}
          showShadow={true}
        />
      </Link>
      }
      
    </div>
  );
};

export default MyGymsHeader;
