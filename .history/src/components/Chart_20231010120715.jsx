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

  const chartData = {
    labels: data.characters.results.map((character) => character.name),
    datasets: [
      {
        label: 'Votes',
        data: data.characters.results.map((character) => character.voteCount),
        backgroundColor: [
          'Red',
          'Blue',
          'Yellow',
          'Green',
          'Purple',
          'Orange'
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
