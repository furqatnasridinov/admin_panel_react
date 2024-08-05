import React, {useEffect} from 'react'
import CreateSubscriptionBodyCrm from './CreateSubscriptionBodyCrm'
import { useDispatch } from 'react-redux'
import { getListOfGyms } from '../../../features/current_gym_slice'

export default function CreateSubscriptionPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    // get list of activities and gyms to show in the dropdowns
    dispatch(getListOfGyms());
  }, [])


  return (
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <CreateSubscriptionBodyCrm />
    </div>
  )
}
