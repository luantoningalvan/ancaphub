const express = require('express')
const router = express.Router();
const User = require("../models/UserModel")
const Item = require("../models/CollectionItemModel")
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys")
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
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
    var result = await User.findById(request.params.id, "_id name avatar bio birthday location site");
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	GET api/users/:id/followers
// @desc 	  Retorna os seguidores de um usuário pelo seu id
// @access 	Public
router.get("/:id/followers", async (request, response) => {
  try {
    var result = await User.findById(request.params.id, "followers").populate("followers", "name avatar _id");
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

// @route 	PUT api/users/
// @desc 	  Atualiza o usuário logado
// @access 	Private
router.put("/", auth, [
  check('name', "O campo NOME é obrigatório")
    .not()
    .isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, bio, site, location, birthday, avatar } = req.body

  try {
    var result = await User.findByIdAndUpdate(req.user.id, { name, bio, site, location, birthday, avatar }, { new: true })
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
    console.log(`Erro: ${error}`)
  }
});

// @route 	PUT api/users/:id/follow
// @desc 	  Registra uma relação de seguir usuário
// @access 	Private
router.put("/:id/follow", auth, async (request, response) => {
  const { id } = request.params
  try {
    const userFollowed = await User.findById(id)
    const follower = await User.findById(request.user.id)
    if (userFollowed) {
      if (userFollowed.followers.includes(request.user.id)) {
        userFollowed.followers.pull(request.user.id)
        follower.following.pull(id)
      } else {
        userFollowed.followers.push(request.user.id)
        follower.following.push(id)
      }

      await userFollowed.save()
      var result = await follower.save()
      response.send(result.following);
    } else {
      return response.status(400).json({ errors: [{ msg: "Esse usuário não existe." }] });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	PUT api/users/addItemToCollection
// @desc 	  Registra uma relação de seguir usuário
// @access 	Private
router.put("/addItemToCollection", auth, async (request, response) => {
  const { item: itemId } = request.body

  console.log(itemId)
  try {
    const item = await Item.findById(itemId)
    if (item) {
      const user = await User.findById(request.user.id)

      if (user.personalCollection.includes(itemId)) {
        user.personalCollection.pull(itemId)
        item.collectedBy.pull(request.user.id)
      } else {
        user.personalCollection.push(itemId)
        item.collectedBy.push(request.user.id)
      }

      await user.save()
      const result = await item.save()
      response.send(result.collectedBy);
    } else {
      return res.status(400).json({ errors: [{ msg: "Este esse item não existe no acervo." }] });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router
