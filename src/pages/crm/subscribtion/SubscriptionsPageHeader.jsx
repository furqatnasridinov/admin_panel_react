import React from 'react'
import CrmWhiteButton from '../../../components/crm/white_button/CrmWhiteButton'
import { useNavigate } from 'react-router-dom'

export default function SubscriptionPageHeader({
  onClick
}) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/subscribtionsPageCrm/createSub')
  };
  return (
    <div className="pl-[35px] pr-[32px] min-h-[80px] bg-white flex flex-row rounded-[16px] items-center gap-[10px] justify-between mr-[10px]">
      <div className="columnWithNoGap">
        <span className='headerH2'>Все абонементы</span>
        <span className='label2'>В этом разделе перечислены все доступные абонементы. Для создания нового - нажмите на кнопку справа</span>
      </div>
      <CrmWhiteButton text='Добавить новый' width='160px' onClick={handleNavigation}/>
    </div>
  )
}