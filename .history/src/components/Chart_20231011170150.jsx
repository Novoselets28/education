import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, Title, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

import { GET_CHARACTERS } from '../apollo/people';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, Title, TimeScale);

const CharacterCreationChart = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [lineChartData, setLineChartData] = useState(null);
  const [lineChartOptions, setLineChartOptions] = useState(null);

  useEffect(() => {
    if (loading || error) return;

    const characterData = data.characters.results;

    // Filter characters created in 2017
    const characterData2017 = characterData.filter((character) => {
      const createdDate = new Date(character.created);
      return createdDate.getFullYear() === 2017;
    });

    const chartData = {
      labels: characterData2017.map((character) => character.name),
      datasets: [
        {
          label: 'Created Date',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
          data: characterData2017.map((character) => new Date(character.created).getTime())
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
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM DD, YYYY HH:mm'
            },
            title: {
              display: true,
              text: 'Creation Date'
            }
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
    </div>
  );
};

export default CharacterCreationChart;
