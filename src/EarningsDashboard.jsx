import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const mockData = [
  { ticker: "AAPL", sector: "Tech", epsActual: 1.55, epsEstimate: 1.49, revenueActual: 95000, revenueEstimate: 94000, stockReaction: 3.5 },
  { ticker: "MCD", sector: "Consumer", epsActual: 2.63, epsEstimate: 2.80, revenueActual: 6000, revenueEstimate: 6100, stockReaction: -2.1 },
  { ticker: "JPM", sector: "Financials", epsActual: 4.10, epsEstimate: 3.95, revenueActual: 39000, revenueEstimate: 38500, stockReaction: 1.2 },
];

export default function EarningsDashboard() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(mockData);

  useEffect(() => {
    setFiltered(
      mockData.filter((item) =>
        item.ticker.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const epsData = {
    labels: filtered.map((item) => item.ticker),
    datasets: [
      {
        label: "EPS Actual",
        data: filtered.map((item) => item.epsActual),
        backgroundColor: "red",
      },
      {
        label: "EPS Estimate",
        data: filtered.map((item) => item.epsEstimate),
        backgroundColor: "black",
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>US Earnings Dashboard</h1>
      <input
        placeholder="Search by ticker..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, marginBottom: 20 }}
      />

      <div>
        {filtered.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <h2>{item.ticker}</h2>
            <p>Sector: {item.sector}</p>
            <p>EPS: {item.epsActual} (Est: {item.epsEstimate})</p>
            <p>Revenue: ${item.revenueActual.toLocaleString()} (Est: ${item.revenueEstimate.toLocaleString()})</p>
            <p>Stock Reaction: {item.stockReaction}%</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 18 }}>EPS Comparison</h2>
        <Bar data={epsData} />
      </div>
    </div>
  );
}
