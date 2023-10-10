import React from 'react';
import { Chart as ChartJS, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement
);

const Chart = () => {
  return (
    <div>
      <Bar
        height={400}
      />
    </div>
  );
};

export default Chart;