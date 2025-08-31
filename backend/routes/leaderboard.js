const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req,res)=>{
  try{
    const leaderboard = await Report.aggregate([
      {$group:{_id:"$userId", totalReports:{$sum:1}}},
      {$sort:{totalReports:-1}},
      {$limit:10}
    ]);
    const populated = await User.populate(leaderboard,{path:"_id", select:"name"});
    const result = populated.map((u,i)=>({rank:i+1,name:u._id.name,points:u.totalReports}));
    res.json(result);
  }catch(err){res.status(500).json({msg:err.message})}
});

module.exports = router;
