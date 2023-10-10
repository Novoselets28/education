import React from 'react';
import { Chart as ChartJS, CategoryScale } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register( CategoryScale);

const Chart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
    }]
  };

  const options = {
    scales: {
      x: {
        type: 'polarArea',
        beginAtZero: true
      },
      y: {
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
