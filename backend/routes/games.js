const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const { protect } = require("../middleware/auth");

// Submit game score
router.post("/", protect, async (req, res) => {
  const { gameType, score } = req.body;
  if (!gameType || score == null) return res.status(400).json({ msg: "Missing data" });

  try {
    const game = new Game({
      userId: req.user._id,
      gameType,
      score
    });
    await game.save();
    res.json({ msg: "Game submitted", points: score, game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get user's game history
router.get("/", protect, async (req, res) => {
  try {
    const games = await Game.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
