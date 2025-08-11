const express = require("express");
const router = express.Router();
const metrics = require("../utils/metrics");

router.get("/tasks", (req, res) => {
  try {
    const taxonomySubtracks = {};

    Object.keys(metrics).forEach(taxonomy => {
      taxonomySubtracks[taxonomy] = Object.keys(metrics[taxonomy]);
    })

    res.json(taxonomySubtracks);
  } catch (error) {
    res.status(500).json({ error: "Failed to load tasks" })
  }
});

module.exports = router;