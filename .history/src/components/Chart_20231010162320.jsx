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
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineController } from 'chart.js';

import { GET_CHARACTERS } from '../apollo/people';

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineController);


const CharacterCreationChart = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Access the data from data.data
  const characterData = data.characters.results;

  // Prepare the data for the chart
  const chartData = {
    labels: characterData.map((character) => character.name),
    datasets: [
      {
        label: 'Created Date',
        fill: false, // This ensures it's a line chart
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderWidth: 1,
        pointRadius: 4,
        data: characterData.map((character) => character.created)
      }
    ]
  };
  

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: [
        {
          type: 'category',
          scaleLabel: {
            display: true,
            labelString: 'Characters'
          }
        }
      ],
      y: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Created Date'
          }
        }
      ]
    }
  };
  

  return (
    <div>
      <Line // Use Line instead of Bar
        data={chartData}
        width={100}
        height={50}
        options={options}
      />
    </div>
  );
};

export default CharacterCreationChart;

