const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const { protect } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  }
});
const upload = multer({ storage });

// Create report
router.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    const { location, issueType, description } = req.body;
    if (!location || !issueType || !description) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }

    const newReport = new Report({
      userId: req.user._id,
      location,
      issueType,
      description,
      status: "Pending",
      file: req.file ? req.file.filename : null
    });

    await newReport.save();
    res.status(201).json({ msg: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all reports (optionally for a user)
router.get("/", protect, async (req, res) => {
  try {
    const reports = await Report.find().populate("userId", "name email");
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
