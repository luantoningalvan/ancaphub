const express = require('express')
const router = express.Router();
const Article = require("../models/ArticleModel")
const auth = require('../middleware/auth')

// @route 	GET api/articles
/* @desc 	  Retorna uma lista com todos os artigos
            É possível fazer uma busca personalizada através de parâmetros na URL
            - Pode-se aplicar um filtro a todos os campos através de filter Ex: ?filter=
            - Para orderar de acordo com algum campo usa-se o sortBy Ex: ?sortBy=name
            - Para definir se a ordem de exibição é ascendente ou descendente usa-se o orderBy Ex: ?orderBy=asc/desc
            - Para fazer uma busca utilizam-se os atributos filter e filterOn em conjunto, 
            sendo filter o termo a ser pesquisado e filterOn o(s) campo(s) a ser(em) pesquisado(s) 
            Ex: ?filter=Propriedade&&filterOn=title*/
// @access 	Public
router.get('/', (req, res, next) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 10
  const currentPage = req.query.page > 0 ? req.query.page - 1 : 0
  const filter = req.query.filter || ''
  const filterOn = req.query.filterOn || ''
  const sortBy = req.query.sortBy || 'title'
  const orderBy = req.query.orderBy || 'asc'
  const category = req.query.category || ''
  const sortQuery = { [sortBy]: orderBy }

  let filterQuery = {}

  if (filter.length > 0) {
    const regx = new RegExp(filter, 'i')

    if (filterOn.length > 0) {
      filterQuery = { ...filterQuery, [filterOn]: regx }
    } else {
      filterQuery = { ...filterQuery, title: regx }
    }
  }

  if (category != '') { filterQuery = { ...filterQuery, 'categories.category': category } }

  Article.countDocuments(filterQuery)
    .then(articleCount => {
      if (currentPage * pageSize > articleCount) {
        return res.status(400).json([])
      }
      Article.find(filterQuery)
        .limit(parseInt(pageSize))
        .skip(currentPage * pageSize)
        .sort(sortQuery)
        .then(articles => {
          return res.status(200).json({
            articles,
            page: req.query.page || 1,
            total: articleCount,
            pageSize: pageSize
          })
        })
    })
    .catch(err => {
      console.log('Erro ao encontrar artigos:', err)
      return res.status(500).json({ msg: 'Nenhum artigo encontrado' })
    })
})

// @route 	GET api/articles
// @desc 		Retorna um artigo de acordo com seu id
// @access 	Public
router.get("/:id", async (request, response) => {
  try {
    var result = await Article.findById(request.params.id).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	POST api/articles
// @desc 		Cria um novo artigo
// @access 	Private
router.post("/", auth, async (request, response) => {
  try {
    var article = new Article(request.body);
    var result = await article.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	PUT api/articles/:id
// @desc 		Edita um arquivo através de seu ID
// @access 	Private
router.put("/:id", auth, async (request, response) => {
  try {
    var article = await Article.findById(request.params.id).exec();
    article.set(request.body);
    var result = await article.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @route 	DELETE api/articles/:id
// @desc 		Deleta um artigo através de seu id
// @access 	Private
router.delete("/:id", auth, async (request, response) => {
  try {
    var result = await Article.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router
