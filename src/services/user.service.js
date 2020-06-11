const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/UserModel');
const censorEmail = require('../utils/censorEmail');

const { verifyCode, updateUserCode } = require('./accesscode.service');

const getManyUsers = async ({ filter }) => {
  try {
    return await User.find(filter)
      .select('-email -password -geoLocation -__v -saved -library -role')
      .limit(20);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUsersByDistance = async (user, radius, coordinates) => {
  try {
    return await User.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates },
          distanceField: 'dist',
          maxDistance: radius,
          query: { geoLocation: true, _id: { $ne: user } },
          spherical: true,
        },
      },
    ]);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUserByHandle = async (handle, extraFields) => {
  try {
    return await User.findOne(
      { username: handle },
      `_id name username avatar bio birthday currentCity site following followers isVerified ${extraFields}`
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUser = async (id, extraFields) => {
  try {
    return await User.findById(
      id,
      `_id name username avatar bio birthday currentCity site following followers isVerified ${extraFields}`
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const verifyUser = async (cond) => {
  try {
    const user = await User.findOne(cond);
    if (user) throw new Error('Esse usuário já existe.');
  } catch (e) {
    throw new Error(e.message);
  }
};

const insertUser = async (data) => {
  try {
    let user = await User.findOne({ email: data.email });
    if (user) throw new Error('Este e-mail já está sendo utilizado.');

    user = new User(data);

    if (process.env.CODE_TO_SIGNUP === 1) {
      await verifyCode(data.code);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.password, salt);
    await user.save();

    if (process.env.CODE_TO_SIGNUP === 1) {
      await updateUserCode(data.code, user.id);
    }

    return {
      user: {
        id: user.id,
      },
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateUser = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(id, data, { new: true });
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await getUser(userId, 'password');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('A senha atual fornecida está incorreta.');

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(newPassword, salt);

  await updateUser(userId, { password: encryptedPassword });
};

const authenticateUser = async ({ email, password, level = 'user' }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error('E-mail ou senha não correspondem.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('E-mail ou senha não correspondem.');

    if (!user.role.includes(level))
      throw new Error(
        'Seu nível de acesso não é suficiente para acessar esta página.'
      );

    return {
      user: {
        id: user._id,
      },
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const forgetPasswordRequest = async ({ identifier }) => {
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) throw new Error("User doesn't exists");

    const code = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
      .toString(36)
      .substr(0, 10);

    await User.update({ recoverCode: { active: true, code } });

    const recoverLink = `${
      process.env.WEB_CLIENT_URL || 'http://localhost:3000'
    }/auth/reset/${user._id}/${code}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"AncapHub" <recover@ancaphub.com>',
      to: user.email,
      subject: 'Recuperação de senha da sua conta do AncapHub',
      html: `<h2>Resetar sua senha</h2>Olá, <b>${user.name}</b>. Alguém (esperamos que tenha sido você) solicitou a alteração da senha da sua conta do AncapHub. Segue abaixo o link de redefinição de senha.<br /><br /><a href="${recoverLink}" target="_blank">${recoverLink}</a>`,
    });

    const censoredEmail = censorEmail(user.email);

    return { user: user._id, censoredEmail };
  } catch (e) {
    throw new Error(e.message);
  }
};

const newPasswordRequest = async ({ token, user: userId, password }) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw new Error("User doesn't exists");

    if (user.recoverCode.active && user.recoverCode.code === token) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      await user.update({
        password: newPassword,
        recoverCode: { active: false, code: '' },
      });
      return { ok: true };
    }
    throw new Error('Código incorreto');
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getManyUsers,
  getUsersByDistance,
  getUser,
  getUserByHandle,
  verifyUser,
  insertUser,
  updateUser,
  updateUserPassword,
  authenticateUser,
  forgetPasswordRequest,
  newPasswordRequest,
};
