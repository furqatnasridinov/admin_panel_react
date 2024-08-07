import React from 'react'
import { useSelector } from "react-redux";

export default function ClientsSvg() {
    const appState = useSelector((state) => state.app);
    const baseColor = appState.appType === "MYFIT" ? "rgba(119, 170, 249, 1)" : "rgba(58, 185, 109, 1)";
    const bgColor = appState.appType === "MYFIT" ? "#F5F9FF" : "rgba(242, 255, 247, 1)";
  return (
      <svg  width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill = {`${bgColor}`} />
          <path d="M14 6.5C9.85786 6.5 6.5 9.85786 6.5 14C6.5 18.1421 9.85786 21.5 14 21.5C18.1421 21.5 21.5 18.1421 21.5 14C21.5 9.85786 18.1421 6.5 14 6.5Z" stroke={`${baseColor}`} stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8.20325 18.7593C8.20325 18.7593 9.87502 16.625 14 16.625C18.125 16.625 19.7968 18.7593 19.7968 18.7593" stroke={`${baseColor}`} stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14 14C15.2426 14 16.25 12.9926 16.25 11.75C16.25 10.5074 15.2426 9.5 14 9.5C12.7574 9.5 11.75 10.5074 11.75 11.75C11.75 12.9926 12.7574 14 14 14Z" stroke={`${baseColor}`} stroke-linecap="round" stroke-linejoin="round" />
      </svg>
  )
}
