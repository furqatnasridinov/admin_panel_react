import React from 'react'
import SubscribtionHeaderCrm from './SubscribtionHeaderCrm'
import SubscribtionBodyCrm from './SubscribtionBodyCrm'

export default function SubscribtionPageCrm() {
  return (
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <SubscribtionBodyCrm />
    </div>
  )
}
