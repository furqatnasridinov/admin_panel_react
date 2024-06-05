import React from 'react'
import './styles.css'
/* import Chart from 'chart.js/auto'; */
import { Bar } from 'react-chartjs-2'
import { useRef } from 'react';
import nextButton from "../../assets/images/nextButtonStats.svg";
import { getMonthWord, getTranslatedDayAndMonth } from '../../config/apphelpers';
import BarSkeleton from './bar_skeleton';

export default function VisitsSummary({selectedPeriod, stat, loading}) {
  const scrollContainerRef = useRef(null);


    // functions
    const handleNextButtonClick = () => {
      if (scrollContainerRef.current) {
        const node = scrollContainerRef.current;
        const toScroll = 350;  // сколько прокрутить
    
        // сначала прокрутить
        node.scrollTo({
          left: node.scrollLeft + toScroll,
          behavior: 'smooth'
        });
    
        // затем проверить, достигли ли конца
        const maxScrollLeft = node.scrollWidth - node.clientWidth;  // максимальное значение scrollLeft
      }
    }
    
    const handlePrevButtonClick = () => {
      if (scrollContainerRef.current) {
        const node = scrollContainerRef.current;
    
        // сначала прокрутить
        node.scrollTo({
          left: node.scrollLeft - 350,
          behavior: 'smooth'
        });
  
      }
    }

  const data = Object.values(stat?.summaryVisitors);
  const labels = selectedPeriod === "year" ? 
  Object.keys(stat?.summaryVisitors).map(key => getMonthWord(key)) : selectedPeriod === "month" ? 
  Object.keys(stat?.summaryVisitors).map(key => getTranslatedDayAndMonth(key)) : selectedPeriod === "week" ?
  Object.keys(stat?.summaryVisitors).map(key => getTranslatedDayAndMonth(key)) :
  Object.keys(stat?.summaryVisitors).map(key => getFormattedTime(key));

  return (
    <div style={{/* width : "65%" */}} className="flex flex-row gap-[20px] items-center">
      <div ref={scrollContainerRef} className='scrollableBlock'>
        <span className='text-[14px] font-bold'>Сводка по посещениям:</span>

        {loading ? <BarSkeleton /> :
          <div style={{maxHeight: "250px", display : "flex", flexDirection : "row", width : getMaxWidth(selectedPeriod)}}>
          <Bar
            data={{
              labels: labels,
              datasets: [
                {
                  data: data,
                  backgroundColor: 'rgba(119, 170, 249, 1)',
                  borderColor: 'rgba(119, 170, 249, 1)',
                  borderWidth: 1,
                  maxBarThickness: 50,
                  borderRadius: 8,
                  borderSkipped: false,
                  barThickness: 50,
                },
              ],
            }}
            //height={"250px"}
            //width={400}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                zoom: {
                  pan: {
                    enabled: true
                  },
                  zoom: {
                    enabled: true
                  }
              }
              },
              scales: {
                x: {
                  barThickness: 50,
                  border: {
                    display: false,
                  },
                  grid: {
                    display: false,
                    drawOnChartArea: false,
                  },
                  ticks: {
                    // Даты
                    color: 'black',
                    font: {
                      size: 14,
                      lineHeight: 1.2,
                      weight: 'normal',
                      family: 'Raleway'
                    }
                  },
                },
                y: {
                  max: data.reduce((a, b) => Math.max(a, b)),
                  border: {
                    display: false,
                  },
                  grid: {
                    color: 'rgba(245, 249, 255, 1)',  // цвет линий сетки на оси Y
                    borderDash: [5, 5],  // стиль линий сетки на оси Y
                  },
                  ticks: {
                    // Цыфры
                    color: 'black',
                    font: {
                      size: 10,
                      lineHeight: 1.2,
                      weight: 'normal',
                      family: 'Raleway'
                    },
                    stepSize: 1 
                  }
                }
              }
            }}
          />
        </div>
        }
      </div>
      {/* buttons */}
      {(selectedPeriod === "month" || selectedPeriod === "day") &&  !loading && 
        <div className="flex flex-col gap-4">
          <img
            style={{
              cursor: 'pointer',
            }}
            src={nextButton} onClick={handleNextButtonClick} >
          </img>

          <img
            style={{
              cursor: 'pointer',
              rotate: '180deg',
            }}
            src={nextButton} onClick={handlePrevButtonClick} >
          </img>
        </div>
      }
    </div>
  )
}

function getMaxWidth(selectedPeriod) {
  switch (selectedPeriod) {
    case "year":
      return "1000px";
    case "month":
      return "2100px";
    case "week":
      return "600px";
    case "day":
      return "1500px";
  }
}

function getFormattedTime(time){
  // from 1:00 to 01:00
  return time.split(":").map(el => el.length === 1 ? "0" + el : el).join(":");
}