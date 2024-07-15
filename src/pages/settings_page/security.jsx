import React from "react";
import TitleText from "../create_gym_page/title_text";
import { useState, useEffect } from "react";
import ReactInputMask from "react-input-mask";
import CustomDialog from "../../components/dialog/dialog";
import BackButton from "../../components/button/back_button";
import CustomButton from "../../components/button/button";
import OtpInput from 'react-otp-input';
import { TextAndTextfield } from "../gym_detailes/views/gym_detailes_body/employees/employees";
import phoneSvg from "../../assets/svg/phone2.svg"
import doneSmall from "../../assets/svg/done_small.svg"
import AppConstants from "../../config/app_constants";
import { useDispatch } from "react-redux";
import {
  sendPhoneStage1,
  sendPhoneCodeConfirmation1,
  sendPhoneStage2,
  sendPhoneCodeConfirmation2,
} from "../../features/register";


export default function Security() {
  // use states 
  const [phone, setPhone] = useState("+79918980909");
  const [googleToggleOn, setGoogleToggleOn] = useState(false);
  const [isModalOpened, setModalOpened] = useState(false);
  const [isContinueClicked, setContinueClicked] = useState(false);
  const [firstTimer, setFirstTimer] = useState(59);
  const [secondTimer, setSecondTimer] = useState(59);
  const [otp, setOtp] = useState('');
  const [otp2, setOtp2] = useState('');
  const [isOtpError, setOtpError] = useState(false);
  const [isOtpError2, setOtpError2] = useState(false);
  const [iHaveNoAccessToPhone, setNoAccess] = useState(false);
  const [firstStagePassed, setFirstStagePassed] = useState(false);
  const [secondStagePassed, setSecondStagePassed] = useState(false);
  const [resetFirstCode, setResetFirstCode] = useState(false);
  const [resetSecondCode, setResetSecondCode] = useState(false);
  const [newPhone, setnewPhone] = useState("");
  const [waitingForStage2Code, setWaitingForStage2Code] = useState(false);
  const [numberSuccessfullyChanged, setNumberSuccessfullyChanged] = useState(false);

  // redux
  const dispatch = useDispatch();


  const resetAllModals = () => {
    setContinueClicked(false);
    setNoAccess(false);
    setFirstStagePassed(false);
    setSecondStagePassed(false);
    setWaitingForStage2Code(false);
    setNumberSuccessfullyChanged(false);
    setModalOpened(false);
    setOtp("");
    setOtp2("");

  };


  useEffect(() => {
    if (otp.length === 4) {
      if (otp !== "1234") {
        setOtpError(true)
      }

      if (otp === "1234") {
        // отправляем номер телефона и отп код на сервер на stage 1
        const data = {
          login: localStorage.getItem(AppConstants.keyPhone),
          confirmToken: otp
        };
        dispatch(sendPhoneCodeConfirmation1(data));
        setFirstStagePassed(true);
      }
    }
  }, [otp])

  useEffect(() => {
    if (isContinueClicked || resetFirstCode) {
      // запускаем таймер
      const timer = setInterval(() => {
        setFirstTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      // отправляем номер телефона на сервер на stage 1
      dispatch(sendPhoneStage1(localStorage.getItem(AppConstants.keyPhone)));

      return () => {
        clearInterval(timer);
      };
    }
  }, [isContinueClicked]);


  useEffect(() => {
    if (otp2.length === 4) {
      if (otp2 !== "1234") {
        setOtpError2(true)
      }
      if (otp2 === "1234") {
        // отправляем номер телефона и отп код на сервер на stage 2

        setSecondStagePassed(true);
      }
    }
  }, [otp2,])

  useEffect(() => {
    if (waitingForStage2Code || resetSecondCode) {
      const timer = setInterval(() => {
        setSecondTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [waitingForStage2Code]);


  return (
    console.log("newphone", newPhone),
    <div className="personalInfos">
      <div className="flex flex-row gap-1">
        <div className="text-[16px] font-semibold leading-[16px]">
          Безопасность.
        </div>
        <div className="text-[14px] font-normal leading-[16px]">
          Тут вы можете изменить номер телефона или настроить двухфакторную
          аутентификацию.
        </div>
      </div>

      <div className="flex flex-row gap-[32px] items-center">
        <div className="flex flex-col gap-1 ">
          <TitleText
            firstText={"Телефон"}
            secondText={"Изменить"}
            onClick={() => { setModalOpened(true) }}
          />
          <ReactInputMask
            readOnly={true}
            value={localStorage.getItem(AppConstants.keyPhone) ?? phone}
            mask="+7 (999) 999 99-99"
            //placeholder="+7 (900) 855 45-58"
            style={{
              height: "30px",
              width: "fit-content",
              outline: "none",
              fontSize: "13px",
              fontWeight: "400",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </div>

        {/* <div className="flex flex-row gap-[10px] items-center">
          {googleToggleOn &&

            <img src={toggleOn}
              style={{ backgroundColor: "rgba(119, 170, 249, 1)", height: "fit-content", borderRadius: "100px" }}
              alt=""
              onClick={() => setGoogleToggleOn(!googleToggleOn)}
              draggable={false}
            />

          }

          {!googleToggleOn &&

            <img src={toggleOff}
              style={{ height: "fit-content", borderRadius: "100px" }}
              alt=""
              onClick={() => setGoogleToggleOn(!googleToggleOn)}
              draggable={false}

            />
          }

          <div className="text-[13px] font-medium leading-[15px]">Включить двухфакторную аутентификацию через Google Authenticator</div>

        </div> */}

        {isModalOpened && <CustomDialog isOpened={isModalOpened} closeOnTapOutside={() => setModalOpened(false)}>

          <div className="modalContainer ">

            {!isContinueClicked && !iHaveNoAccessToPhone && !firstStagePassed &&
              <div className="flex flex-col gap-[16px]">
                <div className="text-[16px] font-semibold leading-[16px]">Подтверждение по SMS</div>
                <div className="text-[14px] font-normal leading-[16px]">
                  Чтобы изменить номер телефона, необходимо подтвердить это с помощью SMS.
                  Сначала вам придёт SMS сообщение на старый номер, а затем на новый.
                  Коды необходимо ввести в полях, которые появятся на следующей странице
                </div>

                <div className="flex flex-row gap-[10px]">
                  <BackButton
                    width={"114px"}
                    height={"40px"}
                    title={"Отменить"}
                    onСlick={() => setModalOpened(false)}
                  />

                  <CustomButton
                    width={"128px"}
                    height={"40px"}
                    fontSize={"14px"}
                    title="Продолжить"
                    onСlick={async () => { setContinueClicked(true); setFirstTimer(59); }}
                  />
                </div>

              </div>
            }

            {
              isContinueClicked && !iHaveNoAccessToPhone && !firstStagePassed &&
              <div className="flex flex-col gap-[16px]">
                <div className="text-[16px] font-semibold leading-[16px]">Подтверждение по SMS. Шаг 1 из 2</div>
                <div className="greyBorderedContainer text-[14px] font-normal leading-[16px]">
                  Дождитесь смс на номер <strong>{localStorage.getItem(AppConstants.keyPhone)}</strong>  и
                  введите код из сообщения в поле ниже:
                </div>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={isOtpError ? "pinputStyleError" : "pinputStyle"}
                  shouldAutoFocus={true}
                />
                <div className="flex flex-col gap-1">
                  <div className="text-[12px] font-normal leading-[16px] text-inter">Не пришла смс в течении 1 минуты? </div>

                  {firstTimer !== 0 &&
                    <div className="text-[12px] font-normal leading-[16px] text-blue-text cursor-pointer">
                      {`Отправить ещё раз через ${firstTimer}с`}
                    </div>
                  }


                  {firstTimer === 0 &&
                    <div className="text-[12px] font-normal leading-[16px] text-blue-text cursor-pointer" onClick={() => {
                      setResetFirstCode(true);
                      setFirstTimer(59);
                    }}>
                      Отправить ещё раз через
                    </div>}
                </div>
                <div className="flex flex-row gap-[10px]">
                  <BackButton
                    width={"114px"}
                    height={"40px"}
                    title={"Назад"}
                    onСlick={() => setContinueClicked(false)}
                  />
                  <BackButton
                    width={"100%"}
                    height={"40px"}
                    title={"У меня нет доступа к номеру"}
                    onСlick={() => {
                      setNoAccess(true);
                    }}
                  />
                </div>
              </div>


            }

            {
              iHaveNoAccessToPhone &&
              <div className="flex flex-col gap-[16px] w-[330px]">
                <div className="text-[16px] font-semibold leading-[16px]">Мы получили ваш запрос</div>
                <div className="text-[14px] font-normal leading-[16px]">В скором времени мы свяжемся с руководством
                  заведения для решения этого вопроса.</div>
                <CustomButton
                  title={"Сохранить"}
                  onСlick={() => {
                    resetAllModals();
                  }}
                  width={"100%"}
                  height={"40px"} />
              </div>
            }


            {firstStagePassed && !waitingForStage2Code &&
              <div className="flex flex-col gap-[16px]">
                <div className="text-[16px] font-semibold leading-[16px]">Подтверждение по SMS. Шаг 2 из 2
                </div>
                <div className="greyBorderedContainer text-[14px] font-normal leading-[16px]">
                  Введите новый номер телефона в поле ниже</div>
                <TextAndTextfield
                  value={newPhone}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, "");
                    setnewPhone(onlyDigits);
                  }}
                  text={"Номер телефона"}
                  placeholder={"+7 (900) 855 45-58"}
                  logo={phoneSvg}
                  isPhoneTextfield={true}
                  showLogo={true}
                  textfieldHasFocus={newPhone.length === 11}
                />
                <div className="flex flex-row gap-[10px]">
                  <BackButton
                    width={"114px"}
                    height={"40px"}
                    title={"Назад"}
                    onСlick={() => {
                      setFirstStagePassed(false);
                    }}
                  />
                  <CustomButton
                    width={"100%"}
                    height={"40px"}
                    title={"Получить код"}
                    onСlick={() => {
                      if (newPhone.length === 11) {
                        // отправляем номер телефона на сервер на stage 2
                        const data = {
                          login: localStorage.getItem(AppConstants.keyPhone),
                          newNumber: `+${newPhone}`,
                        };
                        dispatch(sendPhoneStage2(data));
                        // go to pinput 2
                        setWaitingForStage2Code(true);
                      }
                    }}
                  />
                </div>
              </div>
            }

            {waitingForStage2Code && !numberSuccessfullyChanged &&
              <div className="flex flex-col gap-[16px]">
                <div className="text-[16px] font-semibold leading-[16px]">Подтверждение по SMS. Шаг 2 из 2</div>
                <div className="greyBorderedContainer text-[14px] font-normal leading-[16px]">
                  Дождитесь смс на номер <strong>+{newPhone}</strong>  и
                  введите код из сообщения в поле ниже:
                </div>
                <OtpInput
                  value={otp2}
                  onChange={setOtp2}
                  numInputs={4}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={isOtpError2 ? "pinputStyleError" : "pinputStyle"}
                  shouldAutoFocus={true}
                />
                <div className="flex flex-col gap-1">
                  <div className="text-[12px] font-normal leading-[16px] text-inter">Не пришла смс в течении 1 минуты? </div>

                  {secondTimer !== 0 &&
                    <div className="text-[12px] font-normal leading-[16px] text-blue-text cursor-pointer">
                      {`Отправить ещё раз через ${secondTimer}с`}
                    </div>
                  }


                  {secondTimer === 0 &&
                    <div className="text-[12px] font-normal leading-[16px] text-blue-text cursor-pointer" onClick={() => {
                      setResetSecondCode(true);
                      setSecondTimer(59);
                    }}>
                      Отправить заново
                    </div>}
                </div>


                <CustomButton
                  width={"100%"}
                  height={"40px"}
                  title={"Изменить номер"}
                  onСlick={async () => {
                    if (secondStagePassed) {
                      const data = {
                        login: localStorage.getItem(AppConstants.keyPhone),
                        confirmToken: "1234",
                        newNumber: `+${newPhone}`,
                      };
                      await dispatch(sendPhoneCodeConfirmation2(data));
                      setNumberSuccessfullyChanged(true);

                    }

                  }}
                />

              </div>

            }

            {
              numberSuccessfullyChanged &&
              <div className="flex flex-col p-[16px] gap-[16px] items-center">
                <div className="flex flex-row gap-1 items-center">
                  <img src={doneSmall} alt="" />
                  <div className="text-[16px] font-semibold leading-[16px]">Номер был успешно изменён</div>
                </div>
                <CustomButton
                  width={"120px"}
                  height={"40px"}
                  title={"Спасибо"}
                  onСlick={() => {
                    resetAllModals();
                    setTimeout(() => {
                      // Reload the current page
                      window.location.reload();
                    }, 1000);
                    
                  }}

                />

              </div>
            }

          </div>

        </CustomDialog>}
      </div>
    </div>
  );
}
