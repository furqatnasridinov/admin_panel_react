import React from 'react'
import EachSubcategoryEditable from './EachSubcategoryEditable'

export default function AddSubcategoryButton({
    onClick,
    showField,
    gymId,
    currentLessonType,
    onDelete,
    inheritance,
    nextOrderNumber,
}) {
    return !showField ? (
        <div
            className="rowGap10 cursor-pointer"
            onClick={onClick}>
            <PlusSvg />
            <span className="label2 text-blue-text">Добавить</span>
        </div>
    ) : (
        <EachSubcategoryEditable 
            gymId={gymId} 
            currentLessonType={currentLessonType}
            onDeleteCreate={onDelete}
            onDelete={onDelete}
            isInitiallyActive={true}
            inheritance={inheritance}
            nextOrderNumber={nextOrderNumber}
        />
    )
}


function PlusSvg(){
    return <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.38916 6C0.38916 2.68629 3.07545 0 6.38916 0H22.3892C25.7029 0 28.3892 2.68629 28.3892 6V22C28.3892 25.3137 25.7029 28 22.3892 28H6.38916C3.07545 28 0.38916 25.3137 0.38916 22V6Z" fill="#F5F9FF"/>
    <path d="M10.6392 14.5H14.3892M18.1392 14.5H14.3892M14.3892 14.5V10.75M14.3892 14.5V18.25" stroke="#599AFE" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
  }