/**
 * recommend.js (Express Router)
 *
 * Purpose:
 * --------
 * Provides endpoints to generate recommendations:
 *   1. Single Tool Recommendation (Beginner + Expert modes)
 *   2. Hybrid Workflow Recommendation
 *
 * Modes:
 * ------
 * - Beginner Mode:
 *   User only selects a taxonomy (no subtask).
 *   The system automatically evaluates all subtasks under that taxonomy
 *   and chooses the best subtask + tool combination.
 *
 * - Expert Mode:
 *   User explicitly selects both taxonomy and subtask.
 *   The system uses that subtask directly.
 *
 * Endpoints:
 * ----------
 * POST /recommend
 *   → Returns the best tool for a taxonomy + subtask
 *
 * POST /recommend/hybrid
 *   → Returns a hybrid workflow (best tool for each subtask under a taxonomy)
 */

const express = require("express");
const router = express.Router();
const { calculateScores, calculateHybridWorkflow } = require("../utils/scoringLogic");
const metrics = require("../utils/metrics");

// === 1. Single Tool Recommendation ===
router.post("/", (req, res) => {
  try {
    let { taxonomy, subtask, preferences } = req.body;

    // Taxonomy is required
    if (!taxonomy) {
      return res.status(400).json({ error: "Taxonomy is required" });
    }

    // --- Beginner Mode (no subtask selected) ---
    if (!subtask || subtask.trim() === "") {
      const subtasks = Object.keys(metrics[taxonomy] || {});

      // If taxonomy has no subtasks, fail
      if (subtasks.length === 0) {
        return res.status(400).json({ error: "No subtasks found for this taxonomy" });
      }

      let bestSubtask = null;
      let highestScore = -Infinity;

      // Score all subtasks, pick the best-scoring one
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

      // If no "best" subtask found, just pick the first available
      subtask = bestSubtask || subtasks[0];
      console.log(`Beginner mode: Auto-selected subtask "${subtask}"`);
    }

    // --- Final scoring (Expert Mode or chosen Beginner Mode subtask) ---
    const result = calculateScores(taxonomy, subtask, preferences);

    // Include which subtask was used
    result.selectedSubtask = subtask;

    res.json(result);

  } catch (error) {
    console.error("Error generating recommendation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// === 2. Hybrid Workflow Recommendation ===
router.post("/hybrid", (req, res) => {
  try {
    const { taxonomy, preferences } = req.body;

    // Taxonomy is required
    if (!taxonomy) {
      return res.status(400).json({ error: "Taxonomy is required" });
    }

    // Run hybrid workflow scoring (best tool per subtask)
    const workflow = calculateHybridWorkflow(taxonomy, preferences || {});

    // Handle missing results
    if (!workflow || workflow.length === 0) {
      return res.status(404).json({ error: "No workflow results found for this taxonomy" });
    }

    // Send results back
    res.json({ taxonomy, workflow });

  } catch (error) {
    console.error("Error generating hybrid workflow:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
