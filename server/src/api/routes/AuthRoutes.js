const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys")
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

// @route 	POST api/auth
// @desc 	Loga um usuário no sistema
// @access 	Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route 	POST api/auth
// @desc 	Loga um usuário no sistema
// @access 	Public
router.post("/", [
  check('email', "E-mail inválido.")
    .isEmail(),
  check('password', "A campo SENHA é obrigatório.")
    .exists()

], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    // Verifica se existe um usuário com o e-mail correspondente
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "E-mail ou senha não correspondem." }] });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "E-mail ou senha não correspondem." }] });
    }

    const payload = {
      user: {
        id: user._id
      }
    }

    // Gera um token e loga o usuário no sistema
    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`)
  }
});

module.exports = router
