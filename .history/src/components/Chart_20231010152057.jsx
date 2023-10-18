import React from 'react';
// eslint-disable-next-line max-len
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, TimeScale } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import 'chartjs-adapter-date-fns';

import { GET_CHARACTERS } from '../apollo/people';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, TimeScale);

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

  const creationDates = data.characters.results.map((character) => new Date(character.created));

// Create a map to count characters created on each date
const creationCountsMap = new Map();
creationDates.forEach((date) => {
  const formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  if (!creationCountsMap.has(formattedDate)) {
    creationCountsMap.set(formattedDate, 1);
  } else {
    const currentCount = creationCountsMap.get(formattedDate);
    creationCountsMap.set(formattedDate, currentCount + 1);
  }
});

// Convert the map to an array of objects with x (date) and y (character count) properties
const creationCounts = Array.from(creationCountsMap).map(([date, count]) => ({
  x: date,
  y: count
}));

// Sort the data by date
creationCounts.sort((a, b) => new Date(a.x) - new Date(b.x));



  // Prepare data for Line chart
  // Prepare data for Line chart
const chartDataCreation = {
  labels: creationCounts.map((dataPoint) => dataPoint.x), // Use an array of dates as labels
  datasets: [
    {
      label: 'Creation Date',
      data: creationCounts, // Use the array of objects with x and y properties
      borderColor: 'Green',
      fill: false,
      borderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }
  ]
};


  const optionsCreation = {
    scales: {
      x: {
        type: 'time', // Set x-axis as a time scale
        time: {
          unit: 'month', // Display data by day
          displayFormats: {
            day: 'yyyy-MM' // Use lowercase letters for year, month, and day
          }
        },
        title: {
          display: true,
          text: 'Creation Date'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Creation Count'
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
