import { useQuery } from '@apollo/client';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { BarElement, CategoryScale, LinearScale, Chart as ChartJS } from 'chart.js';

import { GET_CHARACTERS } from '../apollo/people';

// Register the 'doughnut' scale type
ChartJS.register(BarElement, CategoryScale, LinearScale);

const Chart = () => {
  ChartJS.register({
    id: 'doughnut',
    type: 'doughnut'
  });

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const maleCount = data.characters.results.filter((character) => character.gender === 'Male').length;
  const femaleCount = data.characters.results.filter((character) => character.gender === 'Female').length;

  const chartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Rate',
        data: [maleCount, femaleCount],
        backgroundColor: [
          'Blue',
          'Pink' // You can customize colors here
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'doughnut',
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Doughnut data={chartData} height={400} options={options} />
    </div>
  );
};

export default Chart;
