const { userService } = require('../services')
const { authenticateUser, getUser } = userService

const keys = require("../config/keys")
const jwt = require('jsonwebtoken')

const get = async (req, res) => {
  const { id } = req.user

  try {
    const user = await getUser(id)
    res.json(user);
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password, level } = req.body

  try {
    const payload = await authenticateUser({ email, password, level })

    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
        next()
      }
    )    
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

module.exports = { login, get }
