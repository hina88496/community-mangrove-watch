const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required:true },
  email: { type: String, required:true, unique:true },
  password: { type: String, required:true },
  role: { type: String, enum:["community","ngo","government"], default:"community" },
  points: { type: Number, default:0 }, // added total points
}, { timestamps:true });

module.exports = mongoose.model("User", userSchema);
