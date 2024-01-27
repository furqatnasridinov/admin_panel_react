import React from "react";
import { useRef, useEffect } from "react";
import "./menu_company.css";
import EmployeesTile from "../menu_company/employees_tile/employees_tile.jsx";
import { employees } from "../../dummy_data/dymmy_data.jsx";
import Events from "./events/events.jsx";
import employeesManageSvg from "../../assets/svg/employees_manage.svg";
import leaveSvg from "../../assets/svg/leave.svg";
import settingSvg from "../../assets/svg/settings.svg";

export default function MenuCompany({ onClose, sidebarHeaderRef }) {
  const menuRef = useRef();

  useEffect(() => {
    // Function to call onClose if clicked outside of menuRef
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !sidebarHeaderRef.current.contains(event.target)
      ) {
        onClose(); // Close MenuCompany
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className="main">
      {employees.map((employee) => {
        return (
          <EmployeesTile
            key={employee.id}
            photo={employee.photo}
            name={employee.name}
            job={employee.job}
            isThatYou={employee.isThatYou}
          />
        );
      })}

      <div className="mt-[20px]"></div>
      <Events
        icon={employeesManageSvg}
        text="Настройка сотрудников"
        onclick={() => {}}
      />
      <Events icon={settingSvg} text="Настройки компании" onclick={() => {}} />
      <Events icon={leaveSvg} text="Выйти из аккаунта" onclick={() => {}} />
    </div>
  );
}
