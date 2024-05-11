import React from 'react'
import "./styles.css"
import wave from "../../assets/svg/bottom_wave.svg"
import { TextAndTextfield } from '../gym_detailes/views/gym_detailes_body/employees/employees'
import { useState, useEffect } from 'react'
import phoneSvg from "../../assets/svg/phone2.svg"
import enabledSendSvg from "../../assets/svg/enabled_send.svg"
import disabledSendSvg from "../../assets/svg/disabled_send.svg"
import waitingSendSvg from "../../assets/svg/waiting_send.svg"
import OtpInput from 'react-otp-input';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { sendPhoneNumber, sendForConfirmation } from '../../features/register'
import AppConstants from '../../config/app_constants'
import { RequestForToken } from '../../firebase/firebase'


export default function Register1() {
  // use states
  const [phone, setPhone] = useState("");
  const [isPhoneSent, sendPhone] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(59);
  const [isOtpError, setOtpError] = useState(false);
  const [resetCode, setResetCode] = useState(false);
  const [goToWellcome, setGoToWellcome] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [anotherPhoneAdded, setAnotherPhoneAdded] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(AppConstants.keyToken));
  const [tokenSaved, setTokenSaved] = useState(false);

  // use navigation
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  useEffect(() => {
    const fcmtoken = localStorage.getItem(AppConstants.keyFcmToken);
    if (!fcmtoken || !fcmtoken?.length) {
      //RequestForToken();
    }
  }, [])

  useEffect(() => {
    if (isPhoneSent || resetCode) {
      const timer = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isPhoneSent, resetCode]);


  useEffect(() => {
    if (otp.length === 4) {
      if (otp !== "1234") {
        setOtpError(true)
      }
      if (otp === "1234") {
        const body = {
          phone: `+${phone}`,
          otp: otp,
        }
        const sendConfirmation = async () => {
          await dispatch(sendForConfirmation(body))
        }
        sendConfirmation();
      }
    }
  }, [otp])


  useEffect(() => {
    if (loginState.isSuccessfullyLogined) {
      navigate("/welcomePage", { replace: true });
    }
  }, [loginState.isSuccessfullyLogined]);


  useEffect(() => {
    if (phone.length !== 11 && isPhoneSent) {
      sendPhone(false);
      setTimer(59);

    }
    if (phone.length === 11) {
      setWaiting(true);
      if (isPhoneSent) {
        if (phone !== submittedPhone) {
          setAnotherPhoneAdded(true);
        }
      }
    } else {
      setWaiting(false);
    }
  }, [phone, isPhoneSent])

  function sendPhoneFunc() {
    if (phone.length === 11) {
      sendPhone(true)
      setSubmittedPhone(phone);
      const body = {
        login: `+${phone}`,
        fcmToken: localStorage.getItem(AppConstants.keyFcmToken) ?? "",
      }
      dispatch(sendPhoneNumber(body));
      localStorage.setItem(AppConstants.keyPhone, `+${phone}` );
    }
  }

  return (
    <div className='registerPage'>

      {!goToWellcome && <>
        <div className="flex flex-col gap-[20px] items-center justify-center absolute top-[20%]">
          <div className="">Авторизация в MyFit Admin</div>
          <div className="whiteContainer">
            <div className="text-[14px] font-normal leading-[16px]">
              Войдите, используя номер телефона. Это быстро и безопасно.
            </div>
            <div className="flex flex-row gap-[10px] h-[40px] items-end">
              <TextAndTextfield
                textfieldsMinHeight={"40px"}
                value={phone}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  setPhone(onlyDigits);
                }}
                placeholder={"+7 (900) 855 45-58"}
                logo={phoneSvg}
                isPhoneTextfield={true}
                showLogo={true}
                textfieldHasFocus={phone.length === 11}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendPhoneFunc();
                  }
                }}
              />
              <img className=''
                src={((phone.length === 11 && !isPhoneSent) || anotherPhoneAdded) ? enabledSendSvg :
                  isWaiting ? waitingSendSvg : disabledSendSvg}
                alt=""
                onClick={sendPhoneFunc}
              />
            </div>
          </div>
          {
            isPhoneSent && <div className='flex flex-col gap-[16px] items-center'>
              <div className=" whiteContainer text-[14px] font-normal leading-[16px]">
                Дождитесь смс на свой телефон и введите код из сообщения в поле ниже:
              </div>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
                inputStyle={isOtpError ? "pinputStyleError" : "pinputStyle"}
                shouldAutoFocus={true}
              />
              <div className="flex flex-col gap-1 items-center">
                <div className="text-[14px] font-normal leading-[16px]">
                  Не пришла смс в течении 1 минуты?
                </div>
                {timer !== 0 &&
                  <div className="text-[14px] font-normal leading-[16px] text-blue-text">
                    {`Отправить ещё раз через ${timer}с`}
                  </div>
                }

                {timer === 0 &&
                  <div className="text-[14px] font-normal leading-[16px] text-blue-text cursor-pointer"
                    onClick={() => {
                      setResetCode(true);
                      setTimer(59);
                    }}>
                    Отправить ещё раз
                  </div>
                }
              </div>
            </div>
          }
        </div>
        <img className='absolute bottom-0 w-full h-[300px] object-cover' src={wave} alt="" />
      </>
      }
    </div >
  )
}
