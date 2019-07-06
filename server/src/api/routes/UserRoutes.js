const express = require('express')
const router = express.Router();
const User = require("../models/UserModel")

// Retorna uma lista de todos os usuários
router.get("/", async (request, response) => {
    try {
        var result = await User.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Retorna um usuário pelo seu id
router.get("/:id", async (request, response) => {
    try {
        var result = await User.findById(request.params.id).exec();
        response.send(result);
      } catch (error) {
        response.status(500).send(error);
      }
});

module.exports = router
