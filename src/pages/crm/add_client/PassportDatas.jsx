import React from 'react'
import "./index.css"
import VerticalSpace from '../../../components/VerticalSpace'
import CrmTextField from '../../../components/crm/CrmTextField'
import { useState } from 'react'
import crmAddDocs from "../../../assets/svg/crmAddDocs.svg"
import GreenButton from '../../../components/crm/GreenButton'

export default function PassportDatas() {
    const [serie, setSerie] = useState('');
    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [code, setCode] = useState('');
    const [currentFocus, setCurrentFocus] = useState("");
    const [showFileTooltip, setShowFileTooltip] = useState(false);

    function handleMouseEnter() {
        if (!showFileTooltip) {
            setShowFileTooltip(true);
        }
    }

    function handleMouseLeave() {
        if (showFileTooltip) {
            setShowFileTooltip(false);
        }
    }

  return (
    <div className='customCard'>
        <div className="columnWithNoGap">
            <span className='headerH2'>Документы</span>
            <span className='label2'>Тут находятся данные о документах клиента, а так же копия договора</span>
        </div>
        <VerticalSpace height='32px' />
        <div className="colGap10">
            <span className='label2bPlus'>Данные паспорта</span>
            <div className="rowGap10">
                <CrmTextField 
                    label='Серия'
                    onChange={(e) => setSerie(e.target.value)}
                    value={serie}
                    onFocus={() => setCurrentFocus("serie")}
                    onBlur={() => setCurrentFocus("")}
                    hasFocus={currentFocus === "serie"}
                    width='75px'
                />
                <CrmTextField 
                    label='Номер'
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                    onFocus={() => setCurrentFocus("number")}
                    onBlur={() => setCurrentFocus("")}
                    hasFocus={currentFocus === "number"}
                    width='78px'
                />
                <CrmTextField 
                    label='Дата выдачи'
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    onFocus={() => setCurrentFocus("date")}
                    onBlur={() => setCurrentFocus("")}
                    hasFocus={currentFocus === "date"}
                    width='130px'
                />
                <CrmTextField 
                    label='Код подразделения'
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    onFocus={() => setCurrentFocus("code")}
                    onBlur={() => setCurrentFocus("")}
                    hasFocus={currentFocus === "code"}
                    width='170px'
                    />
                <CrmTextField 
                    label='Кем выдан'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    onFocus={() => setCurrentFocus("address")}
                    onBlur={() => setCurrentFocus("")}
                    hasFocus={currentFocus === "address"}
                    width='350px'
                    />
            </div>
        </div>
        <VerticalSpace height='32px' />
        <div className="colGap10">
            <span className='label2bPlus'>Копия договора и другие документы</span>
            <div className="rowGap14">
                <div className="relative">
                    <div 
                        className="fileCard" 
                        onMouseEnter={handleMouseEnter}
                        onmouseleave={handleMouseLeave}>
                        <div className="rowGap10">
                            <DocSvg />
                            <span className='body4'>Договор Туйнов Владислав Иванович. 25.06.2024.doc</span>
                        </div>
                    </div>
                    {/* <div className="fileToolTip"></div> */}
                </div>
                <img 
                    className='cursor-pointer' 
                    src={crmAddDocs} 
                    alt="crmAddDocsSvg" />
            </div>
        </div>
        <VerticalSpace height={32} />
        <div className="rowGap12">
            <WhiteButton  onClick={() => {}} />
            <GreenButton text='Сохранить' />
        </div>
        <VerticalSpace height={32} />
        <span className='errorText'>Чтобы продолжить - необходимо заполнить все обязательные поля, выделенные красным</span>
    </div>
  )
}

function DocSvg() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.71484 17.3432V6.65698C2.71484 4.44784 4.5057 2.65698 6.71484 2.65698H17.2837C19.4929 2.65698 21.2837 4.44784 21.2837 6.65698V17.3432C21.2837 19.5524 19.4929 21.3432 17.2837 21.3432H6.71484C4.5057 21.3432 2.71484 19.5524 2.71484 17.3432Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.10156 16.6716L17.7805 16.6716" stroke="#3AB96D" stroke-linecap="round" />
            <path d="M6.10156 12L16.6126 12" stroke="#3AB96D" stroke-linecap="round" />
            <path d="M6.16016 7.32837H10.8317" stroke="#3AB96D" stroke-linecap="round" />
            <path d="M16.6133 2.65698V6.32854C16.6133 6.88083 17.061 7.32854 17.6133 7.32854H21.2848" stroke="#3AB96D" />
        </svg>
    )
}

function WhiteButton({
    text = "Отменить",
    onClick,
}) {
    return (
        <div className="whiteButton" onClick={onClick}>
            {text}
        </div>
    )
}