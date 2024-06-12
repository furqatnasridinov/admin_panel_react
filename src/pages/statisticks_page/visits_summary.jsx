import React from 'react'
import './styles.css'
/* import Chart from 'chart.js/auto'; */
import { Bar } from 'react-chartjs-2'
import { useRef } from 'react';
import nextButton from "../../assets/images/nextButtonStats.svg";
import { getMonthWord, getTranslatedDayAndMonth } from '../../config/apphelpers';

export default function VisitsSummary({selectedPeriod, stat, loading}) {
  const barRef = useRef(null);

    // functions
    const handleNextButtonClick = () => {
      const ref = barRef.current;
      var len = ref.config.data.labels.length;
      var Xmax = ref.config.options.scales.x.max;
      if (Xmax >= len) {
        return;
      }
      ref.config.options.scales.x.min += 4;
      ref.config.options.scales.x.max += 4;
      ref.update();
      console.log(ref);
    }
    
    const handlePrevButtonClick = () => {
      const ref = barRef.current;
      var Xmin = ref.config.options.scales.x.min;
      if (Xmin <= 1) {
        return;
      }
      ref.config.options.scales.x.min -= 4;
      ref.config.options.scales.x.max -= 4;
      ref.update();
      console.log(ref);
    }

  const data = Object.values(stat?.summaryVisitors);
  const labels = loading ? Object.keys(stat?.summaryVisitors).map(key => "") :
  selectedPeriod === "year" ? 
  Object.keys(stat?.summaryVisitors).map(key => getMonthWord(key)) : selectedPeriod === "month" ? 
  Object.keys(stat?.summaryVisitors).map(key => getTranslatedDayAndMonth(key)) : selectedPeriod === "week" ?
  Object.keys(stat?.summaryVisitors).map(key => getTranslatedDayAndMonth(key)) :
  Object.keys(stat?.summaryVisitors).map(key => getFormattedTime(key));

  return (
    console.log(),
    <div className="flex flex-row gap-[20px] items-center w-full">

      <div style={{width : "96%"}} className='flex flex-col mt-[32px] gap-4 '>
        <span className='text-[14px] font-bold'>Сводка по посещениям:</span>

        {/* loading ? <BarSkeleton /> : */
          <div >
          <Bar
            style={{
              //backgroundColor: "red",
            }}
            ref={barRef}
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
            //width={"100%"}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
              },
              scales: {
                x: {
                  min: 0,
                  max : 16,
                  barThickness: "flex",
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
                  min: 0,
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
      return "1000px";
    case "week":
      return "600px";
    case "day":
      return "1000px";
  }
}

function getFormattedTime(time){
  // from 1:00 to 01:00
  return time.split(":").map(el => el.length === 1 ? "0" + el : el).join(":");
}

 function timeSkeleron() {
  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="w-[20px] h-[7px] bg-skeleton-main"></div>
      <div className="w-full h-[1px] bg-bg-color"></div>
    </div>
  );
}