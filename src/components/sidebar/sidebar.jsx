import React from "react";
import "../sidebar/sidebar.css";
import locationIcon from "../../assets/svg/location.svg";
import calendarLogo from "../../assets/svg/calendar.svg";
import settingsLogo from "../../assets/svg/settings.svg";
import statisticksLogo from "../../assets/svg/statisticks.svg"
import sidebarOpenedLogo from "../../assets/svg/sidebar_opened.svg";
import sidebarClosedLogo from "../../assets/svg/sidebar_closed.svg";
import userLogoSvg from "../../assets/svg/contacts.svg";
import MenuCompany from "../menu_company/menu_company";
import { NavLink, json } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNavigationFromBooking } from "../../features/schedule_slice";
import { getListOfGyms, setCurrentGymFromFirstItem, setCurrentGym } from "../../features/current_gym_slice";
import { getNewClients } from "../../features/clients_slice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CustomDialog from "../dialog/dialog";
import BackButton from "../../components/button/back_button";
import CustomButton from "../button/button";
import { getUser, sendPhoneNumber } from "../../features/register";
import placeHolderImg from "../../assets/images/placeholder.jpg"
import Notification from "../../firebase/push_notification";
import AppConstants from "../../config/app_constants";
import { getToken, getMessaging } from 'firebase/messaging';

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
  //const messaging = getMessaging();
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

    // проверка на fcm token
    /*  Notification.requestPermission().then((permission) => {
       const fcmToken = localStorage.getItem(AppConstants.keyFcmToken);
       if (permission === "granted" && !fcmToken) {
         return getToken(messaging, { vapidKey: `BKtMN6wjJ9LaMI3lhESMVyzTEMxTwC45q1hjAxgKijOf-e2uEYAmXSZrHirgj4lzx6XIkfxfybYDUgxdQWdTi9g` })
           .then((currentToken) => {
             if (currentToken) {
               // Сохраняем токен в localStorage
               localStorage.setItem(AppConstants.keyFcmToken, currentToken);
 
               const body = {
                 login: localStorage.getItem(AppConstants.keyPhone),
                 fcmToken: currentToken,
               }
               dispatch(sendPhoneNumber(body));
               console.log('Client Token: ', currentToken);
             } else {
               console.log('Failed to generate the registration token.');
             }
           })
           .catch((err) => {
             console.log('An error occurred when requesting to receive the token.', err);
           });
       }else if (permission === "denied" && fcmToken) {
         localStorage.removeItem(AppConstants.keyFcmToken);
       }
     }); */

    // Удаляем обработчик события при размонтировании
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() => {
    if (gymsState.listOfGyms?.length > 0 && gymsState.currentGym === null) {
      dispatch(setCurrentGymFromFirstItem());
    }
    /* if (sessionStorage.getItem("currentGym") == null) {
      if (gymsState.listOfGyms?.length > 0 && gymsState.currentGym === null) {
        dispatch(setCurrentGymFromFirstItem());
      }
    } else {
      // устанавливаем текущий зал из sessionStorage
      //dispatch(setCurrentGym(JSON.parse(sessionStorage.getItem("currentGym"))));
    } */
  }, [gymsState.listOfGyms]);

  useEffect(() => {
    if (gymsState.currentGym !== null) {
      // сохраняем текущий зал в sessionStorage
      sessionStorage.setItem("currentGym", JSON.stringify(gymsState.currentGym));
      if (localStorage.getItem(AppConstants.keyRoleId) !== "5"){
        dispatch(getNewClients(gymsState.currentGym?.id));
      }
    }
  }, [gymsState.currentGym]);


  // This function will be passed to MenuCompany to close it
  const closeMenuCompany = () => showMenuCompany(false);
  const sidebarWidth = isSidebarOpened ? "sidebar_opened" : "sidebar_closed";


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
            style={{ backgroundColor: isMenuCompanyShown ? "#F5F9FF" : "white" }}
            onClick={handleClickMenuCompany}>
            {registerState.avatar &&
              <div className="w-[24px] h-[24px] bg-button-color rounded-[50%] p-[2px]">
                <img className="w-full h-full rounded-[50%] object-cover" src={`${AppConstants.baseUrl}image/${registerState.avatar}`} alt="" />
              </div>
            }

            {!registerState.avatar &&
              <div className="w-[24px] h-[24px] bg-button-color rounded-[50%] p-[2px]">
                <img className="w-full h-full rounded-[50%] object-cover" src={placeHolderImg} alt="" />
              </div>
            }

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
                if (location.pathname === `/myGymsPage/gymDetails/${gymsState.currentGym.id}`) {
                  toast("Вы находитесь на странице заведения, выберите что хотите изменить")
                  showMenuCompany(false);
                } else {
                  navigate(`/myGymsPage/gymDetails/${gymsState.currentGym.id}`);
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
          <div className="flex flex-col justify-between flex-grow">
            {/* Первые четыре элемена */}
            <div className="flex flex-col">
              {localStorage.getItem(AppConstants.keyRoleId) !== "5" &&
                <>
                  <NavLink
                    id="sidebarOnclick"
                    className={isClientsActive ? "sidebar_section active_sidebar_section" : "sidebar_section"}
                    onClick={() => { setClientsActive(true) }}>
                    <img src={userLogoSvg} alt="" />
                    {isTextShown && <div>Клиенты</div>}
                    {isTextShown && clientsSlice.waitingForAccept?.length > 0 && (
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
                        to="/bookingPage"
                        className={({ isActive }) => isActive ? "active_additional_block" : "additional_block"}>
                        <li>
                          <span>Бронирование</span>
                        </li>
                        {clientsSlice.waitingForAccept?.length > 0 && (
                          <div className="badge">
                            {clientsSlice.waitingForAccept?.length}
                          </div>
                        )}
                      </NavLink>

                      <NavLink
                        id="sidebarOnclick"
                        to="/waitingClientsPage"
                        className={({ isActive }) => isActive ? "active_additional_block" : "additional_block"}>
                        <li>
                          <span>Посещения сегодня</span>
                        </li>
                      </NavLink>
                    </div>
                  )}

                  <NavLink
                    id="sidebarOnclick"
                    to="/statisticksPage"
                    className={({ isActive }) =>
                      isActive && !isClientsActive ? "sidebar_section active_sidebar_section" : "sidebar_section"
                    }
                    onClick={() => {
                      if (isClientsActive) {
                        setClientsActive(false);
                      }
                    }}
                  >
                    <img src={statisticksLogo} alt="" />
                    {isTextShown && <div>Статистика</div>}
                  </NavLink>
                  
                  <NavLink
                    id="sidebarOnclick"
                    to="/myGymsPage"
                    className={({ isActive }) =>
                      isActive && !isClientsActive ? "sidebar_section active_sidebar_section" : "sidebar_section"
                    }
                    onClick={() => {
                      if (isClientsActive) {
                        setClientsActive(false);
                      }
                    }}
                  >
                    <img src={locationIcon} alt="" />
                    {isTextShown && <div>Мои заведения</div>}
                  </NavLink>
                </>
              }

              <NavLink
                id="sidebarOnclick"
                to="/schedulePage"
                className={({ isActive }) =>
                  isActive && !isClientsActive
                    ? "sidebar_section active_sidebar_section"
                    : "sidebar_section"
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
                <img src={calendarLogo} alt="calendarLogo" />

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
                id="sidebarOnclick"
                to="/settingsPage"
                className={({ isActive }) =>
                  isActive && !isClientsActive
                    ? "sidebar_section active_sidebar_section"
                    : "sidebar_section"
                }
                onClick={() => {
                  if (isClientsActive) {setClientsActive(false)}
                }}>
                <img src={settingsLogo} alt="" />
                {isTextShown && <div>Настройки</div>}
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
        {registerState.avatar &&
          <div className="w-[24px] h-[24px] bg-button-color rounded-[50%] p-[2px]">
            <img className="w-full h-full rounded-[50%]" src={`${AppConstants.baseUrl}image/${registerState.avatar}`} alt="" />
          </div>
        }

        {!registerState.avatar &&
          <div className="w-[24px] h-[24px] bg-button-color rounded-[50%] p-[2px]">
            <img className="w-full h-full rounded-[50%] object-cover" src={placeHolderImg} alt="" />
          </div>
        }
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

      <div className="flex flex-col justify-between flex-grow">
        {/* Первые четыре элемена */}
        <div className="flex flex-col">
        {localStorage.getItem(AppConstants.keyRoleId) !== "5" &&
          <>
            <NavLink
              id="sidebarOnclick"
              to="/bookingPage"
              className={({ isActive }) =>
                isActive || isClientsActive ? "sidebar_section_closed active_sidebar_section"
                  : "sidebar_section_closed relative"}
            >
            <img src={userLogoSvg} alt="" />

            {clientsSlice.waitingForAccept?.length > 0 && (
              <div className="badge absolute top-[50&] right-[10%]">
                {clientsSlice.waitingForAccept?.length}
              </div>
            )}
            </NavLink>
            <NavLink
              id="sidebarOnclick"
              to="/statisticksPage"
              className={({ isActive }) =>
                isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"
              }
              onClick={() => {
                if (isClientsActive) {setClientsActive(false)}
              }}
            >
              <img src={statisticksLogo} alt="" />
            </NavLink>
            <NavLink
              id="sidebarOnclick"
              to="/myGymsPage"
              className={({ isActive }) =>
                isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"
              }
              onClick={() => {
                if (isClientsActive) {setClientsActive(false)}
              }}
            >
              <img src={locationIcon} alt="" />
            </NavLink>
          </>}
          <NavLink
            id="sidebarOnclick"
            to="/schedulePage"
            className={({ isActive }) =>
              isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"
            }
            onClick={() => {
              if (isClientsActive) {setClientsActive(false)}
              if (scheduleState.isNavigationFromBooking) {dispatch(setNavigationFromBooking(false))}
            }}
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
                onClick={isButtonDisabled ? () => { } : handleClick}
                style={{ cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
              >
                <img src={sidebarClosedLogo} alt="" />
              </button>
            </div>
          </div>

          <NavLink
            id="sidebarOnclick"
            to="/settingsPage"
            className={({ isActive }) =>
              isActive ? "sidebar_section_closed active_sidebar_section" : "sidebar_section_closed"
            }
            onClick={() => {if (isClientsActive) {setClientsActive(false)}}}
          >
            <img src={settingsLogo} alt="settingsLogo" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
