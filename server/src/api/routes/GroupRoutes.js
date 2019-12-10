const express = require('express');
const router = express.Router();
const Group = require('../models/GroupModel');
const User = require('../models/UserModel');
const auth = require('../middleware/auth');

router.get("/:id", async (req, res) => {
  const result = await Group
    .findById(req.params.id)
    .populate('cover')
  res.send(result)
})

router.get("/list/public", async (req, res) => {
  const result = await Group
    .find({private: false})
    .populate('cover')
    .limit(16)
  res.send(result)
})

router.get("/list/auth", auth, async (req, res) => {
  const result = await Group
    .find({ members: { $in: req.user.id} })
    .populate('cover')
  res.send(result)
})

module.exports = router