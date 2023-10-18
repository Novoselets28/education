import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import 'chartjs-adapter-date-fns';
import { DateTime } from 'luxon';

import { GET_CHARACTERS } from '../apollo/people';

const Chart = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const [chartData, setChartData] = useState({}); // Initialize with an empty object

  useEffect(() => {
    if (!loading && !error) {
      const creationDates = data.characters.results.map((character) => {
        return DateTime.fromISO(character.created).toJSDate();
      });

      const creationCounts = {};
      creationDates.forEach((date) => {
        const formattedDate = date.toISOString().split('T')[0];
        if (!creationCounts[formattedDate]) {
          creationCounts[formattedDate] = 1;
        } else {
          creationCounts[formattedDate]++;
        }
      });

      const chartDataCreation = {
        labels: Object.keys(creationCounts),
        datasets: [
          {
            label: 'Creation Date',
            data: Object.values(creationCounts),
            borderColor: 'Green',
            fill: false,
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      };

      setChartData(chartDataCreation);
    }
  }, [loading, error, data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div className="chart-container">
        <Line data={chartData} options={{}} width={400} height={200} />
      </div>
    </div>
  );
};

export default Chart;
