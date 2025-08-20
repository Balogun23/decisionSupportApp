/**
 * metadata.js (Express Router)
 *
 * Purpose:
 * --------
 * Provides a list of available taxonomies and their subtasks.
 * This is useful for the frontend to know which categories and subtasks
 * to present to the user in dropdowns or selectors.
 *
 * Example Request:
 * ----------------
 * GET /metadata/tasks
 *
 * Example Response:
 * -----------------
 * {
 *   "Machine Learning": ["Classification", "Regression"],
 *   "Data Visualisation": ["Charts", "Dashboards"],
 *   "Data Cleaning & Wrangling": ["Remove Duplicates", "Handle Missing Values"]
 * }
 */

const express = require("express");
const router = express.Router();
const metrics = require("../utils/metrics"); // Contains all taxonomies + their subtasks

// === GET /metadata/tasks ===
router.get("/tasks", (req, res) => {
  try {
    const taxonomySubtracks = {};

    // Loop through each taxonomy in metrics
    Object.keys(metrics).forEach((taxonomy) => {
      // Extract subtasks (keys of each taxonomy object)
      taxonomySubtracks[taxonomy] = Object.keys(metrics[taxonomy]);
    });

    // Return taxonomy → subtasks mapping as JSON
    res.json(taxonomySubtracks);
  } catch (error) {
    console.error("Error loading tasks:", error);
    res.status(500).json({ error: "Failed to load tasks" });
  }
});

module.exports = router;
