import React from 'react'
import { useSelector } from "react-redux";

export default function StatsSvg() {
    const appState = useSelector((state) => state.app);
    const baseColor = appState.appType === "MYFIT" ? "rgba(119, 170, 249, 1)" : "rgba(94, 220, 145, 1)";
    const bgColor = appState.appType === "MYFIT" ? "#F5F9FF" : "rgba(242, 255, 247, 1)";
  return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill={`${bgColor}`} />
          <path d="M8 9.5C8 8.67157 8.67157 8 9.5 8H11C11.8284 8 12.5 8.67157 12.5 9.5V12.5C12.5 13.3284 11.8284 14 11 14H9.5C8.67157 14 8 13.3284 8 12.5V9.5Z" stroke={`${baseColor}`}  stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8 18C8 17.4477 8.44772 17 9 17H11.5C12.0523 17 12.5 17.4477 12.5 18V19C12.5 19.5523 12.0523 20 11.5 20H9C8.44772 20 8 19.5523 8 19V18Z" stroke={`${baseColor}`}  stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15.5 15.5C15.5 14.6716 16.1716 14 17 14H18.5C19.3284 14 20 14.6716 20 15.5V18.5C20 19.3284 19.3284 20 18.5 20H17C16.1716 20 15.5 19.3284 15.5 18.5V15.5Z" stroke={`${baseColor}`}  stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15.5 9C15.5 8.44772 15.9477 8 16.5 8H19C19.5523 8 20 8.44772 20 9V10C20 10.5523 19.5523 11 19 11H16.5C15.9477 11 15.5 10.5523 15.5 10V9Z" stroke={`${baseColor}`}  stroke-linecap="round" stroke-linejoin="round" />
      </svg>
  )
}
