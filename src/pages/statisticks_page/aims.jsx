import React from 'react'
import './styles.css'
import DoneOutlined from "../../assets/svg/done_outlined.svg"

export default function Aims() {
  return (
    <div className='flex flex-row gap-[10px]'>


        <div className="card">
            <div className="flex flex-col gap-[10px]">
                <span className='text-[14px] font-medium'>Получить 12 новых посетителей</span>
                {getIndicator({ current: 6, total: 12 })}
            </div>
        </div>


        <div className="card">
            <div className="flex flex-col gap-[10px]">
                <div className="flex flex-row gap-[10px]">
                    <img src={DoneOutlined} alt="DoneOutlined" />
                    <span className='text-[14px] font-medium'>Выполнено! Получено 8 постоянных клиентов.</span>
                </div>
                {getIndicator({ current: 12, total: 12 })}
            </div>
        </div>

        
    </div>
  )
}

function getIndicator({ current, total }) {
    return (
        <div className="flex flex-row gap-[10px] items-center">
            <span className='text-[14px] font-medium whitespace-nowrap'>{`${current} из ${total}`}</span>
            {current === total &&
                <div className="buttonCongrats">
                    <span className='text-white text-[14px] font-medium'>Получить награду!</span>
                </div>
            }
            {current !== total &&
                <div className="indicatorBg">
                    <div className="indicator" style={{ width: `${(6 / 12 * 100)}%` }}>
                        <div className="cirlce"></div>
                    </div>
                </div>
            }
        </div>
    )
}