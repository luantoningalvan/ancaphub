const Item = require('../models/CollectionItemModel');
const User = require('../models/UserModel');

// Services
const { notificationService } = require('../services')
const { createNotification } = notificationService

const getAll = async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 10;
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
    const itemCount = await Item.countDocuments(filterQuery);

    if (currentPage * pageSize > itemCount) {
      return res.status(400).json([]);
    }

    var items = await Item.find(filterQuery)
      .limit(parseInt(pageSize))
      .skip(currentPage * pageSize)
      .sort(sortQuery)
      .populate('cover');

    return res.status(200).json({
      items,
      type,
      page: req.query.page || 1,
      total: itemCount,
      pageSize: pageSize
    });
  } catch (err) {
    console.log('Erro ao obter a lista de itens:', err);
    return res.status(500).json({ msg: 'Nenhum item encontrado' });
  }
}

const get = async (req, res) => {
  try {
    var result = await Item.findById(req.params.id)
      .populate('user', 'username avatar _id')
      .populate('cover');
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};


const insert = async (req, res) => {
  console.log(req)
  const { title, author, content, cover, categories, type } = req.body;
  const user = await User.findById(req.user.id);

  try {
    let newItem = {
      title,
      author,
      content,
      cover,
      categories,
      status: user.role.includes('admin') ? 'published' : 'pending',
      user: user._id,
      type
    };

    if (type == 'book') {
      newItem = {
        ...newItem,
        extraFields: {
          downloadOptions: req.body.downloadOptions
        }
      };
    }

    if (type == 'video') {
      newItem = {
        ...newItem,
        extraFields: {
          videoUrl: req.body.videoUrl
        }
      };
    }

    const item = new Item(newItem);
    const result = await item.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const { title, author, content, cover, categories, type } = req.body;

  try {
    let updatedItem = {
      title,
      author,
      content,
      cover,
      categories
    };

    if (type == 'book') {
      updatedItem = {
        ...updatedItem,
        extraFields: {
          downloadOptions: req.body.downloadOptions
        }
      };
    }

    if (type == 'video') {
      updatedItem = {
        ...updatedItem,
        extraFields: {
          videoUrl: req.body.videoUrl
        }
      };
    }

    const result = await Item.findByIdAndUpdate(req.params.id, updatedItem);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    var result = await Item.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const approveItem = async (req, res, next) => {
  try {
    const result = await Item.findByIdAndUpdate(req.params.id, {
      status: 'published'
    });

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

const getAuthContributions = async (req, res) => {
  try {
    var result = await Item.find({ user: req.user.id }).populate('cover');
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAuthSaved = async (req, res) => {
  try {
    var result = await User.findById(req.user.id, 'saved')
      .populate({
        path: 'saved',
        model: 'Item',
        populate: { path: 'cover', model: 'File' }
      });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const saveItem = async (req, res) => {
  const { item: itemId } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (item) {
      const user = await User.findById(req.user.id);

      if (user.saved.includes(itemId)) {
        user.saved.pull(itemId);
      } else {
        user.saved.push(itemId);
      }

      await item.save();
      const result = await user.save();
      res.send(result.saved);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Este esse item não existe no acervo.' }] });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const addToLibrary = async (req, res) => {
  const { item: itemId, post } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (item) {
      const user = await User.findById(req.user.id);

      if (user.personalCollection.includes(itemId)) {
        user.personalCollection.pull(itemId);
        item.collectedBy.pull(req.user.id);
      } else {
        user.personalCollection.push(itemId);
        item.collectedBy.push(req.user.id);
      }

      await item.save();

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

      const result = await user.save();
      res.send(result.personalCollection);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Este esse item não existe no acervo.' }] });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { get, getAll, insert, update, remove, approveItem, getAuthContributions, getAuthSaved, saveItem, addToLibrary }
