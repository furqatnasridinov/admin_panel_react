import React, { useState } from "react";
import { useRef, useEffect } from "react";
import "./menu_company.css";
import Events from "./events/events.jsx";
import leaveSvg from "../../assets/svg/leave.svg";
import { useSelector } from "react-redux";


export default function MenuCompany({ onClose, sidebarHeaderRef,onLeave }) {
  const menuRef = useRef();
  const appState = useSelector((state) => state.app);
  const isMyfit = appState.appType === "MYFIT";
  const border = isMyfit ? "1px solid #D4E5FF" : "1px solid rgba(193, 249, 215, 1)";

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
    <div 
      style={{border : border}}
      ref={menuRef} className="main">
      <Events isMyfit={isMyfit} text="Выйти из аккаунта" onClick={onLeave} />
    </div>
  );
}


