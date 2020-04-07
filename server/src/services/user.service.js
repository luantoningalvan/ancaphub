const User = require('../models/UserModel')
const { verifyCode, updateUserCode } = require('../services/accesscode.service')
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
      .findById(id, `_id name username avatar bio birthday currentCity site following followers isVerified ${extraFields}`);
  
      return {
        ...user._doc,
        followersCount: user.followers.length,
        followingCount: user.following.length
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

const verifyUser = async(cond) => {
  try {
    const user = await User.findOne(cond) 
    if (user) throw new Error("Esse usuário já existe.");
  } catch (e) {
    throw new Error(e.message)
  }
}

const insertUser = async (data) => {
  try {
    
    let user = await User.findOne({ email: data.email });
    if (user) throw new Error("Este e-mail já está sendo utilizado.") 
    
    user = new User(data);

    console.log(process.env.CODE_TO_SIGNUP)
    if(process.env.CODE_TO_SIGNUP == 1){
      await verifyCode(data.code)
    }
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.password, salt);
    await user.save();

    if (process.env.CODE_TO_SIGNUP == 1){
      await updateUserCode(data.code, user.id)
    }

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

const updateUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await getUser(userId, "password")

  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) throw new Error("A senha atual fornecida está incorreta.");

  const salt = await bcrypt.genSalt(10);
  encryptedPassword = await bcrypt.hash(newPassword, salt);

  await updateUser(userId, { password: encryptedPassword })
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

module.exports = { getManyUsers, getUser, verifyUser, insertUser, updateUser, updateUserPassword, authenticateUser }