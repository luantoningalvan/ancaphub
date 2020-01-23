const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');

const getManyUsers = async ({ filter }) => {
  try {
    return await User
      .find(filter)
      .select('-email -password -geoLocation -__v -saved -library -role')
      .limit(20)
  } catch (e) {
    throw new Error(e.message)
  }
}

const getUser = async (id, extraFields) => {
  try {
    const user = await User
      .findById(id, `_id username avatar bio birthday currentCity site following followers ${extraFields}`);
  
      return {
        ...user._doc,
        followersCount: user.followers.length,
        followingCount: user.following.length
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

const insertUser = async (data) => {
  try {
    let user = await User.findOne({ email: data.email });
    if (user) throw new Error("Este e-mail já está sendo utilizado.") 

    user = new User(data);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.password, salt);
    await user.save();

    return {
      user: {
        id: user.id
      }
    };
  } catch (e) {
    throw new Error(e.message)
  }
}

const updateUser = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (e) {
    throw new Error(e.message)
  }
}

const authenticateUser = async ({email, password, level = "user"}) => {
  try {
    const user = await User.findOne({ email })

    if (!user) throw new Error("E-mail ou senha não correspondem.");

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error("E-mail ou senha não correspondem.");

    if (!user.role.includes(level)) throw new Error("Seu nível de acesso não é suficiente para acessar esta página.");

    return {
      user: {
        id: user._id
      }
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { getManyUsers, getUser, insertUser, updateUser, authenticateUser }