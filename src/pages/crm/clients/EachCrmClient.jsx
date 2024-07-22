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
import { setCurrentClientId, updateClient } from '../../../features/crm/CrmClients'
import GreenButton from '../../../components/crm/GreenButton'
import TextareaAutosize from 'react-textarea-autosize';
import CrmWhiteButton from '../../../components/crm/white_button/CrmWhiteButton'


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
                      {email &&
                          <>
                              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6.05 0.9L1.25 8H0.27L5.06 0.9H6.05Z" fill="#3AB96D" />
                              </svg>
                              <span className='text-[10px] font-medium text-text-faded-dark'>{email}</span>
                          </>
                      }
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
                  {notesActions &&
                      <NotesAction
                          closeFunction={() => setNotesActions(false)}
                          note={note}
                          id={id}
                      />}
            </div>
            <div className="relative">
                <img className='cursor-pointer' onClick={()=>setMoreActions(true)} src={threeDots} alt="threeDots" />
                  {moreActions &&
                      <MoreAction
                          closeFunction={() => setMoreActions(false)}
                          onOpenClientCard={()=>{
                            dispatch(setCurrentClientId(id));
                            navigate(`/clientsPageCrm/clientCard/${id}`);
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

const NotesAction = ({closeFunction, note, id}) => {
    const menuRef = useRef();
    const [showInput, setShowInput] = useState(note === "" ? true : false);
    const [text, setText] = useState(note);
    const textCopy = note;
    const dispatch = useDispatch();
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

    async function toggleShowInput() {
        if (showInput) {
            if (text.trim() !== textCopy.trim() && text !== "") {
                await handleUpdateNote();
            }
            setShowInput(false);
            if (text === "") {
                closeFunction();
            }
        } else {
            setShowInput(true);
        }
    }

    function handleOnChange(e) {
        setText(e.target.value);
    }

    async function handleDelete() {
        const body = {
            id: id,
            note: "",
        }
        await dispatch(updateClient(body)); 
        closeFunction();
        console.log(`Отправлено: ${JSON.stringify(body)}`);
    }

    async function handleUpdateNote() {
        const body = {
            id: id,
            note: text,
        }
        dispatch(updateClient(body));
        closeFunction();
        console.log(`Отправлено: ${JSON.stringify(body)}`);
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
                <CrmWhiteButton 
                    onClick={toggleShowInput}
                    text={leftButtonText}
                    width='100%'
                    height='40px'
                />
                <GreenButton 
                    width='100%' 
                    padLeft='0' 
                    padRight='0' 
                    text='Удалить' 
                    isDisabled={textCopy === ""}
                    onClick={handleDelete} />
                
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

export const IconAndText = ({
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
    const border = showInput ? "1px solid rgba(58, 185, 109, 1)" : "1px solid white";
    const padding = showInput ? "10px 16px 10px 8px" : "10px 0";
    
    return  (
        <TextareaAutosize
            className='textAreaCrmNote'
            type="text"
            disabled={!showInput}
            value={text}
            readOnly={!showInput}
            placeholder={placeholder}
            onChange={onChange}
            style={{
                border : border,
                scrollbarWidth: "none",
                lineHeight: lineHeight,
                padding: padding,
                overflow: "hidden",
            }}
        />
    )
}


// svg icons 
const CartSvg = () => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C0 2.68629 2.68629 0 6 0H22C25.3137 0 28 2.68629 28 6V22C28 25.3137 25.3137 28 22 28H6C2.68629 28 0 25.3137 0 22V6Z" fill="#EFFFF5" />
            <path d="M11.75 14.75C12.5784 14.75 13.25 14.0784 13.25 13.25C13.25 12.4216 12.5784 11.75 11.75 11.75C10.9216 11.75 10.25 12.4216 10.25 13.25C10.25 14.0784 10.9216 14.75 11.75 14.75Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.5 18.5C9.5 17.6716 10.5074 17 11.75 17C12.9926 17 14 17.6716 14 18.5" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.5 13.25L16.25 13.25" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.5 15.5L16.25 15.5" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.25 10.25C7.25 9.42157 7.92157 8.75 8.75 8.75H19.25C20.0784 8.75 20.75 9.42157 20.75 10.25V17.75C20.75 18.5784 20.0784 19.25 19.25 19.25H8.75C7.92157 19.25 7.25 18.5784 7.25 17.75V10.25Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const NextSvg = () => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C0 2.68629 2.68629 0 6 0H22C25.3137 0 28 2.68629 28 6V22C28 25.3137 25.3137 28 22 28H6C2.68629 28 0 25.3137 0 22V6Z" fill="#EFFFF5" />
            <path d="M10.334 17.75L14.084 14L10.334 10.25" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.416 17.75L19.166 14L15.416 10.25" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const  CalendarSvg= () => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C0 2.68629 2.68629 0 6 0H22C25.3137 0 28 2.68629 28 6V22C28 25.3137 25.3137 28 22 28H6C2.68629 28 0 25.3137 0 22V6Z" fill="#EFFFF5" />
            <path d="M7.25 9.5C7.25 8.67157 7.92157 8 8.75 8H19.25C20.0784 8 20.75 8.67157 20.75 9.5V19.25C20.75 20.0784 20.0784 20.75 19.25 20.75H8.75C7.92157 20.75 7.25 20.0784 7.25 19.25V9.5Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.25 11L20.75 11" stroke="#3AB96D" stroke-linecap="square" stroke-linejoin="round" />
            <path d="M17 7.25V8.75" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11 7.25V8.75" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17 17.375H17.0015V17.3765H17V17.375Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14 17.375H14.0015V17.3765H14V17.375Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11 17.375H11.0015V17.3765H11V17.375Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17 14.375H17.0015V14.3765H17V14.375Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14 14.375H14.0015V14.3765H14V14.375Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11 14.375H11.0015V14.3765H11V14.375Z" stroke="#3AB96D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}


