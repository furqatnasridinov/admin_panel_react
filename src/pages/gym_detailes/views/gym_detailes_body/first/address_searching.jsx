import "./gym_details_body_first.css";

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
        className="textAreaForAddress text-[14px] font-medium"
        value={value}
        style={{
          boxShadow : "0px 18px 14px -13px rgba(0, 0, 0, 0.25)",
          zIndex : "3"
        }}
        onChange={onChange}
        placeholder="Введите адрес заведения"
      />

      {showDropDown && <div
        style={{
          zIndex: "2",
          maxHeight: "260px",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "33px",
          width: "100%",
          height: "fit-content",
          minHeight: "40px",
          backgroundColor: "white",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "12px",
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
