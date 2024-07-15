import React from 'react'
import threeDots from "../../../assets/svg/three_dots.svg"
import crmDocs from "../../../assets/svg/crmDocs.svg"
import { useState, useEffect, useRef } from 'react'
import "./index.css"
import CrmButton from '../../../components/button/CrmButton'
import VerticalSpace from '../../../components/VerticalSpace'
import crmDocsEmpty from "../../../assets/svg/crmDocsEmpty.svg"
import Indicator from './Indicator'
import placeHolderImg from "../../../assets/images/placeholder.jpg"
import AppConstants from '../../../config/app_constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentClientId } from '../../../features/crm/CrmClients'

export default function EachCrmClient({
    name,
    surname,
    patronymic,
    avatar,
    phone,
    email,
    activities,
    age,
    gyms,
    note,
    green,
    red,
    gray,
    id,
}) {
    const [moreActions, setMoreActions] = useState(false);
    const [notesActions, setNotesActions] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fullName = `${surname} ${name} ${patronymic}`;
    const noteSvg = note === "" ? crmDocsEmpty : crmDocs;
    const _avatar = avatar ? `${AppConstants.baseUrl}image/${avatar}`: placeHolderImg;

  return (
    <div className="crmClientBlock">

        <div className="h-full w-[35%] flex flex-row items-center">
            <div className="w-[14%] flex justify-center">
                <div className="w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-[50%] p-[2px] bg-crm-main">
                    <img className="w-full h-full rounded-[50%] object-cover"
                        src={_avatar}
                        alt="avatar" />
                </div>
            </div>
            <div className="w-[86%] h-full flex flex-col justify-center">
                <Indicator green={green} red={red} gray={gray} />
                <span className='text-[14px] leading-4 overflow-hidden whitespace-nowrap overflow-ellipsis'>{fullName}</span>
                <div className="flex flex-row items-center gap-[5px]">
                    <span className='text-[10px] font-medium text-text-faded-dark'>{phone}</span>
                    <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.05 0.9L1.25 8H0.27L5.06 0.9H6.05Z" fill="#3AB96D"/>
                    </svg>
                    <span className='text-[10px] font-medium text-text-faded-dark'>{email}</span>
                </div>
            </div>
        </div>

        <div className="h-full w-[20%]">

        </div>

        <div className="h-full w-[17%] flex flex-col justify-center">
            <Expandable list={activities} />
        </div>

        <div className="h-full w-[8%] flex justify-center items-center">
            <span className='text-[14px] leading-4'>{age}</span>
        </div>

        <div className="h-full w-[12%] flex flex-col justify-center">
            <Expandable list={gyms} isGym = {true} />
        </div>

        <div className="h-full w-[8%] flex flow-row items-center justify-center gap-4">
            <div className="relative">
                <img className='cursor-pointer' onClick={()=>setNotesActions(true)} src={noteSvg} alt="crmDocs" />
                {notesActions && <NotesAction closeFunction={()=>setNotesActions(false)} note={note} />}
            </div>
            <div className="relative">
                <img className='cursor-pointer' onClick={()=>setMoreActions(true)} src={threeDots} alt="threeDots" />
                  {moreActions &&
                      <MoreAction
                          closeFunction={() => setMoreActions(false)}
                          onOpenClientCard={()=>{
                            dispatch(setCurrentClientId(id));
                            navigate("/clientsPageCrm/clientCard");
                          }}
                      />
                  }
            </div>
        </div>

    </div>
  )
}



// components

const MoreAction = ({
    closeFunction,
    onOpenClientCard,
}) => {
    const menuRef = useRef();

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

    return (
        <div className='tooltipCrm w-[285px] h-fit gap-[10px]' ref={menuRef}>
            <IconAndText icon={<CartSvg />} text='Открыть карточку клиента' onClick={onOpenClientCard}/>
            <IconAndText icon={<NextSvg />} text='Продлить абонемент' />
            <IconAndText icon={<CalendarSvg />} text='Записать на занятие' />
        </div>
    )
}

const NotesAction = ({closeFunction, note}) => {
    const menuRef = useRef();
    const [showInput, setShowInput] = useState(note === "" ? true : false);
    const [text, setText] = useState(note);
    const leftButtonText = text === "" ? 'Отменить' : showInput ? "Сохранить" : 'Изменить';

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

    function toggleShowInput() {
        if (showInput) {
            if (text === "") {
                closeFunction();
            }
            setShowInput(false);
        }else{
            setShowInput(true);
        }
        
    }

    function handleOnChange(e) {
        setText(e.target.value);
    }

    return (
        <div className='tooltipCrm w-[435px] h-fit' ref={menuRef}>
            <span className='text-[16px] font-semibold'>Заметка о клиенте</span>
            <VerticalSpace height='10px' />
            <TextToInput 
                showInput={showInput} 
                text={text} 
                placeholder='Добавить заметку' 
                onChange={handleOnChange} />
            <VerticalSpace height='10px' />
            <div className="flex flex-row justify-between gap-[5px] ">
                <CrmButton 
                    height={"40px"} 
                    width={"100%"} 
                    title= {leftButtonText}
                    backgroundColor='white' 
                    textColor='black'
                    onСlick={toggleShowInput}
                     />

                <CrmButton 
                    height={"40px"} 
                    width={"100%"} 
                    title='Удалить'  
                    onClick={()=>{}} />
            </div>
        </div>
    )
}

