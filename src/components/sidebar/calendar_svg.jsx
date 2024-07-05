import React from 'react'
import { useSelector } from "react-redux";

export default function CalendarSvg() {
    const appState = useSelector((state) => state.app);
    const baseColor = appState.appType === "MYFIT" ? "rgba(119, 170, 249, 1)" : "rgba(94, 220, 145, 1)";
    const bgColor = appState.appType === "MYFIT" ? "#F5F9FF" : "rgba(242, 255, 247, 1)";
  return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill={`${bgColor}`} />
          <path d="M7.25 9.5C7.25 8.67157 7.92157 8 8.75 8H19.25C20.0784 8 20.75 8.67157 20.75 9.5V19.25C20.75 20.0784 20.0784 20.75 19.25 20.75H8.75C7.92157 20.75 7.25 20.0784 7.25 19.25V9.5Z" stroke={`${baseColor}`} stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7.25 11L20.75 11" stroke={`${baseColor}`} stroke-linecap="square" stroke-linejoin="round" />
          <path d="M17 7.25V8.75" stroke={`${baseColor}`} stroke-linecap="round" stroke-linejoin="round" />
          <path d="M11 7.25V8.75" stroke={`${baseColor}`} stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17 17.375H17.0015V17.3765H17V17.375Z" stroke={`${baseColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14 17.375H14.0015V17.3765H14V17.375Z" stroke={`${baseColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M11 17.375H11.0015V17.3765H11V17.375Z" stroke={`${baseColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17 14.375H17.0015V14.3765H17V14.375Z" stroke={`${baseColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14 14.375H14.0015V14.3765H14V14.375Z" stroke={`${baseColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M11 14.375H11.0015V14.3765H11V14.375Z" stroke={`${baseColor}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
  )
}
