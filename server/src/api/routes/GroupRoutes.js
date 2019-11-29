const express = require('express');
const router = express.Router();
const Group = require('../models/GroupModel');
const User = require('../models/UserModel');
const auth = require('../middleware/auth');

router.get("/public", async (req, res) => {
  const result = await Group
    .find()
    .populate('cover')
  res.send(result)
})

router.get("/auth", auth, async (req, res) => {
  const result = await Group
    .find({ user: req.user.id })
    .populate('cover')
  res.send(result)
})

module.exports = router