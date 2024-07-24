import React, {useEffect, useRef, useState} from 'react';
import arrowDownSvg from "../../../assets/svg/arrow_down.svg"
import VerticalSpace from '../../../components/VerticalSpace';

export default function SelectAndRemoveDropDown({
    isOpened = false,
    toggleDropDown,
    closeDropDown,
    onSelect,
    value = "",
    isError = false,
    list,
    placeholderText = "Выберите занятие",
    onDelete,
    zIndex1 = 3,
    zIndex2 = 2,
    showMultiple = false,
    maxHeight,
    isScrollable = false,
    dropDowns,
}){
    const shadow = isOpened ? '0px 18px 14px -13px rgba(0, 0, 0, 0.25)' : 'none';
    const iconClasses = isOpened ? 'rotate-icon' : 'arrow-icon';
    const text = value || placeholderText;
    const ref = useRef(null);
    
    const border = isError ? '1px solid rgba(255, 61, 0, 1)' : isOpened ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)';

/*     useEffect(() => {
      // close dropdown when click outside
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeDropDown()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []) */
    
    return (
            <div className="flex flex-col relative" ref={ref}>
                <div 
                     style={{
                        boxShadow: shadow,
                        border: border,
                        borderRadius: '8px',
                        transition: 'border 0.3s',
                        zIndex: zIndex1,
                    }}
                    onClick={toggleDropDown}
                    className="genderDropDownHeader">
                    <span 
                        style={{color: value ? 'rgba(0, 0, 0, 1)' : 'rgba(176, 176, 176, 1)'}}
                        className='label2'>{text}</span>
                    <img className={iconClasses} src={arrowDownSvg} alt="arrowDownSvg" />
                </div>
                {isOpened &&
                    <div style={{
                        zIndex : zIndex2, 
                        maxHeight : maxHeight,
                        overflowY : isScrollable ? "scroll" : "hidden",
                        scrollbarColor: 'rgba(220, 220, 220, 1)',
                        }} className='genderDropDownBody'>
                    {!showMultiple &&
                        <>
                            {value && <DeleteButton onClick={onDelete} />}
                            {list.map((item) => {
                                return <span key={item?.id} className='eachGender' onClick={() => onSelect(item)}>{item?.name}</span>
                            })
                            }
                        </>
                    }

                    {showMultiple &&
                        // list ==> [{gym : GYMDATA, lessonTypes : ["Бассейн","Бокс"]},..]
                        // dropDowns ==> [{id: 1, isOpened: bool, gymAndLessonType : {gym : GYMDATA, lessonType : "Бокс"}}, ...]
                        <>
                            {value && <DeleteButton onClick={onDelete} />}
                            {
                                list.map((item) => {
                                    const filteredLessonTypes = item?.lessonTypes
                                        .filter(lessonType => !dropDowns.some(dropDown =>
                                            dropDown.gymAndLessonType?.gym?.id === item.gym.id &&
                                            dropDown.gymAndLessonType.lessonType === lessonType));

                                    // Проверяем, остались ли активности после фильтрации
                                    if (filteredLessonTypes.length > 0) {
                                        return (
                                            <div key={item?.gym?.id} className='flex flex-col items-start'>
                                                <VerticalSpace height={12} />
                                                <div className="flex flex-row items-center gap-1">
                                                    <TireChaSvg />
                                                    <span className='label2bPlus'>{item?.gym?.name ?? ""}</span>
                                                </div>
                                                <VerticalSpace height={10} />
                                                {filteredLessonTypes.map((lessonType) => {
                                                    return <span key={lessonType} className='eachGender' onClick={() => onSelect(item.gym, lessonType)}>{lessonType}</span>
                                                })}
                                            </div>
                                        );
                                    }
                                    return null; // Не рендерим зал, если нет активностей после фильтрации
                                })
                            }
                        </>
                    }
                    </div>
                }

        </div>
    )
}

function DeleteButton({onClick}){
    return (
        <div className="eachGender flex flex-row gap-3 items-center" onClick={onClick}>
            <GarbageSvg />
            <span className='text-[14px]' >Удалить</span>
        </div>
    )
}

function GarbageSvg() {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5.25H15M7.5 8.25V12.75M10.5 8.25V12.75M3.75 5.25L4.5 14.25C4.5 14.6478 4.65804 15.0294 4.93934 15.3107C5.22064 15.592 5.60218 15.75 6 15.75H12C12.3978 15.75 12.7794 15.592 13.0607 15.3107C13.342 15.0294 13.5 14.6478 13.5 14.25L14.25 5.25M6.75 5.25V3C6.75 2.80109 6.82902 2.61032 6.96967 2.46967C7.11032 2.32902 7.30109 2.25 7.5 2.25H10.5C10.6989 2.25 10.8897 2.32902 11.0303 2.46967C11.171 2.61032 11.25 2.80109 11.25 3V5.25" stroke="rgba(255, 136, 136, 1)" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
}


function TireChaSvg(){
    return <svg width="10" height="1" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="10" height="1" fill="#DCDCDC"/>
    </svg>
    
}