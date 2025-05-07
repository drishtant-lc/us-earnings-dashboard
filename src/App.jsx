import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/earnings')
      .then(res => res.json())
      .then(setData);
  }, []);

  const chartData = {
    labels: data.map(d => d.ticker),
    datasets: [
      {
        label: 'EPS Actual',
        data: data.map(d => d.epsActual),
        backgroundColor: 'black',
      },
      {
        label: 'EPS Estimate',
        data: data.map(d => d.epsEstimate),
        backgroundColor: 'red',
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>US Earnings Dashboard</h2>
      <Bar data={chartData} />
    </div>
  );
}