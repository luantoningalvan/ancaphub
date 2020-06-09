const Item = require('../models/LibraryModel');
const User = require('../models/UserModel');

const getManyItems = async (query, type, auth) => {
  const { pageSize, currentPage, filter, sort } = query;

  try {
    const itemCount = await Item.countDocuments(filter);

    if (currentPage * pageSize > itemCount) {
      // WARNING: this is not type-safe code and should be refactored.
      // This function calls express response object in a presumed context.
      // In a testing environment, for example, this function is likely unusable.
      // eslint-disable-next-line no-undef
      return res.status(400).json([]);
    }

    let items = await Item.find({ ...filter, type })
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort(sort)
      .populate('cover');

    if (auth) {
      const user = await User.findById(auth.id);
      items = items.map((item) => ({
        ...item._doc,
        hasSaved: user.saved.includes(item._id),
        inLibrary: user.library.includes(item._id),
      }));
    }

    return items;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getItem = async (id, config) => {
  try {
    if (config.populate) {
      return await Item.findById(id)
        .populate('user', 'name username avatar _id isVerified')
        .populate('categories')
        .populate('cover')
        .populate('files');
    }
    return await Item.findById(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const insertItem = async (data) => {
  try {
    let extraFields = {};

    switch (data.type) {
      case 'book':
        extraFields = { downloadOptions: data.downloadOptions };
        break;
      case 'video':
        extraFields = { videoUrl: data.videoUrl };
        break;
      default:
        return extraFields;
    }

    const item = new Item({ ...data, extraFields });
    return await item.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateItem = async (id, data) => {
  try {
    const item = await Item.findById(id);

    let extraFields = {};
    switch (item.type) {
      case 'book':
        extraFields = { downloadOptions: data.downloadOptions };
        break;
      case 'video':
        extraFields = { videoUrl: data.videoUrl };
        break;
      default:
        break;
    }

    item.updateOne({ ...data, extraFields });
    return await item.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateManyItems = async (filter, query) => {
  try {
    const items = await Item.updateMany(filter, query);
    return items.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

const removeItem = async (id) => {
  try {
    return await Item.findByIdAndDelete(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const approveItem = async (id) => {
  try {
    return await Item.findByIdAndUpdate(id, { status: 'published' });
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAuthContributedItems = async (id) => {
  try {
    return await Item.find({ user: id }).populate('cover');
  } catch (e) {
    throw new Error(e.message);
  }
};

const saveItem = async (userId, itemId) => {
  try {
    const item = await Item.findById(itemId);

    if (!item) throw new Error('Este esse item não existe no acervo.');

    const user = await User.findById(userId);

    if (user.saved.includes(itemId)) {
      user.saved.pull(itemId);
    } else {
      user.saved.push(itemId);
    }

    await user.save();

    return {
      _id: item._doc._id,
      hasSaved: user.saved.includes(itemId),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const addItemToLibrary = async (userId, itemId) => {
  try {
    const item = await Item.findById(itemId);

    if (!item) throw new Error('Este esse item não existe no acervo.');

    const user = await User.findById(userId);

    if (user.library.includes(itemId)) {
      user.library.pull(itemId);
      item.collectedBy.pull(userId);
    } else {
      user.library.push(itemId);
      item.collectedBy.push(userId);
    }

    await user.save();
    await item.save();
    return {
      ...item._doc,
      inLibrary: user.library.includes(itemId),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getManyItems,
  getItem,
  insertItem,
  updateItem,
  updateManyItems,
  removeItem,
  approveItem,
  getAuthContributedItems,
  saveItem,
  addItemToLibrary,
};
