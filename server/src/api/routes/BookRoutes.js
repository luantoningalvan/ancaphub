const express = require('express')
const router = express.Router();
const Book = require("../models/BookModel")

// Retorna uma lista de todos os livros
router.get("/", async (request, response) => {
    try {
        var result = await Book.find().sort("title").exec();
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

