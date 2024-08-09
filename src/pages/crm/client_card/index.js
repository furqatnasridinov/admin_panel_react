import React, { useEffect } from 'react'
import ClientCardHeader from './ClientCardHeader'
import PersonalDatas from './PersonalDatas'
import PassportDatas from './PassportDatas'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClientById, getMemberShips, resetUserInfos} from '../../../features/crm/CrmClients'
import { useParams } from "react-router-dom";
import Memberships from './Memberships'

export default function ClientCard() {
  let { clientIdParam } = useParams(); // This hooks allows you to extract params from the URL
  const blockRef = useRef(null);
  const dispatch = useDispatch();
  const clientIdFromState = useSelector((state) => state.crmClients.currentClientId);
  const clientId = clientIdParam ||clientIdFromState;

  function handleScrollBottom() {
    // with animation
   blockRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (clientId && clientId !== 'new') {
      // fetch client data by id
      dispatch(getClientById(clientId));
      // get all memberships to show in the dialog
      dispatch(getMemberShips());
    }
    if (clientId === 'new') {
      dispatch(resetUserInfos());
      dispatch(getMemberShips());
    }
  }, []);



  return (
    <div ref={blockRef} className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <ClientCardHeader />
      <PersonalDatas id={clientId} isCreating = {clientId === "new"} />
      {clientId === 'new' ? null : <Memberships id={clientId} />}
      {clientId === 'new' ? null : <PassportDatas id={clientId} isCreating = {clientId === "new"} />}
    </div>
  )
}
