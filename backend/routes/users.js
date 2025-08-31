const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Role mapping: numeric → string
const roleMap = {
  1: "community",
  2: "researcher",
  3: "ngo",
  4: "government"
};

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    // Store role as number
    user = new User({
      name,
      email,
      password: hashed,
      role: Number(role)
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      userId: user._id,
      role: roleMap[Number(user.role)] || "community"
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      userId: user._id,
      role: roleMap[Number(user.role)] || "community"
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
