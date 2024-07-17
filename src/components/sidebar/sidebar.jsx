import React from "react";
import "../sidebar/sidebar.css";
import sidebarOpenedLogo from "../../assets/svg/sidebar_opened.svg";
import sidebarClosedLogo from "../../assets/svg/sidebar_closed.svg";
import MenuCompany from "../menu_company/menu_company";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavigationFromBooking } from "../../features/schedule_slice";
import { getListOfGyms, setCurrentGymFromFirstItem, setCurrentGym } from "../../features/current_gym_slice";
import { getNewClients } from "../../features/clients_slice";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CustomDialog from "../dialog/dialog";
import BackButton from "../../components/button/back_button";
import CustomButton from "../button/button";
import { getUser } from "../../features/register";
import placeHolderImg from "../../assets/images/placeholder.jpg"
import AppConstants from "../../config/app_constants";
import { setAppType } from "../../features/app";
import TabbarSection from "./tabbar_section";
import ClientsSvg from "./clients_svg";
import StatsSvg from "./stats_svg";
import LocationSvg from "./location_svg";
import CalendarSvg from "./calendar_svg";
import SettingsSvg from "./settings_svg";
import TabbarSectionClosed from "./TabbarClosed";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isSidebarOpened, openCloseSearchBar] = useState(true);
  const [isMenuCompanyShown, showMenuCompany] = useState(false);
  const [isClientsActive, setClientsActive] = useState(false);
  const [isTextShown, showText] = useState(false);
  const [isModalShown, showModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isButtonDisabled, disableButton] = useState(false);
  const sidebarHeaderRef = useRef();
  const sideBarRef = useRef();
  const gymsState = useSelector((state) => state.currentGym);
  const clientsSlice = useSelector((state) => state.clients);
  const scheduleState = useSelector((state) => state.schedule);
  const registerState = useSelector((state) => state.login);
  const appState = useSelector((state) => state.app);


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

  // get initial data`s
  useEffect(() => {
    // Добавляем обработчик события при монтировании
    window.addEventListener("resize", handleResize);
    
    dispatch(getListOfGyms());
    dispatch(getUser());
    const appStateFromSession = sessionStorage.getItem(AppConstants.keyAppState);
    if (appStateFromSession != appState.appType && appStateFromSession !== null) {
      dispatch(setAppType(appStateFromSession));
    }
    // Удаляем обработчик события при размонтировании
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("currentGym") == null) {
      if (gymsState.listOfGyms?.length > 0 && gymsState.currentGym === null) {
        dispatch(setCurrentGymFromFirstItem());
      }
    } else {
      if (gymsState.currentGym === null) {
        // устанавливаем текущий зал из sessionStorage
        dispatch(setCurrentGym(JSON.parse(sessionStorage.getItem("currentGym"))));
      }
      
    }
  }, [gymsState.listOfGyms]);

  useEffect(() => {
    if (gymsState.currentGym !== null) {
      const gymIdFromStorage = JSON.parse(sessionStorage.getItem("currentGym"))?.id;
      if (gymsState.currentGym.id !== gymIdFromStorage) {
        // сохраняем текущий зал в sessionStorage
        sessionStorage.setItem("currentGym", JSON.stringify(gymsState.currentGym));
      }
      if (localStorage.getItem(AppConstants.keyRoleId) !== "5"){
        dispatch(getNewClients(gymsState.currentGym?.id));
      }
    }
  }, [gymsState.currentGym]);

  useEffect(() => {
    if (isClientsActive && isMyfit && location.pathname !== "/clientsPageMyfit") {
      navigate("/clientsPageMyfit");
    }
    if (isClientsActive && !isMyfit && location.pathname !== "/clientsPageCrm") {
      navigate("/clientsPageCrm");
    }
  }, [isClientsActive]);

  useEffect(() => {
    const currentPath = location.pathname;
    const isMyfit = appState.appType === "MYFIT";
    const appStateFromSession = sessionStorage.getItem(AppConstants.keyAppState);
    if (isMyfit) {
      switch (currentPath) {
        case "/clientsPageCrm":
          navigate("/clientsPageMyfit")
          break;
        case "/todayEventsPageCrm":
          navigate("/todayEventsPageMyfit")
          break;
        case "/statisticksPageCrm":
          navigate("/statisticksPageMyfit")
          break;
        case "/myGymsPageCrm":
          navigate("/myGymsPageMyfit")
          break;
        case "/schedulePageCrm":
          navigate("/schedulePageMyfit")
          break;
        case "/settingsPageCrm":
          navigate("/settingsPageMyfit")
          break;
        default:
          break;
      }
    }else{
      switch (currentPath) {
        case "/clientsPageMyfit":
          navigate("/clientsPageCrm")
          break;
        case "/todayEventsPageMyfit":
          navigate("/todayEventsPageCrm")
          break;
        case "/statisticksPageMyfit":
          navigate("/statisticksPageCrm")
          break;
        case "/schedulePageMyfit":
          navigate("/schedulePageCrm")
          break;
        case "/settingsPageMyfit":
          navigate("/settingsPageCrm")
          break;
      }
      if (currentPath === "/myGymsPageMyfit" ||
        currentPath.includes("/myGymsPageMyfit/gymDetails/") ||
        currentPath === "/myGymsPageMyfit/createGym") {
        navigate("/myGymsPageCrm");
      }
    }
  }, [appState.appType])
  

  // This function will be passed to MenuCompany to close it
  const closeMenuCompany = () => showMenuCompany(false);
  const sidebarWidth = isSidebarOpened ? "sidebar_opened" : "sidebar_closed";
  const isMyfit = appState.appType === "MYFIT";
  const baseColor = isMyfit ? "rgba(119, 170, 249, 1)" : "rgba(94, 220, 145, 1)";
  const activeSideBar = isMyfit ? "active_sidebar_section_myfit" : "active_sidebar_section_crm";
  const avatar = registerState.avatar ? `${AppConstants.baseUrl}image/${registerState.avatar}` : placeHolderImg;
  const activeAdditionalBlock = isMyfit ? "active_additional_block_myfit" : "active_additional_block_crm";
  const sidebarSectionClasses = isMyfit ? "sidebar_section_myfit" : "sidebar_section_crm";
  const sidebarSectionClosedClasses = isMyfit ? "sidebar_section_closed_myfit" : "sidebar_section_closed_crm";
  const fadedColor = isMyfit ? "#F5F9FF" : "rgba(210, 252, 227, 0.5)";

  return isSidebarOpened ? (
    (
      (
        <div
          id="sidebar"
          ref={sideBarRef}
          className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}>
          {/* Название ИП */}
          <button
            ref={sidebarHeaderRef}
            className="sidebar_header"
            style={{ backgroundColor: isMenuCompanyShown ? fadedColor : "white" }}
            onClick={handleClickMenuCompany}>
              <div
                className="w-[24px] h-[24px] rounded-[50%] p-[2px] transition-all duration-300 ease-in-out"
                style={{ backgroundColor: baseColor }}
              >
                <img
                  className="w-full h-full rounded-[50%] object-cover"
                  src={`${avatar}`}
                  alt="avatar" />
              </div>
            
            {isTextShown && (
              <div className="text-[14px] font-normal  line-clamp-2 text-ellipsis">
              {registerState.user && (registerState.user?.firstName +(registerState.user?.lastName ? " " + registerState.user?.lastName : ""))}
            </div>
            )}
          </button>

          {isMenuCompanyShown && (
            <MenuCompany
              sidebarHeaderRef={sidebarHeaderRef}
              onClose={closeMenuCompany}
              navigateToGymDetails={() => {
                // проверяем не открыто ли уже этот роут
                if (location.pathname === `/myGymsPageMyfit/gymDetails/${gymsState.currentGym.id}`) {
                  toast("Вы находитесь на странице заведения, выберите что хотите изменить")
                  showMenuCompany(false);
                } else {
                  navigate(`/myGymsPageMyfit/gymDetails/${gymsState.currentGym.id}`);
                  showMenuCompany(false);
                }
              }}
              onLeave={() => { showModal(true) }}
            />
          )}

          {isModalShown &&
            <CustomDialog
              isOpened={isModalShown}
              closeOnTapOutside={() => showModal(false)} >
              <div className="modalContainer">
                <div className="text-[16px] font-semibold leading-[16px]">Вы уверены, что хотите выйти?</div>
                <div className="flex flex-row justify-between gap-2 mt-[20px]">
                  <BackButton
                    height={"40px"}
                    width={"fit-content"}
                    title={"Отменить"}
                    onСlick={() => {
                      showModal(false);
                      showMenuCompany(false);
                    }} />
                  <CustomButton height={"40px"}
                    width={"200px"}
                    title={"Подтвердить"}
                    onСlick={() => {
                      localStorage.clear();
                      navigate('/registerPage', { replace: true });
                    }} />
                </div>
              </div>
            </CustomDialog>
          }

          <div className="mt-[18px] px-[16px] opacity-50">
            {!isMenuCompanyShown && <hr />}
          </div>

          {/* tabbar like section */}
          <TabbarSection />

          <div className="flex flex-col justify-between flex-grow">
            {/* Первые четыре элемена */}
            <div className="flex flex-col">
              {localStorage.getItem(AppConstants.keyRoleId) !== "5" &&
                <>
                  <NavLink
                    id="sidebarOnclick"
                    className={isClientsActive ? `${sidebarSectionClasses} ${activeSideBar}` : `${sidebarSectionClasses}`}
                    onClick={()=>setClientsActive(true)}>
                    
                    <ClientsSvg />
                    {isTextShown && <span>Клиенты</span>}
                    {isTextShown && clientsSlice.waitingForAccept?.length > 0 && isMyfit &&  (
                      <div className="badge">
                        {clientsSlice.waitingForAccept?.length}
                      </div>
                    )}
                  </NavLink>

                  {isClientsActive && isTextShown && (
                    <div>
                      {/* Additional content to be shown when Клиенты is active */}
                      <NavLink
                        id="sidebarOnclick"
                        to= {isMyfit ? "/clientsPageMyfit" : "/clientsPageCrm"} 
                        className={({ isActive }) => isActive ? `${activeAdditionalBlock}` : "additional_block"}>
                        <li>
                          <span>{isMyfit ? "Бронирование" : "Наша база клиентов"}</span>
                        </li>
                        {clientsSlice.waitingForAccept?.length > 0 && isMyfit && (
                          <div className="badge">
                            {clientsSlice.waitingForAccept?.length}
                          </div>
                        )}
                      </NavLink>

                      <NavLink
                        id="sidebarOnclick"
                        to= {isMyfit ? "/todayEventsPageMyfit" : "/todayEventsPageCrm"}
                        className={({ isActive }) => isActive ? `${activeAdditionalBlock}` : "additional_block"}>
                        <li>
                          <span>Придут сегодня</span>
                        </li>
                      </NavLink>
                    </div>
                  )}

                  <NavLink
                    id="sidebarOnclick"
                    to={isMyfit ? "/statisticksPageMyfit" : "/statisticksPageCrm"}
                    className={({ isActive }) =>
                      isActive && !isClientsActive ? `${sidebarSectionClasses} ${activeSideBar}` :`${sidebarSectionClasses}`
                    }
                    onClick={() => {
                      if (isClientsActive) {
                        setClientsActive(false);
                      }
                    }}
                  >
                    <StatsSvg />
                    {isTextShown && <span>Статистика</span>}
                  </NavLink>
                  
                  <NavLink
                    id="sidebarOnclick"
                    to={isMyfit ? "/myGymsPageMyfit" : "/myGymsPageCrm"}
                    className={({ isActive }) =>
                      isActive && !isClientsActive ? `${sidebarSectionClasses} ${activeSideBar}` :`${sidebarSectionClasses}`
                    }
                    onClick={() => {
                      if (isClientsActive) {
                        setClientsActive(false);
                      }
                    }}
                  >
                    <LocationSvg />
                    {isTextShown && <span>Мои заведения</span>}
                  </NavLink>

                {!isMyfit &&
                  <NavLink
                    id="sidebarOnclick"
                    to={"/subscribtionPageCrm"}
                    className={({ isActive }) =>
                      isActive && !isClientsActive ? `${sidebarSectionClasses} ${activeSideBar}` : `${sidebarSectionClasses}`
                    }
                    onClick={() => {
                      if (isClientsActive) {
                        setClientsActive(false);
                      }
                    }}
                  >
                    <AbonementSvg />
                    {isTextShown && <span>Абонементы</span>}
                  </NavLink>
                }

                </>
              }

              <NavLink
                id="sidebarOnclick"
                to={isMyfit ? "/schedulePageMyfit" : "/schedulePageCrm"}
                className={({ isActive }) =>
                  isActive && !isClientsActive ? `${sidebarSectionClasses} ${activeSideBar}` :`${sidebarSectionClasses}`
                }
                onClick={() => {
                  if (isClientsActive) {
                    setClientsActive(false);
                  }
                  if (scheduleState.isNavigationFromBooking) {
                    dispatch(setNavigationFromBooking(false));
                  }
                }}
              >
                <CalendarSvg />

                {isTextShown && <span>Расписание</span>}
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
                id="sidebarOnclick"
                to={isMyfit ? "/settingsPageMyfit" : "/settingsPageCrm"}
                className={({ isActive }) =>
                  isActive && !isClientsActive ? `${sidebarSectionClasses} ${activeSideBar}` :`${sidebarSectionClasses}`
                }
                onClick={() => {
                  if (isClientsActive) {setClientsActive(false)}
                }}>
                <SettingsSvg />
                {isTextShown && <span>Настройки</span>}
              </NavLink>
            </div>
          </div>
        </div>
      ))
  ) : (
    <div
      className={`${sidebarWidth} h-[97vh] pb-[10px] bg-white rounded-[16px] flex flex-col`}>
      {/* Название ИП */}
      <button
        onClick={handleClickMenuCompany}
        ref={sidebarHeaderRef}
        style={{ backgroundColor: isMenuCompanyShown ? "#F5F9FF" : "white" }}
        className="sidebar_header"
      >
          <div
            className="w-[24px] h-[24px] rounded-[50%] p-[2px] transition-all duration-300 ease-in-out"
            style={{ backgroundColor: baseColor }}
          >
            <img
              className="w-full h-full rounded-[50%] object-cover"
              src={`${avatar}`}
              alt="avatar" />
          </div>

      </button>
      {isMenuCompanyShown && (
        <MenuCompany
          sidebarHeaderRef={sidebarHeaderRef}
          onClose={closeMenuCompany}
          onLeave={() => {
            showModal(true);
          }}
        />
      )}

      <div className="mt-[18px] px-[16px] opacity-50">
        {!isMenuCompanyShown && <hr />}
      </div>

      <TabbarSectionClosed />

      <div className="flex flex-col justify-between flex-grow">
        {/* Первые четыре элемена */}
        <div className="flex flex-col">
        {localStorage.getItem(AppConstants.keyRoleId) !== "5" &&
          <>
            <NavLink
              id="sidebarOnclick"
              onClick={()=>setClientsActive(true)}
              to={isMyfit ? "/clientsPageMyfit" : "/clientsPageCrm"}
              className={({ isActive }) =>
                isActive  ? `${sidebarSectionClosedClasses} ${activeSideBar}` : `${sidebarSectionClosedClasses} relative`}
            >
            <ClientsSvg />

            {clientsSlice.waitingForAccept?.length > 0 && (
              <div className="badge absolute top-[50&] right-[10%]">
                {clientsSlice.waitingForAccept?.length}
              </div>
            )}
            </NavLink>

            <NavLink
              id="sidebarOnclick"
              to={isMyfit ? "/statisticksPageMyfit" : "/statisticksPageCrm"}
              className={({ isActive }) =>
                isActive ? `${sidebarSectionClosedClasses} ${activeSideBar}` : `${sidebarSectionClosedClasses}`
              }
              onClick={() => {
                if (isClientsActive) {setClientsActive(false)}
              }}
            >
             <StatsSvg />
            </NavLink>

            <NavLink
              id="sidebarOnclick"
              to={isMyfit ? "/myGymsPageMyfit" : "/myGymsPageCrm"}
              className={({ isActive }) =>
                isActive ? `${sidebarSectionClosedClasses} ${activeSideBar}` : `${sidebarSectionClosedClasses}`
              }
              onClick={() => {
                if (isClientsActive) {setClientsActive(false)}
              }}
            >
              <LocationSvg />
            </NavLink>

            {!isMyfit &&
              <NavLink
                id="sidebarOnclick"
                to="/subscribtionPageCrm"
                className={({ isActive }) =>
                  isActive ? `${sidebarSectionClosedClasses} ${activeSideBar}` : `${sidebarSectionClosedClasses}`
                }
                onClick={() => {
                  if (isClientsActive) {setClientsActive(false)}
                }}
              >
                <AbonementSvg />
              </NavLink>
            }
          </>}
          <NavLink
            id="sidebarOnclick"
            to={isMyfit ? "/schedulePageMyfit" : "/schedulePageCrm"}
            className={({ isActive }) =>
              isActive ? `${sidebarSectionClosedClasses} ${activeSideBar}` : `${sidebarSectionClosedClasses}`
            }
            onClick={() => {
              if (isClientsActive) {setClientsActive(false)}
              if (scheduleState.isNavigationFromBooking) {dispatch(setNavigationFromBooking(false))}
            }}
          >
            <CalendarSvg />
          </NavLink>
        </div>

        {/* Две нижние блоки */}

        <div className="flex flex-col">
          <div className="flex flex-row relative mb-[37px] px-[16px]">
            <hr className="w-full opacity-50" />
            <div className="absolute right-[-20px] top-[-15px] transition-width duration-300 ease-in-out">
              <button
                onClick={isButtonDisabled ? () => { } : handleClick}
                style={{ cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
              >
                <img src={sidebarClosedLogo} alt="" />
              </button>
            </div>
          </div>

          <NavLink
            id="sidebarOnclick"
            to={isMyfit ? "/settingsPageMyfit" : "/settingsPageCrm"}
            className={({ isActive }) =>
              isActive ? `${sidebarSectionClosedClasses} ${activeSideBar}` : `${sidebarSectionClosedClasses}`
            }
            onClick={() => {if (isClientsActive) {setClientsActive(false)}}}
          >
            <SettingsSvg />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



function AbonementSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#EFFFF5" />
      <path d="M18.9959 8.17041H9.00231C7.62248 8.17041 6.50391 9.28899 6.50391 10.6688V11.5016V17.3312C6.50391 18.7111 7.62248 19.8297 9.00231 19.8297H18.9959C20.3758 19.8297 21.4944 18.7111 21.4944 17.3312V11.5016V10.6688C21.4944 9.28899 20.3758 8.17041 18.9959 8.17041Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17.7485 13.167H19.4141M17.3321 11.085H19.4141M16.834 15.249H19.4141M18.5813 16.9146H19.4141" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.4777 11.2985C11.6663 10.947 12.1703 10.947 12.3589 11.2985L12.6627 11.8649C12.8792 12.2684 13.2681 12.551 13.7187 12.6321L14.3512 12.7461C14.7438 12.8168 14.8996 13.2962 14.6236 13.5841L14.1788 14.0481C13.8619 14.3787 13.7134 14.8358 13.7754 15.2895L13.8626 15.9263C13.9166 16.3215 13.5088 16.6178 13.1496 16.4442L12.5709 16.1646C12.1586 15.9654 11.678 15.9654 11.2657 16.1646L10.687 16.4442C10.3278 16.6178 9.91999 16.3215 9.97406 15.9263L10.0612 15.2895C10.1232 14.8358 9.9747 14.3787 9.65785 14.0481L9.21306 13.5841C8.93701 13.2962 9.09278 12.8168 9.48537 12.7461L10.1179 12.6321C10.5686 12.551 10.9574 12.2684 11.1739 11.8649L11.4777 11.2985Z" stroke="#3AB96D" />
    </svg>

  )
}