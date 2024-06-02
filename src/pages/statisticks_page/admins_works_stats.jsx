import React from 'react'

export default function AdminsWorksStats({stat}) {
  return (
      <div className='flex flex-col gap-[16px] mt-[32px]'>
          <span className='text-[14px] font-bold'>Работа Администраторов:</span>
          <div className="flex flex-row gap-[16px]">

              <div style={{maxWidth : "240px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[14px] font-medium leading-[16px]'>Всего обработано заявок за выбранный период:</span>
                      <span className='text-[20px] font-semibold leading-[16px]'>{"0"}</span>
                  </div>
              </div>

                <div style={{maxWidth : "250px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[14px] font-medium leading-[16px]'>Скорость обработки запросов:</span>
                      <span className='text-[20px] font-semibold leading-[16px]'>{`В среднем ${stat?.adminSpeedReaction ?? "0"} мин`}</span>
                  </div>
                </div>

                <div style={{maxWidth : "200px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[20px] font-semibold leading-[16px]'>{stat?.adminRejectedVisits ?? "0"}</span>
                      <span className='text-[14px] font-medium leading-[16px]'>Раз отказано клиенту в записи</span>
                  </div>
                </div>

        </div>
      </div>
  )
}
