import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Import Chart.js components
import PropTypes from 'prop-types';



const Chart = ({ data }) => {
    const [chartData, setChartData] = useState({});
    Chart.propTypes = {
        data: PropTypes.shape({
          characters: PropTypes.shape({
            results: PropTypes.arrayOf(
              PropTypes.shape({
                gender: PropTypes.string.isRequired
                // Add other required properties here
              })
            ).isRequired
          }).isRequired
        }).isRequired
      };
      

    const processChartData = (charactersData) => {
        const maleCount = charactersData.filter((character) => character.gender === 'Male').length;
        const femaleCount = charactersData.filter((character) => character.gender === 'Female').length;
      
        const chartData = {
          labels: ['Male', 'Female'],
          datasets: [
            {
              data: [maleCount, femaleCount],
              backgroundColor: ['#36A2EB', '#FF6384'] // You can customize colors here
            }
          ]
        };
      
        setChartData(chartData);
      };
      
      useEffect(() => {
        if (data && data.characters && data.characters.results) {
          processChartData(data.characters.results);
        }
      }, [data]);
      

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default Chart;