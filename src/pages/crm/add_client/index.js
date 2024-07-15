import React, { useEffect } from 'react'
import AddClientHeader from './AddClientHeader'
import PersonalDatas from './PersonalDatas'
import PassportDatas from './PassportDatas'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClientById } from '../../../features/crm/CrmClients'

export default function AddClientCrm() {
  const blockRef = useRef(null);
  const dispatch = useDispatch();
  const currentClientId = useSelector((state) => state.crmClients.currentClientId);

  function handleScrollBottom() {
    // with animation
   blockRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (currentClientId) {
      // fetch client data by id
      dispatch(getClientById(currentClientId));
    }
  }, []);



  return (
    <div ref={blockRef} className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <AddClientHeader />
      <PersonalDatas />
      <PassportDatas />
    </div>
  )
}
