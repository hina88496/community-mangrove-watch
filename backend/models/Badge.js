const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
  badgeName: String,
  points: Number
}, { timestamps:true });

module.exports = mongoose.model("Badge", badgeSchema);
