import React from "react";
import "../sidebar/sidebar.css";
import statsLogo from "../../assets/svg/statictics.svg";
import locationIcon from "../../assets/svg/location.svg";
import calendarLogo from "../../assets/svg/calendar.svg";
import settingsLogo from "../../assets/svg/settings.svg";
import questionLogo from "../../assets/svg/question.svg";
import sidebarOpenedLogo from "../../assets/svg/sidebar_opened.svg";
import sidebarClosedLogo from "../../assets/svg/sidebar_closed.svg";
import MenuCompany from "../menu_company/menu_company";
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Sidebar = () => {
  const [isSidebarOpened, openCloseSearchBar] = useState(true);
  const [isMenuCompanyShown, showMenuCompany] = useState(false);
  const [isTextShown, showText] = useState(false);
  const sidebarHeaderRef = useRef();
  const sideBarRef = useRef();

  const handleClick = () => {
    if (isSidebarOpened) {
      openCloseSearchBar(false);
      showText(false);
    } else {
      openCloseSearchBar(true);
    }
  };
  const handleClickMenuCompany = () => {
    if (!isMenuCompanyShown) {
      showMenuCompany(true);
    }
  };

  useEffect(() => {
    if (isSidebarOpened) {
      setTimeout(() => {
        if (!isTextShown) {
          showText(true);
        }
      }, 200);
    }
  }, [isSidebarOpened]);

  // This function will be passed to MenuCompany to close it
  const closeMenuCompany = () => showMenuCompany(false);
  const sidebarWidth = isSidebarOpened ? "sidebar_opened" : "sidebar_closed";

  return isSidebarOpened ? (
    console.log(`sidebarref ${sideBarRef.current}`),
    <div
      ref={sideBarRef}
      className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}
    >
      {/* Название ИП */}
      <button
        ref={sidebarHeaderRef}
        className="sidebar_header"
        style={{ backgroundColor: isMenuCompanyShown ? "#F5F9FF" : "white" }}
        onClick={handleClickMenuCompany}
      >
        <div className="p-[5px] rounded-[6px] ">
          <img src={locationIcon} alt="" />
        </div>

        {isTextShown && (
          <div className="text-[14px] font-normal">ИП Пасечник</div>
        )}
      </button>
      {isMenuCompanyShown && (
        <MenuCompany
          sidebarHeaderRef={sidebarHeaderRef}
          onClose={closeMenuCompany}
        />
      )}

      <div className="mt-[18px] px-[16px] opacity-50">
        {!isMenuCompanyShown && <hr />}
      </div>
      <div className="flex flex-col justify-between flex-grow">
        {/* Первые три элемена */}
        <div className="flex flex-col">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section active_sidebar_section"
                : "sidebar_section"
            }
          >
            <div className="  bg-bg-color p-[5px] rounded-[6px] ">
              <img src={statsLogo} alt="" />
            </div>
            {isTextShown && <div>Статистика</div>}
          </NavLink>

          <NavLink
            to="/myGymsPage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section active_sidebar_section"
                : "sidebar_section"
            }
          >
            <div className="bg-bg-color p-[5px] rounded-[6px] ">
              <img src={locationIcon} alt="" />
            </div>
            {isTextShown && <div>Мои заведения</div>}
          </NavLink>

          <NavLink
            to="/schedulePage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section active_sidebar_section"
                : "sidebar_section"
            }
          >
            <div className="bg-bg-color p-[5px] rounded-[6px] ">
              <img src={calendarLogo} alt="" />
            </div>
            {isTextShown && <div>Расписание</div>}
          </NavLink>
        </div>

        {/* Две нижние блоки */}

        <div className="flex flex-col">
          <div className="flex flex-row relative mb-[37px] px-[16px]">
            <hr className="w-full opacity-50" />
            <div className="absolute right-[-20px] top-[-15px] transition-width duration-300 ease-in-out">
              <button onClick={handleClick}>
                <img src={sidebarOpenedLogo} alt="" />
              </button>
            </div>
          </div>

          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section active_sidebar_section"
                : "sidebar_section"
            }
          >
            <div className="bg-bg-color p-[5px] rounded-[6px] ">
              <img src={questionLogo} alt="" />
            </div>
            {isTextShown && <div>Помощь</div>}
          </NavLink>

          <NavLink
            to="/settingsPage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section active_sidebar_section"
                : "sidebar_section"
            }
          >
            <div className="bg-bg-color p-[5px] rounded-[6px] ">
              <img src={settingsLogo} alt="" />
            </div>
            {isTextShown && <div>Настройки</div>}
          </NavLink>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}
    >
      {/* Название ИП */}
      <button
        onClick={handleClickMenuCompany}
        ref={sidebarHeaderRef}
        style={{ backgroundColor: isMenuCompanyShown ? "#F5F9FF" : "white" }}
        className="sidebar_header"
      >
        <div className="p-[5px] rounded-[6px] ">
          <img src={locationIcon} alt="" />
        </div>
      </button>
      {isMenuCompanyShown && (
        <MenuCompany
          sidebarHeaderRef={sidebarHeaderRef}
          onClose={closeMenuCompany}
        />
      )}

      <div className="mt-[18px] px-[16px] opacity-50">
        {!isMenuCompanyShown && <hr />}
      </div>

      <div className="flex flex-col justify-between flex-grow">
        {/* Первые три элемена */}
        <div className="flex flex-col">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <div className="  bg-bg-color p-[5px] rounded-[6px] ">
              <img src={statsLogo} alt="" />
            </div>
          </NavLink>

          <NavLink
            to="/myGymsPage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <div className="bg-bg-color p-[5px] rounded-[6px] ">
              <img src={locationIcon} alt="" />
            </div>
          </NavLink>

          <NavLink
            to="/schedulePage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <div className="bg-bg-color p-[5px] rounded-[6px] ">
              <img src={calendarLogo} alt="" />
            </div>
          </NavLink>
        </div>

        {/* Две нижние блоки */}

        <div className="flex flex-col">
          <div className="flex flex-row relative mb-[37px] px-[16px]">
            <hr className="w-full opacity-50" />
            <div className="absolute right-[-20px] top-[-15px] transition-width duration-300 ease-in-out">
              <button onClick={handleClick}>
                <img src={sidebarClosedLogo} alt="" />
              </button>
            </div>
          </div>

          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <div className="bg-bg-color p-[5px] rounded-[6px] ">
              <img src={questionLogo} alt="" />
            </div>
          </NavLink>

          <NavLink
            to="/settingsPage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <div className="bg-bg-color p-[5px] rounded-[6px] ">
              <img src={settingsLogo} alt="" />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
