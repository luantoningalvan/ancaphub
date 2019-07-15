const express = require('express')
const router = express.Router();
const validator = require('validator')
const Book = require("../models/BookModel")

/* 
Retorna uma lista com todos os livros
É possível fazer uma busca personalizada através de parâmetros na URL
- Pode-se aplicar um filtro a todos os campos através de filter Ex: ?filter=
- Para orderar de acordo com algum campo usa-se o sortBy Ex: ?sortBy=name
- Para definir se a ordem de exibição é ascendente ou descendente usa-se o orderBy Ex: ?orderBy=asc/desc
- Para fazer uma busca utilizam-se os atributos filter e filterOn em conjunto, 
sendo filter o termo a ser pesquisado e filterOn o(s) campo(s) a ser(em) pesquisado(s) 
Ex: ?filter=Propriedade&&filterOn=title
*/

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

  Book.countDocuments(filterQuery)
    .then(bookCount => {
      if (currentPage * pageSize > bookCount) {
        return res.status(400).json([])
      }
      Book.find(filterQuery)
        .limit(parseInt(pageSize))
        .skip(currentPage * pageSize)
        .sort(sortQuery)
        .then(books => {
          return res.status(200).json({
            books,
            page: req.query.page || 1,
            total: bookCount,
            pageSize: pageSize
          })
        })
    })
    .catch(err => {
      console.log('Erro ao encontrar livro:', err)
      return res.status(500).json({ msg: 'Nenhum livro encontrado' })
    })
})

// Retorna um livro de acordo com seu id
router.get("/:id", async (request, response) => {
  try {
    var result = await Book.findById(request.params.id).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Cria um novo livro
router.post("/", async (request, response) => {
  try {
    var book = new Book(request.body);
    var result = await book.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Edita um livro através de seu id
router.put("/:id", async (request, response) => {
  try {
    var book = await Book.findById(request.params.id).exec();
    book.set(request.body);
    var result = await book.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Deleta um livro através de seu id
router.delete("/:id", async (request, response) => {
  try {
    var result = await Book.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router

