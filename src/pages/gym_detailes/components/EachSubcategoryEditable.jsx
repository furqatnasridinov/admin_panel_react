import {React, useState, useEffect, useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize'; 
import { useDispatch, useSelector } from 'react-redux';
import { getListOfActivities, unsetFirstItemAsActive } from '../../../features/activities_slice';
import axiosClient from '../../../config/axios_client';
import { toast } from 'react-toastify';
import "./index.css";

export default function EachSubcategoryEditable({
    subcategory,
    nextOrderNumber, // order number of the new subcategory
    onDeleteCreate,
    currentLessonType,
    gymId,
    isInitiallyActive = false,
    inheritance,
    onDeletedSubcategory,
}) {
    const [currentActive, setCurrentActive] = useState(0);
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [copyOfSubcategoryName, setCopyOfSubcategoryName] = useState(subcategory?.name);
    const activitiesSlice = useSelector((state) => state.activities);
    const subcategories = activitiesSlice.subcategoriesOfSelectedActivity || [];
    const copyOfSubcategoryNameRef = useRef(copyOfSubcategoryName);
    const border = (currentActive === subcategory?.id || isInitiallyActive) ? "1px solid rgba(119, 170, 249, 1)" : "1px solid transparent";

    useEffect(() => {
        // обновляем значение copyOfSubcategoryNameRef.current при изменении copyOfSubcategoryName
        // чтобы использовать актуальное значение copyOfSubcategoryNameRef.current в useEffect ниже
        copyOfSubcategoryNameRef.current = copyOfSubcategoryName;
    }, [copyOfSubcategoryName]);

    useEffect(() => {
        // enter key press
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                if (copyOfSubcategoryNameRef.current?.trim() !== subcategory?.name?.trim()) {
                    if (!isInitiallyActive) {
                        sendRequestToChangeNameOfSubcategory({
                            name: copyOfSubcategoryNameRef.current,
                            subcategoryId: currentActive,
                        });
                    } else {
                        createSubCategoryRequest({
                            name: copyOfSubcategoryNameRef.current,
                        });
                    }
                }
                event.preventDefault();
                setCurrentActive(0);
            }
        };
        // remove focus from textarea when clicked outside
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setCurrentActive(0);
                if (!isInitiallyActive) {
                    if (copyOfSubcategoryNameRef.current?.trim() !== subcategory?.name?.trim()) {
                        // send request to change name of subcategory
                        sendRequestToChangeNameOfSubcategory({
                            name: copyOfSubcategoryNameRef.current,
                            subcategoryId: currentActive,
                        });
                        //setCopyOfSubcategoryName(subcategory?.name);
                    }
                } else {
                    if (copyOfSubcategoryNameRef.current?.trim()) {
                        // send request to сreate new subcategory
                        createSubCategoryRequest({
                            name: copyOfSubcategoryNameRef.current,
                        });
                    }
                }
            }                           
        };
        if (currentActive !== 0 || isInitiallyActive) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keypress", handleKeyPress);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [currentActive, isInitiallyActive]);


    function sendRequestToChangeNameOfSubcategory({
        name,
        subcategoryId,
    }){
        const newJson = {
            id: subcategoryId,
            name: name,
            orderNumber: subcategory?.orderNumber,
            inheritance: subcategory?.inheritance,
            peculiarities : subcategory?.peculiarities ? subcategory?.peculiarities : null,
            typeDescription : subcategory?.typeDescription ? subcategory?.typeDescription : null,
            gymSubActivePictures : subcategory?.gymSubActivePictures ? subcategory?.gymSubActivePictures : [],
        };
        // remove old subcategory from the list and add new one
        const newList = subcategories.map((item) => 
            item.id === subcategoryId ? newJson : item
        );
        const data = {
            gymSubActiveInfo: newList,
            lessonType: currentLessonType,
        };
        console.log(JSON.stringify(data));
        axiosClient.patch(`api/admin/gyms/${gymId}`, data)
        .then((response) => {
            if (response.status === 200) {
                toast.success("Подгруппа успешно изменена");
                dispatch(unsetFirstItemAsActive());
                dispatch(getListOfActivities(gymId));
            }
        })
        .catch((error) => {
            toast.error("Error while changing name of subcategory" + error);
        });
    }

    function createSubCategoryRequest({
        name,
      }) {
        const newJson = {
            //id: 0,
            name: name,
            orderNumber: nextOrderNumber,
            inheritance: inheritance,
            peculiarities : null,
            typeDescription : null,
            gymSubActivePictures : [],
        }
        const newList = [...subcategories, newJson];
        const data = {
          gymSubActiveInfo: newList,
          lessonType: currentLessonType,
        };
        console.log(JSON.stringify(data));
        axiosClient.patch(`api/admin/gyms/${gymId}`, data)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Подгруппа успешно создана");
            dispatch(unsetFirstItemAsActive());
            onDeleteCreate();
            dispatch(getListOfActivities(gymId));
          }
        })
        .catch((error) => {
          toast.error("Ошибка при создании подактивности" + error);
        });
    };


    return (
        <div 
            ref={ref} 
            className="eachSubEditable"
            draggable={true}
            >
            <DeleteIndicator onClick={isInitiallyActive ? onDeleteCreate : onDeletedSubcategory} />
            <TextareaAutosize
                style={{
                    border: border,
                    flex: "1",
                    cursor: currentActive === subcategory?.id ? "text" : "pointer",
                    userSelect: "none",
                    paddingLeft: isInitiallyActive || (currentActive === subcategory?.id) ? "16px" : "0",
                    transition: "border 0.3s ease, padding-left 0.3s ease",
                }}
                onDoubleClick={() => {
                    if (currentActive !== subcategory?.id) {
                        setCurrentActive(subcategory?.id);
                    }
                }}
                //autoFocus={!subcategory}
                readOnly={!isInitiallyActive && (currentActive !== subcategory?.id)}
                value={copyOfSubcategoryName}
                onChange={(e) => setCopyOfSubcategoryName(e.target.value)}
                className='areaAutoSize' />
        </div>
    )
}


export function DeleteIndicator({
    onClick
}){
    return <div onClick={onClick} className="removeFrame">
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.63916 7.5H12.1392" stroke="#FF3D00" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    </div>
}