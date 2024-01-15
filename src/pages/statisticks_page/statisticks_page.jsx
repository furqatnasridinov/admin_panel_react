import React, { Component } from "react";
import "./statisticks.css";
import { Circle } from "rc-progress";
import { useState, useEffect } from "react";
export default function StatisticksPage() {
  const [countdown, setCountdown] = useState(9);

  useEffect(() => {
    // If countdown is already at zero, do nothing
    if (countdown === 0) return;

    // Decrease countdown every second
    const intervalId = setInterval(() => {
      setCountdown((currentCountdown) => currentCountdown - 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [countdown]);
  return (
    <div className="flex flex-col items-center gap-[50px] p-[20px]">
      <div className="snackbar">
        <div className="text-[14px] font-medium">Вы удалили занятие</div>
        <div className="flex flex-row gap-[18px] items-center h-full w-fit">
          <div
            className="text-[14px] font-medium text-blue-text cursor-pointer"
            onClick={() => {
              // Add your undo functionality here
            }}
          >
            Отменить
          </div>

          <div className="relative w-[30px] h-[30px]">
            <Circle
              percent={countdown * 10}
              strokeWidth="7"
              trailWidth="7"
              strokeColor="#77AAF9"
              trailColor="#D4E5FF"
              //strokeColor="#D4E5FF"
              //trailColor="#77AAF9"
            />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
              <span className="text-[14px] font-medium text-button-color">
                {countdown}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
