require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // adjust path if needed

const mongoURI = process.env.MONGO_URI;
const secret = process.env.JWT_SECRET;

async function generateToken() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const user = await User.findOne(); // gets the first user
    if (!user) {
      console.log("No users found in the database");
      process.exit(0);
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    console.log("\n--- JWT Token ---");
    console.log(token);
    console.log("\nUser ID:", user._id.toString());

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

generateToken();
