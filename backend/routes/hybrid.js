/**
 * hybrid.js (Express Router)
 *
 * Purpose:
 * --------
 * This route handles POST requests for generating a "hybrid workflow".
 * A hybrid workflow means: for each subtask under a taxonomy,
 * pick the best tool based on scoring logic, and return the entire
 * multi-step workflow.
 *
 * Example Request:
 * ----------------
 * POST /recommend/hybrid
 * {
 *   "taxonomy": "Machine Learning",
 *   "preferences": { "speed": 80, "memory": 60, "ease": 40 }
 * }
 *
 * Example Response:
 * -----------------
 * {
 *   "workflow": [
 *     { "phase": "Data Preparation", "recommendedTool": "Python", "score": 87.5 },
 *     { "phase": "Model Training",   "recommendedTool": "R",      "score": 76.2 }
 *   ],
 *   "reason": "Hybrid workflow suggestion: Python for Data Preparation (score: 87.5%); R for Model Training (score: 76.2%)."
 * }
 */

const express = require("express");
const router = express.Router();

// Import helper functions
const { calculateScores } = require("../utils/scoringLogic"); // Scoring engine
const metrics = require("../utils/metrics"); // Stores available taxonomies + subtasks

// === POST /recommend/hybrid ===
router.post("/", (req, res) => {
  try {
    let { taxonomy, preferences } = req.body;

    // 1. Validate input: taxonomy is required
    if (!taxonomy) {
      return res.status(400).json({ error: "Taxonomy is required" });
    }

    // 2. Get subtasks for this taxonomy
    const subtasks = Object.keys(metrics[taxonomy] || {});
    if (subtasks.length === 0) {
      return res.status(400).json({ error: "No subtasks found for this taxonomy" });
    }

    // 3. Build workflow by scoring each subtask
    const workflow = [];

    subtasks.forEach((subtask) => {
      try {
        // Run scoring logic for this taxonomy + subtask
        const result = calculateScores(taxonomy, subtask, preferences);

        // Add one step to workflow
        workflow.push({
          phase: subtask.replace(/_/g, " "), // prettier name (replace underscores)
          recommendedTool: result.recommendedTool,
          score: Number(
            (result.scores[result.recommendedTool] * 100).toFixed(1)
          ) // percentage format
        });
      } catch (err) {
        // Log but continue with other subtasks
        console.error(`Error scoring subtask ${subtask}:`, err);
      }
    });

    // 4. Create summary reason (human-readable explanation)
    const reason = workflow
      .map(
        (step) =>
          `${step.recommendedTool} for ${step.phase} (score: ${step.score}%)`
      )
      .join("; ");

    // 5. Respond with workflow + reason
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
