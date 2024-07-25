import React, { useRef } from "react";
import "./dialog.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function CustomDialog({
  isOpened,
  children,
  closeOnTapOutside,
}) {
  const dialogRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(`tap ${event.toElement.localName}`);
      if (event.toElement.localName == "dialog") {
        closeOnTapOutside();
      }
    };
    const dialog = dialogRef.current;
    if (isOpened) {
      dialog.showModal();
      // Используем requestAnimationFrame для плавного открытия
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dialog.style.opacity = 1;
        });
      });
      document.addEventListener("mousedown", handleClickOutside); // adding listeneter to click
    } else {
      // Плавное исчезновение
      dialog.style.opacity = 0;
      setTimeout(() => dialog.close(), 200); // Закрыть диалог после анимации
    }

    return () => {
      console.log("Removing event listener for mousedown");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpened]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        console.log("Escape key pressed. Closing dialog...");
        closeOnTapOutside();
      }
    };

    if (isOpened) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpened, closeOnTapOutside]);

  return createPortal(
    <dialog style={{outline : "none"}} ref={dialogRef} onClick={(e) => e.stopPropagation()}>
      {children}{" "}
    </dialog>,
    document.getElementById("modal")
  );
}
