const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
  location: String,
  issueType: String,
  description: String,
  fileUrl: String,
  status: { type: String, enum:["Pending","Verified","Rejected"], default:"Pending" }
}, { timestamps:true });

module.exports = mongoose.model("Report", reportSchema);
