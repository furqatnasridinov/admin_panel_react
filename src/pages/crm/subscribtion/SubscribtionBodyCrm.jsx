import React, { useState , useEffect} from 'react';
import Accordion from './Accordion';
import VerticalSpace from '../../../components/VerticalSpace';
import SelectAndRemoveDropDown from './SelectAndRemoveDropDown';
import PlusButton from './PlusButton';
import './index.css';
import { CustomCrmTextArea } from '../add_client/PersonalDatas';
import GreenButton from '../../../components/crm/GreenButton';
import CrmTextField from '../../../components/crm/CrmTextField';
import { WEEK_DAYS } from '../../../dummy_data/dymmy_data';
import CrmDropdownHours from '../../../components/crm/dropdown_hours/CrmDropDownHours';
import SubscribtionHeaderCrm from './SubscribtionHeaderCrm';

export default function SubscribtionBodyCrm() {
    const [isOpened1, setIsOpened1] = useState(true);
    const [isOpened2, setIsOpened2] = useState(false);
    const [isOpened3, setIsOpened3] = useState(false);
    const [isOpened4, setIsOpened4] = useState(false);
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(''); // Месячный, годовой
    const [benefits, setBenefits] = useState('');
    const [limitations, setLimitations] = useState('');
    const [conditionForFreezing, setConditionForFreezing] = useState('');
    const [currenFocus, setCurrenFocus] = useState('');
    const [toolTipShown, setToolTipShown] = useState(false);
    const [selectedWeekDays, setSelectedWeekDays] = useState([]);
    const [startTimeHour, setStartTimeHour] = useState('18');
    const [startTimeMinute, setStartTimeMinute] = useState('00');
    const [isStartTimeDropDownOpened, openStartTimeDropDown] = useState(false);
    const [isEndTimeDropDownOpened, openEndTimeDropDown] = useState(false);
    const [endTimeHour, setEndTimeHour] = useState('19');
    const [endTimeMinute, setEndTimeMinute] = useState('00');
    const [currentOpenedDropDownGyms, setCurrentOpenedDropDownGyms] = useState(null);
    const [currentOpenedDropDownActivities, setCurrentOpenedDropDownActivities] = useState(null);
    const [currentOpenedDropDownSubcategories, setCurrentOpenedDropDownSubcategories] = useState(null);
    const [missingInfos, setMissingInfos] = useState([]);
    const [dropDownsGyms, setDropDownsGyms] = useState([]);
    const [dropDownsActivities, setDropDownsActivities] = useState([]);
    const [dropDownsSubcategories, setDropDownsSubcategories] = useState([]);
    const list = [{name: 'Ленинград', id: 1}, {name: "Abdullo Ako", id: 2}, {name : "Crystall", id: 3}];
    const list2 = ["С турником", "С брусьями", "С штангой", "С гантелями"];
    const list3 = ["С турником", "С брусьями", "С штангой", "С гантелями"];

    function toggle1() {
        setIsOpened1(!isOpened1);
    }
    function toggle2() {
        setIsOpened2(!isOpened2);
    }
    function toggle3() {
        setIsOpened3(!isOpened3);
    }
    function toggle4() {
        setIsOpened4(!isOpened4);
    }

    // for gyms
    function toggleDropDown(id) {
        setCurrentOpenedDropDownGyms(currentOpenedDropDownGyms === id ? null : id);
    }

    function onSelectDropDownItem(index, item) {
        const newDropDowns = [...dropDownsGyms];
        newDropDowns[index] = { ...newDropDowns[index], name: item?.name, isOpened: false };
        setDropDownsGyms(newDropDowns);
        if (missingInfos.includes("gym")) {
            const newMissingInfos = missingInfos.filter(info => info !== "gym");
            setMissingInfos(newMissingInfos);
        }
        setCurrentOpenedDropDownGyms(null); // Close the dropdown after selection
    }

    function addDropDown() {
        const newId = dropDownsGyms.length > 0 ? dropDownsGyms[dropDownsGyms.length - 1].id + 1 : 1;
        setDropDownsGyms([...dropDownsGyms, { id: newId, isOpened: false, name: '' }]);
    }

    // for activities
    function toggleDropDownActivities(id) {
        setCurrentOpenedDropDownActivities(currentOpenedDropDownActivities === id ? null : id);
    }

    function onSelectDropDownItemActivities(index, item) {
        const newDropDowns = [...dropDownsActivities];
        newDropDowns[index] = { ...newDropDowns[index], name: item, isOpened: false };
        setDropDownsActivities(newDropDowns);
        if (missingInfos.includes("activities")) {
            const newMissingInfos = missingInfos.filter(info => info !== "activities");
            setMissingInfos(newMissingInfos);
        }
        setCurrentOpenedDropDownActivities(null); // Close the dropdown after selection
    }

    function addDropDownActivities() {
        const newId = dropDownsActivities.length > 0 ? dropDownsActivities[dropDownsActivities.length - 1].id + 1 : 1;
        setDropDownsActivities([...dropDownsActivities, { id: newId, isOpened: false, name: '' }]);
    }

    // for subcategories
    function toggleDropDownSubcategories(id) {
        setCurrentOpenedDropDownSubcategories(currentOpenedDropDownSubcategories === id ? null : id);
    }

    function onSelectDropDownItemSubcategories(index, item) {
        const newDropDowns = [...dropDownsSubcategories];
        newDropDowns[index] = { ...newDropDowns[index], name: item, isOpened: false };
        setDropDownsSubcategories(newDropDowns);
        setCurrentOpenedDropDownSubcategories(null); // Close the dropdown after selection
    }

    function addDropDownSubcategories() {
        const newId = dropDownsSubcategories.length > 0 ? dropDownsSubcategories[dropDownsSubcategories.length - 1].id + 1 : 1;
        setDropDownsSubcategories([...dropDownsSubcategories, { id: newId, isOpened: false, name: '' }]);
    }

    function checkAllRequiredFields() {
      // Check if all required fields are filled
        const missing = [];
        if (dropDownsGyms.length === 0 || dropDownsGyms.some(dropDown => !dropDown.name)) {
            missing.push("gym");
        }
        if (dropDownsActivities.length === 0 || dropDownsActivities.some(dropDown => !dropDown.name)) {
            missing.push("activities");
        }
        if (price === '') {
            missing.push("price");
        }
        if (name === '') {
            missing.push("name");
        }
        if (description === '') {
            missing.push("description");
        }
        if (type === '') {
            missing.push("type");
        }
        if (selectedWeekDays.length === 0) {
            missing.push("weekdays");  
        }
        setMissingInfos(missing);
    }

    function toolTipOnMouseEnter() {
        if (!toolTipShown) {
          setToolTipShown(true);  
        }
    }

    function toolTipOnMouseLeave() {
        if (toolTipShown) {
          setToolTipShown(false);  
        }
    }

    function handleTapWeekday(dayId) {
        if (selectedWeekDays.includes(dayId)) {
            setSelectedWeekDays(selectedWeekDays.filter(id => id !== dayId));
        } else {
            setSelectedWeekDays([...selectedWeekDays, dayId]);
        }
        if (missingInfos.includes("weekdays")) {
            const newMissingInfos = missingInfos.filter(info => info !== "weekdays");
            setMissingInfos(newMissingInfos);
        }
    }

    function handleSetType(type) {
        setType(type);
        if (missingInfos.includes("type")) {
            const newMissingInfos = missingInfos.filter(info => info !== "type");
            setMissingInfos(newMissingInfos);
        }
    }

    function resetAllFields() {
        setPrice('');
        setName('');
        setDescription('');
        setType('');
        setBenefits('');
        setLimitations('');
        setConditionForFreezing('');
        setSelectedWeekDays([]);
        setStartTimeHour('18');
        setStartTimeMinute('00');
        setEndTimeHour('19');
        setEndTimeMinute('00');
        setDropDownsGyms([]);
        setDropDownsActivities([]);
        setDropDownsSubcategories([]);
        setMissingInfos([]);
    }
    
    useEffect(() => {
        if (currenFocus !== "price") {
            if (price !== '' && !price.includes('₽')) {
                setPrice(price + '₽');
            }
        }else if(currenFocus === "price"){ {
            if (price !== '' && price.includes('₽')) {
                setPrice(price.replace('₽', ''));
            }
        }}
    }, [currenFocus]);


    useEffect(() => {
      // set end time to be 1 hour after start time
        const startHour = parseInt(startTimeHour);
        const startMinute = parseInt(startTimeMinute);
        let endHour = startHour + 1;
        let endMinute = startMinute;
        if (endHour > 23) {
            endHour = 23;
            endMinute = 59; 
        }
        setEndTimeHour(endHour.toString());
        setEndTimeMinute(endMinute < 10 ? '0' + endMinute.toString() : endMinute.toString());
    }, [startTimeHour, startTimeMinute])
    

    const firstSectionError = missingInfos.includes("gym") || missingInfos.includes("activities") || missingInfos.includes("price");
    const firstSectionShowDone = dropDownsGyms.length > 0 && dropDownsGyms.every(dropDown => dropDown.name) && dropDownsActivities.length > 0 && dropDownsActivities.every(dropDown => dropDown.name) && price !== '';
    const secondSectionError = missingInfos.includes("type") || missingInfos.includes("weekdays");
    const secondSectionShowDone = type !== '' && selectedWeekDays.length > 0;
    const thirdSectionError = missingInfos.includes("name") || missingInfos.includes("description");
    const thirdSectionShowDone = name !== '' && description !== '';
    const fourthSectionShowDone = benefits !== '' || limitations !== '' || conditionForFreezing !== '';

    return (
        <div className="colGap10 mr-[10px]">
            <SubscribtionHeaderCrm onClick={resetAllFields} />

            <Accordion 
                height={firstSectionError ? '580px' : '520px'}
                isOpened={isOpened1} 
                isErorr ={firstSectionError} 
                toggle={toggle1} 
                showDone={firstSectionShowDone}
                title="1. Основные параметры абонемента">
                {firstSectionError && <VerticalSpace height="16px" />}
                <EachSection addPaddTop = {false} isRed={missingInfos.includes("gym")}>
                    <span className="label2">В каких заведениях будет действовать абонемент:</span>
                    <VerticalSpace height="10px" />
                    <div className="wrap">
                        {dropDownsGyms && dropDownsGyms.map((dropDown) => (
                            <SelectAndRemoveDropDown
                                key={dropDown.id}
                                list={list.filter(item => !dropDownsGyms.map(dropDown => dropDown.name).includes(item.name))}
                                closeDropDown={() => setCurrentOpenedDropDownGyms(null)}
                                isOpened={currentOpenedDropDownGyms === dropDown.id}
                                toggleDropDown={() => toggleDropDown(dropDown.id)}
                                onSelect={(item) => onSelectDropDownItem(dropDownsGyms.findIndex(d => d.id === dropDown.id), item)}
                                value={dropDown.name || ''}
                                onDelete={() => {setDropDownsGyms(dropDownsGyms.filter(d => d.id !== dropDown.id))}}
                                zIndex1={25}
                                zIndex2={24}
                            />
                        ))}
                        <PlusButton onClick={addDropDown} />
                    </div>
                </EachSection>
                {missingInfos.includes("gym") && missingInfos.includes("activities") && <VerticalSpace height="16px" />}
                <EachSection isRed={missingInfos.includes("activities")}>
                    <span className='label2'>На какие активности распространяется абонемент:</span>
                    <VerticalSpace height="10px" />
                    <div className="wrap">
                        {dropDownsActivities.map((dropDown, index) => (
                            <SelectAndRemoveDropDown
                                key={index}
                                list={list2}
                                placeholderText='Выберите активность'
                                closeDropDown={() => setCurrentOpenedDropDownActivities(null)}
                                isOpened={currentOpenedDropDownActivities === dropDown.id}
                                toggleDropDown={() => toggleDropDownActivities(dropDown.id)}
                                onSelect={(item) => onSelectDropDownItemActivities(index, item)}
                                value={dropDown.name || ''}
                                zIndex1={20}
                                zIndex2={19}
                            />
                        ))}
                        <PlusButton onClick={addDropDownActivities} />
                    </div>
                </EachSection>

                <VerticalSpace height="16px" />
                <span className='label2'>(Не обязательно) На какие подкатегории распространяется абонемент:</span>
                <VerticalSpace height="10px" />
                <div className="wrap">
                    {dropDownsSubcategories.map((dropDown, index) => (
                        <SelectAndRemoveDropDown
                            key={index}
                            list={list3}
                            placeholderText='Выберите подкатегорию'
                            closeDropDown={() => setCurrentOpenedDropDownSubcategories(null)}
                            isOpened={currentOpenedDropDownSubcategories === dropDown.id}
                            toggleDropDown={() => toggleDropDownSubcategories(dropDown.id)}
                            onSelect={(item) => onSelectDropDownItemSubcategories(index, item)}
                            value={dropDown.name || ''}
                        />
                    ))}
                    <PlusButton onClick={addDropDownSubcategories} />
                </div>

                <VerticalSpace height="16px" />
                <EachSection isRed={missingInfos.includes("price")}>
                    <span className='label2'>Стоимость абонемента:</span>
                    <VerticalSpace height="10px" />
                    <CustomCrmTextArea
                        value={price}
                        onChange={(e) => {
                            // Only numbers are allowed
                            const value = e.target.value;
                            if (/^\d+$/.test(value) || value === '') {
                                setPrice(value);
                                if (value && missingInfos.includes("price")) {
                                    const newMissingInfos = missingInfos.filter(info => info !== "price");
                                    setMissingInfos(newMissingInfos);  
                                }
                            }
                        }}
                        maxLength={6}
                        onFocus={() => setCurrenFocus('price')}
                        onBlur={() => setCurrenFocus('')}
                        currenFocus={currenFocus === 'price'}
                        placeHolder='Цена'
                        height='40px'
                    />
                </EachSection>
            </Accordion>

            <Accordion
                height={secondSectionError ? '460px' : '420px'}
                title="2. Уточнение условий абонемента"
                toggle={toggle2}
                isOpened={isOpened2}
                isErorr={secondSectionError}
                showDone={secondSectionShowDone}
            >
                <EachSection addPaddTop = {false} isRed={missingInfos.includes("type")}>
                    <span className='label2'>Тип абонемента:</span>
                    <VerticalSpace height="10px" />
                    <Indicator 
                        isSelected={type === 'Месячный'} 
                        text={"Месячный"} 
                        onClick={()=>handleSetType("Месячный")}/>
                    <VerticalSpace height="10px" />
                    <Indicator 
                        isSelected={type === 'Годовой'} 
                        text={"Годовой"} 
                        onClick={()=>handleSetType("Годовой")}/>
                </EachSection>
                {missingInfos.includes("weekdays") && missingInfos.includes("type") && <VerticalSpace height="16px" />}
                <EachSection isRed={missingInfos.includes("weekdays")}>
                    <div className="rowGap4">
                        <span className='label2'>Дни проведения занятий:</span>
                        <div className="relative">
                            <ToolTipSvg onMouseEnter={toolTipOnMouseEnter} onMouseLeave={toolTipOnMouseLeave} />
                            {toolTipShown && <ToolTipBody />}
                        </div>
                    </div>
                    <VerticalSpace height="10px" />
                    <div className="rowGap5">
                    {WEEK_DAYS.map((day, index) => {
                        return <EachWeekday 
                            key={index}
                            isSelected={selectedWeekDays.includes(day.id)}
                            text={day.name}
                            onClick={()=>handleTapWeekday(day.id)}
                        />
                    })}
                    </div>
                </EachSection>
                
                <EachSection>
                    <span className='label2'>Время проведения занятий:</span>
                    <VerticalSpace height="10px" />
                    <div className="rowGap10">
                        <CrmDropdownHours
                            text={`${startTimeHour}:${startTimeMinute}`}
                            isDropDownOpened={isStartTimeDropDownOpened}
                            openCloseDropDown={() => { openStartTimeDropDown(!isStartTimeDropDownOpened) }}
                            setHours={(hours) =>  setStartTimeHour(hours)}
                            setMinutes={(minute) => setStartTimeMinute(minute)}
                            selectedHour={startTimeHour}
                            selectedMinute={startTimeMinute}
                            closeOntapOutside={() => openStartTimeDropDown(false)}
                        />
                        <span>-</span>
                        <CrmDropdownHours 
                            text={`${endTimeHour}:${endTimeMinute}`}
                            isDropDownOpened={isEndTimeDropDownOpened}
                            openCloseDropDown={() => { openEndTimeDropDown(!isEndTimeDropDownOpened) }}
                            setHours={(hours) =>  setEndTimeHour(hours)}
                            setMinutes={(minute) => setEndTimeMinute(minute)}
                            selectedHour={endTimeHour}
                            selectedMinute={endTimeMinute}
                            closeOntapOutside={() => openEndTimeDropDown(false)}
                        />
                    </div>
                </EachSection>
            </Accordion>

            <Accordion 
                title="3. Описание абонемента" 
                toggle={toggle3} 
                isOpened={isOpened3} 
                isErorr={thirdSectionError}
                showDone={thirdSectionShowDone}
                height='440px'
            >
                {thirdSectionError && <VerticalSpace height="16px" />}
                <EachSection isRed={missingInfos.includes("name")} addPaddTop = {false}>
                    <span className='label2'>Название абонемента:</span>
                    <VerticalSpace height="10px" />
                    <CustomCrmTextArea
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (e.target.value && missingInfos.includes("name")) {
                                const newMissingInfos = missingInfos.filter(info => info !== "name");
                                setMissingInfos(newMissingInfos);
                            }
                        }}
                        maxLength={100}
                        onFocus={() => setCurrenFocus('name')}
                        onBlur={() => setCurrenFocus('')}
                        currenFocus={currenFocus === 'name'}
                        placeHolder='Вечерний ринг'
                        height='40px'
                        width={"350px"}
                    />
                </EachSection>
                {missingInfos.includes("name") && missingInfos.includes("description") && <VerticalSpace height="16px" />}
                <EachSection isRed={missingInfos.includes("description")}>
                    <span className='label2'>Описание абонемента:</span>
                    <VerticalSpace height="10px" />
                    <CrmTextField
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            if (e.target.value && missingInfos.includes("description")) {
                                const newMissingInfos = missingInfos.filter(info => info !== "description");
                                setMissingInfos(newMissingInfos);
                            }
                        }}
                        onFocus={() => setCurrenFocus('description')}
                        onBlur={() => setCurrenFocus('')}
                        maxLength={1000}
                        currenFocus={currenFocus === 'description'}
                        placeHolder='Включает информацию о задействованных услугах, ограничениях и дополнительных возможностях'
                        height='120px'
                        width={"100%"}
                        showLabel={false}
                    />
                </EachSection>
            </Accordion>

            <Accordion 
                height='550px'
                title="4. Дополнительно (Не обязательный блок)" 
                toggle={toggle4} isOpened={isOpened4}
                showDone={fourthSectionShowDone}
                >
                <span className='label2'>Информация о доступных льготах и скидках:</span>
                <VerticalSpace height="10px" />
                <CrmTextField
                    value={benefits}
                    onChange={(e) => {setBenefits(e.target.value)}}
                    onFocus={() => setCurrenFocus('benefits')}
                    onBlur={() => setCurrenFocus('')}
                    maxLength={1000}
                    currenFocus={currenFocus === 'benefits'}
                    placeHolder='Скидка пенсионерам и студентам'
                    height='120px'
                    width={"100%"}
                    showLabel={false}
                />

                <VerticalSpace height="32px" />
                <span className='label2'>Ограничения:</span>
                <CrmTextField
                    value={limitations}
                    onChange={(e) => {setLimitations(e.target.value)}}
                    onFocus={() => setCurrenFocus('limitations')}
                    onBlur={() => setCurrenFocus('')}
                    maxLength={800}
                    currenFocus={currenFocus === 'limitations'}
                    placeHolder='Строго 18+'
                    height='80px'
                    width={"100%"}
                    showLabel={false}
                />

                <VerticalSpace height="32px" />
                <span className='label2'>Условия отмены и заморозки абонемента:</span>
                <CrmTextField
                    value={conditionForFreezing}
                    onChange={(e) => { setConditionForFreezing(e.target.value) }}
                    onFocus={() => setCurrenFocus('conditionForFreezing')}
                    onBlur={() => setCurrenFocus('')}
                    maxLength={800}
                    currenFocus={currenFocus === 'conditionForFreezing'}
                    placeHolder='Отменить абонемент можно в любой момент, вернём деньги за неиспользованные походы. Заморозка абонемента возможна сроком до одного месяца'
                    height='80px'
                    width={"100%"}
                    showLabel={false}
                />
            </Accordion>

            <VerticalSpace height="16px" />
            <GreenButton 
                text='Создать абонемент' 
                width='100%' 
                showShadow = {true}
                onClick={checkAllRequiredFields}
            />
            <VerticalSpace height="6px" />
        </div>
    );
}


