import React, { Fragment } from 'react'
import "./index.css"
import VerticalSpace from "../../../components/VerticalSpace"
import GreenButton from '../../../components/crm/GreenButton'
import CrmWhiteButton from '../../../components/crm/white_button/CrmWhiteButton'
import CrmTextField from '../../../components/crm/CrmTextField'
import { useState, useEffect, useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import ReactInputMask from 'react-input-mask'
import arrowDownSvg from "../../../assets/svg/arrow_down.svg"
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../../../components/dialog/dialog';
import { getBirthdayFormatted, removeHours, translateGender } from '../../../config/apphelpers'
import OTPInput from 'react-otp-input'
import { toast } from 'react-toastify';
import { setName,
    setSurname,
    setPatronymic,
    resetPersonalInfos,
    setPhone,
    setNote,
    setBirth,
    setGender,
    checkMissingFieldsPersonalData,
    updateClient,
    createClientRequest,
    afterNavigatingToNewClient,
    createClient,
 } from '../../../features/crm/CrmClients'
import AppConstants from '../../../config/app_constants'

export default function PersonalDatas({
    id,
    isCreating = false,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currenFocus, setCurrenFocus] = useState('') // ['name', 'surname', 'patronymic', 'birthday'...
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [isBirthError, setIsBirthError] = useState(false);
    const [isGenderError, setIsGenderError] = useState(false);
    const [isNameError, setIsNameError] = useState(false);
    const [modalShown, setModalShown] = useState(false);
    const [isSurnameError, setIsSurnameError] = useState(false);
    const [isPatronymicError, setIsPatronymicError] = useState(false);
    const [genderDropDownOpened, setGenderDropDownOpened] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpError, setIsOtpError] = useState(false);
    const phoneRef = useRef(null);
    const state = useSelector((state) => state.crmClients);
    const fullName = `${state.surname} ${state.name} ${state.patronymic}`;
    const canEdit = useSelector((state) => state.login.canEdit);
    const showButtons = state.changesOccuredPersonalData;
    const showError = state.missingFieldsPersonalData?.length > 0;
    const showAvatar = state.avatar;
    const phoneInputBorder = isPhoneError ? "1px solid rgba(255, 61, 0, 1)" : currenFocus === 'phone' ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)';
    const birthInputBorder = isBirthError ? "1px solid rgba(255, 61, 0, 1)" : currenFocus === 'birth' ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)';
    const isPhoneEntered = state.phone?.length === 11;
    const isOtpPassed = otp.length === 4 && isOtpError===false;
    const showDoneButton = state.phone?.replace(/\+/g, '').length === 11 && state.phone.replace(/\+/g, '') === 
        state.clientGotById?.contactPhone.replace(/\+/g, '');
    const avatarUrlPath = `${AppConstants.baseUrl}image/${state.avatar}`;
    const canSendToCreate = state.name?.length > 1 && state.surname?.length > 2 && state.patronymic?.length > 2 &&
    state.phone?.length === 11 && state.birth?.length === 10 && state.gender?.length > 0;


    // functions 
    const handleNameChange = (val) => {
        dispatch(setName(val));
        if (!isCreating) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handleSurnameChange = (val) => {
        dispatch(setSurname(val));
        if (!isCreating) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handlePatronymicChange = (val) => {
        dispatch(setPatronymic(val));
        if (!isCreating) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handlePhoneChange = (e) => {
        dispatch(setPhone(e.target.value));
        if (!isCreating) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handleGenderChange = (value) => {
        dispatch(setGender(value));
        if (!isCreating) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const handleBirthChange = (e) => {
        dispatch(setBirth(e.target.value));
        if (!isCreating) {
            dispatch(checkMissingFieldsPersonalData());
        }
    }

    const toggleGenderDropDown = () => {
        setGenderDropDownOpened(!genderDropDownOpened)
    }

    const handleOtpChange = (otp) => {
        setOtp(otp)
        if (otp.length < 4 && isOtpError) {
            setIsOtpError(false)
        }
        if (otp.length === 4) {
            if (otp !== '1234') {
                setIsOtpError(true)
            }else{
                setIsOtpError(false);
                updatePhoneFunc();
            }
        }
    }

    async function updateClientFunc() {
        dispatch(checkMissingFieldsPersonalData());
        const canSend = state.missingFieldsPersonalData.length === 0;
        if (canSend) {
            const formattedDate = getBirthdayFormatted(state.birth);
            const translatedGender = translateGender(state.gender)
            const body = {
                "id": id,
                "firstName": state.name,
                "lastName": state.surname,
                "patronymic": state.patronymic,
                "birthdayDate": formattedDate,
                "contactPhone": state.phone,
                "gender" : translatedGender,
                "note": state.note,
            }
            console.log(`Отправлено: ${JSON.stringify(body)}`);
            await dispatch(updateClient(body));
            dispatch(resetPersonalInfos());
        }else{
            toast.error("Заполните все обязательные поля")
        }
    }

    function updatePhoneFunc() {
        const body = {
            "id": id,
            "contactPhone": `+${state.phone}`,
        }
        dispatch(updateClient(body));
        console.log(`Отправлено: ${JSON.stringify(body)}`);
    }

    function handleCreateClient() {
        dispatch(checkMissingFieldsPersonalData());
        if (canSendToCreate) {
            const requestBody = {
                firstName: state.name,
                lastName: state.surname,
                patronymic: state.patronymic,
                contactPhone: state.phone,
                note: state.note,
                birthdayDate: getBirthdayFormatted(state.birth),
                gender: translateGender(state.gender),
            };
            console.log(`Отправлено: ${JSON.stringify(requestBody)}`);
            dispatch(createClient(requestBody));
        }
    };


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

  useEffect(() => {
      if (state.newClientCreated) {
          if (state.newCreatedClientId) {
              navigate(`/clientsPageCrm/clientCard/${state.newCreatedClientId}`, { replace: true });
              dispatch(afterNavigatingToNewClient());
              dispatch(resetPersonalInfos());
              setCurrenFocus('');
          }
      }
  }, [state.newClientCreated]);
  
  return (
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
            {showAvatar && 
                <div className="ava">
                    <img className='h-full w-full object-cover rounded-2xl' src={avatarUrlPath} alt="imgAvarar" />
                </div>
            }
            <div className="colGap16">
                    {canEdit &&
                      <div className="colGap10">
                          <span className='label2bPlus'>Фамилия, Имя, Отчество</span>
                          <div className="rowGap10">
                              <CrmTextField
                                  value={state.surname}
                                  hasFocus={currenFocus === 'surname'}
                                  onFocus={() => setCurrenFocus('surname')}
                                  onBlur={() => setCurrenFocus('')}
                                  label='Фамилия'
                                  maxLength={30}
                                  isError={isSurnameError}
                                  onChange={(e) => {
                                      let inputValue = e.target.value;
                                      if (inputValue.length > 30) {
                                          inputValue = inputValue.substring(0, 30);
                                      }
                                      handleSurnameChange(inputValue);
                                  }} />

                              <CrmTextField
                                  value={state.name}
                                  hasFocus={currenFocus === 'name'}
                                  onFocus={() => setCurrenFocus('name')}
                                  onBlur={() => setCurrenFocus('')}
                                  label='Имя'
                                  width='205px'
                                  maxLength={30}
                                  isError={isNameError}
                                  onChange={(e)=>{
                                        let inputValue = e.target.value;
                                        if (inputValue.length > 30) {
                                            inputValue = inputValue.substring(0, 30);
                                        }
                                        handleNameChange(inputValue);
                                  }} />

                              <CrmTextField
                                  hasFocus={currenFocus === 'patronymic'}
                                  onFocus={() => setCurrenFocus('patronymic')}
                                  onBlur={() => setCurrenFocus('')}
                                  label='Отчество'
                                  maxLength={40}
                                  value={state.patronymic}
                                  isError={isPatronymicError}
                                  onChange={(e)=>{
                                        let inputValue = e.target.value;
                                        if (inputValue.length > 40) {
                                            inputValue = inputValue.substring(0, 40);
                                        }
                                        handlePatronymicChange(inputValue);
                                  }}
                              />
                          </div>
                      </div>
                    }
                    {!canEdit &&
                        <div className="columnWithNoGap">
                            <span className='label2bPlus'>Фамилия, Имя, Отчество</span>
                            <span className='label2'>{fullName}</span>
                        </div>
                    }
                <VerticalSpace height={16} />
                    {canEdit && 
                      <div className="rowGap10">
                          <GenderDropDown
                              isOpened={genderDropDownOpened}
                              toggleDropDown={toggleGenderDropDown}
                              closeDropDown={() => setGenderDropDownOpened(false)}
                              value={state.gender}
                              isError={isGenderError}
                              onSelect={handleGenderChange}
                          />
                          <div className="colGap10 w-[210px]">
                              <span className='label2bPlus'>Телефон</span>
                              <div className="flex flex-row">
                                  <div className="relative">
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
                                              width: isPhoneEntered && !showDoneButton ? "165px" : "205px",
                                              height: "40px",
                                              border: phoneInputBorder,
                                              transition: "width 0.3s ease",
                                              outline: 'none',
                                              borderRadius: '8px',
                                              fontSize: '14px',
                                              fontWeight: '400',
                                              padding: '12px 16px',
                                          }}
                                      />

                                      {showDoneButton &&
                                          <div className="absolute top-2 right-4">
                                              <DoneSvg />
                                          </div>
                                      }

                                  </div>

                                  {isPhoneEntered && !showDoneButton &&
                                      <div className="greenMiniCard40x40" onClick={() => setModalShown(true)}>
                                          <SendSvg />
                                      </div>
                                  }
                              </div>
                          </div>

                          {modalShown &&
                              <CustomDialog
                                  isOpened={modalShown}
                                  closeOnTapOutside={() => setModalShown(false)}
                              >
                                  <ModalBody
                                      otp={otp}
                                      setOtp={handleOtpChange}
                                      isOtpError={isOtpError}
                                      closeFunction={() => setModalShown(false)}
                                      isOtpPassed={isOtpPassed}
                                  />
                              </CustomDialog>
                          }
                          <div className="relative">
                              <div className="colGap10">
                                  <span className='label2bPlus'>Дата рождения </span>
                                  <ReactInputMask
                                      mask={'99.99.9999'}
                                      maskChar={null}
                                      value={state.birth}
                                      onChange={handleBirthChange}
                                      placeholder='18.11.2003 '
                                      onFocus={() => setCurrenFocus('birth')}
                                      onBlur={() => {
                                          // если кликаем пикер - не убирать фокус
                                          if (currenFocus !== 'birth') {
                                              setCurrenFocus('');
                                          }

                                      }}
                                      style={{
                                          width: "200px",
                                          height: "40px",
                                          border: birthInputBorder,
                                          outline: 'none',
                                          borderRadius: '8px',
                                          fontSize: '14px',
                                          fontWeight: '400',
                                          padding: '12px 16px',
                                      }}
                                  />
                              </div>
                              {/* {currenFocus === 'birth' &&
                                  <CrmDatePicker
                                      isShown={true}
                                      selectedDate={state.birth}
                                      onSelect={(date) => {
                                          if (isNaN(date) || date === null) {
                                              console.error('Invalid date object received');
                                              return;
                                          }
                                          // date is a Date object to ===> 01.01.2022
                                          const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                                          const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                                          const formattedDate = `${day}.${month}.${date.getFullYear()}`;
                                          dispatch(setBirth(formattedDate));
                                      }}
                                      onClose={() => setCurrenFocus('')}
                                  />
                              } */}

                          </div>

                      </div>
                    }
                    {!canEdit && 
                      <Fragment>
                          <div className="flex flex-row gap-[80px] items-center">
                              <div className="columnWithNoGap">
                                  <span className='label2bPlus'>Пол</span>
                                  <span className='label2'>{state.gender}</span>
                              </div>
                              <div className="columnWithNoGap">
                                  <span className='label2bPlus'>Дата рождения</span>
                                  <span className='label2'>{state.birth}</span>
                              </div>
                          </div>
                          <VerticalSpace height={16} />
                          <div className="columnWithNoGap">
                              <span className='label2bPlus'>Телефон</span>
                              <ReactInputMask
                                  mask={'+7 (999) 999-99-99'}
                                  value={state.phone}
                                  maskChar={null}
                                  readOnly={true}
                                  className='label2 outline-none'
                              />
                          </div>
                      </Fragment>
                    }
                    
            </div>
            
        </div>
        <VerticalSpace height={32} />
            {canEdit &&
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
            }

            {!canEdit &&
              <div className="columnWithNoGap">
                  <span className='label2bPlus'>Заметка о клиенте</span>
                  <span className='label2'>{state.note}</span>
              </div>
            }

            {showButtons &&
                <>
                  <VerticalSpace height={32} />
                  <div className="rowGap12">
                      <CrmWhiteButton onClick={() => { dispatch(resetPersonalInfos()) }} />
                      <GreenButton
                          text='Сохранить'
                          onClick={() => {
                              if (isCreating) {
                                    handleCreateClient();
                              } else {
                                  updateClientFunc();
                              }
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

    // Validate selectedDate before creating a Date object
    const isValidDate = (dateString) => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    };
    const toDayMinus18Years = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    const formatted = getBirthdayFormatted(selectedDate);
    const initialDay = isValidDate(formatted) ? new Date(formatted) : toDayMinus18Years;
    const ref = useRef(null);

    useEffect(() => {
        // close datepicker when click outside
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div ref={ref}
        style={{
            position: 'absolute',
            top: '65%',
            left: '180%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            minHeight: '300px',
          }}>

        <DatePicker
            //className='bg-red-200'
            minDate={new Date("1900-01-01")}
            maxDate={new Date("2006-01-01")}
            selected={initialDay}
            highlightDates={[]}
            open={isShown}
            shouldCloseOnSelect={true}
            onSelect={onSelect}
            locale={"ru"}
            renderMonthContent={(monthIndex, shortMonthText, fullMonthText)=>{
                console.log('monthIndex:', monthIndex);
            }}
            onDayMouseEnter={null}
            renderDayContents={(day, dayOfMonth) => {
                /* const getTime = removeHours(date)?.getTime() || 0 ;
                const getTime2 = removeHours(initialDay)?.getTime() || 1;
                const isSelected = getTime === getTime2;
                if (isSelected) {
                    console.log('selected date:', date);
                } */
                return (
                    <span className={`pickerEachDay`}>
                        {day}
                    </span>
                );
            }}
            
            renderCustomHeader={({ date, decreaseMonth, increaseMonth,decreaseYear, increaseYear}) => (
                <div className="h-[40px] w-full flex flex-row pl-[5px] pr-[10px] items-center justify-between">
                    <div className="flex flex-row items-center gap-[4px]">
                        <PrevMonSvg onClick={() => decreaseMonth()} />

                        <div className="text-[14px] font-medium uppercase text-crm-link w-[65px]">
                            {date?.toLocaleString("ru", { month: "long" })}
                        </div>

                        <NextMonSvg onClick={() => increaseMonth()} />
                        
                        <PrevMonSvg onClick={() => decreaseYear()} />
                        <div className="text-[14px] font-medium uppercase text-crm-link">
                            {date?.getFullYear()}
                        </div>
                        <NextMonSvg onClick={() => increaseYear()} />
                    </div>

                    <span
                        className="text-[14px] font-medium text-crm-link cursor-pointer"
                        onClick={onClose}>
                        Закрыть
                    </span>
                </div>
            )}
        />
        </div>
        
    )
}

export function CustomCrmTextArea({
    value,
    onChange,
    onFocus,
    onBlur,
    currenFocus,
    placeHolder,
    height,
    width,
    maxLength,
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
        maxLength={maxLength}
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
            <div className="flex flex-col relative" ref={ref}>
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

function ModalBody({
    closeFunction,
    isOtpError = false,
    otp,
    setOtp,
    isOtpPassed = false,
    onSendRef,
}){
    const [stage, setStage] = useState(1);
    const [timer, setTimer] = useState(5);

    useEffect(() => {
      if (stage === 2) {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [stage])


    useEffect(() => {
        if (isOtpPassed) {
            setStage(3);
        }
    }, [isOtpPassed])
    
    return (
        <div className="modalContainerPhone">
            {stage === 1 &&
                <>
                    <span className='headerH2'>Подтверждение по СМС</span>
                    <span className='label2'>Для внесения в базу номера телефона - нужно согласие клиента.</span>
                    <span className='label2'>В качестве запроса на согласие мы отправим ему СМС, в котором будет код из четырёх цифр, вам нужно будет ввести эти цифры на следующем экране.</span>
                    <div className="rowGap10">
                        <CrmWhiteButton text='Отменить' onClick={closeFunction} />
                        <GreenButton text='Хорошо, отправить СМС с кодом' onClick={()=>{setStage(2)}} />
                    </div>
                </>
            }
            {stage === 2 &&
                <>
                    <span className='headerH2'>Подтверждение по СМС</span>
                    <div className="greyBorderedContainerPhone">
                        Дождитесь, пока клиент получит смс и попросите его озвучить код, чтобы вписать его в поле ниже:
                    </div>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={isOtpError ? "pinputStyleError" : "pinputStyleCrm"}
                        shouldAutoFocus={true}
                    />
                    <div className="colGap5">
                        <span className='interBody3'>Не пришла смс в течении 1 минуты? </span>
                        {timer !== 0 &&
                            <div className="interBody3 text-crm-link">
                                {`Отправить ещё раз через ${timer}с`}
                            </div>
                        }


                        {timer === 0 &&
                            <div className="interBody3 text-crm-link cursor-pointer" onClick={() => {
                                setTimer(59);
                            }}>
                                Отправить заново
                            </div>}
                    </div>
                    
                    <CrmWhiteButton text='Отменить' onClick={closeFunction} width='120px'  />
                </>
            }

            {stage === 3 &&
                <>
                    <span className='headerH2'>Отлично! Мы привязали этот номер телефона к карточке клиента.</span>
                    <div className="columnWithNoGap">
                        <span className='label2'>Можете предложить ему принять ссылку на скачивание приложения MyFit, для удобного управления своим абонементом и отслеживания расписания.</span>
                        <span className='label2bPlus'>Не отправляйте ссылку без согласия клиента, это расценится как спам.</span>
                    </div>
                    <div className="rowGap10">
                        <CrmWhiteButton text='Отправить ссылку для скачивания MyFit' width='320px' onClick={onSendRef} />
                        <GreenButton width='260px' text='Закрыть это окно' onClick={()=>{
                            setStage(1);
                            //setOtp('');
                            closeFunction();
                        }} />
                    </div>
                </>
            }
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


function DoneSvg() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13L9 17L19 7" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

function PrevMonSvg({
    onClick
}){
    return (
        <svg className='cursor-pointer' onClick={onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z" fill="#3AB96D" />
        </svg>
    )
}

function NextMonSvg({
    onClick
}){
    return (
        <svg className='cursor-pointer' onClick={onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" fill="#3AB96D" />
        </svg>
    )
}