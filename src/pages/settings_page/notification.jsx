import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import toggledOnSvg from "../../assets/svg/toggle_on.svg"
import toggledfOffSvg from "../../assets/svg/toggle_off.svg"
import { toast } from "react-toastify";
import { RequestForToken } from '../../firebase/firebase';

export default function NotificationBlock() {
  const [toggledOn, setToggleOn] = useState(false);

  const checkBrowserPermission = useCallback(()=>{
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setToggleOn(true);
      }else if (Notification.permission === "denied" || Notification.permission === "default") {
        setToggleOn(false);
      }
    }
  },[])

  useEffect(()=>{
    checkBrowserPermission();
  },[])

  async function whentoggleOff(){
    await RequestForToken();
    checkBrowserPermission();
    if (Notification.permission === "denied") {
      toast.info("Уведомления в браузере отключены. Включите их в настройках браузера, чтобы получать уведомления о событиях на сайте.");
    }
  }


  return (
    <div className='personalInfos'>
      <div className="flex flex-row gap-1">
        <div className="text-[16px] font-semibold leading-[16px]">
          Уведомления.
        </div>
        <div className="text-[14px] font-normal leading-[16px]">
          Присылать уведомления о срочных событиях в браузер. Например о новых бронированиях на занятия.
        </div>
      </div>

      <div className="flex flex-row gap-[10px] items-center">
        {toggledOn &&
          <img src={toggledOnSvg}
            style={{ 
              backgroundColor: "rgba(119, 170, 249, 1)", 
              height: "fit-content", 
              borderRadius: "100px",
              opacity: "0.5"}}
            alt="toggledOnSvg"
            onClick={() => {}}
            draggable={false}
          />
        }
        {!toggledOn &&
          <img src={toggledfOffSvg}
            style={{ height: "fit-content", borderRadius: "100px", cursor: "pointer"}}
            alt="toggledfOffSvg"
            onClick={whentoggleOff}
            draggable={false} />
        }

        <div className="text-[13px] font-medium leading-[15px]">
          {toggledOn ? 
          "Уведомления в браузер включены, вы можете отключить их в настройках браузера" : 
          "Присылать уведомления в браузер (Нужно будет дать разрешение на получение уведомлений"}
        </div>

      </div>
    </div>
  )
}
