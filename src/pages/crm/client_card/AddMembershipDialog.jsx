import React from 'react'
import "./index.css"
import { ArrowDownOutlined } from '../subscribtion/Accordion'
import { useState } from 'react'
import CrmWhiteButton from '../../../components/crm/white_button/CrmWhiteButton';
import GreenButton from '../../../components/crm/GreenButton';
import { MembershipCard } from './Memberships';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getClientById } from '../../../features/crm/CrmClients';
import axiosClient from '../../../config/axios_client';

export default function AddMembershipDialog({
    closeDialog,
    clientId,
}) {
    const list = useSelector((state) => state.crmClients.gymAndMembershipsInside);
    const dispatch = useDispatch();
    const [selectedMembership, setSelectedMembership] = useState({
        // {id : membershipId, gymId : gymId}
    });
    const [openedGymId, setOpenedGymId] = useState(0);

    
    function toggle(gymId){
       gymId === openedGymId ? setOpenedGymId(0) : setOpenedGymId(gymId);
    }

    function addMemberShipRequest() {
        if (selectedMembership.id) {
            axiosClient.post(`api/crm/client/${clientId}/${selectedMembership.id}`)
            .catch((error) => {
                toast.error('Ошибка при добавлении абонемента' + error)
            })
            .then((response) => {
                if (response.status === 200) {
                    closeDialog();
                    dispatch(getClientById(clientId));
                    toast.success('Абонемент успешно добавлен');
                }
            });
        }else{
            toast.error('Выберите абонемент')
        }
    }

    return (
        console.log(`selectedMembership`, JSON.stringify(selectedMembership)),
        <div className="dialogBody">
            <div className="columnWithNoGap">
                <span className='headerH2'>Абонементы</span>
                <span className='label2'>Выберите из существующих абонементов тот, который был оплачен клиентом</span>
            </div>

            {list.map((item) => {
                return <AccordionGyms 
                    key={item?.gym?.id}
                    isOpened={openedGymId === item.gym?.id} 
                    radioOn={selectedMembership.gymId === item.gym?.id && openedGymId !== item.gym?.id} 
                    toggle={()=>toggle(item.gym?.id)}
                    gymName={item.gym?.name}
                    gymId={item.gym?.id}
                    selectedMembershipId={selectedMembership.id}  
                    selectedMembershipGymId={selectedMembership.gymId}
                    selectMembership={(gymId, membershipId)=>setSelectedMembership({id : membershipId, gymId : gymId})}
                    memberShips={item?.memberships}/>
            })}

            <div className="rowGap10">
                <CrmWhiteButton text='Отменить' onClick={closeDialog} width='120px' />
                <GreenButton 
                    text='Добавить выбранный абонемент клиенту' 
                    width='340px' 
                    padLeft='24px' 
                    padRight='24px' 
                    onClick={()=>addMemberShipRequest()}
                    />
            </div>
        </div>
    )
}

// component

function AccordionGyms({
    isOpened,
    radioOn = false,
    toggle,
    gymName = "Crystall",
    gymId = 1,
    memberShips = [],
    selectMembership,
    selectedMembershipId,
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
                        <RadioButton radioOn={selectedMembershipId === item.id && selectedMembershipGymId === gymId} />
                        <MembershipCard 
                            listWidth='85%' 
                            showButtons ={false} 
                            showProgress={false}
                            description={item.description || "Описание отсутствует"}
                            gyms={item.gyms.map(gym => gym.name)}
                            name={item.name}
                            price={item.price}
                            subcategories={item.lessonSubTypes.map(subType => subType.name) ?? null}
                            lessonTypes={item.lessonTypes || []}
                            oldPrice={item.oldPrice || null}
                            sliceIndex={7}
                        />
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