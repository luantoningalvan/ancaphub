const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const Notifications = require("../models/NotificationModel")
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys")
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

// @route 	GET api/auth
// @desc 	  Obtém os dados do usuário logado
// @access 	Private
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
// @desc 	  Loga um usuário no sistema
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

  const { email, password, level } = req.body

  try {
    let user = await User.findOne({ email })

    // Verifica se existe um usuário com o e-mail correspondente
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "E-mail ou senha não correspondem." }] });
    }

    // Comapara a senha recebida com a senha do banco de dados
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "E-mail ou senha não correspondem." }] });
    }

    if (!user.role.includes(level)) {
      return res.status(400).json({ errors: [{ msg: "Seu nível de acesso não é suficiente para acessar esta página." }] });
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
