import React from 'react'
import './styles.css'

export default function Visitors() {
  return (
    <div className='flex flex-col gap-[16px] mt-[32px]'>
        <span className='text-[14px] font-bold'>Посетители:</span>
        <div className="flex flex-row gap-[16px]">
              <div style={{ width: "291px" }} className="secondaryCard">

              </div>

              <div className="secondaryCard">
                <div className="flex flex-col gap-[10px]">
                    <span className='text-[20px] font-semibold leading-[16px]'>Всего посетителей :</span>
                    <span className='text-[20px] font-semibold leading-[16px]'>12 658</span>
                </div>
              </div>

            <div className="secondaryCard">
            <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[5px]">
                    <span className='text-[20px] font-semibold leading-[16px]'>7 965</span>
                    <span className='text-[14px] font-medium'>Пришли впервые :</span>
                </div>
                <div className="flex flex-col gap-[5px]">
                    <span className='text-[20px] font-semibold leading-[16px]'>73 раза</span>
                    <span className='text-[14px] font-medium'>Записались, но не пришли :</span>
                </div>
                </div>
            </div>
            
        </div>
        <div className="flex flex-row gap-[16px]">
              <div style={{maxWidth : "160px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[20px] font-semibold leading-[16px]'>354</span>
                      <span className='text-[14px] font-medium leading-[16px]'>Занимаются прямо сейчас</span>
                  </div>
              </div>
              <div style={{maxWidth : "260px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[20px] font-semibold leading-[16px]'>42</span>
                      <span className='text-[14px] font-medium leading-[16px]'>Пользователя стали постоянными посетителями</span>
                  </div>
              </div>
        </div>
    </div>
  )
}
