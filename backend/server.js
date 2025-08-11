// backend/server.js
const express = require("express");
const cors = require("cors");

const recommendRoute = require("./routes/recommend");
const metadataRoute = require("./routes/metadata");
const hybridRoute = require("./routes/hybrid");

const app = express();

// ✅ Allow only your Vercel frontend in production
const allowedOrigins = [
  'https://decision-support-app-6arw.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/recommend/hybrid", hybridRoute);
app.use("/recommend", recommendRoute);
app.use("/metadata", metadataRoute);

// Simple health check for testing Render
app.get('/health', (req, res) => {
  res.send('ok');
});

// Render will give a PORT via environment variable
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
