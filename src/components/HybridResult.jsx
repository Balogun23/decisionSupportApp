/**
 * HybridResult.jsx
 *
 * Purpose:
 * --------
 * This component shows a "hybrid workflow" – a sequence of steps,
 * where each step recommends a tool for a specific phase of a task.
 *
 * Example of `workflow` data passed into this component:
 * [
 *   { phase: "Data Cleaning", recommendedTool: "Python", score: 87 },
 *   { phase: "Visualization", recommendedTool: "R", score: 76 },
 *   { phase: "Storage", recommendedTool: "SQL", score: 64 }
 * ]
 *
 * How it displays:
 * ----------------
 * - Each step appears as a card with:
 *    1. A colored circle with the step number
 *    2. The phase name + an icon for the tool
 *    3. The recommended tool name
 *    4. The score (percentage)
 * - Steps animate into view using Framer Motion (smooth fade/slide).
 * - Between steps, a connector line shows the "pipeline" flow.
 *
 * Props:
 * ------
 * - workflow (array of objects): the sequence of steps and recommendations.
 */

import React from "react";
import { motion } from "framer-motion";
import "../styles/hybrdResult.css";

// === Tool icons mapping ===
// Known tools get a friendly emoji for quick recognition.
// If a tool isn't in the list, we fall back to a wrench icon 🔧.
const toolIcons = {
  Python: "🐍",
  SQL: "🗄️",
  R: "📊",
};

const HybridResult = ({ workflow }) => {
  // If there's no workflow or it's empty, show a fallback message
  if (!workflow || workflow.length === 0) {
    return <p>No hybrid workflow available.</p>;
  }

  return (
    <div className="pipeline-container">
      {workflow.map((step, index) => (
        <div key={index} className="pipeline-step-wrapper">
          
          {/* === Individual step card with entry animation === */}
          <motion.div
            className="pipeline-step"
            initial={{ opacity: 0, y: 25 }}      // start: invisible & lower down
            animate={{ opacity: 1, y: 0 }}       // end: fully visible, in place
            transition={{ delay: index * 0.15 }} // stagger animation for sequence
          >
            {/* Step number in colored circle */}
            <div
              className="pipeline-circle"
              style={{ backgroundColor: getColor(index) }}
            >
              {index + 1}
            </div>

            {/* Step details */}
            <div className="pipeline-content">
              <h4>
                {/* Tool icon + phase name */}
                {toolIcons[step.recommendedTool] || "🔧"} {step.phase}
              </h4>

              {/* Recommended tool name */}
              <p className="tool-name">{step.recommendedTool}</p>

              {/* Confidence score */}
              <p className="score">
                Score: <strong>{step.score}%</strong>
              </p>
            </div>
          </motion.div>

          {/* Connector line (skip after the last step) */}
          {index < workflow.length - 1 && (
            <div className="pipeline-connector"></div>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * getColor(index)
 * ---------------
 * Returns a background color for the numbered circle,
 * alternating through a predefined set so each step looks distinct.
 */
function getColor(index) {
  const colors = ["#007bff", "#28a745", "#ff9800", "#9c27b0"];
  return colors[index % colors.length];
}

export default HybridResult;
