const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const gamesRoute = require("./routes/games");
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Serve frontend files
app.use(express.static(path.join(__dirname, "frontend")));


// --- Routes ---
app.use("/api/users", require("./routes/users"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/badges", require("./routes/badges"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/games", gamesRoute);
// --- Default Route ---
app.get("/", (req, res) => res.send("API is running"));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit on DB connection failure
});

// --- Global Error Handling (optional) ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
