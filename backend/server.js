// backend/server.js
const express = require("express");
const cors = require("cors");

const recommendRoute = require("./routes/recommend");
const metadataRoute = require("./routes/metadata");
const hybridRoute = require("./routes/hybrid");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/recommend/hybrid", hybridRoute);
app.use("/recommend", recommendRoute);
app.use("/metadata", metadataRoute);


app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
