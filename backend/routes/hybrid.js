const express = require("express");
const router = express.Router();
const { calculateScores} = require("../utils/scoringLogic");
const metrics = require("../utils/metrics");

router.post("/", (req, res) => {
  try {
    let { taxonomy, preferences } = req.body;

    if (!taxonomy) {
      return res.status(400).json({ error: "Taxonomy is required" });
    }

    const subtasks = Object.keys(metrics[taxonomy] || {});
    if (subtasks.length === 0) {
      return res.status(400).json({ error: "No subtasks found for this taxonomy" });
    }

    const workflow = [];

    subtasks.forEach((subtask) => {
      try {
        const result = calculateScores(taxonomy, subtask, preferences);
        workflow.push({
          phase: subtask.replace(/_/g, " "),
          recommendedTool: result.recommendedTool,
          score: Number((result.scores[result.recommendedTool] * 100).toFixed(1))
        });
      } catch (err) {
        console.error(`Error scoring subtask ${subtask}:`, err);
      }
    });

    const reason = workflow
      .map(step => `${step.recommendedTool} for ${step.phase} (score: ${step.score}%)`)
      .join("; ");

    res.json({
      workflow,
      reason: `Hybrid workflow suggestion: ${reason}.`
    });

  } catch (error) {
    console.error("Error generating hybrid workflow:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
