const express = require('express')

// Models
const Book = require("../models/BookModel")

module.exports = (app) => {
    app.post("/api/books", async (request, response) => {
        try {
            var book = new Book(request.body);
            var result = await book.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get("/api/books", async (request, response) => {
        try {
            var result = await Book.find().sort("title").exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.put("/api/books/:id", async (request, response) => {
        try {
            var book = await Book.findById(request.params.id).exec();
            book.set(request.body);
            var result = await book.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    
    app.delete("/api/books/:id", async (request, response) => {
        try {
            var result = await Book.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
}

