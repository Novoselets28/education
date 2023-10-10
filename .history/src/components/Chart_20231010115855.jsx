import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data }) => {
  if (!data || !data.characters || !data.characters.results) {
    // Handle the case when data is not available yet
    return <p>Loading...</p>;
  }

  const chartData = {
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
        type: 'category',
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Bar
        data={chartData}
        height={400}
        options={options}
      />
    </div>
  );
};

export default Chart;
