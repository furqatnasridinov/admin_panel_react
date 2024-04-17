import React from "react";
import "./styles.css";
import placeHolder from "../../assets/images/placeholder.jpg"
import { useState } from "react";
import CustomDialog from "../../components/dialog/dialog";
import closePng from "../../assets/images/close.png"

export default function EachClientWhoWillCome({
  startTime,
  endTime,
  event,
  gym,
  userName,
  picture,
}) {
  // states
  const [modalOpened, setModalOpened] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  return (
    <div className="eachClientWhoWillCome">
      <div className="flex flex-row items-center  h-full w-[65%] ">
        <div className="flex flex-row items-center gap-[10px] ">
          <div className="w-[28px] h-[28px]">
            <img 
              className="object-cover h-full w-full rounded-[6px]" alt="pic"
              style={{ cursor: (picture === "" || picture === null) ? "default" : "pointer" }}
              src={(picture === "" || picture === null) ? placeHolder : `http://77.222.53.122/image/${picture}`}
              onClick={() => {
                if (picture !== "" && picture !== null) {
                  setCurrentPhoto(picture);
                  setModalOpened(true);
                }
              }}
            />
          </div>
          <span className="defaultText w-[240px]">{userName ?? "Не указано"}</span>
        </div>

        <div className="flex items-center justify-center bg-grey-container w-[155px] h-full ml-[50px]">
          <span className="defaultText">{`${startTime}-${endTime}`}</span>
        </div>
        <span className="defaultText  w-fit ml-[40px] ">{event}</span>
      </div>
      <div className="flex flex-row items-center  h-full w-[35%] gap-[32px] justify-end">
        <span className="defaultText">{gym}</span>
      </div>
      {modalOpened &&
        <CustomDialog
          isOpened={modalOpened}
          closeOnTapOutside={() => setModalOpened(false)}
        >
          <div className="w-[400px] h-[400px] relative">
            <img
              className="object-cover h-full w-full rounded-lg "
              src={`http://77.222.53.122/image/${currentPhoto}`} alt="photoInModal" />
            <div 
              style={{ cursor: "pointer", backgroundColor: "rgba(42, 42, 43, 0.6)"}}
              className="w-[50px] h-[50px] absolute top-0 right-0 p-3">
              <img src={closePng} alt="close" onClick={() => setModalOpened(false)} />
            </div>
          </div>
        </CustomDialog>}
    </div>
  );
}
