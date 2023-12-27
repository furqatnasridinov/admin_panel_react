import React from 'react'
import Gym from '../components/gym'


const MainBody = () => {
    return (
        <div className="px-[30px] pt-[34px] text-blue-400 bg-white h-full rounded-[16px] flex flex-col">


            {/* Top section */}

            <div className="flex flex-row pr-[203px] justify-between">

                <div className="text-[14px] font-medium">Название заведения</div>
                <div className="text-[14px] font-medium">Записей за месяц</div>
                <div className="text-[14px] font-medium">За неделю</div>
                <div className="text-[14px] font-medium">За день</div>

            </div>

            <div className="mt-[47px]"></div>

            {/* LIST BUILDER */}

            <Gym gymName = "И-Талия" activitiesForMonth= "378" activitiesForWeek = "62" activitiesForDay = "14" ></Gym>
            <div className="mt-[16px]"></div>
            <Gym gymName = "GymBo" activitiesForMonth= "212" activitiesForWeek = "32" activitiesForDay = "7" ></Gym>
           

            

            

        </div>
    )
}

export default MainBody