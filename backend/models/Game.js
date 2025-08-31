const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gameType: { type: String, enum: ["quiz", "planting"], required: true },
  score: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Game", gameSchema);
