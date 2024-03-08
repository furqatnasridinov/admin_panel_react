import React, { useEffect, useRef, useState } from "react";

export function AddressSearching({ value, onChange, map, notFound, showDropDown }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "space-between",
        width: "350px",
        minWidth: "280px",
        maxWidth: "1000px",
      }}
    >
      <input
        className="textAreaForAddress text-[13px] font-normal font-inter"
        value={value}
        onChange={onChange}
        placeholder="Введите адрес заведения"
      />

      {showDropDown && <div
        className="dropdownBody"
        style={{
          zIndex: "2",
          maxHeight: "260px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "absolute",
          top: "32px",
          width: "100%",
          height: "fit-content",
          minHeight: "40px",
          backgroundColor: "white",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "12px",
          paddingBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #77aaf9",
          overflowY: "auto",
        }}
      >
        {notFound ? (
          <div className="defaultText text-grey-text">Адрес не найден</div>
        ) : (
          map
        )}
      </div>}


    </div>
  );
}
