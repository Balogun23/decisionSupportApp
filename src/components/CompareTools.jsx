import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ToolComparisonChart = ({ scores, breakdown, rawMetrics }) => {
  const [view, setView] = useState("score");

  const chartColors = ["#4a6cf7", "#28a745", "#ffc107", "#e83e8c", "#17a2b8"];

  const metricExplanations = {
    runtime: "Time taken to complete the task (lower is better).",
    cpu: "CPU time used by the process (lower is better).",
    memory: "Memory usage during task execution (lower is better).",
    core_loc: "Number of lines of essential code written (lower is better).",
    total_loc: "Total lines of code, including setup (lower is better)."
  };

  const metricNames = ["runtime", "cpu", "memory", "core_loc", "total_loc"];

  // 1. Score View
  const scoreLabels = Object.keys(scores);
  const scoreValues = Object.values(scores).map(score => (score * 100).toFixed(1));
  const scoreData = {
    labels: scoreLabels,
    datasets: [
      {
        label: "Tool Score (%)",
        data: scoreValues,
        backgroundColor: chartColors
      }
    ]
  };

  // 2. Normalized Metric-by-Metric View
  const metricsData = {
    labels: metricNames.map(m => m.replace("_", " ").toUpperCase()),
    datasets: Object.keys(breakdown).map((tool, i) => ({
      label: tool,
      data: metricNames.map(m => breakdown[tool][m] ? (breakdown[tool][m] * 100).toFixed(1) : 0),
      backgroundColor: chartColors[i % chartColors.length]
    }))
  };

  // 3. Raw Metric View
  const chartData = {
  labels: metricNames.map(m => m.replace("_", " ").toUpperCase()),
  datasets: Object.keys(rawMetrics || {}).map((tool, i) => {
    const toolMetrics = rawMetrics[tool];
    return {
      label: tool,
      data: metricNames.map(m =>
        typeof toolMetrics?.[m] === "number" ? toolMetrics[m] : 0
      ),
      fill: false,
      borderColor: chartColors[i % chartColors.length],
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 3
    };
  })
};


  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text:
          view === "score"
            ? "Tool Performance Comparison"
            : view === "metrics"
            ? "Normalized Metric-by-Metric Comparison"
            : "Raw Benchmark Metrics"
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            const label = context[0].label?.toLowerCase()?.replace(" ", "_");
            return `${context[0].label} — ${metricExplanations[label] || ""}`;
          },
          label: function (context) {
            return `${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div>
      {/* Buttons */}
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <button
          onClick={() => setView("score")}
          style={{
            padding: "0.5rem 1rem",
            marginRight: "0.5rem",
            background: view === "score" ? "#4a6cf7" : "#ddd",
            color: view === "score" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Score View
        </button>

        <button
          onClick={() => setView("metrics")}
          style={{
            padding: "0.5rem 1rem",
            marginRight: "0.5rem",
            background: view === "metrics" ? "#4a6cf7" : "#ddd",
            color: view === "metrics" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Normalized View
        </button>

        <button
          onClick={() => setView("raw")}
          style={{
            padding: "0.5rem 1rem",
            background: view === "raw" ? "#4a6cf7" : "#ddd",
            color: view === "raw" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Raw Metrics View
        </button>
      </div>

      {/* Render Chart */}
      {view === "score" ? (
        <Bar data={scoreData} options={options} />
      ) : view === "metrics" ? (
        <Bar data={metricsData} options={options} />
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default ToolComparisonChart;
