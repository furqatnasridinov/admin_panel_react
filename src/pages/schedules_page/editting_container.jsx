import React from "react";
import "./styles.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEdittingContainer } from "../../features/schedule_slice";
import roundedGarbage from "../../assets/svg/rounded_garbage.svg";
import { TextAndTextfield } from "../gym_detailes/views/gym_detailes_body/employees/employees";
import {
  deleteSchedule,
  resetSelectedEvent,
  setStartTimeHours,
  setStartTimeMinutes,
  setEndTimeHours,
  setEndTimeMinutes,
  selectedEventSetTitle,
  enableScheduleEditting,
  disableScheduleEditting,
  updateSchedule,
  resetDatasAfterSubmitting,
  setEndTimeAutomatically,
  selectedEventSetCansignUp,
  selectedEventRepeatsAdd,
  selectedEventRepeatRemove,
  selectedEventSetMaxCount,
  selectedEventToggleLimitCountUser,
  selectedEventToggleAutoAccept,
  setSelectedEventsCopy
} from "../../features/schedule_slice";
import { getSchedules } from "../../features/schedule_slice";
import CustomDialog from "../../components/dialog/dialog";
import BackButton from "../../components/button/back_button";
import CustomButton from "../../components/button/button";
import DropdownForHours from "./dropdowm_for_hours";
import checkboxEnabledSvg from "../../assets/svg/Check.svg";
import checkboxDisabledSvg from "../../assets/svg/checkbox_disabled.svg";
import backButton from "../../assets/svg/back_button.svg";
import psych from "../../assets/images/american_psycho.jpg";
import { WEEK_DAYS } from "../../dummy_data/dymmy_data";
import questionLogo from "../../assets/svg/questionModal.svg";
import alertSvg from "../../assets/svg/alert.svg"
import groupSvg from "../../assets/svg/autoAccept2.svg"
import hiddenSvg from "../../assets/svg/hidden.svg"
import shownSvg from "../../assets/svg/shown.svg"
import CustomDropdown from "../../components/dropdown/custom_dropdown";
import { toast } from "react-toastify";


