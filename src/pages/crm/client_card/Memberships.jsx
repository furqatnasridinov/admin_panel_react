import React, { Fragment } from 'react'
import CrmWhiteButton from '../../../components/crm/white_button/CrmWhiteButton'
import VerticalSpace from '../../../components/VerticalSpace'
import GreenButton from '../../../components/crm/GreenButton';
import { IconAndText } from '../clients/EachCrmClient';
import { useState, useRef, useEffect } from 'react';
import CustomDialog from '../../../components/dialog/dialog';
import AddMembershipDialog from './AddMembershipDialog';

export default function Memberships() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [modal, setModal] = useState(false);
  return (
    <div className='customCard'>
        <div className="rowSpaceBetween">
            <div className="columnWithNoGap">
                <span className='headerH2'>Абонементы</span>
                <span className='label2'>В этом разделе вы можете назначить клиенту новый абонемент, либо продлить существующий</span>
            </div>
            <CrmWhiteButton text='Добавить абонемент' onClick={()=>setModal(true)}/>
        </div>

        <VerticalSpace height='32px' />
        <MembershipCard showTooltip={showTooltip} setShowTooltip={setShowTooltip} />
        {modal &&
            <CustomDialog 
                isOpened={modal} 
                closeOnTapOutside={()=>{setModal(false)}}>
                <AddMembershipDialog closeDialog={()=>{setModal(false)}} />
            </CustomDialog>
        }
    </div>
  )
}


// Components

export function MembershipCard({
    greenBorder = "1px solid rgba(58, 185, 109, 1)",
    showTooltip = false,
    setShowTooltip = ()=>{},
    gyms = ["Ленинград", "Crystal"],
    lessonTypes = ['Бокс', 'Айкидо'],
    subcategories = ['Павел Скайуокер'/* , 'Александр Вейдер' */],
    price = '32 000',
    oldPrice = '36 000',
    name = 'Бойцовский клуб. Вечерний',
    description = 'Этот вид абонемента включает посещение секций бокса и айкидо, в вечернее время с 18:00 до 21:00.',
    endDate = 'до 12.12.2021',
    percentage = 70,
    showButtons = true,
    listWidth = '71%'
}) {
    return <div style={{border : greenBorder}} className="greenContaner">
    <div className="rowSpaceBetween">
        <ListGymsActivitiesSubcategories width={listWidth} gyms={gyms} lessonTypes={lessonTypes} subcategories={subcategories} />
        <div className="rowGap10">
            <div className="columnWithNoGap">
                <span className='interBody3Plus'>{`${price}₽`}</span>
                {oldPrice && <span className='text-[10px] font-medium leading-3 line-through'>{`${oldPrice}₽`}</span>}
            </div>
                {showButtons &&
                    <Fragment>
                        <GreenButton
                            text='Продлить'
                            showShadow={true}
                            onClick={() => { }}
                        />
                        <div className="relative">
                            <div
                                style={{ backgroundColor: "white" }}
                                className="greenMiniCard40x40"
                                onClick={() => {
                                    if (!showTooltip) {
                                        setShowTooltip(true)
                                    }
                                }}>
                                <ThreeDotsSvg />
                            </div>
                            {showTooltip && <ThreeDotsTooltip closeFunction={() => setShowTooltip(false)} />}
                        </div>
                    </Fragment>
                }
        </div>
    </div>
    <VerticalSpace height='16px' />
    <div className="columnWithNoGap">
        <span className='headerH2'>{name}</span>
        <span className='label2'>{description}</span>
    </div>
    <VerticalSpace height='16px' />
    <Indicator endTime={endDate} percentage={percentage} />
</div>
}

