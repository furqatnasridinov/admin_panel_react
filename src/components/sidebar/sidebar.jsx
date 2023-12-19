import React from 'react'
import "../sidebar/sidebar.css"
import statsLogo from "../../assets/svg/statictics.svg"
import locationIcon from "../../assets/svg/location.svg"
import calendarLogo from "../../assets/svg/calendar.svg"
import settingsLogo from "../../assets/svg/settings.svg"
import questionLogo from "../../assets/svg/question.svg"
import sidebarOpenedLogo from "../../assets/svg/sidebar_opened.svg"
import sidebarClosedLogo from "../../assets/svg/sidebar_closed.svg"
import { useState } from 'react'

const Sidebar = () => {
    const [isSidebarOpened, openCloseSearchBar] = useState(true);
    const handleClick = () => {
        if (isSidebarOpened) {
            openCloseSearchBar(false)
        } else {
            openCloseSearchBar(true)
        }
    }

    const sidebarWidth = isSidebarOpened ? "sidebar_opened" : "sidebar_closed";

    return (
        isSidebarOpened ?
            (
                <div className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}>

                    {/* Название ИП */}
                    <button onClick={handleClick} className="mt-[16px]  py-[10px] px-[16px] flex flex-row gap-[10px] items-center mx-[16px]">

                        <div className="p-[5px] rounded-[6px] ">
                            <img src={locationIcon} alt="" />
                        </div>

                        <div className="text-[14px] font-normal">ИП Пасечник</div>
                    </button>

                    <div className="mt-[18px] px-[16px] opacity-50">
                        <hr />
                    </div>


                    <div className="flex flex-col justify-between flex-grow">
                        {/* Первые три элемена */}
                        <div className="flex flex-col">

                            <div className="sidebar_section">

                                <div className="  bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={statsLogo} alt="" />
                                </div>
                                <div className="text-[14px] font-normal">Статистика</div>

                            </div>

                            <div className="sidebar_section">

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={locationIcon} alt="" />
                                </div>
                                <div className="text-[14px] font-normal">Мои заведения</div>

                            </div>

                            <div className="sidebar_section">

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={calendarLogo} alt="" />
                                </div>
                                <div className="text-[14px] font-normal">Расписание</div>

                            </div>
                        </div>

                        {/* Две нижние блоки */}

                        <div className="flex flex-col">

                            <div className=" mb-[37px] px-[16px] opacity-50">
                                <hr />
                            </div>

                            <div className="sidebar_section">

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={questionLogo} alt="" />
                                </div>
                                <div className="text-[14px] font-normal">Помощь</div>

                            </div>

                            <div className="sidebar_section">

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={settingsLogo} alt="" />
                                </div>
                                <div className="text-[14px] font-normal">Настройки</div>

                            </div>

                        </div>

                    </div>


                </div>
            )
            :
            (
                <div className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}>

                    {/* Название ИП */}
                    <button onClick={handleClick} className="mt-[16px]  py-[10px] px-[16px] flex flex-row gap-[10px] items-center mx-[16px]">

                        <div className="p-[5px] rounded-[6px] ">
                            <img src={locationIcon} alt="" />
                        </div>


                    </button>

                    <div className="mt-[18px] px-[16px] opacity-50">
                        <hr />
                    </div>


                    <div className="flex flex-col justify-between flex-grow">
                        {/* Первые три элемена */}
                        <div className="flex flex-col">

                            <div className="sidebar_section_closed">

                                <div className="  bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={statsLogo} alt="" />
                                </div>


                            </div>

                            <div className="sidebar_section_closed">

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={locationIcon} alt="" />
                                </div>


                            </div>

                            <div className="sidebar_section_closed">

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={calendarLogo} alt="" />
                                </div>


                            </div>
                        </div>

                        {/* Две нижние блоки */}

                        <div className="flex flex-col">
                            <div className=" mb-[37px] px-[16px] opacity-50">
                                <hr />
                            </div>

                            <div className="sidebar_section_closed">

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={questionLogo} alt="" />
                                </div>


                            </div>

                            <div className="sidebar_section_closed">

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={settingsLogo} alt="" />
                                </div>


                            </div>

                        </div>

                    </div>


                </div>
            )
    )
}

export default Sidebar