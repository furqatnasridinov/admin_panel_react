import React from 'react'
import './styles.css'
/* import Chart from 'chart.js/auto'; */
import { Bar } from 'react-chartjs-2'
import { useRef } from 'react';
import nextButton from "../../assets/images/nextButtonStats.svg";
import { DAYS_OF_MONTH, DAYS_OF_WEEK, MONTHS_OF_YEAR } from '../../dummy_data/dymmy_data'

export default function VisitsSummary({selectedPeriod, stat}) {
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

/*   const data = selectedPeriod === "year" ? MONTHS_OF_YEAR.map(month => month[Object.keys(month)[0]]) : selectedPeriod === "month" ? 
      DAYS_OF_MONTH.map(day => day[Object.keys(day)[0]]) : selectedPeriod === "week" ? DAYS_OF_WEEK.map(day => day[Object.keys(day)[0]]) : [12];

  const labels = selectedPeriod === "year" ? MONTHS_OF_YEAR.map(month => Object.keys(month)[0]) : selectedPeriod === "month" ? 
      DAYS_OF_MONTH.map(day => Object.keys(day)[0]) : selectedPeriod === "week" ? DAYS_OF_WEEK.map(day => Object.keys(day)[0]) : ['Сегодня']; */
  const data = Object.values(stat?.summaryVisitors);
  const labels = Object.keys(stat?.summaryVisitors);

  return (
    <div style={{/* width : "65%" */}} className="flex flex-row gap-[20px] items-center">
      <div ref={scrollContainerRef} className='scrollableBlock'>
        <span className='text-[14px] font-bold'>Сводка по посещениям:</span>

        <div style={{ maxHeight: "250px", display : "flex", flexDirection : "row", width : getMaxWidth(selectedPeriod)}}>
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
                    color: 'black',
                    font: {
                      size: 13,
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
                    color: 'black',
                    font: {
                      size: 13,
                      weight: 'normal',
                      family: 'Raleway'
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>
      {/* buttons */}
      {selectedPeriod === "month" &&  
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
      return "900px";
    case "month":
      return "2100px";
    case "week":
      return "600px";
    case "day":
      return "150px";
  }
}
