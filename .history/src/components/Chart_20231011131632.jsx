import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

import { GET_CHARACTERS } from '../apollo/people';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement, TimeScale);

const CharacterCreationChart = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [lineChartData, setLineChartData] = useState(null);
  const [lineChartOptions, setLineChartOptions] = useState(null);

  useEffect(() => {
    if (loading || error) return;

    const characterData = data.characters.results;

    // Filter characters created in November
    const filteredCharacterData = characterData.filter((character) => {
      const createdDate = new Date(character.created);
      return createdDate.getMonth() === 10; // November (0-indexed)
    });

    const chartData = {
      labels: filteredCharacterData.map((character) => character.name),
      datasets: [
        {
          label: 'Created Date',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
          data: filteredCharacterData.map((character) => new Date(character.created).getDate())
        }
      ]
    };

    const chartOptions = {
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Characters'
          }
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Day in November'
          }
        }
      }
    };

    setLineChartData(chartData);
    setLineChartOptions(chartOptions);
  }, [data, loading, error]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const maleCount = data.characters.results.filter((character) => character.gender === 'Male').length;
  const femaleCount = data.characters.results.filter((character) => character.gender === 'Female').length;

  const chartSize = {
    width: '600px',
    height: '600px'
  };

  return (
    <div>
      <div style={chartSize}>
        {lineChartData && lineChartOptions && (
          <Line data={lineChartData} options={lineChartOptions} />
        )}
      </div>
      <div style={chartSize}>
        <p>Male Count: {maleCount}</p>
        <p>Female Count: {femaleCount}</p>
      </div>
    </div>
  );
};

export default CharacterCreationChart;
