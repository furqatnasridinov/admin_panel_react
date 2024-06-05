import React from 'react'
import './styles.css'
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2'
import heart from "../../assets/svg/heartInChart.svg";
import { getColorOfActivity } from '../../config/apphelpers';

export default function Visitors({stat}) {

  return (
    <div className='flex flex-col gap-[16px] mt-[32px]'>
        <span className='text-[14px] font-bold'>Посетители:</span>
        <div className="flex flex-wrap gap-[16px]">
                {/* Популярные направления donut  */}
                  <div className='popularDestinationsBlock'>
                      <span className='text-nowrap text-[14px] font-medium '>Популярные направления</span>

                      <div className="flex flex-wrap gap-[20px] items-center">
                          <div className='donutBg p-1'>
                              <Doughnut
                                  data={{
                                      labels: stat?.visitByType.map((item) => item?.lessonType),
                                      datasets: [
                                          {
                                              data: stat?.visitByType.map((item) => item.count),
                                              borderRadius: 4,
                                              backgroundColor: stat?.visitByType.map((item) => getColorOfActivity({ activityName: item?.lessonType })),
                                          },
                                      ],
                                  }}
                                  width={"100%"}
                                  height={"100%"}
                                  options={{
                                      cutout: 18,
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
                          <div className="h-[62px] flex flex-wrap gap-1 max-w-[270px] content-center">
                            {/* фильтр по count */}
                              {stat?.visitByType
                              ?.sort((a, b) => b.count - a.count)
                              .map((item, index) => {
                                  return (
                                      <div key={index} className="flex flex-row gap-[4px] items-center">
                                          <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: getColorOfActivity({ activityName: item.lessonType }) }}></div>
                                          <span className='text-[14px] font-medium leading-[16px]'>{item?.lessonType}</span>
                                      </div>
                                  )
                              })}
                          </div>
                      </div>
                  </div>
              
               {/* Всего посетителей */}
              <div className="secondaryCard">
                <div className="flex flex-col gap-[10px]">
                    <span style={{fontWeight : "600"}} className='text-[20px]  leading-[16px] font-raleway'>Всего посетителей :</span>
                    <span className='text-[20px] font-semibold leading-[16px]'>{stat?.allVisits ?? "0"}</span>
                </div>
              </div>

              {/* Пришли впервые */}
            <div className="secondaryCard flex items-center justify-center">
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[5px]">
                        <span className='text-[20px] font-semibold leading-[16px]'>{stat?.firstVisited ?? "0"}</span>
                        <span className='text-[14px] font-medium leading-[16px]'>Пришли впервые</span>
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <span className='text-[20px] font-semibold leading-[16px]'>{`${stat?.enrolledButNotVisited ?? "0"} ${getFormattedWord(stat?.enrolledButNotVisited)}`}</span>
                        <span className='text-[14px] font-medium leading-[16px]'>Записались, но не пришли</span>
                    </div>
                </div>
            </div>
            
            {/* Занимаются прямо сейчас */}
            <div style={{maxWidth : "160px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                      <span className='text-[20px] font-semibold leading-[16px]'>{stat?.visitingNow ?? "0"}</span>
                      <span className='text-[14px] font-medium leading-[16px]'>Занимаются прямо сейчас</span>
                  </div>
            </div>

            {/* Пользователя стали постоянными посетителями  */}
              <div style={{maxWidth : "260px"}} className="secondaryCard">
                  <div className="flex flex-col gap-[5px]">
                    <span className='text-[20px] font-semibold leading-[16px]'>{stat?.regularVisitors ?? "0"}</span>
                    <span className='text-[14px] font-medium leading-[16px]'>Пользователя стали постоянными посетителями</span>
                  </div>
             </div>
        </div>
    </div>
  )
}

function getFormattedWord(count){
    // 1 раз, 2 раза, 5 раз, 20 раз, 21 раз, 70 раз, 101 раз
    const lastDigit = count % 10;
    if (lastDigit === 1) {
        return "раз";
    } else if (lastDigit > 1 && lastDigit < 5) {
        return "раза";
    } else {
        return "раз";
    }
}
