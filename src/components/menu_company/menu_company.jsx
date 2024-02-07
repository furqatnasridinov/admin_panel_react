import React, { useState } from "react";
import { useRef, useEffect } from "react";
import "./menu_company.css";
import EmployeesTile from "../menu_company/employees_tile/employees_tile.jsx";
import Events from "./events/events.jsx";
import employeesManageSvg from "../../assets/svg/employees_manage.svg";
import leaveSvg from "../../assets/svg/leave.svg";
import settingSvg from "../../assets/svg/settings.svg";
import { useSelector } from "react-redux";
import gogginsPhoto from "../../assets/images/goggins.jpg";

export default function MenuCompany({ onClose, sidebarHeaderRef }) {
  const [allEmployeesShown, setShowAllEmployees] = useState(false);
  const menuRef = useRef();
  const employeesState = useSelector((state) => state.employees);

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
      {employeesState.employees.length <= 3 ||
        (employeesState.employees.length > 3 &&
          allEmployeesShown &&
          employeesState.employees.map((employee) => {
            return (
              <EmployeesTile
                key={employee.id}
                photo={gogginsPhoto}
                name={`${employee.firstName} ${employee.lastName}`}
                job={employee.roles[0].name}
                //isThatYou={employee.isThatYou}
              />
            );
          }))}

      {employeesState.employees.length > 3 &&
        !allEmployeesShown &&
        employeesState.employees.slice(0, 3).map((employee) => {
          return (
            <EmployeesTile
              key={employee.id}
              photo={gogginsPhoto}
              name={`${employee.firstName} ${employee.lastName}`}
              job={employee.roles[0].name}
              //isThatYou={employee.isThatYou}
            />
          );
        })}
      {employeesState.employees.length > 3 && !allEmployeesShown && (
        <div
          className="text-[10px] flex justify-center cursor-pointer font-medium"
          onClick={() => {
            setShowAllEmployees(true);
          }}
        >
          И ещё {employeesState.employees.length - 3} человек
        </div>
      )}

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
