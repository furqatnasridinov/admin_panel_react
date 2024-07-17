import React from 'react'
import { useState } from 'react'

export default function SubscribtionBodyCrm() {
    const [isOpened1, setIsOpened1] = useState(false);
    const [isOpened2, setIsOpened2] = useState(false);
    const [isOpened3, setIsOpened3] = useState(false);
    const [isOpened4, setIsOpened4] = useState(false);

    function toggle1(){
        setIsOpened1(!isOpened1)
    }
    function toggle2(){
        setIsOpened2(!isOpened2)
    }

    function toggle3(){
        setIsOpened3(!isOpened3)
    }

    function toggle4(){
        setIsOpened4(!isOpened4)
    }


  return (
    <div className='colGap10'>
        <Accordion title='1. Основные параметры абонемента' toggle={toggle1} isOpened={isOpened1} />
        <Accordion title='2. Уточнение условий абонемента' toggle={toggle2} isOpened={isOpened2} />
        <Accordion title='3. Описание абонемента' toggle={toggle3} isOpened={isOpened3} />
        <Accordion title='4. Дополнительно (Не обязательный блок)' toggle={toggle4} isOpened={isOpened4} />
    </div>
  )
}


function Accordion({ title, children, toggle, isOpened }) {
    return (
        <div
            onClick={toggle}
            className="w-full bg-white p-[32px] rounded-2xl flex flex-row items-start justify-between cursor-pointer"
            style={{
                height: isOpened ? '400px' : '95px',
                transition: 'height 0.3s',
            }}
        >
            <div className="rowGap16">
                <DoneSvg />
                <span className='headerH2'>{title}</span>
            </div>
            <div className="w-[38px] h-[28px] flex justify-center items-center rounded bg-crm-bgrGreen">
                <div className={isOpened ? "rotate-icon" : "arrow-icon"}>
                    <ArrowDownOutlined />
                </div> 
            </div>
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