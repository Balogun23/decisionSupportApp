/**
 * ToolComparisonChart.jsx
 *
 * This component is responsible for showing charts that compare tools
 * based on different performance metrics.
 *
 * It has three "views" the user can switch between:
 *   1. Score View         → simple percentage score for each tool
 *   2. Normalized View    → compares each tool across standardised metrics
 *   3. Raw Metrics View   → shows the actual benchmark values (runtime, CPU, etc.)
 *
 * Libraries used:
 *   - React (for state + rendering)
 *   - Chart.js + react-chartjs-2 (for drawing the charts)
 */

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

// === Chart.js setup ===
// These "register" the pieces of Chart.js we need (scales, axes, tooltips, etc.)
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
  // === Internal state ===
  // "view" controls which chart type to show ("score", "metrics", or "raw")
  const [view, setView] = useState("score");

  // === Colours used for charts ===
  const chartColors = ["#4a6cf7", "#28a745", "#ffc107", "#e83e8c", "#17a2b8"];

  // === Plain-English explanations for each metric ===
  // These are shown in tooltips so users understand what they mean
  const metricExplanations = {
    runtime: "Time taken to complete the task (lower is better).",
    cpu: "CPU time used by the process (lower is better).",
    memory: "Memory usage during task execution (lower is better).",
    core_loc: "Number of lines of essential code written (lower is better).",
    total_loc: "Total lines of code, including setup (lower is better)."
  };

  // Order of metrics (ensures consistent display across charts)
  const metricNames = ["runtime", "cpu", "memory", "core_loc", "total_loc"];

  // === 1. Score View Data ===
  // Simple bar chart: each tool's overall score as a percentage
  const scoreLabels = Object.keys(scores);
  const scoreValues = Object.values(scores).map(
    (score) => (score * 100).toFixed(1) // convert to %
  );
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

  // === 2. Normalized Metric View Data ===
  // Shows each tool across the metrics, scaled from 0–100
  const metricsData = {
    labels: metricNames.map((m) => m.replace("_", " ").toUpperCase()),
    datasets: Object.keys(breakdown).map((tool, i) => ({
      label: tool,
      data: metricNames.map((m) =>
        breakdown[tool][m] ? (breakdown[tool][m] * 100).toFixed(1) : 0
      ),
      backgroundColor: chartColors[i % chartColors.length]
    }))
  };

  // === 3. Raw Metric View Data ===
  // Line chart showing the actual benchmark values
  const chartData = {
    labels: metricNames.map((m) => m.replace("_", " ").toUpperCase()),
    datasets: Object.keys(rawMetrics || {}).map((tool, i) => {
      const toolMetrics = rawMetrics[tool];
      return {
        label: tool,
        data: metricNames.map((m) =>
          typeof toolMetrics?.[m] === "number" ? toolMetrics[m] : 0
        ),
        fill: false,
        borderColor: chartColors[i % chartColors.length],
        borderWidth: 2,
        tension: 0.3, // line smoothing
        pointRadius: 3
      };
    })
  };

  // === Chart Options (applies to all views) ===
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        // Chart title and it depends on which view is active
        text:
          view === "score"
            ? "Tool Performance Comparison"
            : view === "metrics"
            ? "Normalized Metric-by-Metric Comparison"
            : "Raw Benchmark Metrics"
      },
      tooltip: {
        // Customise tooltips to explain metrics
        callbacks: {
          title: function (context) {
            const label = context[0].label?.toLowerCase()?.replace(" ", "_");
            return `${context[0].label} — ${
              metricExplanations[label] || ""
            }`;
          },
          label: function (context) {
            return `${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div>
      {/* === Toggle buttons for switching views === */}
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

      {/* === Chart Display === */}
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
