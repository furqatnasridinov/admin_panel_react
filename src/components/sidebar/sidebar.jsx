import React from "react";
import "../sidebar/sidebar.css";
import statsLogo from "../../assets/svg/statictics.svg";
import locationIcon from "../../assets/svg/location.svg";
import calendarLogo from "../../assets/svg/calendar.svg";
import settingsLogo from "../../assets/svg/settings.svg";
import questionLogo from "../../assets/svg/question.svg";
import sidebarOpenedLogo from "../../assets/svg/sidebar_opened.svg";
import sidebarClosedLogo from "../../assets/svg/sidebar_closed.svg";
import userLogoSvg from "../../assets/svg/contacts.svg";
import MenuCompany from "../menu_company/menu_company";
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isSidebarOpened, openCloseSearchBar] = useState(true);
  const [isMenuCompanyShown, showMenuCompany] = useState(false);
  const [isTextShown, showText] = useState(false);
  const [isButtonDisabled, disableButton] = useState(false);
  const sidebarHeaderRef = useRef();
  const sideBarRef = useRef();
  const gymsState = useSelector((state) => state.currentGym);

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

  const handleResize = () => {
    if (isSidebarOpened) {
      console.log("handleResize called");
      if (sideBarRef.current && sideBarRef.current.offsetWidth < 225) {
        openCloseSearchBar(false);
        showText(false);
      }
    }
    /* if (window.innerWidth < 800 && !isButtonDisabled) {
      disableButton(true);
    }  
    if (window.innerWidth > 800 && isButtonDisabled) {
      disableButton(false);
    } */
  };

  useEffect(() => {
    // Добавляем обработчик события при монтировании
    window.addEventListener("resize", handleResize);

    // Удаляем обработчик события при размонтировании
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    (console.log(`sidebarref ${sideBarRef.current}`),
    (
      <div
        ref={sideBarRef}
        className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}
      >
        {/* Название ИП */}
        <button
          ref={sidebarHeaderRef}
          className="sidebar_header"
          style={{ backgroundColor: isMenuCompanyShown ? "#F5F9FF" : "white" }}
          onClick={
            gymsState.currentGym !== null ? handleClickMenuCompany : null
          }
        >
          <img src={locationIcon} alt="" />

          {isTextShown && (
            <div className="text-[14px] font-normal  line-clamp-2 text-ellipsis">
              {gymsState.currentGym === null
                ? "Ваше заведение"
                : gymsState.currentGym.name}{" "}
            </div>
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
          {/* Первые четыре элемена */}
          <div className="flex flex-col">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "sidebar_section active_sidebar_section"
                  : "sidebar_section"
              }
            >
              <img src={userLogoSvg} alt="" />

              {isTextShown && <div>Клиенты</div>}

              {isTextShown && <div className="badge">5</div>}
            </NavLink>

            <NavLink
              to="/statisticksPage"
              className={({ isActive }) =>
                isActive
                  ? "sidebar_section active_sidebar_section"
                  : "sidebar_section"
              }
            >
              <img src={statsLogo} alt="" />

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
              <img src={locationIcon} alt="" />

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
              <img src={calendarLogo} alt="" />

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
              <img src={questionLogo} alt="" />

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
              <img src={settingsLogo} alt="" />

              {isTextShown && <div>Настройки</div>}
            </NavLink>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div
      className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}
    >
      {/* Название ИП */}
      <button
        onClick={gymsState.currentGym !== null ? handleClickMenuCompany : null}
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
        {/* Первые четыре элемена */}
        <div className="flex flex-col">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <img src={userLogoSvg} alt="" />
            <div className="badge">5</div>
          </NavLink>

          <NavLink
            to="/statisticksPage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <img src={statsLogo} alt="" />
          </NavLink>

          <NavLink
            to="/myGymsPage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <img src={locationIcon} alt="" />
          </NavLink>

          <NavLink
            to="/schedulePage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <img src={calendarLogo} alt="" />
          </NavLink>
        </div>

        {/* Две нижние блоки */}

        <div className="flex flex-col">
          <div className="flex flex-row relative mb-[37px] px-[16px]">
            <hr className="w-full opacity-50" />
            <div className="absolute right-[-20px] top-[-15px] transition-width duration-300 ease-in-out">
              <button
                onClick={isButtonDisabled ? () => {} : handleClick}
                style={{ cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
              >
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
            <img src={questionLogo} alt="" />
          </NavLink>

          <NavLink
            to="/settingsPage"
            className={({ isActive }) =>
              isActive
                ? "sidebar_section_closed active_sidebar_section"
                : "sidebar_section_closed"
            }
          >
            <img src={settingsLogo} alt="" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
