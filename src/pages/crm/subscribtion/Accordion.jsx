import React from 'react'

export default function Accordion({ 
    title, 
    children, 
    toggle, 
    isOpened ,
    height = '400px',
    showDone = false,
    isErorr = false,
}) {
    //const background = isErorr && !isOpened ? 'rgba(255, 136, 136, 0.5)' : 'white';
    return (
        <div 
            className="w-full flex flex-col rounded-2xl"
            style={{
                height: isOpened ? height : '95px',
                transition: 'all 0.3s',
                backgroundColor: "white" //background,
            }}
            >
            <div onClick={toggle} className="w-full h-fit flex flex-row items-start justify-between cursor-pointer p-[32px] rounded-2xl relative">
                <div className="rowGap16 h-[30px]">
                    {showDone && <DoneSvg />}
                    <span className='headerH2'>{title}</span>
                </div>
                <div className="w-[38px] h-[28px] flex justify-center items-center rounded bg-crm-bgrGreen">
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

function ArrowDownOutlined() {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 7.5L9 11.25L12.75 7.5" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

}