const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/predict",
      req.body
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "ML service unavailable"
    });
  }
});

app.listen(5022, () => {
  console.log("Server running on port 5022");
});