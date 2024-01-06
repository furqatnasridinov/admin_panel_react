import React from "react";
import "./dialog.css";

export default function CustomDialog({ isOpened, closeFunction, children }) {
  return (
    <>
      {isOpened && (
        <div className="modal">
          <div className="modal_wrapper">
            <div className="modal_content">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
