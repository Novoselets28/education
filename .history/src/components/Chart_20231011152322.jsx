import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Doughnut, Line } from 'react-chartjs-2';

import { GET_CHARACTERS } from '../apollo/people';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement, TimeScale);

const CharacterCreationChart = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [lineChartData, setLineChartData] = useState(null);
  const [lineChartOptions, setLineChartOptions] = useState(null);

  useEffect(() => {
    if (loading || error) return;

    const characterData = data.characters.results;

    const filteredCharacterData = characterData.filter((character) => {
      const createdDate = new Date(character.created);
      const day = createdDate.getDate();
      const hours = createdDate.getHours();
      return `${character.name} (Day ${day}, ${hours}h)`;
    });
       

    const chartData = {
      labels: filteredCharacterData.map((character) => character.name),
      datasets: [
        {
          label: 'Created Date',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
          data: filteredCharacterData.map((character) => {
            let time = new Date(character.created);
            let date = new Date(time);
            return date;
            })
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

  const doughnutChartData = {
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

  const doughnutChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
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
      <div style={chartSize}>
        {lineChartData && lineChartOptions && (
          <Line data={lineChartData} options={lineChartOptions} />
        )}
      </div>
      <div style={chartSize}>
        <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
      </div>
    </div>
  );
};

export default CharacterCreationChart;
