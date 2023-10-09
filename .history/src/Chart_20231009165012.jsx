import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ( data ) => {
    // Define your chart data and options here
    const chartData = {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: 'Species Count',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: data.map((item) => item.species.length)
        }
      ]
    };
  
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  
    return <Bar data={chartData} options={chartOptions} />;
  };

  export default Chart;
  