import React from 'react'
import TextsAndTwoIcons from './TextsAndTwoIcons'
import FilterIndicators from './FilterIndicators'
import avatar from "../../../assets/images/placeholder.jpg"


export default function CrmClientsBody() {
  return (
    <div className='crmClientsBody'>
        <TextsAndTwoIcons />

        <div className="h-6 w-full bg-red-400 mt-[32px] flex flow-row">
            <div className="h-full w-[35%] bg-blue-200 flex flex-row items-center justify-between pl-[60px]">
                <div className="flex flex-row items-center gap-1">
                    <span className='text-[13px] font-medium'>Фамилия</span>
                    <FilterIndicators  />
                </div>
                <div className="flex flex-row items-center gap-1">
                    <span className='text-[13px] font-medium'>Имя</span>
                    <FilterIndicators  />
                </div>
                <div className="flex flex-row items-center gap-1">
                    <span className='text-[13px] font-medium'>Постоянство</span>
                    <FilterIndicators  />
                </div>
            </div>
            <div className="h-full w-[20%] bg-black"></div>
            <div className="h-full w-[15%] bg-yellow-200">
                <div className="flex flex-row items-center gap-1">
                    <span className='text-[13px] font-medium'>Активность</span>
                    <FilterIndicators  />
                </div>
            </div>
            <div className="h-full w-[10%] bg-blue-200">
                <div className="flex flex-row items-center justify-center gap-1">
                    <span className='text-[13px] font-medium'>Возраст</span>
                    <FilterIndicators  />
                </div>
            </div>
            <div className="h-full w-[10%] bg-pink-200">
                <div className="flex flex-row items-center gap-1">
                    <span className='text-[13px] font-medium'>Заведение</span>
                    <FilterIndicators  />
                </div>
            </div>
            <div className="h-full w-[10%] bg-red-300">
                <div className="flex flex-row items-center gap-1">
                    <span className='text-[13px] font-medium'>Заведение</span>
                    <FilterIndicators  />
                </div>
            </div>
        </div>

        <div className="w-full h-[64px] flex flex-row items-center  rounded-lg bg-red-200 mt-[10px]">
            <div className="h-full w-[35%] bg-blue-200 flex flex-row items-center pl-[16px] gap-[10px]">
                  <div className="w-[36px] h-[36px] rounded-[50%] p-[2px] bg-crm-main">
                      <img className="w-full h-full rounded-[50%] object-cover"
                          src={`${avatar}`}
                          alt="avatar" />
                  </div>
                  <div className="w-full h-full bg-green-200">
                    
                  </div>
            </div>

            <div className="h-full w-[20%] bg-black">

            </div>

            <div className="h-full w-[15%] bg-yellow-200">

            </div>

            <div className="h-full w-[10%] bg-blue-200">

            </div>

            <div className="h-full w-[10%] bg-pink-200">

            </div>

            <div className="h-full w-[10%] bg-red-300">

            </div>
        </div>
    </div>
  )
}
