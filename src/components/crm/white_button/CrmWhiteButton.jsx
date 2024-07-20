import "./index.css";

export default function CrmWhiteButton({
    text = "Отменить",
    onClick,
    width = "200px",
    height = "40px",
}) {
    return (
        <div 
            style={{
                width: width,
                height: height,
            }}
            className="whiteButton" onClick={onClick}>
            {text}
        </div>
    )
}