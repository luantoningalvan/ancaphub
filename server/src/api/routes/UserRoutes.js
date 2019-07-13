const express = require('express')
const router = express.Router();
const User = require("../models/UserModel")
const Book = require("../models/BookModel")
const mongoose = require('mongoose');
const Article = require("../models/ArticleModel")

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

// Adiciona ou remove itens da biblioteca do usuário
router.put("/:id/library", async (request, response) => {
	try {
		if (request.body.type == "book") {
			if (request.body.action == "add") {
				await Book.updateOne({ _id: request.body.item }, { $push: { 'userWhoAddedToTheLibrary': request.params.id } }).exec()
				var result = await User.updateOne({ _id: request.params.id }, { $push: { 'library.books': request.body.item } }).exec();
			} else if (request.body.action == "remove") {
				await Book.updateOne({ _id: request.body.item }, { $pull: { 'userWhoAddedToTheLibrary': { $in: [ request.params.id ] } } }).exec()
				var result = await User.updateOne({ _id: request.params.id }, { $pull: { 'library.books': { $in: [ request.body.item ] } } }).exec();
			} else {
				response.status(500).send("Tipo de ação inválida");
			}
		} else if (request.body.type == "article") {
			if (request.body.action == "add") {
				await Article.updateOne({ _id: request.body.item }, { $push: { 'userWhoAddedToTheLibrary': request.params.id } }).exec()
				var result = await User.updateOne({ _id: request.params.id }, { $push: { 'library.articles': request.body.item } }).exec();
			} else if (request.body.action == "remove") {
				await Article.updateOne({ _id: request.body.item }, { $pull: { 'userWhoAddedToTheLibrary': { $in: [ request.params.id ] } } }).exec()
				var result = await User.updateOne({ _id: request.params.id }, { $pull: { 'library.articles': { $in: [ request.body.item ] } } }).exec()
			} else {
				response.status(500).send("Tipo de ação inválida");
			}
		} else {
			response.status(500).send("Tipo de item inválido");
		}

		response.send(result);
	} catch (error) {
		response.status(500).send("Deu bosta");
	}
})

module.exports = router
