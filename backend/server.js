/**
 * server.js (Backend entry point)
 *
 * Purpose:
 * --------
 * Sets up the Express server for the Decision Support App.
 *
 * Features:
 * - Configures CORS to only allow frontend origins (Vercel + localhost for dev).
 * - Parses incoming JSON requests.
 * - Mounts API routes for:
 *   - /recommend (single tool recommendation, beginner/expert modes)
 *   - /recommend/hybrid (hybrid workflow recommendation)
 *   - /metadata (taxonomy + subtask metadata)
 * - Provides a simple `/health` endpoint for uptime monitoring / Render testing.
 *
 * Deployment:
 * -----------
 * - Runs on the `PORT` provided by Render (or defaults to 4000 locally).
 * - Logs the backend URL for confirmation.
 */

const express = require("express");
const cors = require("cors");

// -------------------- ROUTES -------------------- //
const recommendRoute = require("./routes/recommend"); // Single + Hybrid recommendation
const metadataRoute  = require("./routes/metadata");  // Taxonomy/subtask metadata
const hybridRoute    = require("./routes/hybrid");    // Legacy/separate hybrid workflow

const app = express();

/* -------------------- CORS -------------------- */
/**
 * IMPORTANT: update PROD_ORIGIN if your Vercel URL changes.
 * No trailing slash. Origin header never contains it.
 */
const PROD_ORIGIN   = "https://decision-support-app-o7ck.vercel.app";
const vercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

app.use((req, _res, next) => {
  // Helpful for debugging cross-origin calls in Render logs
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} | Origin: ${req.headers.origin || "n/a"}`);
  next();
});

app.use(cors({
  origin(origin, cb) {
    // Allow server-to-server / health checks with no Origin
    if (!origin) return cb(null, true);

    // Allow localhost for dev, the exact prod Vercel origin, and any Vercel preview
    if (
      origin === "http://localhost:5173" ||
      origin === PROD_ORIGIN ||
      vercelPreview.test(origin)
    ) {
      return cb(null, true);
    }

    // Block anything else
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Preflight for all routes
app.options("*", cors());

/* ----------------- MIDDLEWARE ----------------- */
app.use(express.json()); // Parse JSON bodies

/* --------------------- API -------------------- */
app.use("/recommend/hybrid", hybridRoute);     // Legacy/separate hybrid workflow
app.use("/recommend",       recommendRoute);   // Main recommendation logic
app.use("/metadata",        metadataRoute);    // Taxonomy + subtask metadata

/* ------------------ HEALTHCHECK ---------------- */
app.get("/health", (_req, res) => res.send("ok"));

/* --------------- ERROR HANDLING --------------- */
// CORS/other thrown errors surface cleanly
// (Keep this AFTER routes/middleware)
app.use((err, _req, res, _next) => {
  console.error("Error:", err.message);
  const status = err.message?.startsWith("CORS blocked") ? 403 : 500;
  res.status(status).json({ ok: false, error: err.message });
});

/* ------------------- SERVER ------------------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});
