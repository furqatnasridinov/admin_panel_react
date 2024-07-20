import React, {useEffect} from 'react'
import SubscribtionBodyCrm from './SubscribtionBodyCrm'
import { useDispatch } from 'react-redux'
import { getListOfActivities } from '../../../features/activities_slice'
import { getListOfGyms } from '../../../features/current_gym_slice'

export default function SubscribtionPageCrm() {
  const dispatch = useDispatch()

  useEffect(() => {
    // get list of activities and gyms to show in the dropdowns
    dispatch(getListOfGyms());
  }, [])


  return (
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      <SubscribtionBodyCrm />
    </div>
  )
}
