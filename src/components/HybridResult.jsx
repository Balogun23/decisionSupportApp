import React from "react";
import { motion } from "framer-motion";
import "../styles/hybrdResult.css";

const toolIcons = {
  Python: "🐍",
  SQL: "🗄️",
  R: "📊",
};

const HybridResult = ({ workflow }) => {
  if (!workflow || workflow.length === 0) {
    return <p>No hybrid workflow available.</p>;
  }

  return (
    <div className="pipeline-container">
      {workflow.map((step, index) => (
        <div key={index} className="pipeline-step-wrapper">
          <motion.div
            className="pipeline-step"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="pipeline-circle" style={{ backgroundColor: getColor(index) }}>
              {index + 1}
            </div>

            <div className="pipeline-content">
              <h4>
                {toolIcons[step.recommendedTool] || "🔧"} {step.phase}
              </h4>
              <p className="tool-name">{step.recommendedTool}</p>
              <p className="score">
                Score: <strong>{step.score}%</strong>
              </p>
            </div>
          </motion.div>

          {index < workflow.length - 1 && <div className="pipeline-connector"></div>}
        </div>
      ))}
    </div>
  );
};

// alternate steps colour
function getColor(index) {
  const colors = ["#007bff", "#28a745", "#ff9800", "#9c27b0"];
  return colors[index % colors.length];
}

export default HybridResult;
