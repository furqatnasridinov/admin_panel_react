import React from 'react'
import "../sidebar/sidebar.css"
import statsLogo from "../../assets/svg/statictics.svg"
import locationIcon from "../../assets/svg/location.svg"
import calendarLogo from "../../assets/svg/calendar.svg"
import settingsLogo from "../../assets/svg/settings.svg"
import questionLogo from "../../assets/svg/question.svg"
import sidebarOpenedLogo from "../../assets/svg/sidebar_opened.svg"
import sidebarClosedLogo from "../../assets/svg/sidebar_closed.svg"
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
                    <button className="sidebar_header">

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

                            <NavLink to = "/" className={({ isActive }) => isActive ? "sidebar_section active_sidebar_section" : "sidebar_section"}
>

                                <div className="  bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={statsLogo} alt="" />
                                </div>
                                <div>Статистика</div>

                            </NavLink>

                            <NavLink to= "/mainPage" className={({ isActive }) => isActive ? "sidebar_section active_sidebar_section" : "sidebar_section"}>

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={locationIcon} alt="" />
                                </div>
                                <div>Мои заведения</div>

                            </NavLink>

                            <NavLink to= "/schedulePage" className={({ isActive }) => isActive ? "sidebar_section active_sidebar_section" : "sidebar_section"}>

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={calendarLogo} alt="" />
                                </div>
                                <div>Расписание</div>

                            </NavLink>
                        </div>

                        {/* Две нижние блоки */}

                        <div className="flex flex-col">

                            <div className=" mb-[37px] px-[16px] opacity-50">
                                <hr />
                            </div>

                            <div className="absolute left-56 bottom-[170px] transition-width duration-300 ease-in-out">
                                <button onClick={handleClick}> <img src={sidebarOpenedLogo} alt="" /></button>
                            </div>

                            <NavLink to= "/help" className={({ isActive }) => isActive ? "sidebar_section active_sidebar_section" : "sidebar_section"}>

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={questionLogo} alt="" />
                                </div>
                                <div >Помощь</div>

                            </NavLink>

                            <NavLink to= '/settingsPage' className={({ isActive }) => isActive ? "sidebar_section active_sidebar_section" : "sidebar_section"}>

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={settingsLogo} alt="" />
                                </div>
                                <div>Настройки</div>

                            </NavLink>

                        </div>

                    </div>


                </div>
            )
            :
            (
                <div className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}>

                    {/* Название ИП */}
                    <button className="sidebar_header">

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

                            <NavLink to = "/" className={({ isActive }) => isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"}>

                                <div className="  bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={statsLogo} alt="" />
                                </div>


                            </NavLink>

                            <NavLink to = "/mainPage" className={({ isActive }) => isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"}>

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={locationIcon} alt="" />
                                </div>


                            </NavLink>

                            <NavLink to = "/schedulePage" className={({ isActive }) => isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"}>

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={calendarLogo} alt="" />
                                </div>


                            </NavLink>
                        </div>

                        {/* Две нижние блоки */}

                        <div className="flex flex-col">

                            <div className=" mb-[37px] px-[16px] opacity-50">
                                <hr />
                            </div>

                            <div  className="absolute left-[90px] bottom-[165px] transition-width duration-300 ease-in-out">
                                <button onClick={handleClick}> <img src={sidebarClosedLogo} alt="" /></button>
                            </div>

                            <NavLink to = "/help" className={({ isActive }) => isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"}>

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={questionLogo} alt="" />
                                </div>


                            </NavLink>

                            <NavLink to = "/settingsPage" className={({ isActive }) => isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"}>

                                <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                    <img src={settingsLogo} alt="" />
                                </div>

                            </NavLink>

                        </div>

                    </div>


                </div>
            )
    )
}

export default Sidebar