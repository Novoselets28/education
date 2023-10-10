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
import { Bar } from 'react-chartjs-2';

import { GET_CHARACTERS } from '../apollo/people';

const CharacterCreationChart = () => {

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  // Prepare the data for the chart
  const chartData = {
    labels: data.map((character) => character.name),
    datasets: [
      {
        label: 'Created Date',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: data.map((character) => character.created)
      }
    ]
  };

  return (
    <div>
      <Bar
        data={chartData}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: [
              {
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
        }}
      />
    </div>
  );
};

export default CharacterCreationChart;
