const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const Book = require("../models/BookModel")
const Article = require("../models/ArticleModel")

// Validação dos campos
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Modelo de Usuário
const User = require("../models/UserModel");

router.post("/register", (req, res) => {
    // Validação do Formulário
    const { errors, isValid } = validateRegisterInput(req.body);

    // Verifica a validação
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Verifica se já existe um usuário com o e-mail correspondente
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Este e-mail já está sendo utilizado." });
        } else {
            // Cria um novo usuário
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Faz o hash da senha antes de salvar no banco
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    // Validação do Formulário
    const { errors, isValid } = validateLoginInput(req.body);

    // Verifica a validação
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password, role } = req.body;
    
    // Encontra o usuário através do e-mail correspondente
    User.findOne({ email }).then(user => {
        // Verifica se o usuário existe
        if (!user) {
            return res.status(404).json({ emailnotfound: "E-mail não encotrado" });
        }

        // Verifica a senha
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                if(user.role.includes(role)){
                    // Verificação deu positivo
                    // Cria o Payload JWT 
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    // Token de autenticação
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926 // 1 ano em segundos
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                } else {
                    return res
                        .status(403)
                        .json({ permissiondanied: "Seu nível de usuário não é suficiente para acessar esta página." });
                }
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Senha incorreta" });
            }
        });
    });
});

// Adiciona ou remove itens da biblioteca do usuário
router.put("/:id/library", async (request, response) => {
	try {
		const user = await User.findById(request.params.id)

		if (request.body.type == "book") {
			const book = await Book.findById(request.body.item)
			
			if (book.userWhoAddedToTheLibrary.filter(u => u.toString() === request.params.id).length > 0) {
				book.userWhoAddedToTheLibrary.pull(request.params.id)
				user.updateOne({ _id: request.params.id }, { $pull: { 'library.books': { $in: [ request.body.item ] } } })
				await book.save()
				var result = await user.save()
			} else {
				book.userWhoAddedToTheLibrary.push(request.params.id)
				user.updateOne({ _id: request.params.id }, { $push: { 'library.books': { $in: [ request.body.item ] } } })
				await book.save()
				var result = await user.save()
			}
		} else if (request.body.type == "article") {
            const article = await Book.findById(request.body.item)

			if (article.userWhoAddedToTheLibrary.filter(u => u.toString() === request.params.id).length > 0) {
				article.userWhoAddedToTheLibrary.pull(request.params.id)
				user.updateOne({ _id: request.params.id }, { $pull: { 'library.articles': { $in: [ request.body.item ] } } })
				await article.save()
				var result = await user.save()
			} else {
				article.userWhoAddedToTheLibrary.push(request.params.id)
				user.updateOne({ _id: request.params.id }, { $push: { 'library.articles': { $in: [ request.body.item ] } } })
				await article.save()
				var result = await user.save()
			}
		} else {
			response.status(500).send("Tipo de item inválido");
		}

		response.status(200).json(result.library);
	} catch (error) {
		response.status(500).send(`Erro ao adicionar item à biblioteca: ${error}`);
	}
})

module.exports = router