const SeeMoreAction = ({closeFunction, list, isGym}) => {
    const menuRef = useRef();
    const text = isGym ? "Заведения, которые посещает клиент:" : "Активности, которые посещает клиент:"

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

    return (
        <div style={{
           right: '101%',
        }} className='tooltipCrm w-[285px] h-fit' ref={menuRef}>
           <span className='font-semibold text-[16px] leading-4'>{text}</span>
           <VerticalSpace height='16px' />
            {list.map((current, index) => (
                <div key={index} className='text-[14px] leading-4'>{current}</div>
            ))}
        </div>
    )
}

const IconAndText = ({
    icon, 
    text,
    onClick,
}) => {
    return (
        <div className="iconAndTextCrm" onClick={onClick}>
            {icon}
            <span className='text-[14px] leadin-4'>{text}</span>
        </div>
    )
}

const Expandable = ({ list, isGym = false }) => {
    const [seeMore, setSeeMore] = useState(false);


    return (
        <div>
            {list.slice(0, 1).map((current, index) => (
                <div key={index} className='text-[14px] leading-4'>{current}</div> 
            ))}
            {list.length > 1 && (
                <div className="relative">
                    <div onClick={()=>setSeeMore(true)} className="text-[14px] leading-4 text-crm-main cursor-pointer">Еще</div>
                    {seeMore && <SeeMoreAction closeFunction={()=>setSeeMore(false)} list={list} isGym={isGym} />}
                </div>
            )}
        </div>
    );
};

const TextToInput = ({ showInput, text, placeholder, onChange, lineHeight = "16px" }) => {
    const inputRef = useRef(null);
    const border = showInput ? "1px solid rgba(58, 185, 109, 1)" : "1px solid white";
    
    useEffect(() => {
        const input = inputRef.current;
        if (input) {
          input.focus();
          // Set the cursor to the end of the text
          const length = input.value.length;
          input.setSelectionRange(length, length);
          // set the height relatively textfields content
          input.style.height = "inherit"; // Reset height to recalculate
          input.style.height = `${input.scrollHeight}px`; // Set new height based on scroll height
        }
      }, [text]);

    return  (
        <textarea
            className='textAreaCrm'
            type="text"
            disabled={!showInput}
            ref={inputRef}
            value={text}
            readOnly={!showInput}
            placeholder={placeholder}
            onChange={onChange}
            style={{
                border : border,
                // scrollbar 
                scrollbarWidth: "none",
                lineHeight: lineHeight,
                height: "auto",
                maxHeight: `${10 * lineHeight}px`, // Set max height to 10 lines 
                overflow: showInput ? 'auto' : "hidden"
            }}
        />
    )
}


// svg icons 
const CartSvg = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z" fill="#EFFFF5" />
            <path d="M10.125 13.125C10.8154 13.125 11.375 12.5654 11.375 11.875C11.375 11.1846 10.8154 10.625 10.125 10.625C9.43464 10.625 8.875 11.1846 8.875 11.875C8.875 12.5654 9.43464 13.125 10.125 13.125Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.25 16.25C8.25 15.5596 9.08947 15 10.125 15C11.1605 15 12 15.5596 12 16.25" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.75 11.875L13.875 11.875" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.75 13.75L13.875 13.75" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.375 9.375C6.375 8.68464 6.93464 8.125 7.625 8.125H16.375C17.0654 8.125 17.625 8.68464 17.625 9.375V15.625C17.625 16.3154 17.0654 16.875 16.375 16.875H7.625C6.93464 16.875 6.375 16.3154 6.375 15.625V9.375Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const NextSvg = () => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z" fill="#EFFFF5" />
            <path d="M8.94531 15.625L12.0703 12.5L8.94531 9.375" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.1797 15.625L16.3047 12.5L13.1797 9.375" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        
    )
}

const  CalendarSvg= () => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z" fill="#EFFFF5" />
            <path d="M6.375 8.75C6.375 8.05964 6.93464 7.5 7.625 7.5H16.375C17.0654 7.5 17.625 8.05964 17.625 8.75V16.875C17.625 17.5654 17.0654 18.125 16.375 18.125H7.625C6.93464 18.125 6.375 17.5654 6.375 16.875V8.75Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.375 10L17.625 10" stroke="#3AB96D" stroke-linecap="square" stroke-linejoin="round" />
            <path d="M14.5 6.875V8.125" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.5 6.875V8.125" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.5 15.3125H14.5013V15.3138H14.5V15.3125Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 15.3125H12.0012V15.3138H12V15.3125Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.5 15.3125H9.50125V15.3138H9.5V15.3125Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.5 12.8125H14.5013V12.8137H14.5V12.8125Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 12.8125H12.0012V12.8137H12V12.8125Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.5 12.8125H9.50125V12.8137H9.5V12.8125Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}


