import React from 'react'

export default function VisitsSummary() {
  return (
    <div className='flex flex-col gap-[16px] mt-[32px]'>
        <span className='text-[14px] font-bold'>Сводка по посещениям:</span>
        <div style={{width : "100%", height : "210px"}} className="secondaryCard"></div>
    </div>
  )
}
