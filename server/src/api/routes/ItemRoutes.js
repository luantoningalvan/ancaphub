const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Item = require('../models/CollectionItemModel');
const User = require('../models/UserModel');
const Notification = require('../models/NotificationModel');

// @route 	GET api/items/
/* @desc 	  Retorna uma lista com todos os items
            É possível fazer uma busca personalizada através de parâmetros na URL
            - Pode-se aplicar um filtro a todos os campos através de filter Ex: ?filter=
            - Para orderar de acordo com algum campo usa-se o sortBy Ex: ?sortBy=name
            - Para definir se a ordem de exibição é ascendente ou descendente usa-se o orderBy Ex: ?orderBy=asc/desc
            - Para fazer uma busca utilizam-se os atributos filter e filterOn em conjunto, 
            sendo filter o termo a ser pesquisado e filterOn o(s) campo(s) a ser(em) pesquisado(s) 
            Ex: ?filter=Propriedade&&filterOn=title*/
// @access 	Public

router.get('/', async (req, res, next) => {
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
  const populateFiles = req.query.populateFiles || false;
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
});

// @route 	GET api/items/:id
// @desc 	  Retorna um item de acordo com seu id
// @access 	Public
router.get('/:id', async (request, response) => {
  try {
    var result = await Item.findById(request.params.id)
      .populate('user', 'name avatar _id')
      .populate('cover');
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	GET api/items/auth/contributions
// @desc 	  Retorna um item de acordo com seu id
// @access 	Public
router.get('/auth/contributions', auth, async (request, response) => {
  try {
    var result = await Item.find({ user: request.user.id }).populate('cover');
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get('/auth/saved', auth, async (request, response) => {
  try {
    var result = await User.findById(request.user.id, 'saved')
      .populate({
        path: 'saved',
        model: 'Item',
        populate: { path: 'cover', model: 'File' }
      });
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	POST api/items
// @desc 		Cria um novo item
// @access 	Private
router.post('/', auth, async (request, response) => {
  const { title, author, content, cover, categories, type } = request.body;
  const user = await User.findById(request.user.id);

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
          downloadOptions: request.body.downloadOptions
        }
      };
    }

    if (type == 'video') {
      newItem = {
        ...newItem,
        extraFields: {
          videoUrl: request.body.videoUrl
        }
      };
    }

    const item = new Item(newItem);
    const result = await item.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	PUT api/items/:id
// @desc 		Edita um item através de seu ID
// @access 	Private
router.put('/:id', auth, async (request, response) => {
  const { title, author, content, cover, categories, type } = request.body;

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
          downloadOptions: request.body.downloadOptions
        }
      };
    }

    if (type == 'video') {
      updatedItem = {
        ...updatedItem,
        extraFields: {
          videoUrl: request.body.videoUrl
        }
      };
    }

    const result = await Item.findByIdAndUpdate(request.params.id, updatedItem);
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put('/:id/approve', auth, admin, async (request, response) => {
  try {
    const result = await Item.findByIdAndUpdate(request.params.id, {
      status: 'published'
    });

    const notify = new Notification({
      receiver: result.user,
      type: 'approved_item',
      data: {
        _id: result._id,
        title: result.title
      }
    });

    await notify.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	DELETE api/items/:id
// @desc 		Deleta um item através de seu id
// @access 	Private
router.delete('/:id', auth, async (request, response) => {
  try {
    var result = await Item.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
