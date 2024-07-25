import React from 'react'
import { DeleteIndicator } from './EachSubcategoryEditable';

export default function EachLessonTypeDraggable({
  title,
  onclick,
  isActive,
  onRemoveClicked,
  onEditClicked,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
}) {
    const redColor = "rgba(255, 61, 0, 1)";
    const [isHovered, setIsHovered] = React.useState(false);
    return (
      <div
        className={isActive ? "isActive" : "each_activity"}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DraggableIndicatorSvg  isActive={isHovered} />
        <DeleteIndicator onClick={onRemoveClicked} />
        <section onClick={onclick}>
            <span className='label2b'>{title}</span>
            {(isActive || isHovered) && <NextSvg />}
        </section>
        
      </div>
    );
}

function NextSvg() {
    return <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.38916 6C0.38916 2.68629 3.07545 0 6.38916 0H22.3892C25.7029 0 28.3892 2.68629 28.3892 6V20C28.3892 23.3137 25.7029 26 22.3892 26H6.38916C3.07545 26 0.38916 23.3137 0.38916 20V6Z" fill="#F5F9FF" />
        <path d="M11.334 16.625L14.459 13.5L11.334 10.375" stroke="#3E86F5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.5693 16.625L18.6943 13.5L15.5693 10.375" stroke="#3E86F5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

}

function DraggableIndicatorSvg({isActive}) {
    const color = isActive ? "#9DC1F5" : "transparent";
    return <svg className='mr-[6px]' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.38916" width="2" height="2" rx="1" fill={color} />
        <rect x="0.38916" y="4" width="2" height="2" rx="1" fill={color} />
        <rect x="0.38916" y="8" width="2" height="2" rx="1" fill={color} />
        <rect x="3.38916" width="2" height="2" rx="1" fill={color} />
        <rect x="3.38916" y="4" width="2" height="2" rx="1" fill={color} />
        <rect x="3.38916" y="8" width="2" height="2" rx="1" fill={color} />
    </svg>

}