const express = require('express')
const router = express.Router();
const User = require("../models/UserModel")
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys")
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');

// @route 	GET api/users
// @desc 	  Retorna uma lista de todos os usuários
// @access 	Public
router.get("/", async (request, response) => {
  try {
    var result = await User.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	GET api/users
// @desc 	  Retorna um usuário pelo seu id
// @access 	Public
router.get("/:id", async (request, response) => {
  try {
    var result = await User.findById(request.params.id).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	POST api/users
// @desc 	  Cadastra um novo usuário na base
// @access 	Public
router.post("/", [
  check('name', "O campo NOME é obrigatório")
    .not()
    .isEmpty(),
  check('email', "E-mail inválido")
    .isEmail(),
  check('password', "A senha deve ter mais de 6 caracteres")
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        // trow error if passwords do not match
        throw new Error("As senha não coincidem");
      } else {
        return value;
      }
    })
], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    // Verifica se já existe um usuário com o e-mail correspondente
    if (user) {
      return res.status(400).json({ errors: [{ msg: "Este e-mail já está sendo utilizado." }] });
    }

    // Cria um novo usuário
    user = new User({
      name,
      email,
      password
    });

    // Faz o hash da senha antes de salvar no banco
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // Cadastra o usuário
    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: 86400 },
      (err, token) => {
        if (err) throw new Error;
        res.json({ token })
      }
    )
  } catch (error) {
    res.status(500).send(`Erro no servidor: ${error}`)
  }
});

module.exports = router
