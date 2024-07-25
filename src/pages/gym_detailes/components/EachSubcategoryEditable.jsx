import {React, useState, useEffect, useRef} from 'react'
import TextareaAutosize from 'react-textarea-autosize'; 
import { useDispatch } from 'react-redux';
import { getListOfActivities, unsetFirstItemAsActive } from '../../../features/activities_slice';
import axiosClient from '../../../config/axios_client';
import { toast } from 'react-toastify';

export default function EachSubcategoryEditable({
    subcategory,
    onDelete,
    nextOrderNumber, // order number of the new subcategory
    onDeleteCreate,
    currentLessonType,
    gymId,
    isInitiallyActive = false,
    inheritance,
}) {
    const [currentActive, setCurrentActive] = useState(0);
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [copyOfSubcategoryName, setCopyOfSubcategoryName] = useState(subcategory?.name);
    const copyOfSubcategoryNameRef = useRef(copyOfSubcategoryName);
    const border = (currentActive === subcategory?.id || isInitiallyActive) ? "1px solid rgba(119, 170, 249, 1)" : "1px solid transparent";

    useEffect(() => {
        // обновляем значение copyOfSubcategoryNameRef.current при изменении copyOfSubcategoryName
        // чтобы использовать актуальное значение copyOfSubcategoryNameRef.current в useEffect ниже
        copyOfSubcategoryNameRef.current = copyOfSubcategoryName;
    }, [copyOfSubcategoryName]);

    useEffect(() => {
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
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [currentActive, isInitiallyActive]);

    function sendRequestToChangeNameOfSubcategory({
        name,
        subcategoryId,
    }){
        const data = {
            gymSubActiveInfo: [
                {
                    id: subcategoryId,
                    name: name,
                    orderNumber : subcategory?.orderNumber,
                    inheritance : subcategory?.inheritance,
                }
            ],
            lessonType: currentLessonType,
        };
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
        const data = {
          gymSubActiveInfo: [
            {
              inheritance: inheritance,
              name: name,
              orderNumber: nextOrderNumber,
            }
          ],
          lessonType: currentLessonType,
        };
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
        <div ref={ref} className="rowGap10 min-h-[28px]">
            <DeleteIndicator onClick={onDelete} />
            <TextareaAutosize  
                style={{
                    border : border,
                    userSelect :  "none",
                    paddingLeft: isInitiallyActive || (currentActive === subcategory?.id) ? "16px" : "0",
                    transition : "border 0.3s ease, padding-left 0.3s ease",
                }}
                onDoubleClick={() => {
                        if (currentActive !== subcategory?.id) {
                            setCurrentActive(subcategory?.id);
                        }
                }}
                unselectable='on'
                //onSelect={null}
                autoFocus={isInitiallyActive}
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
    return <div onClick={onClick} className="flex justify-center items-center w-[28px] min-w-[28px] min-h-[28px] h-[100%] rounded bg-bg-color cursor-pointer">
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.63916 7.5H12.1392" stroke="#FF3D00" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    </div>
}