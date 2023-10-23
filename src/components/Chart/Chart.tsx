import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import 'chartjs-adapter-date-fns';
import { Doughnut, Line } from 'react-chartjs-2';

import { Box, Container } from '@mui/material';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  LineElement,
  PointElement,
  TimeScale,
  Point
} from 'chart.js';

import { GET_CHARACTERS } from '../../apollo/people';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, LineElement, PointElement, TimeScale);

interface ChartOptions {
  maintainAspectRatio: boolean;
  scales: {
    x: {
      type: string;
      title: {
        display: boolean;
        text: string;
      };
    };
    y: {
      type: string;
      time: {
        unit: string;
        displayFormats: {
          day: string;
        };
        title: {
          display: boolean;
          text: string;
        };
      };
      min: Date;
      max: Date;
    };
  };
}

interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    borderColor: string;
    borderWidth: number;
    fill: boolean;
    data: (number | Point | null)[];
  }[];
}

const CharacterCreationChart: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [lineChartData, setLineChartData] = useState<LineChartData | null>(null);
  const [lineChartOptions, setLineChartOptions] = useState<ChartOptions | null>(null);


  useEffect(() => {
    if (loading || error) return;

    const characterData: any[] = data.characters.results;

    const characterData2017 = characterData.filter((character: any) => {
      const createdDate = new Date(character.created);
      return createdDate.getFullYear() === 2017;
    });

    const chartData: LineChartData = {
        labels: characterData2017.map((character: any) => character.name),
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
              day: 'MMM dd, yyyy'
            },
            title: {
              display: true,
              text: 'Creation Date'
            }
          },
          min: minDate,
          max: maxDate 
        }
      }
    };
    
    
    setLineChartData(chartData);
    setLineChartOptions(chartOptions);
      }, [data, loading, error]);

  const maleCount = data.characters.results.filter((character: any) => character.gender === 'Male').length;
  const femaleCount = data.characters.results.filter((character: any) => character.gender === 'Female').length;
  const unknownCount = data.characters.results.filter((character: any) => character.gender === 'unknown').length;

  const doughnutChartData = {
    labels: ['Male', 'Female', 'Unknown'],
    datasets: [
      {
        label: 'Gender Rate',
        data: [maleCount, femaleCount, unknownCount],
        backgroundColor: ['Blue', 'Pink', 'Yellow'],
        borderWidth: 1
      }
    ]
  };
  
  const doughnutChartOptions = {
    maintainAspectRatio: false,
    responsive: true
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          width: 700,
          height: 700
        }}
      >{lineChartData && lineChartOptions && (
        <Line data={lineChartData} options={lineChartOptions} />
        )}
      </Box>
      <Box
        sx={{
          width: 700,
          height: 700
        }}
      >
        <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
      </Box>
    </Container>
  );
};

export default CharacterCreationChart;