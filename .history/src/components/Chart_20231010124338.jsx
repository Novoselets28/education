import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';

import { GET_CHARACTERS } from '../apollo/people';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

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

  const chartDataGender = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Rate',
        data: [maleCount, femaleCount],
        backgroundColor: ['Blue', 'Pink'],
        borderWidth: 1
      }
    ]
  };

  const optionsGender = {
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

  // Extract creation dates and counts
  const creationDates = data.characters.results.map((character) => character.created.substring(0, 10));
  const creationCounts = creationDates.reduce((countMap, date) => {
    countMap[date] = (countMap[date] || 0) + 1;
    return countMap;
  }, {});

  // Sort the data by date
  const sortedCreationDates = Object.keys(creationCounts).sort();
  const creationData = sortedCreationDates.map((date) => creationCounts[date]);

  const chartDataCreation = {
    labels: sortedCreationDates,
    datasets: [
      {
        label: 'Characters Created',
        data: creationData,
        borderColor: 'Green',
        borderWidth: 1,
        fill: false
      }
    ]
  };

  const optionsCreation = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Date Created'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Character Count'
        }
      }
    }
  };

  return (
    <div>
      <div className="chart-container">
        <Doughnut data={chartDataGender} options={optionsGender} width={200} height={200} />
      </div>
      <div className="chart-container">
        <Line data={chartDataCreation} options={optionsCreation} width={400} height={200} />
      </div>
    </div>
  );
};

export default Chart;
