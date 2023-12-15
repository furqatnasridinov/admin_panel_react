import "../../index.css"
import statsLogo from "../../assets/svg/statictics.svg"
import locationIcon from "../../assets/svg/location.svg"
import calendarLogo from "../../assets/svg/calendar.svg"
import settingsLogo from "../../assets/svg/settings.svg"
import questionLogo from "../../assets/svg/question.svg"

function MainPage() {
    return (
        <div className="flex flex-row bg-bg-color p-[10px]">

            <div className="w-[225px] h-[98vh]  bg-red-300 rounded-[16px] flex flex-col">


                <div className="  mt-[16px]  py-[10px] px-[16px] flex flex-row gap-[10px] items-center">

                    <div className="p-[5px] rounded-[6px] ">
                        <img src={locationIcon} alt="" />
                    </div>

                    <div className="text-black text-sm">ИП Пасечник</div>
                </div>

                <div className="mt-[18px] px-[16px] opacity-50">
                    <hr />
                </div>


                <div className="flex flex-col  justify-between">

                    <div className="flex flex-col">

                        <div className="mt-[16px] flex flex-row gap-[10px] items-center px-[16px] py-[10px]">

                            <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                <img src={statsLogo} alt="" />
                            </div>
                            <div className="text-sm">Статистика</div>

                        </div>

                        <div className="mt-[16px] flex flex-row gap-[10px] items-center px-[16px] py-[10px]">

                            <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                <img src={locationIcon} alt="" />
                            </div>
                            <div className="text-sm">Мои заведения</div>

                        </div>

                        <div className="mt-[16px] flex flex-row gap-[10px] items-center px-[16px] py-[10px]">

                            <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                <img src={calendarLogo} alt="" />
                            </div>
                            <div className="text-sm">Расписание</div>

                        </div>
                    </div>


                    <div className="flex flex-col">

                        <div className="mt-[16px] flex flex-row gap-[10px] items-center px-[16px] py-[10px]">

                            <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                <img src={questionLogo} alt="" />
                            </div>
                            <div className="text-sm">Помощь</div>

                        </div>

                        <div className="mt-[16px] flex flex-row gap-[10px] items-center px-[16px] py-[10px]">

                            <div className="bg-bg-color p-[5px] rounded-[6px] ">
                                <img src={settingsLogo} alt="" />
                            </div>
                            <div className="text-sm">Настройки</div>

                        </div>

                    </div>

                </div>


            </div>



            <div className="flex flex-col flex-1 pl-[10px] gap-[10px]">

                <div className="pl-[35px] pr-[19px] py-[18px] bg-white flex justify-between items-center rounded-[16px] ">

                    <div className="text-black text-sm">Ваши заведения</div>

                    <button className="w-[203px] h-[46px]  rounded-[8px] border-[1px] border-blue-border text-white bg-button-color shadow-custom">
                        <div className="text-white text-sm">Добавить</div>
                    </button>

                </div>

                <div className="p-7 text-2xl text-blue-400 bg-white h-full rounded-xl">

                    <h1>Body</h1>

                </div>
            </div>

        </div>
    );
}

export default MainPage;
