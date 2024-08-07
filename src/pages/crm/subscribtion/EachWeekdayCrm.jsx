import "./index.css";

export function EachWeekdayCrm({
    isSelected,
    onClick,
    text,
    cursor = 'pointer',
    isDisabled = false,
}){
    const backgroundColor = (isSelected && !isDisabled) ? 'rgba(94, 220, 145, 1)' : (isSelected && isDisabled) ? "rgba(220, 220, 220, 1)" :  'white';
    const textColor = (isSelected && !isDisabled) ? 'white' : isDisabled ? "rgba(176, 176, 176, 1)" : 'rgba(58, 185, 109, 1)';
    const border = isDisabled ? '1px solid rgba(226, 226, 226, 1)' : '1px solid rgba(58, 185, 109, 1)';
    return (
        <div 
            style={{
                border : border,
                backgroundColor : backgroundColor,
                transition : 'background-color 0.3s ease',
                cursor : cursor
            }}
            onClick={onClick}
            className="w-[33px] h-[33px] rounded-[50%]  flex items-center justify-center">
            <span style={{color : textColor, transition : "color 0.3s ease"}} className='label3 select-none'>{text}</span>
        </div>
    )
}