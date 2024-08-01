import React, { useState , useEffect} from 'react';
import Accordion from './Accordion';
import VerticalSpace from '../../../components/VerticalSpace';
import SelectAndRemoveDropDown from './SelectAndRemoveDropDown';
import PlusButton from './PlusButton';
import './index.css';
import { CustomCrmTextArea } from '../client_card/PersonalDatas';
import GreenButton from '../../../components/crm/GreenButton';
import CrmTextField from '../../../components/crm/CrmTextField';
import { activities, WEEK_DAYS } from '../../../dummy_data/dymmy_data';
import CrmDropdownHours from '../../../components/crm/dropdown_hours/CrmDropDownHours';
import SubscribtionHeaderCrm from './SubscribtionHeaderCrm';
import { useSelector } from 'react-redux';
import axiosClient from '../../../config/axios_client';
import { toast } from 'react-toastify';
import { getApiLikeWeekDays } from '../../../config/apphelpers';

export default function SubscribtionBodyCrm() {
    const [isOpened1, setIsOpened1] = useState(true);
    const [isOpened2, setIsOpened2] = useState(true);
    const [isOpened3, setIsOpened3] = useState(true);
    const [isOpened4, setIsOpened4] = useState(true);
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
    const [dropDownsGyms, setDropDownsGyms] = useState([
        // [{id: 1, isOpened: bool, gym: {}}, ...]
    ]);
    const [dropDownsActivities, setDropDownsActivities] = useState([
        // [{id: 1, isOpened: bool, gymAndLessonType : {gym : GYMDATA, lessonType : "Бокс"}}, ...]
    ]);
    const [dropDownsSubcategories, setDropDownsSubcategories] = useState([
        // [{id: 1, isOpened: bool, subcategories: ["",""]}, ...]
    ]);
    const [gymAndLessonTypes, setGymAndLessonTypes] = useState([
        //{gym : GYMDATA, lessonTypes : ["Бассейн","Бокс"]},
    ]);
    const [subcategories, setSubcategories] = useState([
        // {id: 1, name: "Техника"}
    ]);
    const firstSectionError = missingInfos.includes("gym") || missingInfos.includes("activities") || missingInfos.includes("price");
    const firstSectionShowDone = dropDownsGyms.length > 0 && dropDownsGyms.every(dropDown => dropDown.gym) && dropDownsActivities.length > 0 && dropDownsActivities.every(dropDown => dropDown.gymAndLessonType) && price !== '';
    const secondSectionError = missingInfos.includes("type") || missingInfos.includes("weekdays");
    const secondSectionShowDone = type !== '' && selectedWeekDays.length > 0;
    const thirdSectionError = missingInfos.includes("name") || missingInfos.includes("description");
    const thirdSectionShowDone = name !== '' && description !== '';
    const fourthSectionShowDone = benefits !== '' || limitations !== '' || conditionForFreezing !== '';
    const allGyms = useSelector(state => state.currentGym.listOfGyms);
    const allActivities = useSelector(state => state.activities.listOfActivities);
    const showAddButtonGyms = dropDownsGyms.length < allGyms.length;
    const showAddButtonActivities = dropDownsActivities.length < allActivities.length;
    

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
        closeDoneSections(1);
    }

    function onSelectDropDownItem(id, item) {
        const copyDropDowns = [...dropDownsGyms];
        const changedDropDown = copyDropDowns.find(dropDown => dropDown.id === id);
        changedDropDown.gym = item;
        setDropDownsGyms(copyDropDowns);
        // send request with this gym's id to get activities
        axiosClient.get(`api/admin/gyms/${item?.id}/lessonTypes`).then(res => {
            if (res.status === 200 && res.data["object"]) {
                const result = res.data["object"]; 
                const arrayOfKeys = Object.keys(result);
                const json = {gym : item, lessonTypes : arrayOfKeys};
                setGymAndLessonTypes([...gymAndLessonTypes, json]);
                // get subcategories from result json and set it to subcategories
                const _subcategories = subcategories;
                arrayOfKeys.forEach(key => {
                    result[key].forEach(subcategory => {
                        if (!_subcategories.includes(subcategory)) {
                            _subcategories.push(subcategory);
                        }
                    });
                });
                setSubcategories(_subcategories);
            }
            
        }).catch(err => {
            toast.error('Get LessonTypes Ошибка при загрузке данных ==> ' + err.message);
        });
        if (missingInfos.includes("gym")) {
            const newMissingInfos = missingInfos.filter(info => info !== "gym");
            setMissingInfos(newMissingInfos);
        }
        setCurrentOpenedDropDownGyms(null); // Close the dropdown after selection
    }

    function addDropDown() {
        closeDoneSections(1);
        const newId = dropDownsGyms.length > 0 ? dropDownsGyms[dropDownsGyms.length - 1].id + 1 : 1;
        setDropDownsGyms([...dropDownsGyms, { id: newId, isOpened: false, gym: {}}]);
    }

    function deleteGymDropDown(dropDownId, gymID) {
        setDropDownsGyms(dropDownsGyms.filter(dropDown => dropDown.id !== dropDownId));
        const gymAndLessonTypesCopy = [...gymAndLessonTypes];
        const index = gymAndLessonTypesCopy.findIndex(item => item.gym.id === gymID);
        if (index !== -1) {
            gymAndLessonTypesCopy.splice(index, 1);
            setGymAndLessonTypes(gymAndLessonTypesCopy);
        }  
    }

    // for activities
    function toggleDropDownActivities(id) {
        closeDoneSections(1);
        setCurrentOpenedDropDownActivities(currentOpenedDropDownActivities === id ? null : id);
    }

    function onSelectDropDownItemActivities(gym, lessonType, dropDownId) {
       const copyDropDowns = [...dropDownsActivities];
       const changedDropDown = copyDropDowns.find(dropDown => dropDown.id === dropDownId);
       const json = {gym : gym, lessonType : lessonType};
       changedDropDown.gymAndLessonType = json;
        setDropDownsActivities(copyDropDowns);
        if (missingInfos.includes("activities")) {
            const newMissingInfos = missingInfos.filter(info => info !== "activities");
            setMissingInfos(newMissingInfos);
        }
        setCurrentOpenedDropDownActivities(null); // Close the dropdown after selection
    }

    function addDropDownActivities() {
        closeDoneSections(1);
        if (gymAndLessonTypes.length === 0) {
            toast.error('Выберите сперва заведение');                           
        } else {
            const newId = dropDownsActivities.length > 0 ? dropDownsActivities[dropDownsActivities.length - 1].id + 1 : 1;
            setDropDownsActivities([...dropDownsActivities, { id: newId, isOpened: false, gymAndLessonType : {}}]);
        }
    }

    function deleteActivityDropDown(dropDownId, gymID, lessonType) {
        setDropDownsActivities(dropDownsActivities.filter(dropDown => dropDown.id !== dropDownId));
        const gymAndLessonTypesCopy = [...gymAndLessonTypes];
        /* const index = gymAndLessonTypesCopy.findIndex(item => item.gym.id === gymID);
        if (index !== -1) {
            const lessonTypes = gymAndLessonTypesCopy[index].lessonTypes.filter(item => item !== lessonType);
            gymAndLessonTypesCopy[index].lessonTypes = lessonTypes;
            setGymAndLessonTypes(gymAndLessonTypesCopy);
        } */
    }

    // for subcategories
    function toggleDropDownSubcategories(id) {
        closeDoneSections(1);
        setCurrentOpenedDropDownSubcategories(currentOpenedDropDownSubcategories === id ? null : id);
    }

    function onSelectDropDownItemSubcategories(index, item) {
        const newDropDowns = [...dropDownsSubcategories];
        newDropDowns[index] = { ...newDropDowns[index], name: item?.name, isOpened: false };
        setDropDownsSubcategories(newDropDowns);
        setCurrentOpenedDropDownSubcategories(null); // Close the dropdown after selection
    }

    function addDropDownSubcategories() {
        closeDoneSections(1);
        const newId = dropDownsSubcategories.length > 0 ? dropDownsSubcategories[dropDownsSubcategories.length - 1].id + 1 : 1;
        setDropDownsSubcategories([...dropDownsSubcategories, { id: newId, isOpened: false, name: '' }]);
    }


    //
    function handleChangePrice(e) {
        // Only numbers are allowed
        const value = e.target.value;
        if (/^\d+$/.test(value) || value === '') {
            closeDoneSections(1);
            setPrice(value);
            if (value && missingInfos.includes("price")) {
                const newMissingInfos = missingInfos.filter(info => info !== "price");
                setMissingInfos(newMissingInfos);
            }
        }
    }

    function checkAllRequiredFields() {
      // Check if all required fields are filled
        const missing = [];
        if (dropDownsGyms.length === 0 || dropDownsGyms.some(dropDown => !dropDown.gym?.id)) {
            missing.push("gym");
        }
        if (dropDownsActivities.length === 0 || dropDownsActivities.some(dropDown => !dropDown.gymAndLessonType?.gym?.id || !dropDown.gymAndLessonType?.lessonType)) {
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
        if (missing.length === 0) {
            // Send data to the server
            createMembershipRequest();
        }
    }

    function createMembershipRequest() {
        // gyms = [{id: 1}, {id: 2}],
        const selectedGymsId = dropDownsGyms.map(dropDown => dropDown.gym.id);
        const gyms = selectedGymsId.map(item => ({ id: item }));
        const activities = dropDownsActivities.map(dropDown => dropDown.gymAndLessonType?.lessonType);
        const subcategories = dropDownsSubcategories.map(dropDown => ({id : dropDown.id}));
        const _type = type === 'Месячный' ? 'MONTH' : 'YEAR';
        const data = 
        {
            daysOfWeek: getApiLikeWeekDays(selectedWeekDays),
            description: description,
            startTime: `${startTimeHour}:${startTimeMinute}`,
            endTime: `${endTimeHour}:${endTimeMinute}`,
            freezingCancellation: conditionForFreezing,
            gyms : gyms,
            lessonTypes: activities,
            lessonSubTypes : subcategories,
            name: name,
            price: price.replace('₽', ''),
            privileges: benefits,
            restrictions: limitations,
            type: _type,
        }
        console.log(`отправлен запрос на создание абонемента==> ${JSON.stringify(data)}`);
        axiosClient.post('api/crm/membership/add', data)
        .then(res => {
            if (res.status === 200) {
                toast.success('Абонемент успешно создан');
                resetAllFields();
            }
        })
        .catch(err => {
            toast.error('Ошибка при создании абонемента ==> ' + err.message);
        });
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
        closeDoneSections(2);
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
        closeDoneSections(2);
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
        setIsOpened1(true);
        setIsOpened2(true);
        setIsOpened3(true);
        setIsOpened4(true);
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

    function closeDoneSections(currentSection) {
        const sections = [
          { showDone: firstSectionShowDone, openCloseFunc: setIsOpened1, isOpened: isOpened1 },
          { showDone: secondSectionShowDone, openCloseFunc: setIsOpened2, isOpened: isOpened2 },
          { showDone: thirdSectionShowDone, openCloseFunc: setIsOpened3, isOpened: isOpened3 },
          { showDone: fourthSectionShowDone, openCloseFunc: setIsOpened4, isOpened: isOpened4 },
        ];
      
        sections.forEach((section, index) => {
          if (section.showDone && section.isOpened && index !== (currentSection - 1)) {
            section.openCloseFunc(false);
          }
        });
      }
    
    function firstAccordionMouseLeave(){
        if (firstSectionShowDone && isOpened1) {
            setIsOpened1(false);
        }
    }

    function secondAccordionMouseLeave(){
        if (secondSectionShowDone && isOpened2) {
            setIsOpened2(false);
        }
    }

    function thirdAccordionMouseLeave(){
        if (thirdSectionShowDone && isOpened3) {
            setIsOpened3(false);
        }
    }

    function fourthAccordionMouseLeave(){
        if (fourthSectionShowDone && isOpened4) {
            setIsOpened4(false);
        }
    }

    return (
        <div className="colGap10 mr-[10px]">
            <SubscribtionHeaderCrm onClick={resetAllFields} />

            <Accordion 
                height={firstSectionError ? '580px' : '520px'}
                isOpened={isOpened1} 
                isErorr ={firstSectionError} 
                toggle={toggle1} 
                showDone={firstSectionShowDone}
                //onMouseLeave={firstAccordionMouseLeave}
                title="1. Основные параметры абонемента">
                {firstSectionError && <VerticalSpace height="16px" />}
                <EachSection addPaddTop = {false} isRed={missingInfos.includes("gym")}>
                    <span className="label2">В каких заведениях будет действовать абонемент:</span>
                    <VerticalSpace height="10px" />
                    <div className="wrap">
                        {dropDownsGyms && allGyms && dropDownsGyms.map((dropDown) => (
                            <SelectAndRemoveDropDown
                                key={dropDown.id}
                                list={allGyms.filter(item => !dropDownsGyms.some(dropDown => dropDown?.gym?.id === item.id))}
                                closeDropDown={() => setCurrentOpenedDropDownGyms(null)}
                                isOpened={currentOpenedDropDownGyms === dropDown.id}
                                toggleDropDown={() => toggleDropDown(dropDown.id)}
                                onSelect={(item) => onSelectDropDownItem(dropDown.id,item)}
                                value={dropDown.gym?.name || ''}
                                onDelete={() => {deleteGymDropDown(dropDown.id, dropDown.gym?.id)}}
                                zIndex1={25}
                                zIndex2={24}
                            />
                        ))}
                        {showAddButtonGyms && <PlusButton onClick={addDropDown} />}
                    </div>
                </EachSection>
                {missingInfos.includes("gym") && missingInfos.includes("activities") && <VerticalSpace height="16px" />}
                <EachSection isRed={missingInfos.includes("activities")}>
                    <span className='label2'>На какие активности распространяется абонемент:</span>
                    <VerticalSpace height="10px" />
                    <div className="wrap">
                        {dropDownsActivities && dropDownsActivities.map((dropDown) => (
                            <SelectAndRemoveDropDown
                                key={dropDown?.id}
                                list={gymAndLessonTypes}
                                placeholderText='Выберите активность'
                                closeDropDown={() => setCurrentOpenedDropDownActivities(null)}
                                isOpened={currentOpenedDropDownActivities === dropDown?.id}
                                toggleDropDown={() => toggleDropDownActivities(dropDown?.id)}
                                onSelect={(gym, lessonType) => onSelectDropDownItemActivities(gym, lessonType,dropDown.id)}
                                value={dropDown.gymAndLessonType?.lessonType || ''}
                                zIndex1={20}
                                zIndex2={19}
                                showMultiple={true}
                                onDelete={() => {deleteActivityDropDown(dropDown.id, dropDown.gymAndLessonType?.gym?.id, dropDown.gymAndLessonType?.lessonType)}}
                                maxHeight={230}
                                isScrollable={true}
                                dropDowns={dropDownsActivities}
                            />
                        ))}
                        <PlusButton onClick={addDropDownActivities} />
                    </div>
                </EachSection>

                <VerticalSpace height="16px" />
                <span className='label2'>(Не обязательно) На какие подкатегории распространяется абонемент:</span>
                <VerticalSpace height="10px" />
                <div className="wrap">
                    {dropDownsSubcategories && dropDownsSubcategories.map((dropDown) => (
                        <SelectAndRemoveDropDown
                            key={dropDown.id}
                            isScrollable={true}
                            maxHeight={230}
                            list={subcategories || []}
                            placeholderText='Выберите подкатегорию'
                            closeDropDown={() => setCurrentOpenedDropDownSubcategories(null)}
                            isOpened={currentOpenedDropDownSubcategories === dropDown.id}
                            toggleDropDown={() => toggleDropDownSubcategories(dropDown.id)}
                            onSelect={(item) => onSelectDropDownItemSubcategories(dropDownsSubcategories.findIndex(d => d.id === dropDown.id), item)}
                            value={dropDown.name || ''}
                            onDelete={() => {setDropDownsSubcategories(dropDownsSubcategories.filter(d => d.id !== dropDown.id))}}
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
                        onChange={handleChangePrice}
                        maxLength={6}
                        onFocus={() => {
                            setCurrenFocus('price');
                            closeDoneSections(1);
                        }}
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
                //onMouseLeave={secondAccordionMouseLeave}
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
                            openCloseDropDown={() => {
                                openStartTimeDropDown(!isStartTimeDropDownOpened);
                                closeDoneSections(2);
                            }}
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
                            openCloseDropDown={() => { 
                                openEndTimeDropDown(!isEndTimeDropDownOpened);
                                closeDoneSections(2);
                            }}
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
                //onMouseLeave={thirdAccordionMouseLeave}
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
                        onFocus={() => {
                            setCurrenFocus('name');
                            closeDoneSections(3);
                        }}
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
                        onFocus={() => {
                            setCurrenFocus('description');
                            closeDoneSections(3);
                        }}
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
                //onMouseLeave={fourthAccordionMouseLeave}
                >
                <span className='label2'>Информация о доступных льготах и скидках:</span>
                <VerticalSpace height="10px" />
                <CrmTextField
                    value={benefits}
                    onChange={(e) => {setBenefits(e.target.value)}}
                    onFocus={() => {
                        setCurrenFocus('benefits');
                        closeDoneSections(4);
                    }}
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
                    onFocus={() => {
                        setCurrenFocus('limitations');
                        closeDoneSections(4);
                    }}
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
                    onFocus={() => {
                        setCurrenFocus('conditionForFreezing');
                        closeDoneSections(4);
                    }}
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
                onClick={()=>{
                    checkAllRequiredFields();
                }}
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