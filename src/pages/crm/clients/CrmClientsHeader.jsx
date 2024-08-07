import React from "react";
import "./index.css";
import { useNavigate} from "react-router-dom";
import GreenButton from "../../../components/crm/GreenButton";

export default function CrmClientsHeader() {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/clientsPageCrm/clientCard/new`);
  };

  return (
    <div className="pl-[35px] pr-[32px] py-[18px] bg-white flex flex-row rounded-[16px] items-center justify-between ">
      <span className="text-[14px] font-medium leading-[16px]">
        Работа с клиентами
      </span>
      <div className="greenButton" onClick={handleNavigation}>
        <span className="text-[14px] font-medium leading-[16px] text-white">Новый клиент</span>
        <svg width="30" height="30" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.38916 6C0.38916 2.68629 3.07545 0 6.38916 0H18.3892C21.7029 0 24.3892 2.68629 24.3892 6V18C24.3892 21.3137 21.7029 24 18.3892 24H6.38916C3.07545 24 0.38916 21.3137 0.38916 18V6Z" fill=""/>
            <path d="M8.63916 12.5H12.3892M16.1392 12.5H12.3892M12.3892 12.5V8.75M12.3892 12.5V16.25" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
