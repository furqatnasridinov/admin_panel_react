import "./index.css";
import { useState } from "react";
export default function CrmWhiteButton({
    text = "Отменить",
    onClick,
    width = "200px",
    height = "40px",
    padLeft = "0px",
    padRight = "0px",
    addPlus = false,
}) {
    const [hover, setHover] = useState(false);
    const svgColor = hover ? "white" : "#252525";
    return (
        <div 
            style={{
                width: width,
                height: height,
                paddingLeft: padLeft,
                paddingRight: padRight,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="whiteButton" onClick={onClick}>
            {text}
            {addPlus && <svg  width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.25 10.5L9.5 6.75L5.75 10.5" stroke={svgColor} stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            }
        </div>
    )
}