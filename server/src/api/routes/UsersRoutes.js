const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const Item = require('../models/CollectionItemModel');
const File = require('../models/FileModel');
const Notification = require('../models/NotificationModel')
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const haversine = require('haversine');
const { check, validationResult } = require('express-validator');

// @route 	GET api/users
// @desc 	  Retorna uma lista de todos os usuários
// @access 	Public
router.get('/', async (req, response) => {
  const filter = req.query.filter || '';
  const filterOn = req.query.filterOn || '';
  let filterQuery = {};

  if (filter.length > 0) {
    const regx = new RegExp(filter, 'i');

    if (filterOn.length > 0) {
      filterQuery = { ...filterQuery, [filterOn]: regx };
    } else {
      filterQuery = { ...filterQuery, title: regx };
    }
  }

  try {
    const result = await User
      .find(filterQuery)
      .select('-email -password -geoLocation -__v -saved -personalCollection -role')
      .limit(20)
      
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get('/search/searchNearbyUsers', auth, async (req, res) => {
  try {
    const authUser = await User.findById(req.user.id);
    const allUsers = await User.find({
      geoLocation: true,
      _id: { $ne: authUser._id }
    });
    const lastLocation = authUser.lastLocation;
    const radius = req.query.radius;

    let nearbyUsers = [];

    for (let index = 0; index < allUsers.length; index++) {
      const distance = haversine(allUsers[index].lastLocation, lastLocation);

      if (distance <= radius) {
        const { _id, avatar, username } = allUsers[index];
        nearbyUsers.push({
          _id,
          avatar,
          username,
          distance: parseFloat(distance).toFixed(2)
        });
      }
    }

    res.send(nearbyUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @route 	GET api/users
// @desc 	  Retorna um usuário pelo seu id
// @access 	Public
router.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(
      request.params.id,
      '_id username avatar bio birthday currentCity site following followers'
    );
    const result = {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      birthday: user.birthday,
      currentCity: user.currentCity,
      site: user.site,
      followersCount: user.followers.length,
      followingCount: user.following.length
    };
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	GET api/users/:id/followers
// @desc 	  Retorna os seguidores de um usuário pelo seu id
// @access 	Public
router.get('/:id/followers', async (request, response) => {
  try {
    var result = await User.findById(request.params.id, 'followers').populate(
      'followers',
      'username avatar _id'
    );
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	GET api/users/:id/following
// @desc 	  Retorna os usuário seguidos por um usuário
// @access 	Public
router.get('/:id/following', async (request, response) => {
  try {
    var result = await User.findById(request.params.id, 'following').populate(
      'following',
      'username avatar _id'
    );
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	GET api/users/:id/collection
// @desc 	  Retorna a coleção particular de um usuário pelo seu id
// @access 	Public
router.get('/:id/collection', async (request, response) => {
  try {
    var result = await User.findById(
      request.params.id,
      'personalCollection'
    ).populate({
      path: 'personalCollection',
      model: 'Item',
      populate: { path: 'cover', model: 'File' }
    });
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	GET api/users/:id/contributions
// @desc 	  Retorna as contriuiçõesde um usuário pelo seu id
// @access 	Public
router.get('/:id/contributions', async (request, response) => {
  try {
    var result = await Item.find({
      user: request.params.id,
      status: 'published'
    }).populate('cover');

    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	POST api/users
// @desc 	  Cadastra um novo usuário na base
// @access 	Public
router.post(
  '/',
  [
    check('username', 'O campo NOME DE USUÁRIO é obrigatório')
      .not()
      .isEmpty(),
    check('email', 'E-mail inválido').isEmail(),
    check('password', 'A senha deve ter mais de 6 caracteres')
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.password2) {
          // trow error if passwords do not match
          throw new Error('As senha não coincidem');
        } else {
          return value;
        }
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Verifica se já existe um usuário com o e-mail correspondente
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Este e-mail já está sendo utilizado.' }] });
      }

      // Cria um novo usuário
      user = new User({
        username,
        email,
        password
      });

      // Faz o hash da senha antes de salvar no banco
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Cadastra o usuário
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, keys.jwtSecret, { expiresIn: 86400 }, (err, token) => {
        if (err) throw new Error();
        res.json({ token });
      });
    } catch (error) {
      res.status(500).send(`Erro no servidor: ${error}`);
    }
  }
);

// @route 	PUT api/users/
// @desc 	  Atualiza o usuário logado
// @access 	Private
router.put(
  '/',
  auth,
  [
    check('username', 'O campo NOME DE USUÁRIO é obrigatório')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, bio, site, currentCity, birthday, avatar } = req.body;

    try {
      var result = await User.findByIdAndUpdate(
        req.user.id,
        { username, bio, site, currentCity, birthday, avatar },
        { new: true }
      );
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
      console.log(`Erro: ${error}`);
    }
  }
);

// @route 	PUT api/users/setLastLocation
// @desc 	  Registra a última localização do usuário
// @access 	Private
router.put('/setLastLocation', auth, async (req, res) => {
  try {
    var result = await User.findByIdAndUpdate(
      req.user.id,
      { lastLocation: { ...req.body }, geoLocation: true },
      { new: true }
    );
    res.send({
      lastLocation: result.lastLocation,
      geoLocation: result.geoLocation
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(`Erro: ${error}`);
  }
});

// @route 	PUT api/users/:id/follow
// @desc 	  Registra uma relação de seguir usuário
// @access 	Private
router.put('/:id/follow', auth, async (request, response) => {
  const { id } = request.params;
  try {
    const userFollowed = await User.findById(id);
    const follower = await User.findById(request.user.id);
    if (userFollowed) {
      if (userFollowed.followers.includes(request.user.id)) {
        return response
          .status(400)
          .json({ errors: [{ msg: 'O usuário já é seguido pelo usuário logado.' }] });
      }

      userFollowed.followers.push(request.user.id);
      follower.following.push(id);


      await userFollowed.save();
      var result = await follower.save();
      response.send(result.following);

      const notify = new Notification({
        receiver: userFollowed._id,
        sender: follower._id,
        type: 'user_followed',
        data: {
          _id: userFollowed._id,
          username: userFollowed.username,
          avatar: userFollowed.avatar
        }
      });

      await notify.save();
    } else {
      return response
        .status(400)
        .json({ errors: [{ msg: 'Esse usuário não existe.' }] });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	PUT api/users/:id/follow
// @desc 	  Registra uma relação de parar de seguir usuário
// @access 	Private
router.put('/:id/unfollow', auth, async (request, response) => {
  const { id } = request.params;
  try {
    const userFollowed = await User.findById(id);
    const follower = await User.findById(request.user.id);
    if (userFollowed) {
      if (!userFollowed.followers.includes(request.user.id)) {
        return response
          .status(400)
          .json({ errors: [{ msg: 'O usuário já é seguido pelo usuário logado.' }] });
      }

      userFollowed.followers.pull(request.user.id);
      follower.following.pull(id);
      await userFollowed.save();
      var result = await follower.save();
      response.send(result.following);
    } else {
      return response
        .status(400)
        .json({ errors: [{ msg: 'Esse usuário não existe.' }] });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	PUT api/users/addItemToCollection
// @desc 	  Adiciona um item a coleção pessoal do usuaŕio logado
// @access 	Private
router.put('/addItemToCollection', auth, async (request, response) => {
  const { item: itemId, post } = request.body;

  try {
    const item = await Item.findById(itemId);
    if (item) {
      const user = await User.findById(request.user.id);

      if (user.personalCollection.includes(itemId)) {
        user.personalCollection.pull(itemId);
        item.collectedBy.pull(request.user.id);
      } else {
        user.personalCollection.push(itemId);
        item.collectedBy.push(request.user.id);
      }

      await item.save();

      if (post) {
        const cover = await File.findById(item.cover);

        const newPost = new Post({
          type: 'collection_item',
          user: request.user.id,
          extraFields: {
            _id: item._id,
            title: item.title,
            cover: cover.url,
            type: item.type,
            description: item.content
          }
        });

        await newPost.save();
      }

      const result = await user.save();
      response.send(result.personalCollection);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Este esse item não existe no acervo.' }] });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	PUT api/users/addItemToCollection
// @desc 	  Adiciona um item a coleção pessoal do usuaŕio logado
// @access 	Private
router.put('/saveItem', auth, async (request, response) => {
  const { item: itemId } = request.body;

  console.log(itemId);
  try {
    const item = await Item.findById(itemId);
    if (item) {
      const user = await User.findById(request.user.id);

      if (user.saved.includes(itemId)) {
        user.saved.pull(itemId);
      } else {
        user.saved.push(itemId);
      }

      await item.save();
      const result = await user.save();
      response.send(result.saved);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Este esse item não existe no acervo.' }] });
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
