import React, {useEffect} from 'react'
import SubscriptionPageHeader from './SubscriptionsPageHeader'
import SubscriptionsBody from './SubscriptionsBody'
import { useDispatch } from 'react-redux'
import { getMemberShips } from '../../../features/crm/CrmClients'

export default function SubscriptionsPageCrm() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMemberShips())
  }, [])

  return (
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <SubscriptionPageHeader />
      <SubscriptionsBody />
    </div>
  )
}
