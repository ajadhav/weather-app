import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
let myChart;
/*
    hourly
    dt
    temp
    description
    windspd
*/
// const ChartInst = ({data}) => {
//   const chartRef = useRef(null);
//   useEffect(() => {
//     if (chartRef.current) {
//       const myChart = new Chart(chartRef.current, {
//         type: 'bar',
//         data: {
//           labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//           datasets: [
//             {
//               label: '# of Votes',
//               data: [12, 19, 3, 5, 2, 3],
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)',
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)',
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   beginAtZero: true,
//                 },
//               },
//             ],
//           },
//         },
//       });
//     }
//   }, []);
//   return (
//     <div>
//       <canvas ref={chartRef} />
//     </div>
//   );
// };

const ChartInst = ({ hourlyData }) => {
  // const hourlyPOP = hourlyData?.map((hour) => hour.pop);
  const hourlyTemp = hourlyData?.map((hour) => hour.temp);
  const hourlyRain = hourlyData?.map((hour) => hour.rain && hour.rain['1h']);
  const chartContainer = useRef(null);
  // const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    const buildChart = () => {
      const cfg = {
        data: {
          datasets: [
            {
              type: 'line',
              label: 'temp',
              data: hourlyTemp,
              borderColor: 'rgb(39,245,144)',
              // yAxisID: 'id1',
            },
            {
              type: 'bar',
              label: 'rain',
              data: hourlyRain,
              fill: true,
              borderColor: 'rgb(39,76,245)',
              backgroundColor: 'rgba(39,76,245,0.5)',
              // yAxisID: 'id2',
            },
          ],
          labels: hourlyData?.map((hour) => {
            return new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              hour12: true,
            })
              .format(new Date(hour?.dt * 1000))
              .replace(/\s+/g, '');
          }),
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                position: 'left',
                type: 'linear',
                scaleLabel: { display: true, labelString: '°' },
                id: 'id1',
              },
              {
                position: 'right',
                type: 'linear',
                scaleLabel: { display: true, labelString: 'mm' },
                grid: { drawOnChartArea: false },
                id: 'id2',
              },
            ],
          },
        },
      };
      const myChartRef = chartContainer.current.getContext('2d');
      if (typeof myChart !== 'undefined') myChart.destroy();
      myChart = new Chart(myChartRef, cfg);
    };
    buildChart();
    return () => myChart.destroy();
  }, [chartContainer, hourlyData]);
  // const updateDataset = (datasetIndex, newData) => {
  //   chartInstance.data.datasets[datasetIndex].data = newData;
  //   chartInstance.update();
  // };

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};
export default ChartInst;
