import React from 'react'
import "./index.css"
import { ArrowDownOutlined } from '../subscribtion/Accordion'
import { useState } from 'react'
import CrmWhiteButton from '../../../components/crm/white_button/CrmWhiteButton';
import GreenButton from '../../../components/crm/GreenButton';
import { MembershipCard } from './Memberships';

export default function AddMembershipDialog({
    closeDialog,
}) {
    const [isOpened1, setIsOpened1] = useState(false);
    const [isOpened2, setIsOpened2] = useState(false);
    const [isOpened3, setIsOpened3] = useState(false);
    const [isOpened4, setIsOpened4] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState({
        // {id : 1, gymId :1}
    });
    const memberShips = [
        {
            "id": 1,
            "name": "Абонемент на 1 месяц",
            "price": 5000,
            "oldPrice": 6000,
            "gyms" : ["Abdullo Ako", "Leningrad", "La Crysral"],
            "activities": ["Йога", "Фитнес", "Бассейн"],
            "subCategories": ["Вечерний", "Утренний", "Дневной"],
            "description": "Абонемент на 1 месяц включает в себя посещение всех тренажерных залов, бассейнов и групповых занятий"
        },
        {
            "id": 2,
            "name": "Абонемент на 3 месяца",
            "price": 12000,
            "oldPrice": 15000,
            "gyms" : ["Abdullo Ako", "Leningrad", "La Crysral"],
            "activities": ["Йога", "Фитнес", "Бассейн"],
            "subCategories": ["Вечерний", "Утренний", "Дневной"],
            "description": "Абонемент на 3 месяца включает в себя посещение всех тренажерных залов, бассейнов и групповых занятий"
        },
        {
            "id": 3,
            "name": "Абонемент на 6 месяцев",
            "price": 20000,
            "oldPrice": 25000,
            "gyms" : ["Abdullo Ako", "Leningrad", "La Crysral"],
            "activities": ["Йога", "Фитнес", "Бассейн"],
            "subCategories": ["Вечерний", "Утренний", "Дневной"],
            "description": "Абонемент на 6 месяцев включает в себя посещение всех тренажерных залов, бассейнов и групповых занятий"
        },
        {
            "id": 4,
            "name": "Абонемент на 12 месяцев",
            "price": 40000,
            "oldPrice": 50000,
            "gyms" : ["Abdullo Ako", "Leningrad", "La Crysral"],
            "activities": ["Йога", "Фитнес", "Бассейн"],
            "subCategories": ["Вечерний", "Утренний", "Дневной"],
            "description": "Абонемент на 12 месяцев включает в себя посещение всех тренажерных залов"
        }
    ];

    return (
        <div className="dialogBody">
            <div className="columnWithNoGap">
                <span className='headerH2'>Абонементы</span>
                <span className='label2'>Выберите из существующих абонементов тот, который был оплачен клиентом</span>
            </div>

            <AccordionGyms 
                isOpened={isOpened1} 
                radioOn={selectedMembership.gymId === 1 && !isOpened1} 
                toggle={()=>setIsOpened1(!isOpened1)}
                memberShips={memberShips}
                selectMembershipId={selectedMembership.id}  
                selectedMembershipGymId={selectedMembership.gymId}
                selectMembership={(gymId, membershipId)=>setSelectedMembership({id : membershipId, gymId : gymId})}
                />
            <AccordionGyms 
                isOpened={isOpened2} 
                radioOn={selectedMembership.gymId === 2 && !isOpened2} 
                toggle={()=>setIsOpened2(!isOpened2)} 
                gymName='Abdullo Ako'
                gymId={2}
                selectMembershipId={selectedMembership.id}
                selectedMembershipGymId={selectedMembership.gymId}
                selectMembership={(gymId, membershipId)=>setSelectedMembership({id : membershipId, gymId : gymId})}
                memberShips={memberShips}/>
            <AccordionGyms 
                isOpened={isOpened3} 
                radioOn={selectedMembership.gymId === 3 && !isOpened3} 
                toggle={()=>setIsOpened3(!isOpened3)} 
                gymName='Leningrad'
                gymId={3}
                selectedMembershipGymId={selectedMembership.gymId}
                selectMembershipId={selectedMembership.id}
                selectMembership={(gymId, membershipId)=>setSelectedMembership({id : membershipId, gymId : gymId})}
                memberShips={memberShips}/>
            <AccordionGyms 
                isOpened={isOpened4} 
                radioOn={selectedMembership.gymId === 4 && !isOpened4} 
                toggle={()=>setIsOpened4(!isOpened4)} 
                gymName='La Crysral'
                gymId={4}
                selectedMembershipGymId={selectedMembership.gymId}
                selectMembershipId={selectedMembership.id}
                selectMembership={(gymId, membershipId)=>setSelectedMembership({id : membershipId, gymId : gymId})}
                memberShips={memberShips}/>

            <div className="rowGap10">
                <CrmWhiteButton text='Отменить' onClick={closeDialog} width='120px' />
                <GreenButton text='Добавить выбранный абонемент клиенту' width='340px' padLeft='24px' padRight='24px' />
            </div>
        </div>
    )
}

// component

function AccordionGyms({
    isOpened,
    radioOn,
    toggle,
    gymName = "Crystall",
    gymId = 1,
    memberShips = [],
    selectMembership,
    selectMembershipId,
    selectedMembershipGymId,
}) {
    return <div style={{
        height: isOpened ? 'fit-content' : '43px',
        transition: 'all 0.3s',
    }} className="flex flex-col">
        <div className="rowSpaceBetween p-2 cursor-pointer" onClick={toggle}>
            <div className="rowGap16">
                <RadioButton radioOn={radioOn} />
                <div className="rowGap10">
                    <LocationSvgWithBack />
                    <span className='headerH2'>{gymName}</span>
                </div>
            </div>
            <div className="w-[38px] h-[28px] flex justify-center items-center rounded bg-crm-bgrGreen">
                <div className={isOpened ? "rotate-icon" : "arrow-icon"}>
                    <ArrowDownOutlined />
                </div>
            </div>
        </div>
        {isOpened && 
           <div className="columnWithNoGap">
                {memberShips.map((item, index) => {
                    return <div key={index} className="rowGap16 p-2 cursor-pointer" onClick={()=>selectMembership(gymId, item.id)}>
                        <RadioButton radioOn={selectMembershipId === item.id && selectedMembershipGymId === gymId} />
                        <MembershipCard listWidth='85%' showButtons ={false} showProgress={false}  />
                    </div>
                })}
           </div>
        }
    </div>
}

function RadioButton({
    radioOn = false,

}) {
    return <div style={{ borderColor: radioOn ? "rgba(94, 220, 145, 1)" : "transparent"}} className="indicatorShape">
        <div style={{ backgroundColor: radioOn ? "rgba(94, 220, 145, 1)" : "transparent" }} className="indicatorMain"></div>
    </div>
}

// svg
function LocationSvgWithBack(){
    return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="6" fill="#EFFFF5"/>
    <circle cx="14" cy="13.25" r="1.5" stroke="#3AB96D"/>
    <path d="M13.9996 21.5001L18.1246 17.3751C20.4028 15.097 20.4028 11.4033 18.1246 9.12513C15.8465 6.84696 12.1528 6.84696 9.87464 9.12513C7.59647 11.4033 7.59647 15.097 9.87465 17.3751L13.9996 21.5001Z" stroke="#3AB96D" stroke-linejoin="round"/>
    </svg>
    
}