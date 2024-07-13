import React from 'react'

export default function AddClientHeader() {
  return (
    <div className="pl-[35px] min-h-[80px] bg-white flex flex-row rounded-[16px] items-center gap-[10px]">
      <span className="text-[14px] font-medium leading-[16px]">
        Наша база клиентов
      </span>
      <span className="text-[14px] font-medium leading-[16px] text-grey-text">
        /
      </span>
      <span className="text-[14px] font-medium leading-[16px]">
        Карточка клиента
      </span>
    </div>
  )
}
