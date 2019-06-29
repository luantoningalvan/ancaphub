const express = require('express')
const router = express.Router();
const Category = require("../models/CategoryModel")

// Retorna uma lista de todos as categorias
router.get("/", async (request, response) => {
    try {
        var result = await Category.find().sort("title").exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Cria uma nova categoria
router.post("/", async (request, response) => {
    try {
        var category = new Category(request.body);
        var result = await category.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router
