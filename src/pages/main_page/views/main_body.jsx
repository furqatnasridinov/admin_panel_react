import React from 'react'
import locationIcon from "../../../assets/svg/location.svg"
import threeDotsIcon from "../../../assets/svg/three_dots.svg"

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

            <div className="h-[60px] w-[screen] bg-bg-color rounded-[16px] py-[16px] px-[32px] flex flex-row items-center justify-between">

                <div className="flex flex-row items-center pr-[164px] justify-between w-full">

                    <div className=" flex flex-row items-center">

                        <div className="p-[5px] rounded-[6px] ">
                            <img src={locationIcon} alt="" />
                        </div>
                        <div className="text-[14px] font-normal">И-Талия</div>

                    </div>

                    <div className="text-[14px] font-normal pl-[30px]">378</div>
                    <div className="text-[14px] font-normal pl-[40px]">62</div>
                    <div className="text-[14px] font-normal ">14</div>
                </div>

                <div className="w-[24px] h-[24px]">
                    <img src={threeDotsIcon} alt="" />
                </div>

            </div>

            <div className="mt-[16px]"></div>

            <div className="h-[60px] w-[screen] bg-bg-color rounded-[16px] py-[16px] px-[32px] flex flex-row items-center justify-between">

                <div className="flex flex-row items-center pr-[164px] justify-between w-full">

                    <div className=" flex flex-row items-center">

                        <div className="p-[5px] rounded-[6px] ">
                            <img src={locationIcon} alt="" />
                        </div>
                        <div className="text-[14px] font-normal">GymBo</div>

                    </div>

                    <div className="text-[14px] font-normal pl-[30px]">212</div>
                    <div className="text-[14px] font-normal pl-[40px]">32</div>
                    <div className="text-[14px] font-normal ">7</div>
                </div>

                <div className="w-[24px] h-[24px]">
                    <img src={threeDotsIcon} alt="" />
                </div>

            </div>

        </div>
    )
}

export default MainBody