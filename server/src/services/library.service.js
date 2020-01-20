const Item = require('../models/LibraryModel');
const User = require('../models/UserModel');

const getManyItems = async (query, type, auth) => {
  const { pageSize, currentPage, filter, sort } = query

  try {
    const itemCount = await Item.countDocuments(filter);

    if (currentPage * pageSize > itemCount) {
      return res.status(400).json([]);
    }

    console.log(filter)

    let items = await Item.find(filter)
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort(sort)
      .populate('cover')

    if(auth) {
      const user = await User.findById(auth.id)
      items = items.map(item => ({ ...item._doc, hasSaved: user.saved.includes(item._id)}))
    }
  
    return {
      items,
      type,
      total: itemCount,
      pageSize: pageSize
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

const getItem = async (id, config) => {
  try {
    if(config.populate){
      return await Item.findById(id)
      .populate('user', 'username avatar _id')
      .populate('cover');
    } else {
      return await Item.findById(id)
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

const insertItem = async (data) => {
  try {
    let extraFields = {}

    switch (data.type) {
      case "book":
        extraFields = { downloadOptions: data.downloadOptions }
      case "video":
        extraFields = { videoUrl: data.videoUrl }
      default:
        extraFields
    }

    const item = new Item({ ...data, extraFields });
    return await item.save();
  } catch (e) {
    throw new Error(e.message)
  }
}

const updateItem = async (id, data) => {
  try {
    let extraFields = {}

    switch (data.type) {
      case "book":
        extraFields = { downloadOptions: data.downloadOptions }
      case "video":
        extraFields = { videoUrl: data.videoUrl }
      default:
        extraFields
    }

    const updatedItem = { ...data, extraFields };
    return await Item.findByIdAndUpdate(id, updatedItem);
  } catch (e) {
    throw new Error(e.message)
  }
}

const removeItem = async (id) => {
  try {
    return await Item.findByIdAndDelete(id)
  } catch (e) {
    throw new Error(e.message)
  }
}

const approveItem = async (id) => {
  try {
    return await Item.findByIdAndUpdate(id, { status: 'published' });
  } catch (e) {
    throw new Error(e.message)
  }
}

const getAuthContributedItems = async (id) => {
  try {
    return await Item.find({ user: id }).populate('cover');
  } catch (e) {
    throw new Error(e.message)
  }
}

const saveItem = async (userId, itemId) => {
  try {
    const item = await Item.findById(itemId);

    if (!item) throw new Error('Este esse item não existe no acervo.')

    const user = await User.findById(userId);

    if (user.saved.includes(itemId)) {
      user.saved.pull(itemId);
    } else {
      user.saved.push(itemId);
    }

    await user.save();

    return {
      _id: item._doc._id,
      hasSaved: user.saved.includes(itemId)
    }

  } catch (e) {
    throw new Error(e.message)
  }
}


const addItemToLibrary = async (userId, itemId) => {
  try {
    const item = await Item.findById(itemId);

    if (!item) throw new Error('Este esse item não existe no acervo.')

    const user = await User.findById(userId);

    if (user.personalCollection.includes(itemId)) {
      user.personalCollection.pull(itemId);
      item.collectedBy.pull(userId);
    } else {
      user.personalCollection.push(itemId);
      item.collectedBy.push(userId);
    }

    await user.save()
    return await item.save();
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = { getManyItems, getItem, insertItem, updateItem, removeItem, approveItem, getAuthContributedItems, saveItem, addItemToLibrary }
