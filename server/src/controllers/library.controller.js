const Item = require('../models/LibraryModel');
const User = require('../models/UserModel');

// Services
const { notificationService, libraryService } = require('../services')
const { createNotification } = notificationService
const { getManyItems, getItem, insertItem, updateItem, removeItem, approveItem, getAuthContributedItems, getAuthSavedItems, addItemToLibrary, saveItem } = libraryService

const getAll = async (req, res, next) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const currentPage = req.query.page > 0 ? req.query.page - 1 : 0;
  const filter = req.query.filter || '';
  const filterOn = req.query.filterOn || '';
  const sortBy = req.query.sortBy || 'createdAt';
  const orderBy = req.query.orderBy || 'asc';
  const category = req.query.category || '';
  const sortQuery = { [sortBy]: orderBy };
  const type = req.query.type || '';
  const status = req.query.status || 'published';
  let filterQuery = {};

  if (filter.length > 0) {
    const regx = new RegExp(filter, 'i');

    if (filterOn.length > 0) {
      filterQuery = { ...filterQuery, [filterOn]: regx };
    } else {
      filterQuery = { ...filterQuery, title: regx };
    }
  }

  if (category != '') {
    filterQuery = { ...filterQuery, 'categories.category': category };
  }

  if (type != '') {
    filterQuery = { ...filterQuery, type: type };
  }

  filterQuery = { ...filterQuery, status };

  try {
    const result = await getManyItems({ pageSize, currentPage, filter: filterQuery, sort: sortQuery }, type)
    res.status(200).send(result)
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const get = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await getItem(id)
    res.send(result);
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const insert = async (req, res, next) => {
  const { title, author, content, cover, categories, type } = req.body;

  try {
    const data = {
      title,
      author,
      content,
      cover,
      categories,
      status: 'pending',
      user: req.user.id,
      type
    };

    const result = await insertItem(data)
    res.send(result);
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const update = async (req, res, next) => {
  const { title, author, content, cover, categories } = req.body;
  const { id } = req.params

  try {
    const data = {
      title,
      author,
      content,
      cover,
      categories,
    };

    const result = await updateItem(id, data)
    res.send(result);
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await removeItem(id)
    res.send(result);
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const approve = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await approveItem(id)

    await createNotification({
      receiver: result.user,
      type: 'approved_item',
      data: {
        _id: result._id,
        type: result.type,
        title: result.title
      }
    })

    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const getAuthContributions = async (req, res, next) => {
  const { id } = req.user

  try {
    const result = await getAuthContributedItems(id)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const getAuthSaved = async (req, res, next) => {
  const { id } = req.user

  try {
    const result = await getAuthSavedItems(id)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const save = async (req, res, next) => {
  const { item } = req.body;
  const { id: user } = req.user;

  try {
    const result = saveItem(user, item)
    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}


const addToLibrary = async (req, res) => {
  const { item, post } = req.body;
  const { id: user } = req.user;

  try {
    const result = addItemToLibrary(user, item)

    if (post) {
      const cover = await File.findById(item.cover);

      const newPost = new Post({
        type: 'collection_item',
        user: req.user.id,
        extraFields: {
          _id: item._id,
          title: item.title,
          cover: cover.url,
          type: item.type,
          description: item.content
        }
      });

      await newPost.save();
    }

    res.send(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

module.exports = { get, getAll, insert, update, remove, approve, getAuthContributions, getAuthSaved, save, addToLibrary }
