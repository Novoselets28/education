import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js';

import { GET_CHARACTERS } from '../apollo/people';

// Register the required elements and controllers
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

const Chart = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  useEffect(() => {
    if (data) {
      // Register the 'doughnut' controller and set its alias to 'doughnut'
      ChartJS.register({
        id: 'doughnut',
        beforeInit: (chart, options) => {
          const doughnutDefaults = ChartJS.getScaleDefaults('doughnut');
          const overrides = options.scales;
          Object.assign(doughnutDefaults, overrides);
          chart.doughnut = new ChartJS.registry.controllers.doughnut(chart, doughnutDefaults);
        }
      });
    }
  }, [data]);

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
