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

  // Count character creations for each date
  const creationCounts = creationDates.map((date) => ({
    x: date,
    y: 1 // Set count to 1 for each character
  }));

  // Prepare data for Line chart
  const chartDataCreation = {
    labels: Object.keys(creationCounts),
    datasets: [
      {
        label: 'Creation Date',
        data: creationCounts,
        borderColor: 'Green', // Customize line color
        fill: false, // Remove fill
        borderWidth: 2, // Adjust line width
        pointRadius: 5, // Customize point size
        pointHoverRadius: 7 // Customize point size on hover
      }
    ]
  };

  const optionsCreation = {
    scales: {
      x: {
        type: 'time', // Set x-axis as a time scale
        time: {
          unit: 'day', // Display data by day
          displayFormats: {
            day: 'yyyy-MM-dd' // Use lowercase letters for year, month, and day
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
