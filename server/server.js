const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("LeadDesk Mini Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});