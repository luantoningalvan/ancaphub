const { notificationService, libraryService, fileService } = require('../services')
const { createNotification } = notificationService
const { getFile } = fileService
const { getManyItems, getItem, insertItem, updateItem, removeItem, approveItem, getAuthContributedItems, addItemToLibrary, saveItem } = libraryService
const Post = require('../models/PostModel')
const verifyToken = require('../utils/verifyToken')

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
    console.log('TOP')
    filterQuery = { ...filterQuery, 'categories': category };
  }

  if (type != '') {
    filterQuery = { ...filterQuery, type: type };
  }

  filterQuery = { ...filterQuery, status };

  const isAutheticated = verifyToken(req)

  try {
    const result = await getManyItems({ pageSize, currentPage, filter: filterQuery, sort: sortQuery }, type, isAutheticated)
    res.status(200).send(result)
    next()
  } catch (e) {
    next(e)
  }
}

const get = async (req, res, next) => {
  const {id} = req.params

  try {
    const result = await getItem(id, { populate: true })
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
}

const insert = async (req, res, next) => {
  const { title, author, content, cover, categories, type, downloadOptions, videoUrl } = req.body;

  try {
    const data = {
      title,
      author,
      content,
      cover,
      categories: categories.map(category => category.category),
      status: 'pending',
      user: req.user.id,
      type,
      downloadOptions,
      videoUrl
    };

    const result = await insertItem(data)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  const { title, author, content, cover, categories, downloadOptions, videoUrl } = req.body;
  const { id } = req.params

  try {
    const data = {
      title,
      author,
      content,
      cover,
      categories: categories.map(category => category.category),
      downloadOptions,
      videoUrl
    };

    const result = await updateItem(id, data)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await removeItem(id)
    res.send(result);
    next()
  } catch (e) {
    next(e)
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
    next(e)
  }
};

const getAuthContributions = async (req, res, next) => {
  const { id } = req.user

  try {
    const result = await getAuthContributedItems(id)
    res.send(result);
    next()
  } catch (e) {
    next(e)
  }
};

const addToLibrary = async (req, res, next) => {
  const { item, post } = req.body;
  const { id: user } = req.user;

  try {
    const result = await addItemToLibrary(user, item)
    if (post) {
      const cover = result.cover !== "" ? await getFile(result.cover) : null

      const newPost = new Post({
        type: 'library_item',
        user: req.user.id,
        extraFields: {
          _id: result._id,
          title: result.title,
          cover: cover ? cover.url : "",
          type: result.type,
          description: result.content
        }
      });

      await newPost.save();
    }

    res.send({
      _id: result._id,
      inLibrary: result.inLibrary
    });
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = { get, getAll, insert, update, remove, approve, getAuthContributions, addToLibrary }
