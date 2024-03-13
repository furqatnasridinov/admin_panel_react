import React from 'react'
import { useState, useEffect } from 'react'
import toggledOnSvg from "../../assets/svg/toggle_on.svg"
import toggledfOffSvg from "../../assets/svg/toggle_off.svg"
import { toast } from "react-toastify";

export default function Notification() {
  const [toggledOn, setToggleOn] = useState(false);

/*   useEffect(() => {
    if (toggledOn) {
      try {
        if ('Notification' in window) {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('Notification permission granted.');
            } else {
              console.log('Unable to get permission to notify.');
            }
          }).catch(error => {
            console.log('Notification.requestPermission error:', error);
          });
        } else {
          console.log('This browser does not support desktop notification');
        }
      } catch (error) {
        toast(`Ошибка при запросе на уведомления, ${error}`)
      }

    }
  }, [toggledOn]) */

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
            style={{ backgroundColor: "rgba(119, 170, 249, 1)", height: "fit-content", borderRadius: "100px" }}
            alt=""
            onClick={() => setToggleOn(!toggledOn)}
            draggable={false}
          />
        }
        {!toggledOn &&
          <img src={toggledfOffSvg}
            style={{ height: "fit-content", borderRadius: "100px" }}
            alt=""
            onClick={() => setToggleOn(!toggledOn)}
            draggable={false} />

        }

        <div className="text-[13px] font-medium leading-[15px]">
          Присылать уведомления в браузер (Нужно будет дать разрешение на получение уведомлений)
        </div>

      </div>
    </div>
  )
}
