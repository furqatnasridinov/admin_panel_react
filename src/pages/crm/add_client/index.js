import React from 'react'
import AddClientHeader from './AddClientHeader'
import PersonalDatas from './PersonalDatas'
import PassportDatas from './PassportDatas'

export default function AddClientCrm() {
  return (
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <AddClientHeader />
      <PersonalDatas />
      <PassportDatas />
    </div>
  )
}
