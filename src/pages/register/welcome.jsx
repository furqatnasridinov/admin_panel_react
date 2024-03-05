import React from 'react'
import myfit from "../../assets/svg/myfit.svg"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function WelcomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            // Перенаправляем пользователя
            window.history.pushState({}, "", "/myGymsPage");
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
