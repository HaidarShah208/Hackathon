// LineChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ studentData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Students',
        data: [], // Initialize data as an empty array
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Extract labels from student data
    const labels = studentData.map((student) => student.uniqueId);

    // Automatically count the number of students
    const studentCountData = studentData.length;

    // Update chart data by modifying the state
    setChartData((prevChartData) => ({
      ...prevChartData,
      labels, // Update labels
      datasets: [
        {
          ...prevChartData.datasets[0],
          data: [studentCountData], // Update data as an array with the student count
        },
      ],
    }));
  }, [studentData]);

  return (
    <div className="line-chart">
      <Line data={chartData}  />
    </div>
  );
};

export default LineChart;
