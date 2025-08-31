const express = require("express");
const router = express.Router();
const Badge = require("../models/Badge");
const { protect } = require("../middleware/auth");

// Get badges for user
router.get("/", protect, async (req,res)=>{
  try{
    const badges = await Badge.find({userId:req.user._id}).sort({createdAt:-1});
    res.json(badges);
  }catch(err){res.status(500).json({msg:err.message})}
});

// Add badge (admin)
router.post("/", protect, async (req,res)=>{
  try{
    const {userId,badgeName,points} = req.body;
    const badge = new Badge({userId,badgeName,points});
    const saved = await badge.save();
    res.status(201).json(saved);
  }catch(err){res.status(500).json({msg:err.message})}
});

module.exports = router;
