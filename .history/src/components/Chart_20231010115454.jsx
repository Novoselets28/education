import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useQuery, ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Chart as ChartJS, BarElement, CategoryScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale);

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        name
        status
      }
    }
  }
`;

const Chart = () => {
  const [chartData, setChartData] = useState({});

  const { loading, error, data } = useQuery(GET_CHARACTERS, { client });

  useEffect(() => {
    if (data && data.characters && data.characters.results) {
      const labels = data.characters.results.map((character) => character.name);
      const votes = data.characters.results.map((character) =>
        character.status === 'Alive' ? 1 : 0
      );

      const chartData = {
        labels,
        datasets: [
          {
            label: '# of Votes',
            data: votes,
            borderWidth: 1,
            backgroundColor: [
              'Red',
              'Blue',
              'Yellow',
              'Green',
              'Purple',
              'Orange'
            ]
          }
        ]
      };

      setChartData(chartData);
    }
  }, [data]);

  const options = {
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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Bar data={chartData} height={400} options={options} />
      )}
    </div>
  );
};

export default Chart;
