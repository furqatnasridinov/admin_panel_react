import React from 'react'

export default function AdminsWorksStats() {
  return (
      <div className='flex flex-col gap-[16px] mt-[32px]'>
          <span className='text-[14px] font-bold'>Работа Администраторов:</span>
          <div className="flex flex-row gap-[16px]">

              <div style={{maxWidth : "240px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[14px] font-medium leading-[16px]'>Всего обработано заявок за выбранный период:</span>
                      <span className='text-[14px] font-bold leading-[16px]'>354</span>
                  </div>
              </div>

                <div style={{maxWidth : "208px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[14px] font-medium leading-[16px]'>Скорость обработки запросов:</span>
                      <span className='text-[14px] font-bold leading-[16px]'>В среднем 1 мин</span>
                  </div>
                </div>

                <div style={{maxWidth : "180px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[14px] font-bold leading-[16px]'>134</span>
                      <span className='text-[14px] font-medium leading-[16px]'>Раз отказано клиенту в записи</span>
                  </div>
                </div>

        </div>
      </div>
  )
}
