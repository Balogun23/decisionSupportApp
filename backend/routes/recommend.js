const express = require("express");
const router = express.Router();
const { calculateScores, calculateHybridWorkflow } = require("../utils/scoringLogic");
const metrics = require("../utils/metrics");


router.post("/", (req, res) => {
  try {
    let { taxonomy, subtask, preferences } = req.body;

    if (!taxonomy) {
      return res.status(400).json({ error: "Taxonomy is required" });
    }

    // Beginner Mode → Auto-pick best subtask
    if (!subtask || subtask.trim() === "") {
      const subtasks = Object.keys(metrics[taxonomy] || {});
      if (subtasks.length === 0) {
        return res.status(400).json({ error: "No subtasks found for this taxonomy" });
      }

      let bestSubtask = null;
      let highestScore = -Infinity;

      for (const s of subtasks) {
        try {
          const result = calculateScores(taxonomy, s, preferences);
          if (result.scores[result.recommendedTool] > highestScore) {
            highestScore = result.scores[result.recommendedTool];
            bestSubtask = s;
          }
        } catch (err) {
          console.error(`Error scoring ${taxonomy} - ${s}:`, err.message);
        }
      }

      subtask = bestSubtask || subtasks[0];
      console.log(`Beginner mode: Auto-selected subtask "${subtask}"`);
    }

    // Final calculation
    const result = calculateScores(taxonomy, subtask, preferences);
    result.selectedSubtask = subtask;

    res.json(result);

  } catch (error) {
    console.error("Error generating recommendation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/hybrid", (req, res) => {
  try {
    const { taxonomy, preferences } = req.body;

    if (!taxonomy) {
      return res.status(400).json({ error: "Taxonomy is required" });
    }

    const workflow = calculateHybridWorkflow(taxonomy, preferences || {});

    if (!workflow || workflow.length === 0) {
      return res.status(404).json({ error: "No workflow results found for this taxonomy" });
    }

    res.json({ taxonomy, workflow });

  } catch (error) {
    console.error("Error generating hybrid workflow:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
