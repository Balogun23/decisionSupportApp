import ToolComparisonChart from './CompareTools';
import '../styles/RecommendatonCard.css';

const RecommendationCard = ({ recommendation, rawMetrics, taxonomy, subtask }) => {
  if (!recommendation) return null;

  const { recommendedTool, reason, scores, breakdown, statTest } = recommendation;

const dummyMetrics = {
  Python: { runtime: 1.2, cpu: 0.6, memory: 100, core_loc: 10, total_loc: 20 },
  R: { runtime: 1.5, cpu: 0.8, memory: 110, core_loc: 12, total_loc: 25 }
};

  return (
    <div className="recommendation-card">
      <h2>Recommended Tool: {recommendedTool}</h2>

      {reason && <p className="recommendation-reason">{reason}</p>}

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
