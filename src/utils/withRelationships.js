const UserModel = require('../models/UserModel');

async function withRelationships(handle) {
  const user = await UserModel.findOne(
    { username: handle },
    '+followers +following -password -role -recoverCode'
  );

  return user;
}

module.exports = withRelationships;
