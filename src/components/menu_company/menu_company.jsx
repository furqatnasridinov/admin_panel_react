import React, { useState } from "react";
import { useRef, useEffect } from "react";
import "./menu_company.css";
import Events from "./events/events.jsx";
import leaveSvg from "../../assets/svg/leave.svg";
import settingSvg from "../../assets/svg/settings.svg";


export default function MenuCompany({ onClose, sidebarHeaderRef, navigateToGymDetails, onLeave }) {
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
      <Events icon={settingSvg} text="Настройки компании" onClick={navigateToGymDetails} />
      <Events icon={leaveSvg} text="Выйти из аккаунта" onClick={onLeave} />
    </div>
  );
}
