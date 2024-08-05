import React from 'react'
import CrmWhiteButton from '../../../components/crm/white_button/CrmWhiteButton'

export default function CreateSubscriptionHeaderCrm({
  onClick
}) {
  return (
    <div className="pl-[35px] pr-[32px] min-h-[80px] bg-white flex flex-row rounded-[16px] items-center gap-[10px] justify-between mr-[10px]">
      <div className="columnWithNoGap">
        <span className='headerH2'>Создание абонемента</span>
        <span className='label2'>Это специальный конструктор, где вы с лёгкостью сможете создать шаблон для абонемента</span>
      </div>
      <CrmWhiteButton text='Отменить' width='100px' onClick={onClick}/>
    </div>
  )
}