function ListGymsActivitiesSubcategories({
    gyms,
    lessonTypes,
    subcategories,
    width,
}) {
    const [isOverflow, setIsOverflow] = useState(false);
    const listRef = useRef(null);

    useEffect(() => {
        const isOverflowing = listRef.current.scrollHeight > listRef.current.clientHeight;
        setIsOverflow(isOverflowing);
    }, [gyms, lessonTypes, subcategories]);


    return <div ref={listRef} style={{maxWidth : width}} className="max-h-[66px] h-fit flex flex-wrap gap-[10px] items-center">
        {gyms.map((gym, index) => <LessonTypeCard key={index} lessonType={gym} isGym={true} />)}
        <span className='label2b text-crm-link'>/</span>
        {lessonTypes.map((lessonType, index) => <LessonTypeCard key={index} lessonType={lessonType} />)}
        <span className='label2b text-crm-link'>/</span>
        {subcategories.map((subCategory, index) => <SubCategoryCard key={index} text={subCategory} />)}
    </div>
}

function ThreeDotsTooltip({
    onClick,
    closeFunction = ()=>{}
}) {

    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeFunction();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeFunction]);


    return <div ref={menuRef} className="tooltipCrm w-[285px] h-fit absolute left-[-285px]">
        <IconAndText icon={<AbonSvg />} text='Подробности об абонементе' />
    </div>
}

function LessonTypeCard({
    lessonType = 'Бокс',
    icon = <BoxSvg />,
    isGym = false
}) {
    const _icon = isGym ? <LocationSvg /> : <BoxSvg />
    return <div className="lessonTypeCard">
        <div className="lessonTypeIconBg">
            {_icon}
        </div>
        <span>{lessonType}</span>
    </div>
}

function SubCategoryCard({text}) {
    return <div className="subCategoryCard">
        {text}
    </div>
}

function Indicator({
    endTime,
    percentage,
}) {
    const bgColor = "rgba(192, 241, 212, 1)";

    return <div className="colGap10 items-end">
        <span className='label2'>{endTime}</span>
        <div style={{backgroundColor : bgColor}} className="h-1 w-full rounded-[2px] relative">
            <div style={{width : `${percentage}%`}} className="h-full bg-crm-main rounded-[2px]"></div>
        </div>
    </div>
}


// SVGs

function BoxSvg() {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.36676 13.2955H13.7667M6.36676 13.2955V15.75H13.7667V13.2955M6.36676 13.2955C3.90012 11.6591 2.6668 7.56818 3.0779 6.34091C3.40679 5.35909 4.85937 5.65909 5.54455 5.93182C5.54455 3.06818 6.77787 2.25 10.0667 2.25C13.3556 2.25 15 3.06818 15 7.15909C15 10.4318 14.1778 12.6136 13.7667 13.2955" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.54492 5.93164C5.81899 6.20437 6.6138 6.74982 7.60046 6.74982C8.58711 6.74982 10.4782 6.74982 11.3004 6.74982" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.54492 5.93164C5.54492 8.79528 6.77824 9.20437 7.60046 9.20437" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

}

function MassageSvg() {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9286 11.2529L11.5714 12.6367C11.5714 12.6367 14.4643 13.2511 14.4643 14.7124C14.4643 15.7502 13.1786 15.7502 13.1786 15.7502H9.75L8.0625 14.8127" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7.07087 11.2529L6.42801 12.6367C6.42801 12.6367 3.53516 13.2511 3.53516 14.7124C3.53516 15.7502 4.82087 15.7502 4.82087 15.7502H6.37444L8.06194 14.8127L10.1244 13.5002" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2.25 11.9446C2.25 11.9446 3.85714 11.5986 4.82143 11.2527C5.78571 6.40946 8.67857 6.75541 9 6.75541C9.32143 6.75541 12.2143 6.40946 13.1786 11.2527C14.1429 11.5986 15.75 11.9446 15.75 11.9446" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 5.25C9.82843 5.25 10.5 4.57843 10.5 3.75C10.5 2.92157 9.82843 2.25 9 2.25C8.17157 2.25 7.5 2.92157 7.5 3.75C7.5 4.57843 8.17157 5.25 9 5.25Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

}

