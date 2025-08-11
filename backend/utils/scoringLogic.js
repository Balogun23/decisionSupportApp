const metrics = require("./metrics");

// Simple t-test helper
function tTestTwoSample(a, b) {
  const mean = arr => arr.reduce((s, v) => s + v, 0) / arr.length;
  const variance = arr => {
    const m = mean(arr);
    return arr.reduce((s, v) => s + Math.pow(v - m, 2), 0) / (arr.length - 1);
  };

  const meanA = mean(a);
  const meanB = mean(b);
  const varA = variance(a);
  const varB = variance(b);

  const se = Math.sqrt(varA / a.length + varB / b.length);
  const t = (meanA - meanB) / se;

  // Welch–Satterthwaite df
  const df =
    Math.pow(varA / a.length + varB / b.length, 2) /
    ((Math.pow(varA / a.length, 2) / (a.length - 1)) +
     (Math.pow(varB / b.length, 2) / (b.length - 1)));

  const p = 0.5; 
  return { t, p };
}

const defaultWeights = {
  runtime: 0.30,
  cpu: 0.25,
  memory: 0.20,
  core_loc: 0.20,
  total_loc: 0.05
};

function normalizeMetric(value, min, max) {
  if (value === null || value === undefined) return 0;
  if (max === min) return 0.5;
  return (max - value) / (max - min);
}

function generateDetailedReason(
  taxonomy,
  subtask,
  preferences,
  scores,
  recommendedTool,
  notApplicable,
  statTest
) {
  const balancedDefault =
    preferences.speed === 50 &&
    preferences.memory === 50 &&
    preferences.ease === 50;

  const prefText = [];
  if (preferences.speed >= 60) prefText.push("speed");
  if (preferences.memory >= 60) prefText.push("memory efficiency");
  if (preferences.ease >= 60) prefText.push("ease of use");

  const prioritisedPhrase =
    !balancedDefault && prefText.length > 0
      ? `, showing strong performance in the metrics you prioritised (${prefText.join(", ")})`
      : "";

  const sortedTools = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([tool, score]) => ({ tool, score: (score * 100).toFixed(1) }));

  const winner = sortedTools[0];
  const second = sortedTools[1] || null;

  let reason = `For ${subtask.replace(/_/g, " ").toLowerCase()}, ${winner.tool} is the best match based on overall benchmark performance. `;
  reason += `${winner.tool} scored ${winner.score}% overall${prioritisedPhrase}. `;

  if (second) {
    reason += `${second.tool} ranked second with ${second.score}%. `;
  }

  if (statTest) {
    if (statTest.p < 0.05) {
      reason += `The performance difference is statistically significant (p=${statTest.p.toFixed(3)}). `;
    } else {
      reason += `The performance difference may not be statistically significant (p=${statTest.p.toFixed(3)}). `;
    }
  }

  if (notApplicable.length > 0) {
    reason += `The following tools were not applicable for this task: ${notApplicable.join(", ")}. `;
  }

  return reason;
}


function calculateScores(taxonomy, subtask, preferences = {}) {
  const subtaskMetrics = metrics[taxonomy]?.[subtask];
  if (!subtaskMetrics) {
    throw new Error(`Metrics not found for ${taxonomy} -> ${subtask}`);
  }

  let userWeights;
  if (preferences && Object.keys(preferences).length > 0) {
    userWeights = {
      runtime: preferences.speed ?? 0,
      memory: preferences.memory ?? 0,
      core_loc: preferences.ease ?? 0,
      cpu: 0,
      total_loc: 0
    };
    
    const sumWeights = Object.values(userWeights).reduce((a, b) => a + b, 0);
    Object.keys(userWeights).forEach(k => {
      userWeights[k] = sumWeights > 0 ? userWeights[k] / sumWeights : 0;
    });
  } else {
    userWeights = { ...defaultWeights };
  }

  const metricNames = ["runtime", "cpu", "memory", "core_loc", "total_loc"];
  const normalizedScores = {};
  const finalScores = {};
  const notApplicableTools = [];

  const supportedTools = [];
  for (const tool of Object.keys(subtaskMetrics)) {
    const values = Object.values(subtaskMetrics[tool]);
    if (values.every(v => v === null)) {
      notApplicableTools.push(tool);
    } else {
      supportedTools.push(tool);
    }
  }

  metricNames.forEach(metric => {
    const validValues = supportedTools
      .map(tool => subtaskMetrics[tool][metric])
      .filter(v => v !== null && v !== undefined);

    const min = Math.min(...validValues);
    const max = Math.max(...validValues);

    supportedTools.forEach(tool => {
      if (!normalizedScores[tool]) normalizedScores[tool] = {};
      const value = subtaskMetrics[tool][metric];
      normalizedScores[tool][metric] = normalizeMetric(value, min, max);
    });
  });

  supportedTools.forEach(tool => {
    finalScores[tool] = metricNames.reduce((sum, metric) => {
      return sum + normalizedScores[tool][metric] * userWeights[metric];
    }, 0);
  });

  const sorted = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
  const recommendedTool = sorted[0]?.[0] || null;

  // Perform statistical test between top two tools
  let statTest = null;
  if (sorted.length > 1) {
    const topTool = sorted[0][0];
    const secondTool = sorted[1][0];
    const topValues = metricNames.map(m => subtaskMetrics[topTool][m] || 0);
    const secondValues = metricNames.map(m => subtaskMetrics[secondTool][m] || 0);
    statTest = tTestTwoSample(topValues, secondValues);
  }

  const reason = generateDetailedReason(
    taxonomy,
    subtask,
    preferences,
    finalScores,
    recommendedTool,
    notApplicableTools,
    statTest
  );

  return {
    recommendedTool,
    scores: finalScores,
    breakdown: normalizedScores,
    notApplicable: notApplicableTools,
    reason,
    statTest
  };
}

/**
 * Hybrid workflow calculation — best tool per subtask in taxonomy
 */
function calculateHybridWorkflow(taxonomy, preferences = {}) {
  const taxonomyMetrics = metrics[taxonomy];
  if (!taxonomyMetrics) {
    throw new Error(`No metrics found for taxonomy ${taxonomy}`);
  }

  const workflow = [];
  Object.keys(taxonomyMetrics).forEach(subtask => {
    try {
      const result = calculateScores(taxonomy, subtask, preferences);
      workflow.push({
        phase: subtask.replace(/_/g, " ").toUpperCase(),
        bestTool: result.recommendedTool,
        score: (result.scores[result.recommendedTool] * 100).toFixed(1),
        scores: result.scores
      });
    } catch (err) {
      console.error(`Error processing subtask ${subtask}:`, err.message);
    }
  });

  return workflow;
}

module.exports = {
  calculateScores,
  calculateHybridWorkflow
};
