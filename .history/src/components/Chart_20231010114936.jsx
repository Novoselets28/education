import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, PolarAreaController } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(Title, PolarAreaController, CategoryScale, LinearScale);

const Chart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#E040FB', '#FF9800'],
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <PolarArea
        data={data}
        height={400}
        options={options}
      />
    </div>
  );
};

export default Chart;
