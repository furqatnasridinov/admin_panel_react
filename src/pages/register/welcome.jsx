import React from 'react'
import myfit from "../../assets/svg/myfit.svg"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppConstants from '../../config/app_constants';

export default function WelcomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const nextLink = localStorage.getItem(AppConstants.keyRoleId) === "5" ? "/schedulePage" : "/myGymsPage";
            // Перенаправляем пользователя
            window.history.pushState({}, "", nextLink);
            // Перезагружаем страницу
            window.location.reload();
        }, 3500);
    }, []);

    return (
        <div className='flex flex-col gap-[40px] justify-center items-center h-screen  overflow-y-hidden'>
            <div className="text-[16px] font-medium leading-[16px]">
                Добро пожаловать в команду
            </div>
            <img src={myfit} alt="" />
        </div>
    )
}
