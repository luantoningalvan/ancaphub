const express = require('express')
const router = express.Router();
const User = require("../models/UserModel")
const mongoose = require('mongoose');


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

// Retorna uma lista dos itens da biblioteca do usuário
router.get("/:id/library", async (request, response) => {
	try {
		var result = await User.aggregate([
			{
				$match: {
					_id: mongoose.Types.ObjectId(request.params.id)
				}
			}, {
				$lookup: {
					from: 'books',
					localField: 'library.books',
					foreignField: '_id',
					as: 'books'
				}
			}, {
				$lookup: {
					from: 'articles',
					localField: 'library.articles',
					foreignField: '_id',
					as: 'articles'
				}
			}, {
				$project: {
					_id: 0,
					books: 1,
					articles: 1
				}
			}
		])
		return response.send(result)
	} catch (error) {
		response.status(500).send(error);
	}
});

module.exports = router
