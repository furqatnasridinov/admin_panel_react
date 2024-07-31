import React from 'react'
import { useState } from 'react'
import { addSubcategoryToList, removeSubcategoryFromList } from '../../features/activities_slice';
import { useSelector, useDispatch } from 'react-redux'
import CustomDropdown from '../../components/dropdown/custom_dropdown';

export default function Subcategories({
    subcategories,

}) {
    const dispatch = useDispatch();
    const selectedSubcategories = useSelector(state => state.activities.selectedSubcategories);
    const [showDropdown, setShowDropdown] = useState(false);
    const [subcategoriesParams, setSubcategoriesParams] = useState(subcategories);
    const canAddSubcategory = selectedSubcategories.length < subcategories.length;
    const isAnySelected = selectedSubcategories.length > 0;

    function removeSubcategory(subcategory) {
        dispatch(removeSubcategoryFromList(subcategory));
        // add it back to the list in dropdown
        setSubcategoriesParams([...subcategoriesParams, subcategory]);
    }

    function addSubcategory(subcategory) {
        dispatch(addSubcategoryToList(subcategory));
        setShowDropdown(false);
        // remove it from the list in dropdown
        var list = subcategoriesParams.filter((item) => item.id !== subcategory.id);
        setSubcategoriesParams(list);
    }

  return (
    <div className='colGap10 '>
        <span className='label2bPlus'>Подгруппы (Не обязательно):</span>
        <div className=" h-fit flex flex-wrap gap-[10px] items-center transition-all">
            {isAnySelected && selectedSubcategories.map((subcategory) => {
                return <SelectedSubBlock onRemove={()=>removeSubcategory(subcategory)} title={subcategory?.name} key={subcategory?.id} />
            })}
            {canAddSubcategory && !showDropdown && <PlusButton onClick={()=>setShowDropdown(true)} />}
            {showDropdown && 
                <CustomDropdown 
                    isDropDownOpened={showDropdown}
                    text='Выберите подгруппу'
                    zIndex={100}    
                    openCloseDropDown={()=>setShowDropdown(!showDropdown)}
                    map={subcategoriesParams.map((subcategory, index) => {
                        return <span
                        key={index}
                        className="gym_names"
                        onClick={() => addSubcategory(subcategory)}>
                        {subcategory?.name}
                      </span>
                    })}
                />
            }
        </div>
        
    </div>
  )
}

function SelectedSubBlock({
    title,
    onRemove,
}){
    return <div className="rowGap14">
        <svg className='cursor-pointer' onClick={onRemove} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C0 2.68629 2.68629 0 6 0H22C25.3137 0 28 2.68629 28 6V22C28 25.3137 25.3137 28 22 28H6C2.68629 28 0 25.3137 0 22V6Z" fill="#F5F9FF" />
            <path d="M10.25 14.5H17.75" stroke="#FF3D00" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span className='label2'>{title}</span>
    </div>
}

function PlusButton({
    onClick,
}) {
    return <div className="rowGap10 cursor-pointer" onClick={onClick}>
        <PlusSvg />
        <span className="label2 text-blue-text">Добавить</span>
    </div>
}

function PlusSvg() {
    return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6C0 2.68629 2.68629 0 6 0H22C25.3137 0 28 2.68629 28 6V22C28 25.3137 25.3137 28 22 28H6C2.68629 28 0 25.3137 0 22V6Z" fill="#F5F9FF" />
        <path d="M10.25 14.5H14M17.75 14.5H14M14 14.5V10.75M14 14.5V18.25" stroke="#599AFE" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
}