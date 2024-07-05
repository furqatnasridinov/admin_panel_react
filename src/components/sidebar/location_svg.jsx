import React from 'react'
import { useSelector } from "react-redux";

export default function LocationSvg() {
    const appState = useSelector((state) => state.app);
    const baseColor = appState.appType === "MYFIT" ? "rgba(119, 170, 249, 1)" : "rgba(94, 220, 145, 1)";
    const bgColor = appState.appType === "MYFIT" ? "#F5F9FF" : "rgba(242, 255, 247, 1)";
  return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill={`${bgColor}`} />
          <circle cx="14" cy="13.25" r="1.5" stroke={`${baseColor}`} />
          <path d="M14 21.5L18.125 17.375C20.4032 15.0968 20.4032 11.4032 18.125 9.12501C15.8468 6.84684 12.1532 6.84684 9.87498 9.12501C7.59681 11.4032 7.59681 15.0968 9.87498 17.375L14 21.5Z" stroke={`${baseColor}`} stroke-linejoin="round" />
      </svg>
  )
}
