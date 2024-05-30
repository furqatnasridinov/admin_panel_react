import React from 'react'
import './styles.css'
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2'
import heart from "../../assets/svg/heartInChart.svg";
import { getColorOfActivity } from '../../config/apphelpers';

export default function Visitors() {
const data = [
    {
        tag : "Бассейн",
        count : 5,   
        color : 'rgba(119, 170, 249, 1)' 
    },
    {
        tag : "Смешанные единоборства",
        count : 3,   
        color : 'rgba(255, 136, 136, 1)' 
    },
    {
        tag : "Массаж",
        count : 2,  
        color : 'rgba(62, 134, 245, 1)'  
    },
    {
        tag : "Фитнес",
        count : 1,    
        color : 'rgba(255, 136, 136, 1)'
    },
    {
        tag : "Йога",
        count : 1,
        color : 'rgba(62, 134, 245, 1)'
    }
];

  return (
    <div className='flex flex-col gap-[16px] mt-[32px]'>
        <span className='text-[14px] font-bold'>Посетители:</span>
        <div className="flex flex-row gap-[16px]">
              <div style={{ 
                width: "291px",
                height: "124px",
                backgroundColor : "rgba(245, 249, 255, 1)",
                borderRadius : "16px",
                paddingTop : "16px",
                paddingLeft : "32px",
                paddingRight : "32px",
                paddingBottom : "16px",
                display : "flex",
                flexDirection : "column", 
                gap : "16px"
                }}>
                <span className='text-nowrap text-[14px] font-medium'>Популярные направления</span>
                  <div className="flex flex-row gap-[20px]">
                    <div className='donutBg'>
                        <Doughnut
                            data={{
                                labels: data.map((item) => item.tag),
                                datasets: [
                                    {
                                        data: data.map((item) => item.count),
                                        //borderColor: "transparent",
                                        backgroundColor: data.map((item) => getColorOfActivity({activityName : item.tag})),
                                    },
                                ],
                            }}
                            width={"100%"}
                            height={"100%"}
                            options={{
                                cutout: 20,
                                plugins: {
                                    tooltip: {
                                        enabled: false,  // отключить всплывающие подсказки
                                    },
                                    legend: {
                                    display: false
                                    }
                                },
                            }}
                        />
                        <img className='centerIcon' src={heart} alt="heart" />
                    </div>
                      <div className="h-[62px] w-full flex flex-wrap gap-1">
                          {data.map((item, index) => {
                              return (
                                  <div key={index} className="flex flex-row gap-[4px] items-center">
                                      <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: getColorOfActivity({ activityName: item.tag }) }}></div>
                                      <span className='text-[10px] font-medium'>{item.tag}</span>
                                  </div>
                              )
                          })}
                      </div>
                  </div>
              </div>

              <div className="secondaryCard">
                <div className="flex flex-col gap-[10px]">
                    <span className='text-[20px] font-semibold leading-[16px]'>Всего посетителей :</span>
                    <span className='text-[20px] font-semibold leading-[16px]'>12 658</span>
                </div>
              </div>

            <div className="secondaryCard">
            <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[5px]">
                    <span className='text-[20px] font-semibold leading-[16px]'>7 965</span>
                    <span className='text-[14px] font-medium'>Пришли впервые :</span>
                </div>
                <div className="flex flex-col gap-[5px]">
                    <span className='text-[20px] font-semibold leading-[16px]'>73 раза</span>
                    <span className='text-[14px] font-medium'>Записались, но не пришли :</span>
                </div>
                </div>
            </div>
            
        </div>
        <div className="flex flex-row gap-[16px]">
              <div style={{maxWidth : "160px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[20px] font-semibold leading-[16px]'>354</span>
                      <span className='text-[14px] font-medium leading-[16px]'>Занимаются прямо сейчас</span>
                  </div>
              </div>
              <div style={{maxWidth : "260px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[20px] font-semibold leading-[16px]'>42</span>
                      <span className='text-[14px] font-medium leading-[16px]'>Пользователя стали постоянными посетителями</span>
                  </div>
              </div>
        </div>
    </div>
  )
}


