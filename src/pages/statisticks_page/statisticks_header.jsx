import React from 'react'
import './styles.css'
import { useState } from 'react'
import CustomDropdown from '../../components/dropdown/custom_dropdown'

export default function StatisticksHeader({
    gym,
    listOfGyms,
    showDropDown,
    selectAnotherGym,
}) {
    // use states
    const [isDropDownOpened, openDropDown] = useState(false);

    // functions
    function setCurrentGymAndPop(gym) {
        selectAnotherGym(gym);
        openDropDown(false);
    }

  return (
    <div className='statistickHeader'>
        <div className="text-[14px] font-normal">Статистика</div>

        <div className="slash"> / </div>
        {showDropDown && (
          <CustomDropdown
            zIndex={1000}
            text={gym?.name}
            isDropDownOpened={isDropDownOpened}
            openCloseDropDown={()=>openDropDown(!isDropDownOpened)}
            map={listOfGyms.map((item, index) => (
              <button
                key={index}
                className="gym_names"
                onClick={() => setCurrentGymAndPop(item)}
              >
                {item?.name}
              </button>
            ))}
          />
        )}
        {!showDropDown && (
          <div className="text-[14px font-normal]">{gym?.name}</div>
        )}
    </div>
  )
}
