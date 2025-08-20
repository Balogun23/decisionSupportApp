/**
 * Tabs.jsx
 *
 * Purpose:
 * --------
 * Provides a tabbed interface for switching between:
 *   1. Single Tool Recommendation
 *   2. Hybrid Workflow Recommendation
 *
 * Features:
 * - User can toggle between "Single Tool" and "Hybrid Workflow".
 * - When "Hybrid Workflow" is selected, a callback (`onHybridSelected`) is called
 *   so the parent can fetch or update the hybrid recommendation.
 * - Displays detailed results using:
 *    - RecommendationCard (for charts + explanation)
 *    - DecisionResult (for plain score breakdown)
 *    - HybridResult (for workflow pipeline steps)
 *
 * Props:
 * ------
 * - singleToolData (object): recommendation result for a single tool
 * - hybridData (object): recommendation result for hybrid workflow
 *   {
 *     workflow: [...steps...],
 *     reason: "Why hybrid was chosen"
 *   }
 * - onHybridSelected (function): callback triggered when user switches to Hybrid tab
 * - taxonomy (string): current selected taxonomy (category)
 * - subtask (string): current subtask (if expert mode is used)
 * - metrics (object): raw performance metrics (used by charts)
 *
 * Example Metrics Shape:
 * metrics = {
 *   "Machine Learning": {
 *     "Classification": { Python: {...}, R: {...} }
 *   }
 * }
 */

import React, { useState } from "react";
import RecommendationCard from "./RecommendationCard";
import HybridResult from "./HybridResult";
import DecisionResult from "./DecisionResult"; // note: filename typo, should be "DecisionResult"
import "../styles/Tab.css";

export default function Tabs({
  singleToolData,
  hybridData,
  onHybridSelected,
  taxonomy,
  subtask,
  metrics
}) {
  // Active tab state: "single" or "hybrid"
  const [activeTab, setActiveTab] = useState("single");

  // Handle switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // If user switches to Hybrid tab, call parent fetch function
    if (tab === "hybrid" && onHybridSelected) {
      onHybridSelected();
    }
  };

  return (
    <div>
      {/* === Tab Selector Buttons === */}
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

      {/* === Single Tool Recommendation Content === */}
      {activeTab === "single" && singleToolData && (
        <div className="single-tool-content">
          <RecommendationCard
            recommendation={singleToolData}
            rawMetrics={metrics?.[taxonomy]?.[subtask]} // pass chart data if available
          />
          <DecisionResult result={singleToolData} />
        </div>
      )}

      {/* === Hybrid Workflow Content === */}
      {activeTab === "hybrid" && (
        <div className="hybrid-workflow-content">
          <HybridResult workflow={hybridData?.workflow} />

          {/* If a reason for hybrid choice is provided, show it */}
          {hybridData?.reason && (
            <p className="hybrid-reason">{hybridData.reason}</p>
          )}
        </div>
      )}
    </div>
  );
}