function EachSection({
    isRed,
    children,
    addPaddTop = true,
}){
    return <div 
        style={{
            backgroundColor : isRed ? 'rgba(255, 244, 244, 1)' : 'white',
            paddingLeft : isRed ? '16px' : '0px',
            paddingTop : addPaddTop || isRed ? '16px' : '0px',
        }}
        className="pb-[16px] pr-[16px] rounded-2xl min-w-[550px]">
            {children}
    </div>
}


function Indicator({
    isSelected,
    text,
    onClick
}){
    return <div className="rowGap10 cursor-pointer" onClick={onClick}>
    <div className="indicatorShape">
        <div style={{backgroundColor : isSelected ? "rgba(94, 220, 145, 1)" : "transparent"}} className="indicatorMain"></div>
    </div>
    <span className='label2b'>{text}</span>
</div>
}



function ToolTipSvg({
    onMouseEnter,
    onMouseLeave,
}) {

    return <svg onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className='cursor-pointer' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13Z" fill="white" />
        <path d="M12.9991 20.091C16.9153 20.091 20.09 16.9163 20.09 13.0001C20.09 9.08389 16.9153 5.90918 12.9991 5.90918C9.08291 5.90918 5.9082 9.08389 5.9082 13.0001C5.9082 16.9163 9.08291 20.091 12.9991 20.091Z" stroke="#252525" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M13.7867 15.7576C13.7867 16.1927 13.4339 16.5455 12.9988 16.5455C12.5637 16.5455 12.2109 16.1927 12.2109 15.7576C12.2109 15.3225 12.5637 14.9697 12.9988 14.9697C13.4339 14.9697 13.7867 15.3225 13.7867 15.7576Z" fill="#252525" />
        <path d="M11.8858 9.93845C12.1927 9.63147 12.5949 9.47763 12.9972 9.47692C13.4014 9.47621 13.8058 9.63005 14.1142 9.93845C14.4219 10.2461 14.5758 10.6494 14.5758 11.0527C14.5758 11.4559 14.4219 11.8592 14.1142 12.1669C13.8058 12.4753 13.4014 12.6291 12.9972 12.6284L13 13.4163" stroke="#252525" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

}

function ToolTipBody(){
    return <div className="toolTipBody">
        <span className='headerH2'>Повторение занятий</span>
        <span className='label2'>Если ваши занятия повторяются каждый четверг и пятницу, то вы можете выбрать эти дни и тогда абонемент будет действовать только в выбранные дни, на весь период действия (Например весь год, если выбран годовой абонемент).</span>
    </div>
}

function EachWeekday({
    isSelected,
    onClick,
    text,
}){
    const backgroundColor = isSelected ? 'rgba(94, 220, 145, 1)' : 'white';
    const textColor = isSelected ? 'white' : 'rgba(58, 185, 109, 1)';
    return (
        <div 
            style={{
                border : '1px solid rgba(58, 185, 109, 1)',
                backgroundColor : backgroundColor,
                transition : 'background-color 0.3s ease',
            }}
            onClick={onClick}
            className="w-[33px] h-[33px] rounded-[50%] cursor-pointer flex items-center justify-center">
            <span style={{color : textColor, transition : "color 0.3s ease"}} className='label3 select-none'>{text}</span>
        </div>
    )
}