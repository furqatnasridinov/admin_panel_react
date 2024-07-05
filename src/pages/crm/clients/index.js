import React from 'react'
import CrmClientsHeader from './CrmClientsHeader'
import CrmClientsBody from './CrmClientsBody'

export default function CrmClients() {
  return ( 
  <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
    <CrmClientsHeader />
    <CrmClientsBody />
  </div>
  )
}
