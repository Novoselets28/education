import { useQuery } from '@apollo/client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

import { GET_CHARACTERS } from '../apollo/people';

ChartJS.register(BarElement, LinearScale, CategoryScale);

const Chart = () => {
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
      <Bar data={chartData} height={400} options={options} />
    </div>
  );
};

export default Chart;
