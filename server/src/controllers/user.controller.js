const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

const getAll = async (req, res) => {
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

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const get = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id,
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
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

const insert = async (req, res) => {
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

const update = async (req, res) => {
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

const updateLocation = async (req, res) => {
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
};

module.exports = { getAll, get, insert, update, updateLocation }