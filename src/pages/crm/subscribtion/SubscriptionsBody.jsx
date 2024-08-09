import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import AccordionGyms from '../client_card/AccordionGyms';

export default function SubscriptionsBody() {
    const list = useSelector((state) => state.crmClients.gymAndMembershipsInside);
    const [openedGymId, setOpenedGymId] = useState(0);


    function toggle(gymId) {
        gymId === openedGymId ? setOpenedGymId(0) : setOpenedGymId(gymId);
    }


  return (
    <div className='flex flex-col flex-1 gap-4 p-[32px] bg-white rounded-2xl h-[97vh] overflow-y-auto'>
        {list && list.length > 0 &&
            [...list]
            .sort((a, b) => a.gym?.name?.localeCompare(b.gym?.name))
            .map((item) => {
                return <AccordionGyms 
                    key={item?.gym?.id}
                    isOpened={openedGymId === item.gym?.id} 
                    toggle={()=>toggle(item.gym?.id)}
                    gymName={item.gym?.name}
                    gymId={item.gym?.id}
                    viewOnly={true}
                    showRadio={false}
                    showButtons={true}
                    hideAddButton={true}
                    memberShipCardSliceIndex={10}
                    memberShips={item?.memberships}/>
            })
        }
    </div>
  )
}
