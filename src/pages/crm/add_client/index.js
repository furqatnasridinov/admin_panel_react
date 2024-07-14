import React from 'react'
import AddClientHeader from './AddClientHeader'
import PersonalDatas from './PersonalDatas'
import PassportDatas from './PassportDatas'
import { useRef } from 'react'

export default function AddClientCrm() {
  const blockRef = useRef(null)

  function handleScrollBottom() {
    // with animation
   blockRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div ref={blockRef} className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <AddClientHeader />
      <PersonalDatas />
      <PassportDatas />
    </div>
  )
}