function AbonSvg(){
    return <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.0761719 6C0.0761719 2.68629 2.76246 0 6.07617 0H22.0762C25.3899 0 28.0762 2.68629 28.0762 6V22C28.0762 25.3137 25.3899 28 22.0762 28H6.07617C2.76246 28 0.0761719 25.3137 0.0761719 22V6Z" fill="#EFFFF5"/>
    <path d="M19.0721 8.17041H9.07849C7.69865 8.17041 6.58008 9.28899 6.58008 10.6688V11.5016V17.3312C6.58008 18.7111 7.69865 19.8297 9.07849 19.8297H19.0721C20.452 19.8297 21.5705 18.7111 21.5705 17.3312V11.5016V10.6688C21.5705 9.28899 20.452 8.17041 19.0721 8.17041Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.8247 13.167H19.4903M17.4083 11.085H19.4903M16.9102 15.249H19.4903M18.6575 16.9146H19.4903" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.5539 11.2985C11.7424 10.947 12.2465 10.947 12.4351 11.2985L12.7389 11.8649C12.9554 12.2684 13.3442 12.551 13.7949 12.6321L14.4274 12.7461C14.82 12.8168 14.9758 13.2962 14.6997 13.5841L14.2549 14.0481C13.9381 14.3787 13.7895 14.8358 13.8516 15.2895L13.9387 15.9263C13.9928 16.3215 13.585 16.6178 13.2258 16.4442L12.6471 16.1646C12.2348 15.9654 11.7541 15.9654 11.3419 16.1646L10.7632 16.4442C10.404 16.6178 9.99617 16.3215 10.0502 15.9263L10.1373 15.2895C10.1994 14.8358 10.0509 14.3787 9.73402 14.0481L9.28923 13.5841C9.01318 13.2962 9.16895 12.8168 9.56155 12.7461L10.1941 12.6321C10.6447 12.551 11.0336 12.2684 11.25 11.8649L11.5539 11.2985Z" stroke="#3AB96D"/>
    </svg>
    
}

function ThreeDotsSvg() {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="9" cy="13.875" rx="1.3125" ry="1.3125" transform="rotate(90 9 13.875)" fill="#252525" />
        <circle cx="9" cy="9" r="1.3125" transform="rotate(90 9 9)" fill="#252525" />
        <circle cx="9" cy="4.125" r="1.3125" transform="rotate(90 9 4.125)" fill="#252525" />
    </svg>

}

function LocationSvg() {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8.25" r="1.5" stroke="#3AB96D" />
        <path d="M8.99964 16.5001L13.1246 12.3751C15.4028 10.097 15.4028 6.40331 13.1246 4.12513C10.8465 1.84696 7.15282 1.84696 4.87464 4.12513C2.59647 6.40331 2.59647 10.097 4.87465 12.3751L8.99964 16.5001Z" stroke="#3AB96D" stroke-linejoin="round" />
    </svg>
}

function ShowMoreButton() {
    return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H22C25.0376 0.5 27.5 2.96243 27.5 6V22C27.5 25.0376 25.0376 27.5 22 27.5H6C2.96243 27.5 0.5 25.0376 0.5 22V6Z" fill="#EFFFF5" />
        <path d="M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H22C25.0376 0.5 27.5 2.96243 27.5 6V22C27.5 25.0376 25.0376 27.5 22 27.5H6C2.96243 27.5 0.5 25.0376 0.5 22V6Z" stroke="#3AB96D" />
        <ellipse cx="18.875" cy="19" rx="1.3125" ry="1.3125" transform="rotate(90 18.875 19)" fill="#252525" />
        <circle cx="14" cy="19" r="1.3125" transform="rotate(90 14 19)" fill="#252525" />
        <circle cx="9.125" cy="19" r="1.3125" transform="rotate(90 9.125 19)" fill="#252525" />
    </svg>

}