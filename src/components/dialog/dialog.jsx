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

  /* useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target) &&
        isOpened
      ) {
        if (typeof closeOnTapOutside === "function") {
          closeOnTapOutside();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeOnTapOutside]); */

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpened) {
      dialog.showModal();

      // Используем requestAnimationFrame для плавного открытия
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dialog.style.opacity = 1;
        });
      });
    } else {
      // Плавное исчезновение
      dialog.style.opacity = 0;
      setTimeout(() => dialog.close(), 200); // Закрыть диалог после анимации
    }
  }, [isOpened]);
  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.getElementById("modal")
  );
}
