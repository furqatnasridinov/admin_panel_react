import "./index.css";
export default function CrmWhiteButton({
    text = "Отменить",
    onClick,
    width = "200px",
    height = "40px",
    padLeft = "0px",
    padRight = "0px",
    addPlus = false,
}) {
    return (
        <div 
            style={{
                width: width,
                height: height,
                paddingLeft: padLeft,
                paddingRight: padRight,
            }}
            className="whiteButton" onClick={onClick}>
            {text}
            {addPlus && <svg  width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.25 10.5L9.5 6.75L5.75 10.5" stroke="#252525" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            }
        </div>
    )
}