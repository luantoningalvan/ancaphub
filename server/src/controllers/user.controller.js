const { userService } = require('../services')
const { getManyUsers, getUser, insertUser, updateUser } = userService
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

const getAll = async (req, res, next) => {
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
    const result = await getManyUsers({ filter: filterQuery })
    res.status(200).send(result)
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const get = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await getUser(id)
    res.status(200).send(result)
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const insert = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    const payload = await insertUser({name, username, email, password})

    jwt.sign(payload, keys.jwtSecret, { expiresIn: 86400 }, (err, token) => {
      if (err) throw new Error();
      res.status(201).json({ token })
      next()
    });
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const updateProfile = async (req, res, next) => {
  const {id} = req.user
  const { name, bio, site, currentCity, birthday, avatar } = req.body;

  try {
    const result = await updateUser(id, {name, bio, site, currentCity, birthday, avatar})
    res.status(200).send(result)
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const updateLocation = async (req, res, next) => {
  const { id } = req.user
  const coordinates = [req.body.longitude, req.body.latitude]

  try {
    const userUpdated = await updateUser(id, { "lastLocation": { type: 'Point', coordinates }, geoLocation: true })
    const result = {
      lastLocation: userUpdated.lastLocation,
      geoLocation: userUpdated.geoLocation
    }
    res.status(200).send(result)
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

module.exports = { getAll, get, insert, updateProfile, updateLocation }