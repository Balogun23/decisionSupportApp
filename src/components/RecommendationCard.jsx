/**
 * RecommendationCard.jsx
 *
 * Purpose:
 * --------
 * This component displays a detailed recommendation result.
 *
 * It shows:
 *   1. The recommended tool (main outcome).
 *   2. The reasoning (if provided).
 *   3. A statistical test result (if available, with p-value and significance check).
 *   4. A chart comparing tools (scores, breakdowns, and raw metrics).
 *
 * Props:
 * ------
 * - recommendation (object): contains recommendation details.
 *   {
 *     recommendedTool: "Python",
 *     reason: "Best balance of speed and memory",
 *     scores: { Python: 0.85, R: 0.72, SQL: 0.65 },
 *     breakdown: { Python: {...}, R: {...}, SQL: {...} },
 *     statTest: { p: 0.034 }
 *   }
 *
 * - rawMetrics (object): raw numerical metrics for each tool, 
 *   used in the chart (e.g. runtime, memory, CPU).
 *
 * Notes:
 * ------
 * - If there is no recommendation, the component returns nothing.
 * - Uses the `ToolComparisonChart` component to render visual comparisons.
 */

import ToolComparisonChart from './CompareTools';
import '../styles/RecommendationCard.css';

const RecommendationCard = ({ recommendation, rawMetrics }) => {
  // Don't show anything if recommendation is missing
  if (!recommendation) return null;

  // Deconstruct useful fields from recommendation object
  const { recommendedTool, reason, scores, breakdown, statTest } = recommendation;

  return (
    <div className="recommendation-card">
      {/* === Main Recommendation === */}
      <h2>Recommended Tool: {recommendedTool}</h2>

      {/* Reasoning / explanation if available */}
      {reason && <p className="recommendation-reason">{reason}</p>}

      {/* Statistical test results */}
      {statTest && (
        <div className="statistical-result">
          <h4>Statistical Test Result</h4>
          <p>
            p-value: <strong>{statTest.p.toFixed(3)}</strong> <br />
            {statTest.p < 0.05
              ? "The difference is statistically significant."
              : "The difference may not be statistically significant."}
          </p>
        </div>
      )}

      {/* Chart comparison section */}
      {scores && (
        <div className="chart-section">
          <ToolComparisonChart 
            scores={scores} 
            breakdown={breakdown} 
            rawMetrics={rawMetrics}
          />
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
