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

export default function PersonalDatas({
    showaAvatar = true,
}) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [currenFocus, setCurrenFocus] = useState('') // ['name', 'surname', 'patronymic', 'birthday'...
    const [note, setNote] = useState('')
    const [phone, setPhone] = useState('')
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState('') 
    const [genderDropDownOpened, setGenderDropDownOpened] = useState(false)
    const phoneRef = useRef(null)

    // functions 
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSurnameChange = (e) => {
        setSurname(e.target.value)
    }

    const handlePatronymicChange = (e) => {
        setPatronymic(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
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
                            value={surname} 
                            hasFocus={currenFocus === 'surname'}
                            onFocus={() => setCurrenFocus('surname')}
                            onBlur={() => setCurrenFocus('')}
                            label='Фамилия'
                            onChange={handleSurnameChange} />

                        <CrmTextField 
                            value={name} 
                            hasFocus={currenFocus === 'name'}
                            onFocus={() => setCurrenFocus('name')}
                            onBlur={() => setCurrenFocus('')}
                            label='Имя'
                            onChange={handleNameChange} />   

                        <CrmTextField
                            hasFocus={currenFocus === 'patronymic'}
                            onFocus={() => setCurrenFocus('patronymic')}
                            onBlur={() => setCurrenFocus('')}
                            label='Отчество' 
                            value={patronymic}
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
                        value={gender}
                        onSelect={setGender}
                        />
                    <div className="colGap10">
                        <span className='label2bPlus'>Телефон</span>
                          <ReactInputMask
                              mask={'+7 (999) 999-99-99'}
                              value={phone}
                              maskChar={null}
                              onChange={(e) => {
                                  const onlyDigits = e.target.value.replace(/\D/g, "");
                                  setPhone(onlyDigits)
                              }}
                              placeholder='Введите номер '
                              onFocus={() => setCurrenFocus('phone')}
                              onBlur={() => setCurrenFocus('')}
                              onPaste={handlePaste}
                              style={{
                                width: "200px",
                                height: "40px",
                                border : currenFocus === 'phone' ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)',
                                outline: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '400',
                                padding: '12px 16px',
                                color : "rgba(176, 176, 176, 1)"
                              }}
                          />
                    </div>
                    <div className="colGap10">
                        <span className='label2bPlus'>Дата рождения </span>
                        <ReactInputMask
                              mask={'99.99.9999'}
                              maskChar={null}
                              value={birth}
                              onChange={(e) => {
                                  const onlyDigits = e.target.value.replace(/\D/g, "");
                                  setBirth(onlyDigits)
                              }}
                              placeholder='18.11.2003 '
                              onFocus={() => setCurrenFocus('birth')}
                              onBlur={() => setCurrenFocus('')}
                              style={{
                                width: "200px",
                                height: "40px",
                                border : currenFocus === 'birth' ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)',
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
        </div>
        <VerticalSpace height={32} />
        <div className="colGap10">
            <span className='label2bPlus'>Заметка о клиенте</span>
            <CustomCrmTextArea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onFocus={() => setCurrenFocus('note')}
                onBlur={() => setCurrenFocus('')}
                currenFocus={currenFocus === 'note'}
                placeHolder='Добавьте заметку о клиенте, например о медицинских противопоказаниях, либо его личные пожелания'
                height='40px'
            />
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
}){
    const shadow = isOpened ? '0px 18px 14px -13px rgba(0, 0, 0, 0.25)' : 'none';
    const genders = ['Мужской', 'Женский'];
    const iconClasses = isOpened ? 'rotate-icon' : 'arrow-icon';
    const text = value || 'Выберите пол';
    const ref = useRef(null);

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
                        border: isOpened ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)',
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