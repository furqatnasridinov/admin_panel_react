import React from 'react'
import locationIcon from "../../../assets/svg/location.svg"
import threeDotsIcon from "../../../assets/svg/three_dots.svg"

function Gym(props) {
    return (
        <div className="h-[60px] w-[screen] bg-bg-color rounded-[16px] py-[16px] px-[32px] flex flex-row items-center justify-between">

            <div className="flex flex-row items-center pr-[164px] justify-between w-full">

                <div className=" flex flex-row items-center">

                    <div className="p-[5px] rounded-[6px] ">
                        <img src={locationIcon} alt="" />
                    </div>
                    <div className="text-[14px] font-normal">{props.gymName}</div>

                </div>

                <div className="text-[14px] font-normal pl-[30px]">{props.activitiesForMonth}</div>
                <div className="text-[14px] font-normal pl-[40px]">{props.activitiesForWeek}</div>
                <div className="text-[14px] font-normal ">{props.activitiesForDay}</div>
            </div>

            <div className="w-[24px] h-[24px]">
                <img src={threeDotsIcon} alt="" />
            </div>
            

        </div>
    )
}

export default Gym