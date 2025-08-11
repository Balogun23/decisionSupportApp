import React, { useState } from "react";
import RecommendationCard from "./RecommendationCard";
import HybridResult from "./HybridResult";
import DecisionResult from "./DecsionResult";
import "../styles/Tabs.css";

export default function Tabs({ singleToolData, hybridData, onHybridSelected, taxonomy, subtask, metrics }) {
  const [activeTab, setActiveTab] = useState("single");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab == "hybrid" && onHybridSelected) {
      onHybridSelected();
    }
  };

  return (
    <div>
      {/* Tab Selector */}
      <div className="tab-selector">
        <button
          className={activeTab === "single" ? "active" : ""}
          onClick={() => handleTabChange("single")}
        >
          Single Tool
        </button>
        <button
          className={activeTab === "hybrid" ? "active" : ""}
          onClick={() => handleTabChange("hybrid")}
        >
          Hybrid Workflow
        </button>
      </div>

      {/* Single Tool Recommendation */}
      {activeTab === "single" && singleToolData && (
        <div className="single-tool-content">
          <RecommendationCard 
            recommendation={singleToolData} 
            rawMetrics={metrics?.[taxonomy]?.[subtask]}
            />
          <DecisionResult result={singleToolData} />
        </div>
      )}

      {/* workflow tab */}
      {activeTab === "hybrid" && (
        <div className="hybrid-workflow-content">
          <HybridResult workflow={hybridData?.workflow} />
          {hybridData?.reason && (
            <p className="hybrid-reason">{hybridData.reason}</p>
          )}
        </div>
      )}
    </div>
  );
}
