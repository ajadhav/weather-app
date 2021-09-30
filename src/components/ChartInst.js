import React from 'react';

/*
    hourly
    dt
    temp
    description
    windspd
*/
const updateDataset = (datasetIndex, newData) => {
  chartInstance.data.datasets[datasetIndex].data = newData;
  chartInstance.update();
};

const Chart = ({ chartContainer }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const chartData = {
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          type: 'line',
          label: 'Temperature',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          type: 'bar',
          label: '',
          data: [0, 0, 1, 0, 21, 24],
          fill: true,
          borderColor: 'rgb(75,192,192)',
        },
      ],
    },
    options: {},
  };
  const chartConfig = {
    type: 'line',
    data: chartData,
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);
  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Chart;
