import React from "react";

export default function DecisionResult({ result }) {
  if (!result) return null;

  const { recommendedTool, scores, notApplicable } = result;

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Recommended Tool: {recommendedTool}
      </h2>

      <p className="text-gray-700 mb-2">Here’s how we arrived at the decision:</p>

      <ul className="list-disc list-inside text-gray-800">
        {Object.keys(scores).map((tool) => (
          <li key={tool}>
            {tool}: {notApplicable?.includes(tool)
              ? "Not applicable for this task"
              : `${(scores[tool] * 100).toFixed(1)}%`}
          </li>
        ))}
      </ul>
    </div>
  );
}
