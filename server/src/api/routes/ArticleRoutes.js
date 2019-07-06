const express = require('express')
const router = express.Router();
const Article = require("../models/ArticleModel")

// Retorna uma lista de todos os artigos
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
        .limit(pageSize)
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

// Retorna um artigo de acordo com seu id
router.get("/:id", async (request, response) => {
    try {
        var result = await Article.findById(request.params.id).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Cria um novo artigo
router.post("/", async (request, response) => {
    try {
        var article = new Article(request.body);
        var result = await article.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Edita um artigo através de seu id
router.put("/:id", async (request, response) => {
    try {
        var article = await Article.findById(request.params.id).exec();
        article.set(request.body);
        var result = await article.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Deleta um artigo através de seu id
router.delete("/:id", async (request, response) => {
    try {
        var result = await Article.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router
