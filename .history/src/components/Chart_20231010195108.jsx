// import { useQuery } from '@apollo/client';
// import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// import { GET_CHARACTERS } from '../apollo/people';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

// const Chart = () => {
//   const { loading, error, data } = useQuery(GET_CHARACTERS);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   const maleCount = data.characters.results.filter((character) => character.gender === 'Male').length;
//   const femaleCount = data.characters.results.filter((character) => character.gender === 'Female').length;

//   const chartData = {
//     labels: ['Male', 'Female'],
//     datasets: [
//       {
//         label: 'Gender Rate',
//         data: [maleCount, femaleCount],
//         backgroundColor: [
//           'Blue',
//           'Pink'
//         ],
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     scales: {
//       x: {
//         type: 'category',
//         beginAtZero: true
//       },
//       y: {
//         beginAtZero: true
//       }
//     }
//   };

//   return (
//     <div>
//       <Doughnut data={chartData} options={options}/>
//     </div>
//   );
// };

// export default Chart;

import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement } from 'chart.js';

import { Doughnut, Line } from 'react-chartjs-2';

import { GET_CHARACTERS } from '../apollo/people';

// eslint-disable-next-line max-len
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement);

const CharacterCreationChart = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const [lineChartData, setLineChartData] = useState(null);
  const [lineChartOptions, setLineChartOptions] = useState(null);

  useEffect(() => {
    if (loading || error) return;

    const characterData = data.characters.results;

    characterData.forEach((character) => {
      character.createdTimestamp = new Date(character.created).getTime();
      console.log(character.created);
    });

    const chartData = {
      labels: characterData.map((character) => character.name),
      datasets: [
        {
          label: 'Created Date',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
          data: characterData.map((character) => character.createdTimestamp)
        }
      ]
    };

    const chartOptions = {
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time', // Use time scale for x-axis
          time: {
            unit: 'day', // Customize the time unit as needed
            displayFormats: {
              day: 'MMM D' // Format for displaying dates (e.g., Jan 1)
            }
          },
          title: {
            display: true,
            text: 'Created Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Count'
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