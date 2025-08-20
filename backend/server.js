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

// Import routes
const recommendRoute = require("./routes/recommend"); // Single + Hybrid recommendation
const metadataRoute = require("./routes/metadata");   // Taxonomy/subtask metadata
const hybridRoute = require("./routes/hybrid");       // Legacy/separate hybrid workflow

const app = express();

// ✅ CORS configuration: allow only trusted frontend URLs
const allowedOrigins = [
  
  'https://decision-support-app-o7ck.vercel.app/', // Production (Vercel)
  'http://localhost:5173'                    // Development (Vite local server)
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware: Parse JSON request bodies
app.use(express.json());

// === API Routes ===
app.use("/recommend/hybrid", hybridRoute); // hybrid workflow (separate route file)
app.use("/recommend", recommendRoute);     // main recommendation logic
app.use("/metadata", metadataRoute);       // taxonomy + subtask metadata

// === Health check route ===
app.get('/health', (req, res) => {
  res.send('ok'); // Used by Render or monitoring systems to confirm uptime
});

// === Start Server ===
// Render injects PORT via environment variable
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
