const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const { authenticateUser, getUser } = userService;

const get = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await getUser(id, 'email geoLocation');
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password, level } = req.body;

  try {
    const payload = await authenticateUser({ email, password, level });

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
        next();
      }
    );
  } catch (e) {
    next(e);
  }
};

module.exports = { login, get };
