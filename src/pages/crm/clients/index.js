import React from 'react'
import CrmClientsHeader from './CrmClientsHeader'
import CrmClientsBody from './CrmClientsBody'
import { useDispatch } from 'react-redux'
import { getClients } from '../../../features/CrmClients'
import { useEffect } from 'react'

export default function CrmClients() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, []);

  return ( 
  <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
    <CrmClientsHeader />
    <CrmClientsBody />
  </div>
  )
}
