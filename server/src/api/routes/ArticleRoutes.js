const express = require('express')
const router = express.Router();
const Article = require("../models/ArticleModel")

// Retorna uma lista de todos os livros
router.get("/", async (request, response) => {
    try {
        var result = await Article.find().sort("title").exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Retorna um livro de acordo com seu id
router.get("/:id", async (request, response) => {
    try {
        var result = await Article.findById(request.params.id).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Cria um novo livro
router.post("/", async (request, response) => {
    try {
        var article = new Article(request.body);
        var result = await article.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Edita um livro através de seu id
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

// Deleta um livro através de seu id
router.delete("/:id", async (request, response) => {
    try {
        var result = await Article.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router

