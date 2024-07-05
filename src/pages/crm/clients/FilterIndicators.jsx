import React from 'react'

export default function FilterIndicators({
    topActive,
    bottomActive,
}) {
    
    const activeColor = "rgba(58, 185, 109, 1)";
    const inactiveColor = "#DCDCDC"

  return (
    <div className='flex flex-col items-center gap-1'>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33398 4.00002L4.00065 0.666687L0.667318 4.00002" stroke={topActive ? activeColor : inactiveColor } stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.666015 0.99998L3.99935 4.33331L7.33268 0.99998" stroke={bottomActive ? activeColor : inactiveColor} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
  )
}
