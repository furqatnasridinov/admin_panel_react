import React from 'react'
import './GreenButton.css'

export default function GreenButton({
    onClick,
    addPlus = false,
    text = 'Новый клиент',
    fontSize = '14px',
    fontweight = 'medium',
    height = '40px',
    padLeft = '64px',
    padRight = '64px',
    width = 'fit-content',
    showShadow = false,
    isDisabled = false,
}) {
    const className = showShadow ? 'greenButtonComponent' : 'greenButtonComponentNoShadow'
  return (
    <div 
        style={{
            height : height,
            paddingLeft : padLeft,
            paddingRight : padRight,
            width : width,
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            backgroundColor : isDisabled ? 'rgba(220, 220, 220, 1)' : '',
            border : isDisabled ? 'none' : '',
            cursor : isDisabled ? 'not-allowed' : 'pointer',
        }}
        className={className} onClick={isDisabled ? null : onClick}>
        <span 
            style={{
                fontSize : fontSize,
                fontWeight : fontweight,
                color : isDisabled ? 'rgba(176, 176, 176, 1)' : '',
            }}
            className="leading-[16px] text-white">{text}
        </span>

        {addPlus && <svg width="30" height="30" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.38916 6C0.38916 2.68629 3.07545 0 6.38916 0H18.3892C21.7029 0 24.3892 2.68629 24.3892 6V18C24.3892 21.3137 21.7029 24 18.3892 24H6.38916C3.07545 24 0.38916 21.3137 0.38916 18V6Z" fill=""/>
            <path d="M8.63916 12.5H12.3892M16.1392 12.5H12.3892M12.3892 12.5V8.75M12.3892 12.5V16.25" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>}
        
      </div>
  )
}
