import React from 'react'
import './styles.css'
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'

export default function VisitsSummary() {
  const [data, setData] = React.useState([12600, 9800, 3400, 5989, 2344, 3090, 1012, 5000, 7000, 8000, 9000, 10000, 2000]);
  const [labels, setLabels] = React.useState(['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', "Октябрь", "Ноябрь", "Декабрь", "Январь", "Февраль", "25 Март"]);
  return (
    <div className='flex flex-col gap-[16px] mt-[32px]'>
        <span className='text-[14px] font-bold'>Сводка по посещениям:</span>
      <div style={{ maxHeight: "250px" }}>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: '',
                data: data,
                backgroundColor: 'rgba(119, 170, 249, 1)',
                borderColor: 'rgba(119, 170, 249, 1)',
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false,
                categoryPercentage: 0.8
              },
            ],
          }}
          height={"250px"}
          width={900}
          options={{
            //responsive: true,
            //maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
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
                    size: 10,
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
                    size: 10,
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
  )
}
