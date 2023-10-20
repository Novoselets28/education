import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Doughnut, Line } from 'react-chartjs-2';
import { Box, Container } from '@mui/material';

import { GET_CHARACTERS } from '../../apollo/people';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement, TimeScale);

interface Character {
  name: string;
  created: string;
  gender: string;
}

interface ChartDataSets {
  label?: string;
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  data: (number | number[] | null | undefined)[];
}

interface ChartData {
  labels: string[];
  datasets: ChartDataSets[];
}

interface ChartOptions {
  scales: {
    x: {
      type: 'category';
      title: {
        display: boolean;
        text: string;
      };
    };
    y: {
      type: 'time';
      time: {
        unit: 'day';
        displayFormats: {
          day: string;
        };
        title: {
          display: boolean;
          text: string;
        };
        min: Date;
        max: Date;
      };
    };
  };
}

const CharacterCreationChart: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [lineChartData, setLineChartData] = useState<ChartData | null>(null);
  const [lineChartOptions, setLineChartOptions] = useState<ChartOptions | null>(null);

  useEffect(() => {
    if (loading || error) return;

    const characterData: Character[] = data.characters.results;

    const characterData2017 = characterData.filter((character) => {
      const createdDate = new Date(character.created);
      return createdDate.getFullYear() === 2017;
    });

    const chartData: ChartData = {
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

    const minDate = new Date(Math.min(...characterData2017.map((character) => new Date(character.created).getTime())));
    const maxDate = new Date('2017-11-05');

    const chartOptions: ChartOptions = {
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
              day: 'MMM dd, yyyy'
            },
            title: {
              display: true,
              text: 'Creation Date'
            },
            min: minDate,
            max: maxDate
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

  const maleCount = data.characters.results.filter((character: Character) => character.gender === 'Male').length;
  const femaleCount = data.characters.results.filter((character: Character) => character.gender === 'Female').length;
  const unknownCount = data.characters.results.filter((character: Character) => character.gender === 'unknown').length;

  const doughnutChartData: ChartData = {
    labels: ['Male', 'Female', 'Unknown'],
    datasets: [
      {
        label: 'Gender Rate',
        data: [maleCount, femaleCount, unknownCount],
        borderColor: ['Blue', 'Pink', 'Yellow'],
        borderWidth: 1
      }
    ]
  };

  return (
    <Container maxWidth="md">
      <Box sx={{
        width: 700,
        height: 700
      }}>
        {lineChartData && lineChartOptions && (
          <Line data={lineChartData} options={lineChartOptions} />
        )}
      </Box>
      <Box sx={{
        width: 700,
        height: 700
      }}>
        <Doughnut data={doughnutChartData} />
      </Box>
    </Container>
  );
};

export default CharacterCreationChart;
