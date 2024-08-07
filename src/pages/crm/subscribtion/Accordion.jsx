import React, {useRef, useState, useEffect} from 'react'

export default function Accordion({ 
    title, 
    children, 
    toggle, 
    isOpened ,
    //height = '400px',
    showDone = false,
    isErorr = false,
    onMouseLeave,
    heightResize,
}) {
    const contentRef = useRef(null);
    const [height, setHeight] = useState('95px');

    useEffect(() => {
        if (contentRef.current) {
            if (isOpened) {
                setHeight(`${contentRef.current.scrollHeight}px`);
            } else {
                setHeight('95px');
            }
        }
    }, [isOpened,isErorr,heightResize]);

    return (
        <div 
            ref={contentRef}
            onMouseLeave={onMouseLeave}
            className="w-full flex flex-col rounded-2xl"
            style={{
                height: height,
                transition: 'all 0.3s',
                backgroundColor: "white" //background,
            }}
            >
            <div onClick={toggle} className="w-full h-fit flex flex-row items-start justify-between cursor-pointer p-[32px] rounded-2xl relative">
                <div className="rowGap16 h-[30px]">
                    {showDone && <DoneSvg />}
                    <span className='headerH2'>{title}</span>
                </div>
                <div className="arrowIndicatorFrame">
                    <div className={isOpened ? "rotate-icon" : "arrow-icon"}>
                        <ArrowDownOutlined />
                    </div>
                </div>
                <div className="absolute bottom-2">
                    {
                        isErorr && isOpened && <span className='errorText'>Чтобы продолжить - необходимо заполнить все обязательные поля, выделенные красным</span>
                    }
                </div>
            </div>
            
            {isOpened &&
                <div className="pl-[32px] pr-[32px]">
                    {children}
                </div>
            }
        </div>
    )
}


function DoneSvg() {
    return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="6" fill="#EFFFF5" />
        <path d="M8.75 14.75L11.75 17.75L19.25 10.25" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
}

export function ArrowDownOutlined() {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 7.5L9 11.25L12.75 7.5" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

}