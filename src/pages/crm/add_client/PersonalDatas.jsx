import React from 'react'
import "./index.css"
import VerticalSpace from "../../../components/VerticalSpace"
import GreenButton from '../../../components/crm/GreenButton'
import placeHolderImg from "../../../assets/images/american_psycho.jpg"
import CrmTextField from '../../../components/crm/CrmTextField'
import { useState, useEffect, useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import ReactInputMask from 'react-input-mask'
import arrowDownSvg from "../../../assets/svg/arrow_down.svg"
import DatePicker from "react-datepicker";
import previousMoth from "../../../assets/svg/navigate_prev_month.svg"
import nextMoth from "../../../assets/svg/navigate_next_month.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setName,
    setSurname,
    setPatronymic,
    setEmail,
    setPhone,
    setNote,
    setBirth,
    setGender,
    checkMissingFieldsPersonalData,
 } from '../../../features/crm/CrmClients'
import { getBirthdayFormatted } from '../../../config/apphelpers'

export default function PersonalDatas({
    showaAvatar = true,
}) {
    const dispatch = useDispatch();
    const [currenFocus, setCurrenFocus] = useState('') // ['name', 'surname', 'patronymic', 'birthday'...
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [isBirthError, setIsBirthError] = useState(false);
    const [isGenderError, setIsGenderError] = useState(false);
    const [isNameError, setIsNameError] = useState(false);
    const [isSurnameError, setIsSurnameError] = useState(false);
    const [isPatronymicError, setIsPatronymicError] = useState(false);
    const [genderDropDownOpened, setGenderDropDownOpened] = useState(false);
    const phoneRef = useRef(null);
    const state = useSelector((state) => state.crmClients);
    const showButtons = state.changesOccuredPersonalData;
    const showError = state.missingFieldsPersonalData?.length > 0;
    const phoneInputBorder = isPhoneError ? "1px solid rgba(255, 61, 0, 1)" : currenFocus === 'phone' ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)';
    const birthInputBorder = isBirthError ? "1px solid rgba(255, 61, 0, 1)" : currenFocus === 'birth' ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)';


    // functions 
    const handleNameChange = (e) => {
        dispatch(setName(e.target.value));
        if (showError) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handleSurnameChange = (e) => {
        dispatch(setSurname(e.target.value));
        if (showError) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handlePatronymicChange = (e) => {
        dispatch(setPatronymic(e.target.value));
        if (showError) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handlePhoneChange = (e) => {
        dispatch(setPhone(e.target.value));
        if (showError) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handleGenderChange = (value) => {
        dispatch(setGender(value));
        if (showError) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handleBirthChange = (e) => {
        dispatch(setBirth(e.target.value));
        if (showError) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const toggleGenderDropDown = () => {
        setGenderDropDownOpened(!genderDropDownOpened)
    }


  // Обработчик события вставки
  const handlePaste = (e) => {

    e.preventDefault(); // Предотвратить стандартное поведение вставки
    const text = e.clipboardData.getData('text'); // Получить текст из буфера обмена
    const cleanedText = text.replace(/\D/g, ''); // Очистить текст от нецифровых символов

    // Программно установить значение, учитывая маску
    if (cleanedText) {
      const formattedNumber = `+7${cleanedText.substring(1)}`; // Форматировать номер, добавив +7
      handlePhoneChange({ target: { value: formattedNumber } }); // Имитировать событие изменения для обновления состояния
      // Проверьте, существует ли input элемент и метод setSelectionRange
    if (phoneRef.current && phoneRef.current.input && typeof phoneRef.current.input.setSelectionRange === 'function') {
        phoneRef.current.input.setSelectionRange(formattedNumber.length, formattedNumber.length);
    }
    }
  };

  useEffect(() => {
    const arr = state.missingFieldsPersonalData;
    setIsNameError(arr?.includes('name'));
    setIsSurnameError(arr?.includes('surname'));
    setIsPatronymicError(arr?.includes('patronymic'));
    setIsPhoneError(arr?.includes('phone'));
    setIsBirthError(arr?.includes('birth'));
    setIsGenderError(arr?.includes("gender"));
  }, [state.missingFieldsPersonalData]);
  
  return (
    console.log(state.birth),
    <div className='customCard'>
        <div className="columnWithNoGap">
            <span className='headerH2'>Персональные данные</span>
            <span className='label2'>Тут можно изменить личные данные клиента, такие как ФИО, дату рождения, пол</span>
        </div>

        <VerticalSpace height={32} />

        {/* Green container (send ref) */}
        <div className='greenContaner'>
            <div className="columnWithNoGap">
                <span className='label2'>Фотография клиента подгружается автоматически из приложения MyFit. </span>
                <span className='label2'>Если фото нет - попросите клиента скачать приложение.</span>
            </div>
            <VerticalSpace height={16} />
            <div className="columnWithNoGap">
                <span className='label2'>Нажав кнопку ниже - клиенту придёт смс со ссылкой на скачивание приложения MyFit.</span>
                <span className='label2bPlus'>Используйте эту кнопку только с согласия клиента.</span>
            </div>
            <VerticalSpace height={16} />
            <div className="rowGap16">
                <GreenButton 
                    text='Отправить ссылку для скачивания MyFit' 
                    padLeft='24px' 
                    padRight='24px' 
                    height='40px'
                    showShadow={false}
                    onClick={() => {}}/>
                <span className='label2 text-grey-text'>Было использовано 07.07.2024 в 16:32</span>
            </div>
        </div>

        <VerticalSpace height={32} />

        {/* textfields */}
        <div className="rowGap32">
            {showaAvatar && 
                <div className="ava">
                    <img className='h-full w-full object-cover rounded-2xl' src={placeHolderImg} alt="imgAvarar" />
                </div>
            }
            <div className="colGap16">
                  <div className="colGap10">
                      <span className='label2bPlus'>Фамилия, Имя, Отчество</span>
                      <div className="rowGap10">
                          <CrmTextField
                              value={state.surname}
                              hasFocus={currenFocus === 'surname'}
                              onFocus={() => setCurrenFocus('surname')}
                              onBlur={() => setCurrenFocus('')}
                              label='Фамилия'
                              isError={isSurnameError}
                              onChange={handleSurnameChange} />

                          <CrmTextField
                              value={state.name}
                              hasFocus={currenFocus === 'name'}
                              onFocus={() => setCurrenFocus('name')}
                              onBlur={() => setCurrenFocus('')}
                              label='Имя'
                              width='205px'
                              isError={isNameError}
                              onChange={handleNameChange} />

                          <CrmTextField
                              hasFocus={currenFocus === 'patronymic'}
                              onFocus={() => setCurrenFocus('patronymic')}
                              onBlur={() => setCurrenFocus('')}
                              label='Отчество'
                              value={state.patronymic}
                              isError={isPatronymicError}
                              onChange={handlePatronymicChange}
                          />
                      </div>
                  </div>
                <VerticalSpace height={16} />
                <div className="rowGap10">
                    <GenderDropDown  
                        isOpened={genderDropDownOpened}
                        toggleDropDown={toggleGenderDropDown}
                        closeDropDown={() => setGenderDropDownOpened(false)}
                        value={state.gender}
                        isError={isGenderError}
                        onSelect={handleGenderChange} 
                        />
                    <div className="colGap10">
                        <span className='label2bPlus'>Телефон</span>
                          <div className="rowGap4">
                              <ReactInputMask
                                  mask={'+7 (999) 999-99-99'}
                                  value={state.phone}
                                  maskChar={null}
                                  onChange={(e) => {
                                      const onlyDigits = e.target.value.replace(/\D/g, "");
                                        handlePhoneChange({ target: { value: onlyDigits } });
                                  }}
                                  placeholder='Введите номер '
                                  onFocus={() => setCurrenFocus('phone')}
                                  onBlur={() => setCurrenFocus('')}
                                  onPaste={handlePaste}
                                  style={{
                                      width: "160px",
                                      height: "40px",
                                      border: phoneInputBorder,
                                      outline: 'none',
                                      borderRadius: '8px',
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      padding: '12px 16px',
                                      color: "rgba(176, 176, 176, 1)"
                                  }}
                              />
                              <div className="greenMiniCard40x40">
                                    <SendSvg />
                              </div>
                          </div>
                    </div>
                    <div className="colGap10">
                        <span className='label2bPlus'>Дата рождения </span>
                        <ReactInputMask
                              mask={'99.99.9999'}
                              maskChar={null}
                              value={state.birth}
                              onChange={handleBirthChange}
                              placeholder='18.11.2003 '
                              onFocus={() => setCurrenFocus('birth')}
                              onBlur={() => setCurrenFocus('')}
                              style={{
                                width: "200px",
                                height: "40px",
                                border : birthInputBorder,
                                outline: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '400',
                                padding: '12px 16px',
                              }}
                          />
                    </div>
                    
                </div>
            </div>
            {/* <CrmDatePicker 
                isShown={true}
                selectedDate={birth}
                onChange={(date) => setBirth(date)}
                onSelect={(date) => setBirth(date)}
                onClose={() => setCurrenFocus('')}
            /> */}
        </div>
        <VerticalSpace height={32} />
        <div className="colGap10">
            <span className='label2bPlus'>Заметка о клиенте</span>
            <CustomCrmTextArea 
                value={state.note}
                onChange={(e) => dispatch(setNote(e.target.value))}
                onFocus={() => setCurrenFocus('note')}
                onBlur={() => setCurrenFocus('')}
                currenFocus={currenFocus === 'note'}
                placeHolder='Добавьте заметку о клиенте, например о медицинских противопоказаниях, либо его личные пожелания'
                height='40px'
            />
        </div>

          {showButtons &&
              <>
                  <VerticalSpace height={32} />
                  <div className="rowGap12">
                      <WhiteButton onClick={() => { }} />
                      <GreenButton
                          text='Сохранить'
                          onClick={() => {
                              dispatch(checkMissingFieldsPersonalData())
                          }} />
                  </div>
                  {showError &&
                      <>
                          <VerticalSpace height={32} />
                          <span className='errorText'>Чтобы продолжить - необходимо заполнить все обязательные поля, выделенные красным</span>
                      </>
                  }

              </>
          }

    </div>
  )
}

function CrmDatePicker({
    selectedDate,
    onChange,
    onSelect,
    isShown,
    onClose,
}) {
    return (
        <DatePicker
            className='bg-red-200'
            minDate={new Date()}
            selected={selectedDate}
            onChange={onChange}
            open={isShown}
            shouldCloseOnSelect={true}
            onSelect={onSelect}
            locale={"ru"}
            popperPlacement="top-start"
            renderDayContents={(day, date) => {
                return (
                    <span className="text-[16px] font-normal">
                        {day}
                    </span>
                )
            }}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="h-[40px] w-full flex flex-row pl-[5px] pr-[10px] items-center justify-between">
                    <div className="flex flex-row items-center gap-[4px]">
                        <img
                            className="cursor-pointer"
                            src={previousMoth}
                            alt="prev"
                            onClick={() => decreaseMonth()}
                        />

                        <div className="text-[14px] font-medium uppercase text-grey-text w-[65px]">
                            {date.toLocaleString("ru", { month: "long" })}
                        </div>

                        <img
                            className="cursor-pointer"
                            src={nextMoth}
                            alt="next"
                            onClick={() => increaseMonth()}
                        />

                        <div className="text-[14px] font-medium uppercase text-grey-text">
                            {date.getFullYear()}
                        </div>
                    </div>

                    <div
                        className="text-[14px] font-medium text-button-color cursor-pointer"
                        onClick={onClose}>
                        Закрыть
                    </div>
                </div>
            )}
        />
    )
}

function CustomCrmTextArea({
    value,
    onChange,
    onFocus,
    onBlur,
    currenFocus,
    placeHolder,
    height,
    width,
}){
    const noteBorder = currenFocus ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)'

    return <TextareaAutosize 
        style={{
            border: noteBorder,
            height: height,
            width: width,
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className='textAreaCrm' />
}


function GenderDropDown({
    isOpened = false,
    toggleDropDown,
    closeDropDown,
    onSelect,
    value = "",
    isError = false,
}){
    const shadow = isOpened ? '0px 18px 14px -13px rgba(0, 0, 0, 0.25)' : 'none';
    const genders = ['Мужской', 'Женский'];
    const iconClasses = isOpened ? 'rotate-icon' : 'arrow-icon';
    const text = value || 'Выберите пол';
    const ref = useRef(null);
    const border = isError ? '1px solid rgba(255, 61, 0, 1)' : isOpened ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)';

    useEffect(() => {
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
    }, [])
    

    return (
        <div className="colGap10">
            <span className='label2bPlus'>Пол</span>
            <div className="relative" ref={ref}>
                <div 
                     style={{
                        boxShadow: shadow,
                        border: border,
                        borderRadius: '8px',
                        transition: 'border 0.3s',
                        zIndex: "3",
                    }}
                    onClick={toggleDropDown}
                    className="genderDropDownHeader">
                    <span 
                        style={{
                            color: value ? 'rgba(0, 0, 0, 1)' : 'rgba(176, 176, 176, 1)'
                        
                        }}
                        className='label2'>{text}</span>
                    <img className={iconClasses} src={arrowDownSvg} alt="" />
                </div>
                {isOpened &&
                    <div className='genderDropDownBody'>
                        {
                            genders.map((gender)=>{
                                return <span className='eachGender'onClick={()=>{
                                    onSelect(gender);
                                    closeDropDown();
                                }}>{gender}</span>
                            })
                        }
                    </div>
                }

            </div>
        </div>
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

function SendSvg() {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.49946 11L4.33138 5.74397C4.06059 4.52546 5.30972 3.5286 6.43779 4.06295L18.2208 9.64439C19.3647 10.1862 19.3647 11.8138 18.2208 12.3556L6.43779 17.9371C5.30971 18.4714 4.06059 17.4745 4.33138 16.256L5.49946 11ZM5.49946 11H10.9993" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}