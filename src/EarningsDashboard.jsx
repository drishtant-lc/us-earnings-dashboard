import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function EarningsDashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/earnings")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const filtered = data.filter((item) =>
    item.ticker.toLowerCase().includes(search.toLowerCase())
  );

  const epsData = {
    labels: filtered.map((item) => item.ticker),
    datasets: [
      {
        label: "EPS Actual",
        data: filtered.map((item) => item.epsActual ?? 0),
        backgroundColor: "red",
      },
      {
        label: "EPS Estimate",
        data: filtered.map((item) => item.epsEstimate ?? 0),
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
            <p>
              EPS:{" "}
              {item.epsActual !== null && item.epsActual !== undefined
                ? item.epsActual
                : "N/A"}{" "}
              (Est:{" "}
              {item.epsEstimate !== null && item.epsEstimate !== undefined
                ? item.epsEstimate
                : "N/A"})
            </p>
            <p>
              Revenue: $
              {item.revenueActual && item.revenueActual > 0
                ? item.revenueActual.toLocaleString()
                : "N/A"}{" "}
              (Est: $
              {item.revenueEstimate && item.revenueEstimate > 0
                ? item.revenueEstimate.toLocaleString()
                : "N/A"})
            </p>
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
