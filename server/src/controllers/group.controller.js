const Group = require('../models/GroupModel');
const User = require('../models/UserModel');

const get = async (req, res) => {
  const result = await Group
    .findById(req.params.id)
    .populate('cover')
  res.send(result)
}

const getPublic = async (req, res) => {
  const result = await Group
    .find({ private: false })
    .populate('cover')
    .limit(16)
  res.send(result)
}

const getAuth = async (req, res) => {
  const result = await Group
    .find({ members: { $in: req.user.id } })
    .populate('cover')
  res.send(result)
}

const insert = async (req, res) => {
  const { name, members, visibility } = req.body

  const membersList = members.map(member => member._id)
  const users = await User.find({ _id: membersList })
  const userExists = users.length == members.length

  if (!userExists) {
    return res.status(400).json({ errors: [{ msg: "Um ou mais usuários enviados não existem." }] });
  }

  const group = new Group({
    name,
    private: visibility === 'private',
    members: membersList
  })

  const result = await group.save()
  res.send(result)
}

module.exports = { get, getPublic, getAuth, insert }