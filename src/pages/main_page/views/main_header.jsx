import React from 'react'

const MainHeader = () => {
    return (
        <div className="pl-[35px] pr-[19px] py-[18px] bg-white flex justify-between items-center rounded-[16px] ">

            <div className="text-[14px] font-normal">Ваши заведения</div>

            <button className="w-[203px] h-[46px] shadowed_button">
                <div className="text-white text-[16px] font-semibold,">Добавить</div>
            </button>

        </div>
    )
}

export default MainHeader