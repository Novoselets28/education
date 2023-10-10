import React from 'react';
import { Bar } from 'react-chartjs-2';



const Chart = () => {

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Bar
        data={data}
        height={400}
        options={options}
      />
    </div>
  );
};

export default Chart;