export default function EdittingContainer() {
  // redux
  const dispatch = useDispatch();
  const gymState = useSelector((state) => state.currentGym);
  const scheduleState = useSelector((state) => state.schedule);
  const [allCheked, setAll] = useState(false);

  // use ref
  const edittingButtonRef = useRef(null);

  // use state
  const [deleteModalShown, openDeleteModal] = useState(false);
  const [isStartTimeDropDownOpened, openStartTimeDropDown] = useState(false);
  const [isEndTimeDropDownOpened, openEndTimeDropDown] = useState(false);
  const [isTooltip2Visible, setIsTooltip2Visible] = useState(false);
  const [tooltip2Position, setTooltip2Position] = useState({ top: 0, left: 0 });
  const [isTooltip3Visible, setIsTooltip3Visible] = useState(false);
  const [tooltip3Position, setTooltip3Position] = useState({ top: 0, left: 0 });
  const [isTooltip4Visible, setIsTooltip4Visible] = useState(false);
  const [tooltip4Position, setTooltip4Position] = useState({ top: 0, left: 0 });
  const [isLimitDropDownOpened, setIsLimitDropDownOpened] = useState(false);
  const [timeChangesOccur, setTimeChangesOcur] = useState(false);
  const [deleteSingleLoding, setDeleteSingleLoding ] = useState(false);
  const [deleteAllLoding, setDeleteAllLoding ] = useState(false);
  const [updateLoding, setUpdateLoding ] = useState(false);

  // use effect 
  useEffect(() => {
    if (!timeChangesOccur) {
      setTimeChangesOcur(true);
    }
  }, [scheduleState.startTimeHoursTmp, 
      scheduleState.startTimeMinutesTmp, 
      scheduleState.endTimeHoursTmp,
      scheduleState.endTimeMinutesTmp]);

  const handleMouseEnter3 = (event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip3Position({
      top: rect.top + window.scrollY + rect.height - 300,
      left: rect.left + window.scrollX - 320,
    });
    setIsTooltip3Visible(true);
  };

  const handleMouseEnter4 = (event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip4Position({
      top: rect.top + window.scrollY + rect.height - 230,
      left: rect.left + window.scrollX - 320,
    });
    setIsTooltip4Visible(true);
  };

  const showConfirmationOverlay = () => {
    const ref = edittingButtonRef.current;
    const rect = ref.getBoundingClientRect();

    setTooltip2Position({
      top: rect.top + 60,
      left: rect.left + 10,
    });
    setIsTooltip2Visible(true);
  };

  let numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (

    console.log("scheduleState.selectedEvent", JSON.stringify(scheduleState.selectedEvent)),
    <div className={`edittingContainer`}>
      {/*  */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[10px]">
          <img
            src={backButton}
            alt=""
            className="cursor-pointer"
            onClick={() => {
              if (scheduleState.isScheduleEdittingEnabled) {
                dispatch(disableScheduleEditting());
              }
              dispatch(hideEdittingContainer());
              dispatch(resetSelectedEvent());
            }}
          />
          <div className="text-[14px] font-bold">
            {`Детали занятия ${scheduleState.selectedEvent.start.toLocaleString(
              "ru-RU",
              { day: "numeric", month: "long" }
            )}`}
          </div>
        </div>

        <img
          src={roundedGarbage}
          alt="roundedGarbage"
          className="cursor-pointer"
          onClick={ () => {
            // if event is repeating show modal
            openDeleteModal(true);
          }}
        />
      </div>


      {deleteModalShown && <CustomDialog
        isOpened={deleteModalShown}
        closeOnTapOutside={() => openDeleteModal(false)}
      >
        <div className="deleteModalContainer">
          <div className="flex flex-col gap-[5px]">
            {/* <div className="">{`userscount : ${scheduleState.selectedEvent.usersCount} repeat: ${scheduleState.selectedEvent.repeat.length}`}</div> */}
            <div className="text-[16px] font-semibold">Удаление занятия</div>
            {scheduleState.selectedEvent?.repeat?.length > 0 && <div className="text-[14px] font-normal leading-[16px]">
              Это занятие было скопировано на несколько недель вперёд. Вы хотите
              удалить только это занятие, или так же все его копии?
            </div>}

            {scheduleState.selectedEvent?.repeat?.length == 0 && <div className="text-[14px] font-normal leading-[16px]">
              Это действие удалит занятие без возможности восстановления.
            </div>}
          </div>

          {scheduleState.selectedEvent?.usersCount > 0 && <div className="blueContainer">
            <div className="text-[14px] font-medium leading-[16px]">
              Внимание: На это занятие записано:{" "}
              <strong>{scheduleState.selectedEvent.usersCount}</strong>{" "}
              пользователей!
            </div>
            <div className="text-[14px] font-normal leading-[16px]">
              Удаление приведёт к отмене всех записей. Если вы хотите перенести
              занятие на другое время или дату, то воспользуйтесь
              редактированием вместо удаления, это позволит сохранить часть
              записей и уведомит пользователей о переносе.
            </div>
          </div>}

          <div className="flex flex-row gap-[10px]">
            <BackButton
              height={"40px"}
              width={"15%"}
              title={"Назад"}
              onСlick={async () => {
                openDeleteModal(false);
              }}
            />

            {scheduleState.selectedEvent?.repeat?.length > 0 && <BackButton
              height={"40px"}
              width={"100%"}
              title={"Удалить только выбранное занятие"}
              loading={deleteSingleLoding}
              onСlick={async () => {
                const { gymId, lessonId, all } = {
                  gymId: gymState.currentGym.id,
                  lessonId: scheduleState.selectedEvent.id,
                  all: false,
                };
                setDeleteSingleLoding(true);
                await dispatch(deleteSchedule({ gymId, lessonId, all }));
                await dispatch(getSchedules(gymState.currentGym.id));
                setTimeout(() => {
                  dispatch(resetSelectedEvent());
                  dispatch(hideEdittingContainer());
                  setDeleteSingleLoding(false);
                  openDeleteModal(false);
                }, 500);
              }}
            />}

            <CustomButton
              height={"40px"}
              width={"100%"}
              title={scheduleState.selectedEvent?.repeat?.length > 1 ? "Удалить занятие и все его копии" : "Подтвердить удаление"}
              fontSize={"14px"}
              isLoading={deleteAllLoding}
              onСlick={async () => {
                const { gymId, lessonId, all } = {
                  gymId: gymState.currentGym.id,
                  lessonId: scheduleState.selectedEvent.id,
                  all: true,
                };
                setDeleteAllLoding(true);
                await dispatch(deleteSchedule({ gymId, lessonId, all }));
                await  dispatch(getSchedules(gymState.currentGym.id));
                setTimeout(() => {
                  dispatch(resetSelectedEvent());
                  dispatch(hideEdittingContainer());
                  setDeleteAllLoding(false);
                  openDeleteModal(false);
                }, 500);
              }}
            />
          </div>
        </div>
      </CustomDialog>}

      {/*  */}
      <div className="flex flex-col gap-[5px]">
        <div className="text-[14px] font-bold">Кем добавлено:</div>
        <div className="flex flex-row gap-[10px]">
          <div
            className="w-[32px] h-[32px] rounded-[50%] p-[2px]"
            style={{ backgroundColor: "rgba(119, 170, 249, 1)" }}
          >
            <img className="w-full h-full rounded-[50%] " src={psych} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="text-[13px] font-medium leading-[15px]">
              {`${scheduleState.selectedEvent.owner.firstName} ${scheduleState.selectedEvent.owner.lastName}`}
            </div>
            {/* <div className="text-[13px] font-medium leading-[15px]">
                      Директор
                    </div> */}
          </div>
        </div>
      </div>
      {/*  */}
      <div ref={edittingButtonRef} className="refSchedule">
        <div className="flex flex-col gap-[5p]">
          <div className="text-[14px] font-bold">Время проведения:</div>
          {!scheduleState.isScheduleEdittingEnabled && (
            <>
              <div className="text-[14px] font-medium">
                {scheduleState.selectedEvent.start.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                -
                {scheduleState.selectedEvent.end.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </>
          )}

          {scheduleState.isScheduleEdittingEnabled && (
            <div className="flex flex-row items-center gap-[5px]">
              <DropdownForHours
                text={`${scheduleState.startTimeHoursTmp}:${scheduleState.startTimeMinutesTmp}`}
                isDropDownOpened={isStartTimeDropDownOpened}
                openCloseDropDown={() => { openStartTimeDropDown(!isStartTimeDropDownOpened) }}
                setHours={(hours) => { dispatch(setStartTimeHours(hours)) }}
                setMinutes={(minute) => dispatch(setStartTimeMinutes(minute))}
                selectedHour={scheduleState.startTimeHoursTmp}
                selectedMinute={scheduleState.startTimeMinutesTmp}
                closeOntapOutside={() => { openStartTimeDropDown(false) }}
              />

              <div className="">-</div>

              <DropdownForHours
                text={`${scheduleState.endTimeHoursTmp}:${scheduleState.endTimeMinutesTmp}`}
                isDropDownOpened={isEndTimeDropDownOpened}
                openCloseDropDown={() => { openEndTimeDropDown(!isEndTimeDropDownOpened) }}
                setHours={(hours) => { dispatch(setEndTimeHours(hours)) }}
                setMinutes={(minute) => dispatch(setEndTimeMinutes(minute))}
                selectedHour={scheduleState.endTimeHoursTmp}
                selectedMinute={scheduleState.endTimeMinutesTmp}
                closeOntapOutside={() => { openEndTimeDropDown(false) }}
              />
            </div>
          )}
        </div>



        {!scheduleState.isScheduleEdittingEnabled &&
          <div className="">
            <span className="text-[14px] font-bold">Описание занятия:</span>
            <div className="text-[13px] font-medium leading-[15px]">
              {scheduleState.selectedEvent.title}
            </div>
          </div>
        }

        {scheduleState.isScheduleEdittingEnabled &&
          <TextAndTextfield
            textfieldHasFocus={true}
            value={scheduleState.selectedEvent.title}
            
            onChange={(e) => {
              let inputValue = e.target.value;
              if (inputValue.length > 250) {
                inputValue = inputValue.substring(0, 250);
              }
              dispatch(selectedEventSetTitle(inputValue));
            }}
            showTextArea={true}
            fontSize={"13px"}
            fontWeight={"medium"}
            text={"Описание занятия:"}
            placeholder={"Напишите описание к занятию"}
            showLogo={false}
            lineheight={"16px"}
            showMaxLength={true}
            maxLength={"250"}
          />
        }

        {/* Настройки */}
        <div className="flex flex-col">
          <span className="text-[14px] font-bold">Настройки:</span>

          {/* canSignUp */}
          <div className="flex flex-row gap-[10px] items-center mt-[16px]">
            <img src={scheduleState.selectedEvent.canSignUp ? shownSvg : hiddenSvg} alt="" />

            <span className="text-[13px] font-medium">
              {scheduleState.selectedEvent.canSignUp ? "Это занятие доступно для записи. " : "Это занятие скрыто от пользователей приложения."}
              {scheduleState.isScheduleEdittingEnabled && <span
                className="text-[13px] font-medium text-blue-text cursor-pointer"
                onClick={() => { dispatch(selectedEventSetCansignUp(!scheduleState.selectedEvent?.canSignUp)) }}
              >
                {scheduleState.selectedEvent?.canSignUp ? "Скрыть от пользователей" : "Отобразить"}
              </span>}
            </span>
          </div>

          {/* Ограничение записей в день: */}
          <div className="flex flex-row gap-[10px] items-center justify-between">
            <div className="flex flex-row gap-[10px] items-center">
              {scheduleState.isScheduleEdittingEnabled &&
                <img
                  className="cursor-pointer w-[24px] h-[24px] mt-[16px]"
                  src={scheduleState.selectedEvent?.limitCountUser ? checkboxEnabledSvg : checkboxDisabledSvg}
                  alt="checkbox"
                  onClick={() => dispatch(selectedEventToggleLimitCountUser())}
                />}

              {(!scheduleState.isScheduleEdittingEnabled && scheduleState.selectedEvent?.limitCountUser) && <img className="mt-[16px]" src={alertSvg} alt="" />}
              {((scheduleState.isScheduleEdittingEnabled) || (!scheduleState.isScheduleEdittingEnabled && scheduleState.selectedEvent?.limitCountUser)) &&
                <span className="text-[13px] font-medium  mt-[16px]">Ограничение записей в день:</span>}
              {(!scheduleState.isScheduleEdittingEnabled && scheduleState.selectedEvent?.limitCountUser) &&
                <span className="text-[14px] font-bold  mt-[16px]">{scheduleState.selectedEvent?.maxCount}</span>}
              {(scheduleState.selectedEvent?.limitCountUser && scheduleState.isScheduleEdittingEnabled) &&
                <div className="flex flex-row items-center gap-[33px] mt-[16px] ">
                  <CustomDropdown
                    isDropDownOpened={isLimitDropDownOpened}
                    text={scheduleState.selectedEvent?.maxCount == 0 ? "1" : scheduleState.selectedEvent?.maxCount}
                    maxHeight={150}
                    maxWidth={"80px"}
                    gap={"0px"}
                    backgroundColor={"white"}
                    padding={"10px"}
                    openCloseDropDown={() => { setIsLimitDropDownOpened(!isLimitDropDownOpened) }}
                    map={numbers.map((number) => {
                      return (
                        <div
                          className="numbers"
                          onClick={() => {
                            dispatch(selectedEventSetMaxCount(number));
                            setIsLimitDropDownOpened(false);
                          }}
                        >
                          {number}
                        </div>
                      );
                    })}
                  />
                </div>}
            </div>
            {(scheduleState.isScheduleEdittingEnabled || scheduleState.selectedEvent?.limitCountUser) &&
              <>
                <div className="relative mt-[16px]">
                  <img
                    className="cursor-pointer w-[24px] h-[24px]"
                    src={questionLogo}
                    alt="questionLogo"
                    onMouseEnter={handleMouseEnter3}
                    onMouseLeave={() => setIsTooltip3Visible(false)}
                  />

                  {isTooltip3Visible && (
                    <div
                      className="overlay"
                      style={{
                        top: tooltip3Position.top + "px",
                        left: tooltip3Position.left + "px",
                      }}>
                      <div className="text-[16px] font-semibold">
                        Ограничение записи в день
                      </div>
                      <div className="text-[14px] font-normal">
                        Если вы хотите ограничить количество потенциальных
                        записей в день - то выберите и настройте этот параметр.
                      </div>
                      <div className="text-[14px] font-normal">
                        Например, вы знаете, что ваш зал вмещает не больше 30
                        человек, при этом у вас есть 10 постоянных посетителей.
                        Тогда имеет смысл выбрать данный параметр и поставить
                        ограничение на 20 записей в день.Когда значение в 20
                        записей будет достигнуто - занятие перестанет появляться
                        у пользователей именно в те дни, когда значение будет
                        достигать 20. Если кто то отменит занятие, или вы
                        увеличите ограничение - занятие снова отобразится.
                      </div>
                    </div>
                  )}
                </div>
              </>
            }
          </div>

          {/* AutoAccept */}
          <div className="flex flex-row gap-[10px] items-center justify-between">
            <div className="flex flex-row gap-[10px] items-center">
              {(!scheduleState.isScheduleEdittingEnabled && scheduleState.selectedEvent?.autoAccept) && <img className="mt-[16px]" src={groupSvg} alt="" />}
              {scheduleState.isScheduleEdittingEnabled &&
                <img
                  className="cursor-pointer w-[24px] h-[24px] mt-[16px]"
                  src={scheduleState.selectedEvent?.autoAccept ? checkboxEnabledSvg : checkboxDisabledSvg}
                  alt="checkbox"
                  onClick={() => dispatch(selectedEventToggleAutoAccept())}
                />}
              {(!scheduleState.isScheduleEdittingEnabled && scheduleState.selectedEvent?.autoAccept)
                && <span className="text-[13px] font-medium mr-1 mt-[16px]">Включено автоматическое одобрение бронирований</span>}
              {scheduleState.isScheduleEdittingEnabled && <span className="text-[13px] font-medium mr-1 mt-[16px]">Включено автоматическое одобрение бронирований</span>}
            </div>
            <div>
              {(scheduleState.isScheduleEdittingEnabled || scheduleState.selectedEvent?.autoAccept) &&
                <>
                  <img
                    className="cursor-pointer w-[34px] h-[24px] mt-[16px]"
                    src={questionLogo}
                    alt="questionLogo"
                    onMouseEnter={handleMouseEnter4}
                    onMouseLeave={() => setIsTooltip4Visible(false)}
                  />
                  {isTooltip4Visible && <div
                    className="overlay"
                    style={{
                      top: tooltip4Position.top + "px",
                      left: tooltip4Position.left + "px",
                    }}>
                    <div className="text-[16px] font-semibold">
                      Автоматическое бронирование
                    </div>
                    <div className="text-[14px] font-normal">
                      Когда вы создаёте активность, пользователь в приложении может
                      на неё записаться. В стандартном сценарии вам необходимо будет
                      свериться с расписанием и одобрить запись клиента.
                    </div>
                    <div className="text-[14px] font-normal">
                      Если поставить галочку - одобрение бронирования для этой
                      активности будет происходить автоматически, без вашего
                      участия.
                    </div>
                  </div>}
                </>}
            </div>
          </div>
        </div>

        {/* Дни повторений */}
        <div className="flex flex-col gap-[5px]">
          <div className="text-[14px] font-bold">В какие дни повторяется:</div>
          <div className="flex flex-row gap-[5px]">
            {WEEK_DAYS.map((weekday) => (
              <div
                key={weekday.id}
                style={{ cursor: scheduleState.isScheduleEdittingEnabled ? "pointer" : "initial" }}
                className={scheduleState.selectedEvent?.repeat.includes(weekday.id)
                  ? "roundedWeekdaysSelected " : "roundedWeekdays "}
                onClick={() => {
                  if (scheduleState.isScheduleEdittingEnabled) {
                    if (scheduleState.selectedEvent?.repeat.includes(weekday.id)) {
                      dispatch(selectedEventRepeatRemove(weekday.id));
                    } else {
                      dispatch(selectedEventRepeatsAdd(weekday.id));
                    }
                  }
                }}
              >
                {weekday.name}
              </div>
            ))}
          </div>
        </div>

        {/* all */}
        {scheduleState.isScheduleEdittingEnabled && scheduleState.selectedEvent?.repeat?.length > 1 &&
          <div className="flex flex-col gap-[10px]">
            <span className="text-[14px] font-bold ">Сохранение:</span>
            <div className="flex flex-row gap-[10px] items-center">
              <img
                className="cursor-pointer w-[24px] h-[24px]"
                src={allCheked ? checkboxEnabledSvg : checkboxDisabledSvg}
                alt="checkbox"
                onClick={() => { setAll(!allCheked) }}
              />
              <span className="text-[13px] font-medium">Применить ко всем повторяющимся событиям</span>
            </div>
          </div>
        }

        {!scheduleState.isScheduleEdittingEnabled && (
          <BackButton
            title={ scheduleState.selectedEvent.canEdit ?  "Редактировать" : "Уже нельзя редактировать"}
            isDidsabled={!scheduleState.selectedEvent.canEdit}
            height={"40px"}
            onСlick={() => {
              if (scheduleState.selectedEvent.usersCount && scheduleState.selectedEvent.usersCount > 0) {
                showConfirmationOverlay();
              } else {
                dispatch(enableScheduleEditting());
                dispatch(setSelectedEventsCopy());
              }
            }}
            hideHover={true}
          />
        )}

        {isTooltip2Visible && (
          <div
            className="overlay"
            style={{
              top: tooltip2Position.top + "px",
              left: tooltip2Position.left + "px",
            }}
          >
            <div className="text-[16px] font-semibold">Внимание</div>
            <div className="text-[14px] font-normal">
              {`На это занятие записано ${scheduleState.selectedEvent.usersCount} человек. Если вы измените время или
              дату - то пользователям придётся перезаписаться заново и часть из
              них откажется от записи.`}
            </div>
            <div className="flex flex-row gap-2 mt-3">
              <BackButton
                height={"40px"}
                onСlick={() => { setIsTooltip2Visible(false) }}
                title={"Назад"}
              />
              <CustomButton
                width={"100%"}
                height={"40px"}
                fontSize={"14px"}
                title="Редактировать"
                onСlick={() => {
                  dispatch(setSelectedEventsCopy());
                  dispatch(enableScheduleEditting());
                  setIsTooltip2Visible(false);
                }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-[16px]">
          {scheduleState.isScheduleEdittingEnabled && (
            <div className="flex flex-row gap-[10px] ">
              <BackButton
                width={"100%"}
                height={"40px"}
                title={"Отменить"}
                onСlick={() => {
                  dispatch(disableScheduleEditting());
                  dispatch(hideEdittingContainer());
                  dispatch(resetSelectedEvent());
                  //dispatch(getSchedules(gymState.currentGym.id));
                  dispatch(resetDatasAfterSubmitting());
                }}
              />
              <CustomButton
                width={"100%"}
                height={"40px"}
                title={"Сохранить"}
                isLoading={updateLoding}
                /* isDidsabled={
                  isEqual(scheduleState.selectedEvent, scheduleState.selectedEventCopy) 
                } */
                onСlick={async () => {
                  // send update request
                  if (!scheduleState.endTimeIsBeforeStartTime) {
                    const body = {
                      gymId: gymState.currentGym.id,
                      lessonId: scheduleState.selectedEvent.id,
                      date: scheduleState.lessonStartTimeSendToServer,
                      duration: scheduleState.lessonDurationSendToServer,
                      description: scheduleState.selectedEvent.title,
                      autoAccept: scheduleState.selectedEvent.autoAccept,
                      all: allCheked,
                      canSignUp: scheduleState.selectedEvent.canSignUp,
                      repeat: scheduleState.selectedEvent.repeat,
                      limitCountUser: scheduleState.selectedEvent.limitCountUser,
                      maxCount: (scheduleState.selectedEvent.limitCountUser && scheduleState.selectedEvent.maxCount == 0) ?
                        1 : scheduleState.selectedEvent.maxCount
                    };
                    console.log(`updateSchedule request ${JSON.stringify(body)}`);
                    setUpdateLoding(true);
                    await dispatch(updateSchedule({ body }));
                    await dispatch(getSchedules(gymState.currentGym.id));
                    dispatch(disableScheduleEditting());
                    dispatch(hideEdittingContainer());
                    dispatch(resetSelectedEvent());
                    dispatch(resetDatasAfterSubmitting());
                    setUpdateLoding(false);
                  }
                }}
                fontSize={"14px"}
              />
            </div>
          )}
          {scheduleState.isScheduleEdittingEnabled &&
            scheduleState.endTimeIsBeforeStartTime && (
              <div className="text-[14px] text-red-400 ">
                Время начала должно быть раньше, чем время окончания активности
              </div>
            )}
        </div>
      </div>


    </div>
  );
}
