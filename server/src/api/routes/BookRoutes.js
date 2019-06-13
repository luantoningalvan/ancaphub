const express = require('express')
const router = express.Router();
const Book = require("../models/BookModel")

router.post("/", async (request, response) => {
    try {
        var book = new Book(request.body);
        var result = await book.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get("/", async (request, response) => {
    try {
        var result = await Book.find().sort("title").exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

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

router.delete("/:id", async (request, response) => {
    try {
        var result = await Book.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router

