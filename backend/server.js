// backend/server.js
const express = require("express");
const cors = require("cors");

const recommendRoute = require("./routes/recommend");
const metadataRoute = require("./routes/metadata");
const hybridRoute = require("./routes/hybrid");

const app = express();

// Allow only your Vercel frontend in production
app.use(cors({
  origin: ['https://<your-frontend>.vercel.app'], // Replace with your Vercel URL
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/recommend/hybrid", hybridRoute);
app.use("/recommend", recommendRoute);
app.use("/metadata", metadataRoute);

// Render will give a PORT via environment variable
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
