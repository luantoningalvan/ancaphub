const User = require('../models/UserModel');
const Library = require('../models/LibraryModel');
const Event = require('../models/EventModel');

/**
 * Performs a global search in the site for the given term
 * @param string term The search term
 * @returns object Data returned, sorted by types
 */
const globalSearch = async (term, page = 1, pageSize = 10) => {
  // Regex is case-insensitive of type 'starts with'
  // const pattern = `/^${term}$/gi`;

  // Search for users
  const users = await User.find({
    username: { $regex: term, $options: 'i' },
  })
    .select('-password -recoverCode -role -createdAt -updatedAt')
    .skip(page * pageSize === 10 ? 0 : page * pageSize)
    .limit(10);

  // Search for library items (matches title)
  const library = await Library.find({
    title: { $regex: term, $options: 'gi' },
  })
    .skip(page * pageSize === 10 ? 0 : page * pageSize)
    .limit(10);

  // Search for events
  const events = await Event.find({ title: { $regex: term, $options: 'gi' } })
    .skip(page * pageSize === 10 ? 0 : page * pageSize)
    .limit(10);

  const data = {
    users,
    library,
    events,
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
  };

  return data;
};

/**
 * Returns a formatted list of users for use with mentions.
 * @param string term
 * @param number page
 * @param number pageSize
 */
const mentionSearch = async (term, page = 1, pageSize = 10) => {
  // Search for users
  const users = await User.find({
    username: { $regex: term, $options: 'i' },
  })
    .select('name username avatar')
    .skip(page * pageSize === 10 ? 0 : page * pageSize)
    .limit(10);

  return {
    data: users,
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
  };
};

module.exports = {
  globalSearch,
  mentionSearch,
};
