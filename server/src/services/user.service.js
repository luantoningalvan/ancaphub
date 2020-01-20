const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');

const getManyUsers = async ({ filter }) => {
  try {
    return await User
      .find(filter)
      .select('-email -password -geoLocation -__v -saved -personalCollection -role')
      .limit(20)
  } catch (e) {
    throw new Error(e.message)
  }
}

const getUser = async (id) => {
  try {
    const user = await User
      .findById(id, '_id username avatar bio birthday currentCity site following followers');
    
      return {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      birthday: user.birthday,
      currentCity: user.currentCity,
      site: user.site,
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

module.exports = { getManyUsers, getUser, insertUser, updateUser }